/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-12-3
 * Time: 上午10:05
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var RID = "DataGrid", COLUMN_RID = "DataColumn", CLASS_NAME = "cloudo.wizard.DataGrid";
	cloudo.wizard.DataGrid = $extend(cloudo.wizard.AbstractWizard, {
		$className: CLASS_NAME, rid: RID,
		ATTRIBUTES: {
			node: {
				setter: function (node) {
					this._node = node;
					this.refreshPropertyEditor();
					this.refreshColumns();
				}
			}
		},
		constructor: function (config) {
			var wizard = this,
				icon = cloudo.Constant.ICON_URL_PREFIX + cloudo.Rule.getIcon(RID);
			config = config || {};

			cloudo.Toolkits.merge(config, {
				layout: {
					$type: "Dock", regionPadding: 10
				}, closeable: true,
				buttons: [
					{
						$type: "Button", caption: "确定",
						iconClass: "fa fa-check-circle",
						onClick: function () {
							wizard.post();
						}
					},
					{
						$type: "Button", caption: "取消",
						iconClass: "fa fa-times-circle",
						onClick: function () {
							wizard.close();
						}
					}
				],
				children: [
					this._buildPropsEditor(),
					this._buildColumnSelector()
				],
				width: 520, height: 400, icon: icon,
				modal: false,
				caption: "DataGrid 创建导航", animateType: "none"

			}, false);

			$invokeSuper.call(this, [config]);
		},
		_buildPropsEditor: function () {
			var wizard = this;

			function formElOnCreate(self) {
				var formElement = self, name = formElement.get("property"), node = wizard.get("node"),
					editor;
				editor = cloudo.propertyEditor.get(RID, name, null, {
					node: node,
					onPost: function (self, arg) {
						var value = self.get("value"), node = wizard.get("node");
						if (value) {
							var prop = new cloudo.model.Property(name, value);
							node.addProperty(prop)
						} else {
							node.removeProperty(name);
						}
						if (["dataSet", "dataType", "dataPath"].indexOf(name) >= 0) {
							wizard.refreshColumns();
						}
					}
				});
				formElement.set("editor", editor);
			}

			return new dorado.widget.Container({
				layout: {
					padding: 5
				},
//				style: {
//					background: "#f7f7f7", border: "1px #B6B6B6 solid"
//				},
				children: [
					{
						$type: "AutoForm", colPadding: 20, labelWidth: 60,
						showHint: false, labelSeparator: ":", createOwnEntity: true,
						elements: [
							{
								property: "dataSet", onCreate: formElOnCreate

							},
							{
								property: "autoCreateColumns", labelWidth: 140, onCreate: formElOnCreate
							},
							{
								property: "dataPath", onCreate: formElOnCreate,
								layoutConstraint: {
									colSpan: 2
								}
							},
							{
								property: "dataType", onCreate: formElOnCreate,
								visible: false
							}

						],
						onCreate: function (self, arg) {
							wizard.propertyEditor = self;
						}
					}
				]});
		},

		_buildColumnSelector: function () {
			var wizard = this;

			function buildConfig(caption, layoutConstraint, listener) {
				return  {
					width: 200, caption: caption, $type: "Panel",
					children: [
						{
							showHeader: false, $type: "Grid",
							dragMode: "item", dropMode: "insertItems",
							draggable: true, droppable: true,
							dragTags: "propItem", droppableTags: "propItem",
							selectionMode: "multiRows", readOnly: true,
							columns: [
								{ $type: "[]" },
								{ name: "name" }
							],
							listener: listener
						}
					],
					layout: {
						$type: "Dock", regionPadding: 1
					},
					layoutConstraint: layoutConstraint
				}
			}

			return  new dorado.widget.Container({
				children: [
					buildConfig("可选", {type: "left"}, {
						onCreate: function (self, arg) {
							wizard.propertiesBox = self;
						}
					}),
					{
						$type: "Container",
						children: [
							{
								caption: "全部添加", $type: "Button", userData: "addAllBtn",
								onClick: function () {
									var sourceBox = wizard.propertiesBox,
										targetBox = wizard.columnsBox,
										sourceItems = sourceBox.get("items");
									sourceBox.set("items", []);
									var targetItems = targetBox.get("items") || [];
									targetItems = targetItems.concat(sourceItems);
									targetBox.set("items", targetItems);
								}
							},
							{
								caption: "添加", $type: "Button", userData: "addBtn",
								onClick: function () {
									var sourceBox = wizard.propertiesBox,
										targetBox = wizard.columnsBox;
									var selection = sourceBox.get("selection"),
										sourceItems = sourceBox.get("items");
									for (var i = 0; i < selection.length; i++) {
										var item = selection[i];
										sourceItems.remove(item);
									}
									sourceBox.set("items", sourceItems);
									var targetItems = targetBox.get("items") || [];
									targetItems = targetItems.concat(selection);
									targetBox.set("items", targetItems);
								}
							},
							{
								caption: "删除", $type: "Button", userData: "removeAllBtn",
								onClick: function () {
									var targetBox = wizard.columnsBox,
										sourceBox = wizard.propertiesBox;

									var selection = targetBox.get("selection");

									var targetItems = targetBox.get("items");
									for (var i = 0; i < selection.length; i++) {
										var item = selection[i];
										targetItems.remove(item);
									}
									targetBox.set("items", targetItems);
									var sourceItems = sourceBox.get("items") || [];
									sourceItems = sourceItems.concat(selection);
									sourceBox.set("items", sourceItems);
								}
							},
							{
								caption: "全部删除", $type: "Button", userData: "removeBtn",
								onClick: function () {
									var targetBox = wizard.columnsBox,
										sourceBox = wizard.propertiesBox;
									var targetItems = targetBox.get("items");
									targetBox.set("items", []);
									var sourceItems = sourceBox.get("items") || [];
									sourceItems = sourceItems.concat(targetItems);
									sourceBox.set("items", sourceItems);
								}
							}
						],
						layout: {
							$type: "VBox", pack: "center", align: "center"
						},
						layoutConstraint: {
							type: "center"
						}
					},
					buildConfig("已选", {type: "right"}, {onCreate: function (self, arg) {
						wizard.columnsBox = self;
					}})
				],
				layout: {
					$type: "Dock"
				}
			});
		},
		compiledDataTypeProps: function () {
			var wizard = this, props = [], dataTypeName, dataTypeNode, dataSetId, dataPath;

			var entity = wizard.propertyEditor.get("entity");
			if (entity) {
				dataTypeName = entity.dataType, dataSetId = entity.dataSet, dataPath = entity.dataPath;
				if (!dataTypeName && dataSetId) {
					var dataSetNode = cloudo.model.findParentNode(dataSetId);
					if (dataSetNode) {
						dataTypeName = dataSetNode.getPropertyValue('dataType');
						if (dataPath) {
							dataTypeNode = cloudo.Toolkits.getDataPathDataType(dataTypeName, dataPath);
						}
					}
				}

				if (!dataTypeNode && dataTypeName) {
					if (/^\[.*\]$/.exec(dataTypeName)) {
						dataTypeName = dataTypeName.substring(1, dataTypeName.length - 1);
					}
					dataTypeNode = cloudo.Toolkits.getDataTypeByName(dataTypeName);
				}

				if (dataTypeNode) {
					function doPush(pNode) {
						var propDataType = pNode.getPropertyValue("dataType");

						if (/^\[.*\]$/.exec(propDataType)) {
							return;
						} else if (propDataType) {
							var dataTypeGroup = cloudo.Toolkits.parseDataTypeScope(propDataType);
							if (dataTypeGroup != "base") {
								return;
							}
						}

						var name = pNode.getPropertyValue("name");
						var label = pNode.getPropertyValue("label");
						if (name) {
							props.push({
								name: name,
								label: label
							});
						}
					}


					if (dataTypeNode) {
						var dataTypeParser = cloudo.dataType.find(dataTypeNode.rid);
						dataTypeParser.eachProperty(dataTypeNode, function (propertyNode) {
							if (propertyNode.rid.indexOf("Reference") < 0) {
								doPush(propertyNode);
							}
						});
					}

				}
			}
			wizard.dataTypeProps = props;
		},
		post: function () {
			var wizard = this,
				node = this.get("node"),
				parentNode = wizard.get("parentNode"),
				entity = wizard.propertyEditor.get("entity");
			$.each(entity, function (name, value) {
				if (value) {
					node.addProperty(new cloudo.model.Property(name, value));
				} else if (name == "dataSet") {
					node.addProperty(new cloudo.model.Property("createPrivateDataSet", true));
				}
			});

			var items = wizard.columnsBox.get("items");
			if (items) {
				for (var i = 0; i < items.length; i++) {
					var elementNode = cloudo.Toolkits.createNodeInstance(COLUMN_RID);
					var item = items[i], name = item.name, label = item.label;
					elementNode.addProperty(new cloudo.model.Property("caption", label));
					name && elementNode.addProperty(new cloudo.model.Property("property", name))
					node.addNode(elementNode);
				}
			}

			if (parentNode && $nodeHelper.canPaste(parentNode, node)) {
				cloudo.viewConfig.addNode(node, parentNode);
			}

			wizard.close();
		},
		refreshColumns: function () {
			var wizard = this;
			wizard.compiledDataTypeProps();
			wizard.propertiesBox.set("items", wizard.dataTypeProps);
			wizard.columnsBox.set("items", []);
		},
		refreshPropertyEditor: function () {
			var propertyEditor = this.propertyEditor, node = this.get("node");
			propertyEditor.get("elements").each(function (element) {
				var editor = element.get("editor"),
					name = element.get("property"),
					value = node.getPropertyValue(name);
				if (!value) {
					value = cloudo.Rule.getPropertyDefaultValue(RID, name);
				}
				editor.set({node: node, value: value});
			});
		}
	});
	cloudo.plugins.register(cloudo.plugins.type.WIZARD, {
		rid: RID,
		factory: function (config) {
			return new cloudo.wizard.DataGrid(config);
		},
		description: "DataGrid单开编辑器……"
	});
})();