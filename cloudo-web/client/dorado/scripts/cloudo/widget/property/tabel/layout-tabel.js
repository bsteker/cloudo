/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-6
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
	cloudo.widget.LayoutPropertyTabel = $extend(cloudo.widget.AbstractPropertyTabel, {
		$className: "cloudo.widget.LayoutPropertyTabel",
		constructor: function (config) {
			config = config || {};

			this._buildTypeEditor();
			this._buildPropertyGrid(false);
			config.children = [this.typeEditor, this.propertyGrid];

			$invokeSuper.call(this, [config]);
		},

		_buildTypeEditor: function () {
			var layoutPropEditor = this;
			var typeEditor = new dorado.widget.Container({
				height: 50,
				children: [
					{
						$type: "Label", text: "Layout:",
						layoutConstraint: {
							anchorLeft: "previous",
							left: 10, top: 15
						}
					}
				],
				layout: {
					$type: "Anchor"
				}
			});
			var layoutSelector = new dorado.widget.TextEditor({
				layoutConstraint: {
					anchorLeft: "previous",
					left: 10, right: 10, top: 15
				}});
			var children = cloudo.Rule.get("LayoutHolder").children, layouts = new Array();

			for (var i = 0, len = children.length; i < len; i++) {
				var l = children[i];
				layouts.push({
					name: l.name
				});
			}
			layoutSelector.set("trigger", new dorado.widget.ListDropDown({
				items: layouts, property: "name",
				onValueSelect: function (self, arg) {
					var name = "type", value = arg.selectedValue;
					var property = new cloudo.model.Property(name, value);
					var node = layoutPropEditor._node;
					cloudo.viewConfig.setLayoutProperty(node, property, null);
					arg.processDefault = true;
				}
			}));

			this._layoutSelector = layoutSelector;
			typeEditor.addChild(layoutSelector);
			this.typeEditor = typeEditor;
		},
		refreshData: function () {
			var editor = this, propertyGrid = this.propertyGrid, nodeDatas = [];
			propertyGrid.removeDataColumns();
			if (cloudo.selections.size === 1) {
				var node = cloudo.selections.first(), rule = cloudo.Rule.get(node.rid),
					label = "属性值", nid = node.id;
				editor._node = node;
				if (rule.layoutable) {
					var layout = node.getLayout().toJSON();
					var layoutType = layout.type || cloudo.Constant.DEFAULT_LAYOUT,
						layoutRule = cloudo.Rule.getLayoutRuleByName(layoutType);

					$(layoutRule.properties).each(function (index, item) {
						var k = item.name, data = {}, defaultValue = item.defaultValue;
						var value = layout[k] || defaultValue;
						data[nid] = value;
						data[nid + "defaultValue"] = defaultValue;
						data["editorType"] = item.editorType;
						data.propertyName = k;
						nodeDatas.push({label: k, data: data});
					});
					editor._layoutSelector.set("value", layoutType);
					var column = editor.createColumn(node.id, label);
					propertyGrid.addColumn(column);
				}
			}
			propertyGrid.set("nodes", nodeDatas);
		},
		getCellEditor: function (data, column) {
			var nid = column.get("name"), defaultValue = data.get(nid + "defaultValue"),
				node = cloudo.model.findNode(nid), propertyName = data.get("propertyName"),
				parentTreeNode = data._node.get("parent"), parentName = parentTreeNode.get("label");
			var rid = $nodeHelper.layoutRuleId(node);
			return  cloudo.propertyEditor.get(rid, propertyName, parentName, {
				node: node, propertyType: cloudo.propertyEditor.propertyTypes.LAYOUT
			});
		}



	});

})();