/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-4-24
 * Time: 上午11:09
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var OperationCellRenderer = $extend(dorado.widget.grid.SubControlCellRenderer,
		{
			createSubControl: function (arg) {
				var name = arg.data.get("name");
				return  new dorado.widget.SimpleIconButton({
					iconClass: "fa fa-minus-square", tip: "取消事件",
					onClick: function (self, arg) {
						var node = cloudo.selections.first();
						cloudo.viewConfig.removeEvent(node, name);
					}
				});
			},
			refreshSubControl: function (iconButton, arg) {
				var data = arg.data,
					reorderLevel = data.get("reorderLevel"),
					hasEvent = data.get("hasEvent");
				iconButton.set({
					visible: reorderLevel > 100,
					disabled: !hasEvent
				});
			}
		});
	cloudo.widget.EventTabel = $extend(dorado.widget.Container, {
		$className: "cloudo.widget.EventTabel",
		constructor: function (config) {
			var filterBar, treeGrid;

			config = config || {};
			filterBar = this._buildFilterBar();
			treeGrid = this._buildTreeGrid();

			cloudo.Toolkits.merge(config, {
				layout: {$type: "Dock"},
				children: [filterBar, treeGrid]
			}, true);

			$invokeSuper.call(this, [config]);

			this._treeGrid = treeGrid;
			this._filterBar = filterBar;
		},

		_buildFilterBar: function () {
			var eventTabel = this, filterBar;
			filterBar = new dorado.widget.TextEditor({
					$type: "TextEditor", width: "100%",
					blankText: "--按名称过滤--",
					trigger: [
						{
							$type: "Trigger", exClassName: "d-trigger-clear",
							iconClass: "d-trigger-icon-clear",
							onExecute: function (self, arg) {
								arg.editor.set("text", "");
								arg.editor.post();
							}
						},
						{
							$type: "Trigger", iconClass: "d-trigger-icon-search"
						}
					],
					listener: {
						onTextEdit: function (self) {
							var grid = eventTabel._treeGrid
							dorado.Toolkits.setDelayedAction(grid, "$filterTimeId", function () {
								var value = self.doGetText();
								eventTabel.filter(value);
							}, 20);
						}
					},
					layoutConstraint: {
						type: "top"
					}
				}
			);

			return  filterBar;

		},
		_buildTreeGrid: function () {
			var eventTabel = this;
			var treeGrid = new dorado.widget.TreeGrid({
				columns: [
					{
						name: "name", readOnly: true,
						caption: "事件", width: 200, property: "name",
						onRenderCell: function (self, arg) {
							var data = arg.data, hasEvent = data.get("hasEvent");
							with (arg.dom) {
								style.fontWeight = hasEvent ? "bold" : "";
								style.color = hasEvent ? "green" : "";
								innerHTML = "&nbsp;&nbsp;&nbsp;" + data.get("name");
							}
							arg.processDefault = false;
						}

					},
					{
						name: "signature", readOnly: true,
						caption: "参数", property: "signature",
						onRenderCell: function (self, arg) {
							var p = arg.data, hasEvent = p.get("hasEvent");
							with (arg.dom) {
								style.fontWeight = hasEvent ? "bold" : "";
								style.color = hasEvent ? "green" : "";
								innerHTML = p.get("signature");
							}
							arg.processDefault = false;
						}
					},
					{
						name: "reorderLevel", width: 20,
						align: "center", caption: ".",
						property: "reorderLevel", readOnly: true,
						renderer: new OperationCellRenderer()
					}
				],
				listener: {
					onDataRowDoubleClick: function (self, arg) {
						var treeNode = self.getNodeByEvent(arg.event);
						var eventName = treeNode.get("data.name");
						var node = cloudo.selections.first();
						var evt = node.findEvent(eventName);
						var code = evt ? evt.getCode() : "";
                        var signature=evt?evt.getSignature():"self,arg";

						cloudo.eventEditor.set({
							node: node,
							name: eventName, code: code || "",
                            signature:signature
						});
						cloudo.eventEditor.show({anchorTarget: window, align: "center"});
					},
					onKeyDown: function (self, arg) {
						if (arg.keyCode == 8) {
							//delete键绑定删除当前节点
							var eventName = eventTabel.getCurrentEventName();
							var node = cloudo.selections.first();
							cloudo.viewConfig.removeEvent(node, eventName);
						}
					},
					onCurrentChange: function (self, arg) {
						var oldEntity = self._oldEntity,
							newEntity = self.get("currentEntity");

						function setReorderLevel(entity, value) {
							entity.set("reorderLevel", value);
							entity._node.refresh();
						}

						oldEntity && setReorderLevel(oldEntity, 0);
						newEntity && setReorderLevel(newEntity, 200);
						self._oldEntity = newEntity;
					}
				}
			});
			return  treeGrid;
		},
		getRow: function (eventName) {
			var treeGrid = this._treeGrid, entityMap = treeGrid._entityMap;
			for (var item in  entityMap) {
				if (entityMap.hasOwnProperty(item)) {
					var entity = entityMap[item]._data;
					var name = entity._data.name;
					if (name === eventName) {
						return  entityMap[item];
					}
				}
			}
		},
		getCurrentEventName: function () {
			var treeGrid = this._treeGrid;
			var currentNode = treeGrid.get("currentNode");
			if (currentNode) {
				return  currentNode.get("data.name");
			}
		},
		refreshData: function () {
			var editor = this, treeGrid = editor._treeGrid, selections = cloudo.selections, nodes = [];
			if (selections.size === 1) {
				var node = selections.at(0), rid = node.rid, events = cloudo.Rule.getEvents(rid);
				events.each(function (item) {
					var name = item.name, signature = item.signature,
						event = node.findEvent(name), hasEvent = false;
					if (event) {
						signature = event.getSignature();
						hasEvent = true;
					}
					nodes.push({
						label: name,
						data: {
							name: name, signature: signature,
							hasEvent: hasEvent, reorderLevel: 0
						}
					});
				});
			}
			treeGrid.set("nodes", nodes);
		},
		filter: function (condition) {
			condition = (condition || "").toLowerCase();
			var grid = this._treeGrid,
				entityMap = grid._entityMap, itemDomMap = grid._innerGrid._itemDomMap;
			for (var k in entityMap) {
				if (entityMap.hasOwnProperty(k)) {
					var entity = entityMap[k], label = entity._label;
					if (label) {
						var row = itemDomMap[entity._uniqueId || entity._id];
						$fly(row).css("display", label.toLowerCase().indexOf(condition) >= 0 ? "" : "none");
					}
				}
			}
		}

	});

})();