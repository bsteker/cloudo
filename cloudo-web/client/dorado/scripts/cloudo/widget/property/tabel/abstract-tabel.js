/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-20
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */
(function () {


	cloudo.widget.AbstractPropertyTabel = $extend(dorado.widget.Container, {
		$className: "cloudo.widget.AbstractPropertyTabel",
		_buildPropertyGrid: function (hideGeneralItems) {
			var treeGrid = new cloudo.widget.DynamicGrid({
				hideGeneralItems: hideGeneralItems,
				layoutConstraint: {
					type: "center"
				},
				columns: [
					{
						name: "propertyName", property: "propertyName",
						readOnly: true, caption: "属性名", width: 130
					}
				],
				scrollMode: "simple", treeColumn: "propertyName",
				listener: {
					onRenderNode: function (self, arg) {
						var node = arg.node,
							propertyRule = node.get("data.propertyRule"),
							labelDom = {
								tagName: "SPAN", contentText: arg.label
							};
						if (propertyRule && propertyRule.deprecated) {
							labelDom.style = "text-decoration: line-through;color: gray";
						}
						$(arg.dom).empty().xCreate(
							labelDom
						);
					}
				}

			});
			this.propertyGrid = treeGrid;
		},
		getRow: function (propertyName) {
			var treeGrid = this._treeGrid;
			if (treeGrid) {
				var map = treeGrid._entityMap;

				for (var item in  map) {
					if (map.hasOwnProperty(item)) {
						var entity = map[item]._data;
						var name = entity._data.propertyName;
						if (name == propertyName) {
							return  map[item];
						}
					}
				}

			}
		},
		createColumn: function (name, label) {
			var editor = this;
			var column = new dorado.widget.grid.DataColumn({
				name: name, caption: label, property: name,
				listener: {
					onRenderCell: function (self, arg) {
						var data , nid , value, defaultValue, $dom, color;

						data = arg.data.toJSON();
						nid = arg.column.get("name");
						$dom = $(arg.dom);

						if (data.defaultValues) {
							defaultValue = data.defaultValues[nid];
						}


						value = data[nid];

						var propertyRule = data.propertyRule;
						if (value && propertyRule && propertyRule.editorType === "multilines") {
							value = _.escape(value);
						}
						color = defaultValue === value ? cloudo.Skin.highlightColor : "";

						$dom.css("color", color);
						$dom.html(value);
						arg.processDefault = false;
					},
					onGetCellEditor: function (self, arg) {
						var cellEditor = editor.getCellEditor(arg.data, arg.column);
						arg.cellEditor.setEditorControl(cellEditor);
					}
				}
			});
			return column;
		},
		filter: function (condition) {


			condition = (condition || "").toLowerCase();
			var grid = this.propertyGrid,
				entityMap = grid._entityMap, itemDomMap = grid._innerGrid._itemDomMap;
			if (grid.filter) {
				grid.filter(condition);
				return;
			}


			_.each(entityMap, function (entity) {
					var label = entity._label;
					if (label) {
						var row = itemDomMap[entity._id];
						$fly(row).css("display", label.toLowerCase().indexOf(condition) >= 0 ? "" : "none");
					}
				}
			)
		}
	})
	;


})
();