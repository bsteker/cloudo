/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-13
 * Time: 上午11:05
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var CLASS_NAME = "cloudo.widget.TraditionValueEditor",
		TEMPLATE = {
			any: {
				name: "Michael", age: 32,
				address: {
					city: "Beijing", street: " Chaoyang Road ",
					postcode: 100025
				},
				email: ["michael@gmail.com", "michael@126.com"],
				books: [
					{ name: "Spring in Action", ISBN: "978-7-123-37004-8" },
					{ name: "Professional Jquery", ISBN: "978-7-133-37014-7" }
				]
			},
			pojo: {
				name: "Michael", age: 32,
				address: {
					city: "Beijing", street: " Chaoyang Road ",
					postcode: 100025
				},
				books: [
					{name: "Spring in Action", ISBN: "978-7-123-37004-8"},
					{name: "Professional Jquery", ISBN: "978-7-133-37014-7"}
				]
			},
			"collection[pojo]": [
				{ name: "image1", icon: ">skin>common/icon1.gif" },
				{ name: "image2", icon: ">skin>common/icon2.gif" },
				{ name: "image3", icon: ">skin>common/icon3.gif" }
			],
			"collection[any]": [
				"Michael", 27, true,
				{
					city: "Beijing",
					street: " Chaoyang Road ",
					postcode: 100025
				}
			]
		},
		excludeValidateTyps = ["any", "array[string]" , "multilines"];

	function validate(propertyName, editorType, code) {
		var result = {
			state: true,
			text: "格式正确！"
		};

		if (excludeValidateTyps.indexOf(editorType) >= 0) {
			return result;
		}

		if (code) {
			try {
				var value = dorado.JSON.parse(code);
				switch (editorType) {
					case "collection[pojo]":
					{
						if (!$.isArray(value)) {
							result.state = false;
							result.text = "格式有误！根节点只能是Collection类型!";
						} else {
							for (var k in value) {
								if (value.hasOwnProperty(k) && !(value[k] instanceof Object)) {
									result.state = false;
									result.text = "格式有误！Collection元素只能是Entity类型!";
									break;
								}
							}
						}
						break;
					}
					case "collection[any]":
					{
						if (!$.isArray(value)) {
							result.state = false;
							result.text = "格式有误！根节点只能是Collection类型!";
						}
						break;
					}
					case  "pojo":
					{
						if ($.isArray(value)) {
							result.state = false;
							result.text = "格式有误！根节点不能是Collection类型!";
						}
						break;
					}
				}
			}
			catch (e) {
				if (propertyName !== "mapValues") {
					result.state = false;
					result.text = "格式有误！不支持简单类型";

				}


			}
		}
		return result;
	};

	/***
	 * 编辑Tradition值的组装控件
	 *
	 */
	var CodeDialogEditor = $extend(dorado.widget.Dialog, {
		$className: "CodeEditor",
		ATTRIBUTES: {
			code: {
				getter: function () {
					var editor = this._jsonEditor;
					return editor.get("code");
				},
				setter: function (code) {
					var editor = this._jsonEditor;
					editor.set("code", code);
					this._code = code;
				}
			},
			textEditor: {}, editorType: {}
		},

		constructor: function (config) {
			var editor = this, toolbar = this._createToolBar(), jsonEditor = new cloudo.widget.JSONEditor();
			config = config || {};
			var addConfig = {
				height: 350, width: 500, maximizeable: true, modalType: "transparent",
				closeable: true, center: true, animateType: "none",
				iconClass: "fa fa-credit-card",
				children: [toolbar, jsonEditor],
				buttons: [
					{
						$type: "Button", caption: "确定",
						iconClass: "fa fa-check-circle",
						onClick: function () {
							editor.post();
						}
					},
					{
						$type: "Button", caption: "取消",
						iconClass: "fa fa-times-circle",
						onClick: function () {
							editor.cancel();
						}
					}
				],
				onShow: function (self) {
					self._updateEditor();
					this._destroyed = false;
				}
			}


			cloudo.Toolkits.merge(config, addConfig);
			$invokeSuper.call(this, [config]);

			this._jsonEditor = jsonEditor;

		},

		_createToolBar: function () {
			var editor = this;
			var toolbar = new dorado.widget.ToolBar({
				items: [
					{
						$type: "ToolBarButton", caption: "撤销",
						iconClass: "fa fa-reply",
						onClick: function () {
							editor._jsonEditor.undo();
						}
					},
					{
						$type: "ToolBarButton", caption: "重做",
						iconClass: "fa fa-share",
						onClick: function () {
							editor._jsonEditor.redo();
						}
					},
					{
						$type: "Separator"
					},
					{
						$type: "toolbar.Button", caption: "校验", hideMode: "display",
						iconClass: "fa fa-check",
						onClick: function () {
							var result = editor.validate();
							if (result.state) {
								dorado.widget.NotifyTipManager.notify("校验通过！");
							} else {
								dorado.MessageBox.alert(result.text, {});
							}
						}
					},
					{
						$type: "toolbar.Button", caption: "格式化", hideMode: "display",
						iconClass: "fa fa-bars",
						onClick: function () {
							editor.format();
						}
					},
					{
						$type: "toolbar.Button", caption: "清空",
						iconClass: "fa fa-eraser",
						onClick: function () {
							editor.clear();
						}
					},
					{
						$type: "Fill"
					},
					{
						$type: "toolbar.Button", caption: "帮助",
						iconClass: "fa fa-question-circle",
						onClick: function () {
							editor.showHelp();
						}
					}
				],
				layoutConstraint: {type: "top"}
			});
			return toolbar;
		},
		_updateEditor: function () {
			var code = this.get("code"), jsonEditor = this.getJSONEditor();
			jsonEditor.set("code", code);
			jsonEditor.update();
		},
		getJSONEditor: function () {
			return this._jsonEditor;
		},
		getCode: function () {
			var jsonEditor = this.getJSONEditor();
			return jsonEditor.get("code");
		},
		commit: function (value) {
			var textEditor = this.get("textEditor"),
				propertyType = textEditor.get("propertyType"),
				propertyName = textEditor.get("name"),
				parentName = textEditor.get("parentName"),
				node = textEditor.get("node");
			var property = new cloudo.model.Property(propertyName, value);
			var sendFn = cloudo.viewConfig["set" + propertyType + "Property"];
			sendFn(node, property, parentName);
			this.close();
		},
		cancel: function () {
			var editor = this;
			var code = editor._code;
			editor.getJSONEditor().set("code", code);
			editor.post();
		},
		post: function () {
			var code = this.getCode(),
				textEditor = this.get("textEditor"),
				value;
			var validateMSG = this.validate(code), editorType = this.get("editorType");

			if (validateMSG.state) {
				if (code) {
					if (excludeValidateTyps.indexOf(editorType) >= 0) {
						value = code;
					} else {
						try {
							value = dorado.JSON.parse(code);
						} catch (e) {
							value = code;
						}
					}
					if (value && value instanceof Object && !(value instanceof Date)) {
						value = $.isArray(value) ? cloudo.Parser.parseCollection(value) : cloudo.Parser.parseEntity(value);
					}
				}
				if (textEditor.get("visible")) {
					textEditor.set("value", code);
				}
				this.commit(value);
			} else {
				dorado.MessageBox.alert(validateMSG.text, {});
			}
		},
		format: function () {
			var jsonEditor = this.getJSONEditor(), code = this.getCode();
			try {
				code && jsonEditor.set("code", JSON.stringify(dorado.JSON.parse(code), null, 5));
			} catch (e) {
				console.log(e);
			}
		},
		validate: function () {
			var code = this.getCode(), editorType = this.get("editorType");
			var textEditor = this.get("textEditor"),
				propertyName = textEditor.get("name");

			return validate(propertyName, editorType, code);
		},
		showHelp: function () {
			var editor = this, tip = editor._helpTip, editorType = editor.get("editorType");
			if (!tip) {
				tip = new dorado.widget.Tip({closeable: true});
				this.addChild(tip);
				this._helpTip = tip;
			}
			tip.set({
				align: "right", anchorTarget: editor,
				content: $DomUtils.xCreate({
					tagName: "PRE",
					contentText: JSON.stringify(TEMPLATE[editorType] || "内容格式为：" + editorType, null, 5)
				})
			});
			tip.show();
		},
		clear: function () {
			this.getJSONEditor().set("code", "");
		}

	});
	var codeDialogEditor = new CodeDialogEditor();


	cloudo.widget.TraditionValueEditor = $extend([dorado.widget.TextArea, cloudo.widget.AbstractPropertyEditor], {
		$className: CLASS_NAME,
		constructor: function (config) {
			var config = config || {}, listener = config.listener || {};
			config.autoPost = false;
			listener.onDoubleClick = function (self) {
				var trigger = self.get("trigger");
				trigger.execute(self);
			};

			config.listener = listener;
			config.trigger = {
				iconClass: "d-trigger-icon-custom",
				$type: "Trigger", editable: false,
				onExecute: function (self, arg) {
					var editor = arg.editor , caption = "",
						node = editor.get("node"), code = editor.get("value"), name = editor.get("name"),
						propertyMeta = cloudo.Rule.getProperty(editor.get("rid"),
							name, editor.get("parentName")),
						editorType = propertyMeta.editorType;

					if (!codeDialogEditor.get("view")) {
						cloudo.view.addChild(codeDialogEditor);
					}

					if (node) {
						caption += node.parseLabel() + ":"
					}
					caption += name;

					codeDialogEditor.set({
						caption: caption, code: code,
						textEditor: editor, editorType: editorType
					});
					codeDialogEditor.show();
				}
			};

			$invokeSuper.call(this, [config]);

		}

	});


	cloudo.propertyEditor.register("editorType[tradition]", CLASS_NAME);

})
();