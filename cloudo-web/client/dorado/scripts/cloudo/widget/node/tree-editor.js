/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-8
 * Time: 上午9:33
 * To change this template use File | Settings | File Templates.
 */
(function () {

	var DATATYPE_ID = "v:cloudo.Models$[v:cloudo.Models$Node]", ITEM_DRAG_TAG = "nodeInstance", CONTEXT_MENT;

	var $model = cloudo.model,
		$nodeHelper = cloudo.NodeHelper;
	var CloudoNodeTree = $extend(dorado.widget.DataTree, {
		getNodeDom: function (node) {
			return node._dom || this._itemDomMap[node._uniqueId || node._id];
		}
	});

	function treeEditorKeyDown(self, arg) {
		//TODO 解析Dom结构获得树节点  注此方法为非Dorado Api代码
		function getPrevNode(tNode) {
			var nodeDom = tNode._dom, prevDom = $(nodeDom).prev()["0"];
			return prevDom ? $fly(prevDom).data("item") : null;
		}

		function getNextNode(tNode) {
			var nodeDom = tNode._dom, nextDom = $(nodeDom).next()["0"];
			return nextDom ? $fly(nextDom).data("item") : null;
		}

		var processDefault = true, clipboard = cloudo.Clipboard,
			selections = cloudo.selections, viewConfig = cloudo.viewConfig, tipManager = dorado.widget.NotifyTipManager,
			ctrlKey = event.ctrlKey, shiftKey = event.shiftKey, metaKey = event.metaKey;

		var nodes = selections.toArray();
		var control = self;
		switch (arg.keyCode) {
			case 67:  // Ctrl+C
			{
				if (ctrlKey || metaKey) {
					if (clipboard.canCopy()) {
						clipboard.copy();
					} else {
						tipManager.notify("当前项不可复制！");
					}
				}
				processDefault = false;
				break;
			}
			case 86:    // Ctrl+V
			{
				if (ctrlKey || metaKey) {
					if (clipboard.canPaste()) {
						clipboard.paste();
					} else {
						tipManager.notify("剪贴板内容不可粘贴到此节点上！")
					}
				}
				processDefault = false;
				break;
			}
			case 88:     // Ctrl+X
			{
				if (ctrlKey || metaKey) {
					if (clipboard.canCopy()) {
						clipboard.cut();
					} else {
						tipManager.notify("不可剪切当前项！");
					}
				}
				processDefault = false;
				break;
			}
			case 38: //up
			{
				var node, treeNode;
				if (ctrlKey || metaKey) {   // Ctrl+up 节点上移
					if (selections.size === 1) {
						node = selections.first();
						var previous = $nodeHelper.previous(node);
						previous && viewConfig.moveNode(node, node.getParent(), "before", previous);
					}
				} else if (shiftKey) {  // Shift+up
					node = selections.first();
					treeNode = control.findTreeNode(node);
					if (treeNode) {
						var prevTreeNode = getPrevNode(treeNode);
						if (prevTreeNode) {
							nodes.splice(0, 0, prevTreeNode.get("data.nid"));
							selections.add(nodes, {merge: false});
						}
					}
				} else {    // up  光标上移
					node = selections.first();
					treeNode = control.findTreeNode(node);
					var prevNode = getPrevNode(treeNode);
					prevNode && selections.add(prevNode.get("data.nid"), {merge: false});
				}


				processDefault = false;
				break;
			}
			case 40:  //down
			{
				var node, treeNode;
				if (ctrlKey || metaKey) {        // Ctrl+down 节点下移
					if (selections.size === 1) {
						node = selections.first();
						var next = $nodeHelper.next(node);
						next && viewConfig.moveNode(node, node.getParent(), "after", next);
					}
				} else if (shiftKey) {     // Shift+down
					node = selections.last();
					treeNode = control.findTreeNode(node);
					if (treeNode) {
						var nextTreeNode = getNextNode(treeNode);
						if (nextTreeNode) {
							nodes.push(nextTreeNode.get("data.nid"));
							selections.add(nodes, {merge: false});
						}
					}
				} else {      // down  光标下移
					node = selections.last();
					treeNode = control.findTreeNode(node);
					var nextTreeNode = getNextNode(treeNode);
					nextTreeNode && selections.add(nextTreeNode.get("data.nid"), {merge: false});
				}

				processDefault = false;
				break;
			}
			case 27:   //esc  定位到父节点
			{
				if (selections.size === 1) {
					var node = selections.first();
					var parentNode = node.getParent();
					selections.add(parentNode, {merge: false});
				}
				processDefault = false;
				break;
			}
			case 13:   //return  展开或收缩此节点
			{
				if (selections.size === 1) {
					var node = selections.first(),
						treeNode = control.findTreeNode(node);
					if (treeNode.get("expanded")) {
						treeNode.collapse();
					} else {
						treeNode.expand();
					}
				}
				processDefault = false;
				break;
			}
			case 46:
			{
				cloudo.selections.toArray().each(
					function (node) {
						cloudo.viewConfig.removeNode(node);
					}
				);
				break;
			}
			case 8:		//delete 删除当前节点
			{
				cloudo.selections.toArray().each(
					function (node) {
						cloudo.viewConfig.removeNode(node);
					}
				);
				break;
			}
			default :
				processDefault = true;
				break;
		}


	}

	function parseNode(node) {
		var result, label = node.parseLabel(),
			icon = cloudo.Rule.getIcon(node.rid), nodes;

		result = {
			nid: node.id, label: label, rid: node.rid,
			icon: cloudo.Constant.ICON_URL_PREFIX + icon,
			hasEvent: $nodeHelper.hasEvent(node)
		};

		nodes = node.allNode();

		if ($nodeHelper.canAdd(node) || nodes.size > 0) {
			result.nodes = [];
		}
		nodes.each(function (n) {
			result.nodes.push(parseNode(n));
		});
		return result;
	}

	function accept(tags) {
		var acceptable = false;

		function decision(tag) {
			return tag === cloudo.Constant.NODE_DRAG_TAG || tag === ITEM_DRAG_TAG;
		}

		if ($.isArray(tags)) {
			tags.each(function (tag) {
				if (decision(tag)) {
					acceptable = true;
					return false;
				}
			});
		} else {
			acceptable = decision(tags);
		}

		return acceptable;
	}

	function registDataType() {
		var dataTypeRepository = cloudo.view.get("dataTypeRepository");
		if (!dataTypeRepository.get("Node")) {
			dataTypeRepository.parseJsonData([
				{
					propertyDefs: [
						{
							name: "nid"
						},
						{
							name: "label"
						},
						{
							name: "rid"
						},
						{
							name: "icon"
						},
						{
							name: "hasEvent", dataType: "boolean"
						},
						{
							name: "nodes", dataType: DATATYPE_ID
						}
					],
					name: "Node"
				}
			]);
		}
	}

	function getContextMenu() {
		if (!CONTEXT_MENT) {
			CONTEXT_MENT = new dorado.widget.Menu({
				animateType: "none", modalType: "dark",
				items: [

					{
						caption: "复制", name: "copy",
						iconClass: "c-button-icon fa fa-files-o",
						onClick: function () {
							cloudo.Clipboard.copy();
						}
					},
					{
						caption: "剪切", name: "cut",
						iconClass: "c-button-icon fa fa-scissors",
						onClick: function () {
							cloudo.Clipboard.cut();
						}
					},
					{
						caption: "粘贴", name: "paste",
						iconClass: "c-button-icon fa fa-clipboard",
						onClick: function () {
							cloudo.Clipboard.paste();
						}
					},
					{
						caption: "删除", name: "remove",
						iconClass: "c-button-icon fa fa-eraser",
						onClick: function () {
							cloudo.selections.toArray().each(
								function (node) {
									cloudo.viewConfig.removeNode(node);
								}
							);
						}
					},
					{
						$type: "Separator"
					},
					{
						caption: "Generate Elements", name: "autoGenerate",
						iconClass: "fa fa-magic",
						onClick: function () {
							var selections = cloudo.selections;
							if (selections.size === 1) {
								cloudo.viewConfig.autoGenerateSubNodes(selections.first());
							}
						}
					},
					{
						caption: "单开编辑", name: "independentEdit",
						iconClass: "fa fa-pencil-square-o",
						onClick: function () {
							var selections = cloudo.selections;
							if (selections.size === 1) {
								cloudo.nodeEditorManager.openEditor(selections.first());
							}
						}
					}

				],
				beforeShow: function (self, arg) {
					var clipboard = cloudo.Clipboard, isCopy, isPaste,
						isAuto = false, isCreate = false;

					isCopy = clipboard.canCopy();
					isPaste = clipboard.canPaste();

					if (cloudo.selections.size === 1) {
						var curentNode = cloudo.selections.first()

						isAuto = ["DataGrid", "AutoForm", "DataType", "DataTreeGrid"].indexOf(curentNode.rid) >= 0;
						isCreate = $nodeHelper.canCreateEditor(curentNode);
					}

					with (self) {
						getItem("copy").set("disabled", !isCopy);
						getItem("cut").set("disabled", !isCopy);
						getItem("remove").set("disabled", !isCopy);
						getItem("paste").set("disabled", !isPaste);
						getItem("autoGenerate").set("visible", isAuto);
						getItem("independentEdit").set("disabled", !isCreate);
					}
				}
			});
			cloudo.view.addChild(CONTEXT_MENT);
		}
		return CONTEXT_MENT;
	}


	cloudo.widget.TreeEditor = $extend([dorado.widget.Container, cloudo.widget.AbstractNodeEditor], {
		$className: "cloudo.widget.TreeEditor",
		constructor: function (config) {
			var node;
			config = config || {};
			if (config.node) {
				node = config.node;
				delete config["node"]
			}
			this._createDataSet();
			this._createTree();

			config.children = [this._tree];
			$invokeSuper.call(this, [config]);
			node && this.init(node);
		},
		destroy: function () {
			this._dataSet.destroy();
			$invokeSuper.call(this);
		},
		_createDataSet: function () {
			registDataType();
			var dataSet = new dorado.widget.DataSet({
				dataType: DATATYPE_ID, loadMode: "manual"
			});
			this._dataSet = dataSet;
			cloudo.view.addChild(dataSet);
			return dataSet;
		},

		/**
		 * 创建编辑器
		 * <p>
		 *  此方法留给子类实现
		 * </p>
		 */
		_createTree: function () {
			var nodeEditor = this,
				dataSet = this._dataSet;
			var expandLevel = cloudo.viewConfig.isModel() ? 1 : 2;
			var tree = new CloudoNodeTree({
				bindingConfigs: [
					{
						childrenProperty: "nodes", labelProperty: "label",
						iconProperty: "icon", recursive: true,
						name: "viewNode", expandLevel: expandLevel
					}
				], style: {"background-color": "#5b6172;"},
				scrollMode: "lazyRender", dataSet: dataSet,
				height: "100%", width: "100%",
				exClassName: "cloudo-tree-editor",
				dragTags: [ITEM_DRAG_TAG], draggable: true,
				droppableTags: [cloudo.Constant.NODE_DRAG_TAG, ITEM_DRAG_TAG], droppable: true,
				listener: {
					onKeyDown: function (self, arg) {
						return treeEditorKeyDown(nodeEditor, arg)
					},
					onRenderNode: function (self, arg) {
						var node = arg.node, level = node.get("level"), data = node.get("data"), $dom = $(arg.dom);

						var layout = $nodeHelper.layoutRuleName(data.get("nid")) || "";
						var rule = cloudo.Rule._find(data.get("rid"));
						$dom.empty().xCreate([
							{
								tagName: "i", className: "event-icon d-icon cloudo-icon-bolt",
								style: "position: absolute;left: -25px; top: -6px;"
							},
							{
								tagName: "SPAN",
								contentText: arg.label
							},
							{
								tagName: "SPAN", className: "c-node-layout-label",
								contentText: layout ? "[" + layout + "]" : ""
							},
							{
								className: "r-name",
								contentText: rule.label || rule.jsShortType || rule.jsPrototype
							}
						]);
						$dom.css({
							position: "relative",
							display: "inline"
						});
						$dom.find(".event-icon").css({
							display: data.get("hasEvent") ? "inline" : "none"
						});
					},
					onDraggingSourceMove: function (self, arg) {
						var draggingInfo = arg.draggingInfo, tags = draggingInfo.get("tags");

						if (!accept(tags)) {
							draggingInfo.set({
								accept: false
							});
							return;
						}
						var event = arg.event, obj = draggingInfo.get("object"),
							targetObject = draggingInfo.get("targetObject"), acceptable = true, operatingInfo = {};

						if (targetObject) {
							var targetObjectDom = self.getNodeDom(targetObject);
							var dom = $(targetObjectDom), dragNodes = [];
							if (obj.constructor.className === "dorado.widget.tree.DataBindingNode") {
								dragNodes = cloudo.selections.getPasteNodes();

								operatingInfo.type = "move";
							} else {
								var rid = obj.rid;
								dragNodes.push(cloudo.Toolkits.createNodeInstance(rid));
								operatingInfo.type = "add";
							}

							operatingInfo.nodes = dragNodes;

							var pageX = event.pageX, pageY = event.pageY, $nodeButtonDom, offset, top, left, width, height;

							$nodeButtonDom = dom.find(".node-button");
							offset = $nodeButtonDom.offset();
							top = offset.top;
							left = offset.left;
							width = $nodeButtonDom.width();
							height = $nodeButtonDom.height();

							var y = top + height / 2, x = left + width / 2, $decoratorDom = self._decoratorDom;

							$decoratorDom && $decoratorDom.removeClass("dod-bottom dod-top");
							$decoratorDom = dom.find("td div");
							self._decoratorDom = $decoratorDom;

							function canPaste(targetNode, subNodes) {
								var i = subNodes.length;
								while (i--) {
									var node = subNodes[i];
									if (!$nodeHelper.canPaste(targetNode, node)) {
										return false;
									}
								}
								return true;
							}

							var tid = targetObject.get("data.nid");
							var targetNode = cloudo.model.findNode(tid);
							if (pageX > x) {  //移动已进入   子元素模式
								acceptable = canPaste(targetNode, dragNodes);
								if (acceptable) {
									operatingInfo.parentNode = targetNode;
								}
							} else {  //移动已进入   兄弟元素模式
								if (targetNode) {
									var targetParentNode = targetNode.getParent();
									acceptable = canPaste(targetParentNode, dragNodes);
									if (acceptable) {
										operatingInfo.parentNode = targetParentNode
										operatingInfo.refNode = targetNode;
										operatingInfo.insertMode = pageY <= y ? "before" : "after";
									}
								} else {
									acceptable = false;
								}
								if (pageY > y) {
									$decoratorDom.addClass("dod-bottom");
								} else {
									$decoratorDom.addClass("dod-top");
								}
							}

							draggingInfo.set("accept", acceptable);
						}
						draggingInfo._operatingInfo = operatingInfo;

					},
					beforeDraggingSourceDrop: function (self, arg) {
						var draggingInfo = arg.draggingInfo, operatingInfo = draggingInfo._operatingInfo, $decoratorDom = self._decoratorDom;

						var tags = draggingInfo.get("tags");
						if (!accept(tags)) {
							draggingInfo.set({
								accept: false
							});
							return;
						}
						$decoratorDom && $decoratorDom.removeClass("dod-bottom dod-top");
						if (operatingInfo) {
							var nodes = operatingInfo.nodes, parentNode = operatingInfo.parentNode,
								refNode = operatingInfo.refNode, insertMode = operatingInfo.insertMode;
							if (operatingInfo.type === "add") {
								//TODO 此处需要做导航增强
								var node = nodes[0];
								if (cloudo.wizard.find(node.rid)) {
									cloudo.wizard.show(node.rid, {
										node: node,
										parentNode: parentNode
									});
								} else {
									cloudo.viewConfig.addNode(node, parentNode, insertMode, refNode);
								}
							} else {
								for (var i = 0, length = nodes.length; i < length; i++) {
									cloudo.viewConfig.moveNode(nodes[i], parentNode, insertMode, refNode);
								}
							}
						}
						//禁止dorado 重复插入对象
						arg.processDefault = false;
					},
					beforeCurrentChange: function (self, arg) {
						var event = window.event, parentTree = self;
						if (event) {
							var eventTreeNode = self.getNodeByEvent(event);
							if (eventTreeNode) {
								var eventNid = eventTreeNode.get("data.nid");
								//鼠标右键处理
								if (event.button === 2) {
									if (!cloudo.selections.find(eventNid)) {
										arg.processDefault = true;
										return;
									}
								}

								if (event.ctrlKey || event.shiftKey) {
									var oldItems = [], newItems = [];

									function nodeHandler(node) {
										var treeNode = nodeEditor.findTreeNode(node);
										var treeNodeDom = self.getNodeDom(treeNode);
										if (treeNode) {
											return {
												node: node,
												offsetTop: $(treeNodeDom).offset().top,
												treeNode: treeNode
											}
										}
									};

									function nodeDomHandler(nodeDom) {
										var treeNode = $fly(nodeDom).data("item");
										if (treeNode) {
											var nid = treeNode.get("data.nid");
											return {
												node: cloudo.model.findNode(nid),
												offsetTop: $(nodeDom).offset().top,
												treeNode: treeNode
											};
										}
									};

									function bubbleSort(array) {
										var len = array.length,
											i, j, tmp;
										for (i = 0; i < len; i++) {
											for (j = len - 1; j > i; j--) {
												if (array[j].offsetTop > array[j - 1].offsetTop) {
													tmp = array[j - 1];
													array[j - 1] = array[j];
													array[j] = tmp;
												}
											}
										}
									};

									//Control键处理
									if (event.ctrlKey) {
										var ids = cloudo.selections.pluck("id");
										ids.indexOf(eventNid) >= 0 ? ids.remove(eventNid) : ids.push(eventNid);
										ids.each(function (id) {
											var n = cloudo.model.findNode(id), item = nodeHandler(n);
											item && oldItems.push(item);
										});
									}

									//Shift键处理
									if (event.shiftKey) {
										cloudo.selections.each(function () {
											var n = this, item = nodeHandler(n);
											item && oldItems.push(item);
										});

										var maxY = 0, minY = 0,
											topTreeNode = oldItems[0].treeNode,
											bottomTreeNode = oldItems[0].treeNode;
										$.each(oldItems, function (i, item) {
											var y = item.offsetTop;
											if (i == 0) {
												maxY = y, minY = y;
												topTreeNode = item.treeNode;
												bottomTreeNode = item.treeNode;
											} else {
												if (y > maxY) {
													maxY = y;
													bottomTreeNode = item.treeNode;
												}

												if (y < minY) {
													minY = y;
													topTreeNode = item.treeNode;
												}
											}
										});
										var eventTreeNodeDom = parentTree.getNodeDom(eventTreeNode),
											topTreeNodeDom = parentTree.getNodeDom(topTreeNode),
											bottomTreeNodeDom = parentTree.getNodeDom(bottomTreeNode);
										var eventY = $(eventTreeNodeDom).offset().top;
										if (eventY < minY) {
											var next = eventTreeNodeDom;
											while (next != topTreeNodeDom) {
												newItems.push(nodeDomHandler(next));
												next = $(next).next()["0"];
											}
											arg.processDefault = false;
										} else if (eventY > maxY) {
											var prev = eventTreeNodeDom;
											while (prev != bottomTreeNodeDom) {
												newItems.push(nodeDomHandler(prev));
												prev = $(prev).prev()["0"];
											}
											arg.processDefault = false;
										}
									}

									var allItems = oldItems.concat(newItems), selections = [];
									bubbleSort(allItems);
									for (var i = allItems.length - 1; i >= 0; --i) {
										selections.push(allItems[i].node);
									}
									cloudo.selections.add(selections, {marge: false});
								}
							}

							if (event.ctrlKey || event.button === 2) {
								arg.processDefault = false;
							}
						}
					},
					onCurrentChange: function (self, arg) {
						var newCurrentTreeNode = arg.newCurrent;
						if (newCurrentTreeNode) {
							var nid = newCurrentTreeNode.get("data.nid");
							var node = $model.findNode(nid);
							if (node) {
								var currentNode = cloudo.selections.first();
								if (currentNode && currentNode.eq(node)) return;
								cloudo.selections.add(node, {merge: false});
							}
						}
					},

					onContextMenu: function (self, arg) {
						var event = arg.event, menu = getContextMenu();
						if (!event.ctrlKey || event.button === 2) {
							if (menu.get("visible")) {
								menu.hide();
							}
							var x = event.pageX, y = event.pageY;
							menu.show({
								position: {
									left: x,
									top: y
								}
							});
							menu.nodeEditor = nodeEditor;
						}
					}
				}
			});

			this._tree = tree;
			return tree;

		},

		_getEntity: function (id) {
			var dataset = this._dataSet;
			return dataset.getData("nodes(R)[@.get('nid')=='" + id + "']");
		},
		_highlightNode: function (node) {
			var tree = this._tree, treeNode = this.findTreeNode(node);
			treeNode && tree.highlightItem(treeNode, null, 1000);
		},
		findTreeNode: function (node) {
			var tree = this._tree;
			var nodeEditor = this;

			function getTreeNode(id) {
				var entity = nodeEditor._getEntity(id);
				return tree.findNode(entity);
			}

			var treeNode = getTreeNode(node.id);

			if (!treeNode) {
				var relationship = {};

				function findTreeNode(parentTreeNode) {
					var id = parentTreeNode.get("data.nid");
					if (id == node.id)  return true;
					var nodes, isClose = !parentTreeNode.get("expanded"), result = false;
					parentTreeNode.expand();
					nodes = parentTreeNode.get("nodes").toArray();
					for (var i = 0, len = nodes.length; i < len; i++) {
						var sNode = nodes[i];
						if (sNode.get("data.nid") == relationship[id])
							result = findTreeNode(sNode);
						if (result) break;
					}
					isClose && !result && parentTreeNode.collapse();
					return result;
				}

				var parentTreeNode, parentNode = node, sn;
				do {
					sn = parentNode;
					parentNode = parentNode.getParent();
					if (!parentNode) break;
					relationship[parentNode.id] = sn.id;

					parentTreeNode = getTreeNode(parentNode.id);
				} while (!parentTreeNode);

				parentTreeNode && findTreeNode(parentTreeNode);
				treeNode = getTreeNode(node.id)

			} else {
				var p = node.getParent();
				if (p) {
					var ptn = getTreeNode(p.id);
					ptn && ptn.expand();
				}
				treeNode.expandParents();
			}
			return treeNode;
		},
		expandNodes: function (node) {
			var treeNode = this.findTreeNode(node);

			function expandNode(tNode) {
				if (!tNode.get("expanded")) {
					tNode.expand();
				}
				var nodes = tNode.get("nodes");
				nodes.each(function (n) {
					expandNode(n);
				});
			}

			treeNode && expandNode(treeNode);
		},
		_setCurrent: function (n) {
			var node = n instanceof $model.Node ? n : $model.findNode(n);
			var tree = this._tree;
			var currentNode = tree.get("currentNode");
			if (currentNode) {
				var nid = currentNode.get("data.nid");
				if (nid && nid == node.id)
					return;
			}
			var treeNode = this.findTreeNode(node);
			tree.set("currentNode", treeNode || currentNode);
		},
		init: function (node) {
			var dataSet = this._dataSet;
			this._node = node;
			var data = parseNode(node);
			dataSet.clear();
			dataSet.insert(data);
		},
		refreshNode: function (node) {
			var label = node.parseLabel();
			var entity = this._getEntity(node.id);
			var hasEvent = $nodeHelper.hasEvent(node);
			if (entity) {
				entity.set("label", label);
				entity.set("hasEvent", hasEvent);
				var treeNode = this.findTreeNode(node);
				treeNode && treeNode.refresh();
			}
		},
		replaceProperty: function (node, name, value) {
			this.refreshNode(node);
		},
		refreshSelections: function (selections) {
			var tree = this._tree;
			var treeDom = tree.getDom();
			$(".selected-row", treeDom).removeClass("selected-row");

			var treeNodes = [];
			if (selections.length == 1) {
				this._setCurrent(selections[0]);
			} else {
				for (var i = 0; i < selections.length; i++) {
					var node = cloudo.model.findNode(selections[i]);
					var treeNode = this.findTreeNode(node);
					treeNodes.push(treeNode);
				}

				for (var j = 0; j < treeNodes.length; j++) {
					var treeNode = treeNodes[j];
					var nodeDom = tree.getNodeDom(treeNode);
					nodeDom && $fly(nodeDom).addClass("selected-row");
				}
			}
		},
		reload: function () {
			var node = this._node;
			var oldCurrentNode = cloudo.selections.first();
			node && this.init(node);
			setTimeout(function () {
				if (oldCurrentNode) {
					cloudo.selections.add(oldCurrentNode, {merge: false});
				}
			}, 100);
		},
		addNode: function (node, parentNode, insertMode, refNode) {
			var oldCurrentNode = cloudo.selections.first();
			var parentEntity = this._getEntity(parentNode.id);
			var nodeDate = parseNode(node);
			var nodes = parentEntity.get("nodes");
			if (refNode) {
				var refNodeId = refNode.id;
				var refEntity = this._getEntity(refNodeId);
				nodes.insert(nodeDate, insertMode, refEntity);
			} else {
				nodes.insert(nodeDate);
			}
			this._highlightNode(node);
			if (oldCurrentNode) {
				this._setCurrent(oldCurrentNode);
			}
		},
		removeNode: function (node) {
			var entity = this._getEntity(node.id);
			entity && entity.remove();
		},
		moveNode: function (node, oldParent, insertMode, refNode) {
			var parentNode = node.getParent(), entity = this._getEntity(node.id),
				pEntity = this._getEntity(parentNode.id), nodes = pEntity.get("nodes");
			var oldCurrentNode = cloudo.selections.first();
			if (refNode) {
				var refNodeEntity = this._getEntity(refNode.id);
				nodes.insert(entity, insertMode, refNodeEntity);
			} else {
				nodes.insert(entity, insertMode);
			}


			if (oldCurrentNode) {
				this._setCurrent(oldCurrentNode);
			}
		},
		filter: function (condition, keyword) {
			var nodeData = parseNode(this._node);
			keyword = keyword || "";
			keyword = keyword.toLowerCase();
			function handler(node) {
				var nodes = node.nodes || [];
				var result = false, newNodes = [];
				for (var i = 0, len = nodes.length; i < len; i++) {
					var n = nodes[i];
					var nResult = handler(n);
					nResult && newNodes.push(n);
					if (nResult && !result) {
						result = true;
					}
				}
				if (!result) {
					if (condition == "hasEvent") {
						result = $nodeHelper.hasEvent($model.findNode(node.nid));
					} else {
						var prop = condition == "nodeName" ? node.rid : node.label;
						if (prop) {
							result = prop.toLowerCase().indexOf(keyword) >= 0;
						}
					}
				}
				node.nodes = newNodes;
				return result;
			}

			if (condition == "hasEvent" || keyword)
				handler(nodeData);


			var dataSet = this._dataSet;
			dataSet.clear();
			dataSet.insert(nodeData);
		}
	});
})
();