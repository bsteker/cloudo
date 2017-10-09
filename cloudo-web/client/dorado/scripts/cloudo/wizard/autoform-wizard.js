/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-12-3
 * Time: 上午10:05
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var RID = "AutoForm", CLASS_NAME = "cloudo.wizard.AutoForm";
	cloudo.wizard.AutoForm = $extend(cloudo.wizard.AbstractWizard, {
		$className: CLASS_NAME, rid: RID,
		constructor: function (config) {
			var wizard = this,
				icon = cloudo.Constant.ICON_URL_PREFIX + cloudo.Rule.getIcon(RID);
			config = config || {};

			cloudo.Toolkits.merge(config, {
				layout: {
					$type: "Dock", regionPadding: 10
				},
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
					this._buildElementSelector()
				],
				width: 520, height: 400, icon: icon,
				modal: false, closeable: true,
				caption: "AutoForm 创建导航", animateType: "none",
				onShow: function () {
					wizard.refreshPropertyEditor();
					wizard.refreshElements();
				}
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
							wizard.refreshElements();
						}
					}
				});

				formElement.set("editor", editor);
			}

			return new dorado.widget.Container({
				layout: {
					padding: 5
				},
//                style: {
//                    background: "#f7f7f7", border: "1px #B6B6B6 solid"
//                },
				children: [
					{
						$type: "AutoForm", colPadding: 20, labelWidth: 60,
						showHint: false, labelSeparator: ":", createOwnEntity: true,
						elements: [
							{
								property: "dataSet", onCreate: formElOnCreate

							},
							{
								property: "dataType", onCreate: formElOnCreate
							},
							{
								property: "dataPath", onCreate: formElOnCreate,
								layoutConstraint: {
									colSpan: 2
								}
							},
							{
								property: "cols", onCreate: formElOnCreate
							},
							{
								property: "autoCreateElements", labelWidth: 140, onCreate: formElOnCreate
							}
						],
						onCreate: function (self, arg) {
							wizard.propertyEditor = self;
						}
					}
				]});
		},

		_buildElementSelector: function () {
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
//								,
//								{ name: "label" }
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
										targetBox = wizard.elementsBox,
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
										targetBox = wizard.elementsBox;
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
									var targetBox = wizard.elementsBox,
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
									var targetBox = wizard.elementsBox,
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
						wizard.elementsBox = self;
					}})
				],
				layout: {
					$type: "Dock"
				}
			});
		},
		compiledDataTypeProps: function () {
			var wizard = this, props = [], dataTypeName, dataTypeNode, dataSetId, dataPath;
			wizard.propertyEditor.get("elements").each(function (el) {
				el.get("editor").post();
			});

			var entity = wizard.propertyEditor.get("entity");


			if (entity) {
				dataTypeName = entity.dataType, dataSetId = entity.dataSet, dataPath = entity.dataPath;
				if (!dataTypeName && dataSetId) {
					var dataSetNode = cloudo.model.findParentNode(dataSetId);
					if (dataSetNode) {
						dataTypeName = dataSetNode.getPropertyValue("dataType");
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
			var wizard = this, elementRule = "AutoFormElement",
				node = this.get("node"), newNode = node,
				entity = wizard.propertyEditor.get("entity");

			if (wizard.get("operationType") !== cloudo.wizard.OPERATION_TYPE.NEW) {
				newNode = newNode.clone();
			}

			$.each(entity, function (name, value) {
				if (value) {
					newNode.addProperty(new cloudo.model.Property(name, value));
				} else if (name == "dataSet") {
					newNode.addProperty(new cloudo.model.Property("createPrivateDataSet", true));
				}
			});

			var items = wizard.elementsBox.get("items");
			if (items) {
				for (var i = 0; i < items.length; i++) {
					var elementNode = cloudo.Toolkits.createNodeInstance(elementRule);
					var item = items[i], name = item.name, label = item.label;
					elementNode.addProperty(new cloudo.model.Property("label", label));
					name && elementNode.addProperty(new cloudo.model.Property("property", name))
					newNode.addNode(elementNode);
				}
			}

			wizard.doPost(node, newNode);
			wizard.close();
		},
		refreshElements: function () {
			var wizard = this;
			wizard.compiledDataTypeProps();
			var props = wizard.dataTypeProps;


			var node = this.get("node"), elements = [];
			node.allNode().each(function (e) {
				if (e.rid === "AutoFormElement") {
					var property = e.getPropertyValue("property");
					if (property) {
						props.each(function (prop) {
							if (prop.name === property) {
								elements.push(prop);
								props.remove(prop);
								return false;
							}
						})
					}
				}
			});

			wizard.propertiesBox.set("items", props);
			wizard.elementsBox.set("items", elements);
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
	})
	;
	cloudo.plugins.register(cloudo.plugins.type.WIZARD, {
		rid: RID,
		factory: function (config) {
			return new cloudo.wizard.AutoForm(config);
		},
		description: "AutoForm单开编辑器……"
	});

})
();