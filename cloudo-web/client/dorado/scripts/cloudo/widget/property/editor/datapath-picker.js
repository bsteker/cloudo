/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-3-17
 * Time: 上午11:07
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var CLASS_NAME = "cloudo.widget.DataPathPicker";

	function parseDataTypeName(node) {
		var dataTypeName = node.getPropertyValue("dataType");
		if (!dataTypeName) {
			var dataSetId = node.getPropertyValue("dataSet");
			var dataSetNode = cloudo.model.findParentNode(dataSetId);
			if (dataSetNode) {
				dataTypeName = dataSetNode.getPropertyValue("dataType");
			}
		}
		return dataTypeName;
	}

	function getNodes(name) {
		var dtNode, dtName , nodes = [];
		if (name) {
			if (/^\[.*\]$/.exec(name)) {
				dtName = name.substring(1, name.length - 1);
			} else {
				dtName = name;
			}
			dtNode = cloudo.Toolkits.getDataTypeByName(dtName);
		}

		var dtParser = cloudo.dataType.find(dtNode.rid);
		dtParser && dtParser.eachProperty(dtNode, function (propertyNode) {
			var node = propertyNode, propName = node.getPropertyValue("name"),
				userData = {name: propName}, hasChild = false,
				propDataType = node.getPropertyValue("dataType");
			if (propName) {
				if (/^\[.*\]$/.exec(propDataType)) {
					hasChild = true;
				} else if (propDataType) {
					var dataTypeGroup = cloudo.Toolkits.parseDataTypeScope(propDataType);
					hasChild = dataTypeGroup !== "base";
				}

				userData.dataType = propDataType;
				nodes.push({
					hasChild: hasChild,
					label: userData.name,
					userData: userData
				});
			}
		});

		return nodes;
	}

	var DataPathDropDown = $extend(dorado.widget.CustomDropDown, {
		$className: CLASS_NAME,
		constructor: function (config) {
			var config = config || {};
			config.control = new dorado.widget.Tree({
				beforeExpand: function (self, arg) {
					var node = arg.node;
					if (node.get("nodes").size) {
						arg.callDefault(true);
					} else {
						setTimeout(function () {
							var data = node.get("userData"),
								dataType = data.dataType;
							var nodes = getNodes(dataType);
							node.set("nodes", nodes);
							arg.callDefault && arg.callDefault(true);
						}, 100);
					}
				},
				onRenderNode: function (self, arg) {
					var node = arg.node, level = node.get("level"),
						userData = node.get("userData"), $dom = $(arg.dom);
					$dom.empty().xCreate([
						{
							tagName: "SPAN",
							contentText: arg.label
						},
						{
							tagName: "SPAN", style: "color:#bbbbbb",
							contentText: " _ " + userData.dataType
						}
					]);
				},
				onDataRowDoubleClick: function (self) {
					var control = self, nodeIsList = true, root = control.get("root"), path = null,
						currentNode = control.get("currentNode"), parentNode = currentNode;

					while (parentNode && parentNode !== root) {
						var userData = parentNode.get("userData"),
							dataType = userData.dataType, name = userData.name || "";

						path = name + (path ? ("." + path) : "");

						if ((!nodeIsList && currentNode === parentNode && /^\[.*\]$/.exec(dataType)) || (/^\[.*\]$/.exec(dataType) && currentNode !== parentNode)) {
							path = "#" + path;
						}
						parentNode = parentNode.get("parent");
					}

					dorado.widget.DropDown.findDropDown(control).close(path);
				}
			});
			$invokeSuper.call(this, [config]);
		}
	});

	cloudo.widget.DataPathPicker = $extend(cloudo.widget.DefaultPropertyEditor, {
		$className: "cloudo.widget.DataTypeSelector",
		constructor: function (config) {
			var config = config || {};
			$invokeSuper.call(this, [config]);
			var trigger = new DataPathDropDown({
				height: 300, autoOpen: true,
				onOpen: function (self, arg) {
					var editor = arg.editor, node = editor.get("node"),
						dataType = parseDataTypeName(node), tree;
					if (dataType) {
						tree = self.get("control");
						tree.set("nodes", [
							{
								label: dataType, hasChild: true,
								userData: {
									dataType: dataType
								}
							}
						]);

						var firstNode = tree.get("firstNode");
						firstNode && firstNode.expand();
					}

				}});
			this.set("trigger", trigger);
		}
	});
	cloudo.propertyEditor.register("name[dataPath]", CLASS_NAME);
	cloudo.propertyEditor.register("rid[UpdateItem].name[dataPath]", "cloudo.widget.EnumValueEditor");
})();