/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-6
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var $model = cloudo.model;

	cloudo.widget.PositionPropertyTabel = $extend(cloudo.widget.AbstractPropertyTabel, {
		$className: "cloudo.widget.PositionPropertyTabel",
		constructor: function (config) {
			this._buildPropertyGrid(false);
			config = config || {};
			config.children = [this.propertyGrid];

			$invokeSuper.call(this, [config]);
		},
		refreshData: function () {

			var table = this, propertyGrid = this.propertyGrid,
				selections = cloudo.selections, propMap,
				columnConfigs = [], data = {}, nodes = [];

			propertyGrid.removeDataColumns();
			function intersect(props) {
				var tmpPropMap = {};
				for (var i = 0, len = props.length; i < len; i++) {
					var prop = props[i], propName;
					propName = prop.name;
					if (propMap) {
						if (propMap[propName]) {
							if (propMap[propName].editorType !== prop.editorType) {
								continue;
							}
							tmpPropMap[propName] = prop;
						}
					} else {
						tmpPropMap[prop.name] = prop;
					}
				}
				propMap = tmpPropMap;
			}

			//获得节点的位置规则
			function getNodePositionRule(node) {
				return  cloudo.Rule.get(cloudo.NodeHelper.positionRuleId(node));
			}

			//循环遍历selections中的节点获得共同属性
			selections.each(function (node) {
				var label = node.parseLabel(),
					rule = cloudo.Rule.get(node.rid);

				if (rule.positioned) {
					columnConfigs.push({
						name: node.id, label: label
					});
					nodes.push(node);
					var positionRule = getNodePositionRule(node);
					intersect(positionRule.properties);
				}
			});

			//给共同属性赋值（现有值和默认值）
			nodes.each(function (node) {
				var nid = node.id, positionRule, position, properties;

				positionRule = getNodePositionRule(node);
				position = node.getPosition().toJSON();
				properties = positionRule.properties;

				for (var propName in propMap) {
					if (!propMap.hasOwnProperty(propName)) {
						continue;
					}
					var propertyRule = properties[propName] || {};
					if (!data[propName]) {
						data[propName] = {
							propertyName: propName,
							propertyRule: propertyRule,
							defaultValues: {}
						}
					}
					var defaultValue = propertyRule.defaultValue,
						value = position[propName];

					value = value || defaultValue;
					data[propName][nid] = value;
					data[propName].defaultValues[nid] = defaultValue;
				}
			});

			for (var i = 0, len = columnConfigs.length; i < len; i++) {
				var columnConfig = columnConfigs[i];
				var column = table.createColumn(columnConfig.name, columnConfig.label);
				propertyGrid.addColumn(column);
			}

			var items = [];
			for (var propName in data) {
				if (data.hasOwnProperty(propName)) {
					var propData = data[propName];
					items.push({label: propName, data: propData});
				}
			}

			propertyGrid.set("nodes", items);
		},
		getCellEditor: function (data, column) {
			var nid = column.get("name"),
				node = $model.findNode(nid),
				propertyName = data.get("propertyName"),
				parentTreeNode = data._node.get("parent"),
				parentName = parentTreeNode.get("label");

			var rid = $nodeHelper.positionRuleId(node);
			return  cloudo.propertyEditor.get(rid, propertyName, parentName, {
				node: node, propertyType: cloudo.propertyEditor.propertyTypes.POSITION
			});
		}

	});


})();