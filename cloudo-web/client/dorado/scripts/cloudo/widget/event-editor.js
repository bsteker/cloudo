/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-6
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var KEY_DOM = $DomUtils.xCreate([
		{
			tagName: "FieldSet",
			content: [
				{tagName: "Legend", contentText: "API提示"},
				{tagName: "Strong", contentText: "Shift-Space"},
				{tagName: "Strong", contentText: "Ctrl-/"},
				{tagName: "Strong", contentText: "Ctrl-."},
				{tagName: "Strong", contentText: "Alt-/"}
			]
		},
		{
			tagName: "FieldSet", style: "margin-top: 10px;",
			content: [
				{tagName: "Legend", contentText: "事件保存"},
				{tagName: "Strong", contentText: "Ctrl-S"}
			]
		}
	]);

	cloudo.widget.EventEditor = $extend(cloudo.widget.Layer, {
		$className: "cloudo.widget.EventEditor",
		ATTRIBUTES: {
			showCaptionBar: {
				defaultValue: true
			},
			code: {
				defaultValue: "", skipRefresh: true,
				getter: function () {
					var editor = this._codeEditor, code = editor.get("code");
					this._code = code;
					return code;
				},
				setter: function (code) {
					var editor = this._codeEditor;
					editor.set("code", code || "");
					this._code = code;
				}
			},
			signature: {
				defaultValue: "self,arg", skipRefresh: true,
				setter: function (signature) {
					this._signature = signature;
					this._signatureEditor.set("value", signature);
				},
				getter: function () {
					var editor = this._signatureEditor;
					var signature = editor.get("text");
					signature = signature || "self,arg";
					return signature;
				}
			},
			name: {}, node: {}
		},
		constructor: function (config) {
			var eventEditor = this, codeEditor, signatureEditor, toolBar, helpLayer;
			config = config || {};
			codeEditor = new cloudo.widget.JavaScriptEditor();
			signatureEditor = this._buildSignatureEditor();
			helpLayer = this._buildHelpLayer();
			var toolBar = new dorado.widget.ToolBar({
				items: [
					{$type: "Label", width: 20},
					{$type: "Label", width: 40, text: "参数"},
					signatureEditor,
					{$type: "Fill"},
					{$type: "ToolBarButton",caption: "格式化",iconClass:"fa fa-indent", onClick: codeEditor.codeFormat.bind(codeEditor)},
					{$type: "ToolBarButton",caption: "查找",iconClass:"fa fa-search", onClick: codeEditor.codeSearch.bind(codeEditor)},
					{$type: "ToolBarButton",caption: "替换",iconClass:"fa fa-retweet", onClick: codeEditor.codeReplace.bind(codeEditor)},
					{$type: "ToolBarButton",caption: "重命名", iconClass:"fa fa-magic",onClick: codeEditor.codeRename.bind(codeEditor)},
					{$type: "ToolBarButton",caption: "跳至定义处", iconClass:"fa fa-level-up",onClick: codeEditor.codeJumpToDef.bind(codeEditor)}
				]
			});

			this._codeEditor = codeEditor;
			this._toolBar = toolBar;
			this._signatureEditor = signatureEditor;

			cloudo.Toolkits.merge(config, {children: [ toolBar, codeEditor , helpLayer]}, false);
			$invokeSuper.call(this, [config]);
			this.addListener("onReady", function () {
				codeEditor.getCodeMirror().on("blur", function () {
					eventEditor.post();
				});
				codeEditor.getCodeMirror().addKeyMap({
                    "Ctrl-S": function () {
                        eventEditor.post();
                    }
                })
			});

		},
		getCodeEditor: function () {
			return this._codeEditor;
		},
		_buildSignatureEditor: function () {
			var eventEditor = this;
			var tagChange = function (self, arg) {
				var code = eventEditor.get("code") || "";
				eventEditor.set({
					signature: self.get("text"),
					code: code
				});
				eventEditor.update();
			}

			return  new dorado.widget.TagListEditor({
				width: 400,
				availableTags: ["self", "arg"],
				requiredTags: ["self", "arg"],
				listener: {
					onPost: tagChange
				}
			});
		},
		show: function (options) {
			$invokeSuper.call(this, arguments);
			var editor = this;
			setTimeout(function () {
				editor.update();
			}, 400);
		},
		_buildHelpLayer: function () {
			var layer = new cloudo.widget.Layer({
				direction: "right", height: "100%", width: 300,
				caption: "帮助", iconClass: "fa fa-flash",
				maximizeable: true, closeable: true,
				children: [
					{
						$type: "TabControl",
						tabs: [
							{
								$type: "Control", caption: "快捷键",
								control: {
									$type: "Container", exClassName: "c-help",
									layout: {
										$type: "Dock", padding: 10
									},
									children: [
										{
											$type: "HtmlContainer", content: KEY_DOM,
											layoutConstraint: {
												type: "top"
											}
										}
									]
								}
							},
							{$type: "Control", caption: "API"}
						]
					}
				]
			});

			return layer;
		},

		_buildContextVars: function () {
			var node = this.get("node"),
				selfType = cloudo.Rule.getJsPrototype(node.rid),
				signature = this.get("signature"),
				viewNode = cloudo.viewConfig.getViewNode(),
				contextVars = {
					self: {nid: node.id, rid: node.rid, jsPrototype: selfType},
					view: {nid: viewNode.id, rid: viewNode.rid, jsPrototype: "dorado.widget.View"}
				};

			if (signature) {
				signature.split(",").each(function (argName) {
					if ("self" !== argName && "arg" !== argName) {
						var argNode = cloudo.model.findParentNode(argName);
						if (argNode) {
							contextVars[argName] = {nid: argNode.id, rid: argNode.rid,
								jsPrototype: cloudo.Rule.getJsPrototype(argNode.rid)
							};
						}
					}
				});
			}
			return contextVars;
		},
		update: function () {
			var codeEditor = this._codeEditor, signatureEditor = this._signatureEditor;
			var code = this.get('code');
			codeEditor.set({code: code});

			var contextVars = this._buildContextVars();
			codeEditor.set("contextVars", contextVars);
			codeEditor.update();

			var controlIDs = cloudo.Toolkits.getControlIds();
			var sigs = controlIDs.concat(['self', 'arg']);


			signatureEditor.set({
				availableTags: sigs,
				value: this._signature
			});
			this._toolBar.set('visible', !!this.get('node'));
		},
		post: function () {
			var code = this.get("code"), name = this.get("name"), node = this.get("node"),
				signature = this.get("signature");

			var event = new cloudo.model.Event(name, signature, code);
			cloudo.viewConfig.addEvent(node, event);
		}

	});
})();


