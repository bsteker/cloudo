(function() {
	function parseDepends(mode) {
		var depends = "cloudo-ace-mode-" + mode;

		if (mode == "javascript") {
			depends += ",cloudo-ace-javascript-support-js";
		}
		if (mode == "html") {
			depends += ",cloudo-ace-html-support-js";
		}

		return depends;
	}
	require("ace/edit_session").EditSession.prototype.$startWorker = function() {
	}

	/**
	 * @author Alex Tong (mailto:alex.tong@bstek.com)
	 * @component Form
	 * @class 源代码编辑器
	 * @extends dorado.widget.Control
	 */
	dorado.widget.AceEditor = $extend(
			dorado.widget.Control,
			/** @scope dorado.widget.AceEditor.prototype */
			{
				$className : 'dorado.widget.AceEditor',
				ATTRIBUTES : /** @scope dorado.widget.AceEditor.prototype */
				{
					/**
					 * 编辑区域初始值,只允许在编辑器未初始化时赋值一次。
					 * 
					 * @attribute
					 * @type String
					 * @default ''
					 */
					value : {
						defaultValue : "",
						writeBeforeReady : true,
						getter : function() {
							var value = this.getValue();
							this._value = value;
							return value;
						}
					},

					/**
					 * 语法加亮的语言
					 * 
					 * @attribute
					 * @type String
					 */
					mode : {
						defaultValue : "javascript"
					},

					/**
					 * 主题风格
					 * 
					 * @attribute
					 * @type String
					 * @default "default"
					 */
					theme : {
						defaultValue : "cloudo"
					},

					/**
					 * Tab的宽度
					 * 
					 * @attribute
					 * @type Integer
					 * @default 4
					 */
					tabSize : {
						defaultValue : 4
					}

				},
				EVENTS : /** @scope dorado.widget.AceEditor.prototype */
				{
					/**
					 * 当Dom模型被更新时触发此事件
					 * 
					 * @param {Object}
					 *            self 事件的发起者，即组件本身
					 * @param {Object}
					 *            arg 事件参数
					 * @param {Object}
					 *            arg.instance codemirror对象
					 * 
					 * @event
					 */
					onChange : {}
				},

				createDom : function() {
					var doms = {};
					var dom = $DomUtils.xCreate({
						content : [ {
							tagName : "pre",
							contextKey : "editor",
							style : {
								margin : 0,
								position : "absolute",
								top : 0,
								bottom : 0,
								left : 0,
								right : 0
							}
						}, {
							tagName : "div",
							contextKey : "statusBar",
							className:"ace-editor-statusBar"
						} ]
					}, null, doms);
					this._doms = doms;
					return dom;
				},
				/**
				 * 根据控件自身的属性设定来刷新DOM对象。
				 * <p>
				 * 此方法会在控件每一次被刷新时调用，因此那些设置DOM对象的颜色、字体、尺寸的代码适合放置在此方法中。
				 * </p>
				 * 
				 * @param {HTMLElement}
				 *            dom 控件对应的DOM对象。
				 */
				refreshDom : function(dom) {
					$invokeSuper.call(this, [ dom ]);
					this.refreshSourceEditor();
				},
				refreshSourceEditor : function() {
					var aceEditor = this;
					var sourceEditor = this._editor, langTools = this._langTools, mode = this._mode
							|| "javascript", theme = "ace/theme/"
							+ (this._theme || "cloudo");
					if (sourceEditor) {
						sourceEditor.setTheme(theme);
						var oldMode = sourceEditor.session.getMode();
						if (oldMode != mode) {
							$import(
									parseDepends(mode),
									function() {
										sourceEditor.session
												.setMode("ace/mode/" + mode);

										if (aceEditor._mode == "javascript") {
											var TernServer = ace
													.require("ace/tern/server").TernServer;
											var defs = [ ternDefsChai,
													ternDefsBrowser,
													ternDefsEcma5,
													ternDefsJquery,
													ternDefsUnderscore,
													ternDefsDorado ];
											var ternServer = new TernServer({
												defs : defs
											});
											langTools.addCompleter(ternServer);
										}

										if (aceEditor._mode == "html") {
											sourceEditor.setOption(
													"enableEmmet", true);
										}
									});

						}
						sourceEditor.on("change", function() {
							dorado.Toolkits.cancelDelayedAction(aceEditor,
									"$editorChangeTimerId");
							dorado.Toolkits.setDelayedAction(aceEditor,
									"$editorChangeTimerId", function() {
										aceEditor.fireEvent("onChange",
												aceEditor, arguments);
									});
						});
					}
				},
				/**
				 * File Path 解析 Mode
				 * 
				 * @param filePath
				 * @returns {*}
				 */
				parseMode : function(filePath) {
					var modeList = require("ace/ext/modelist");
					return modeList.getModeForPath(filePath);
				},
				getEditor : function() {
					return this._editor;
				},
				onReady : function() {
					var sourceEditor = ace.edit(this._doms.editor);
					this._editor = sourceEditor;
					$invokeSuper.call(this);
					sourceEditor.session.setValue(this._value);
					var langTools = require("ace/ext/language_tools");
					this._langTools = langTools;
					sourceEditor.setOptions({
						enableBasicAutocompletion : true,
						enableSnippets : true,
						enableLiveAutocompletion : true,
						showPrintMargin:false
					});
					var StatusBar = ace.require("ace/ext/statusbar").StatusBar;
					new StatusBar(sourceEditor, this._doms.statusBar);
		
					sourceEditor.commands
							.addCommands([
									{
										name : "increaseFontSize",
										bindKey : "Ctrl-=|Ctrl-+",
										exec : function(editor) {
											var size = parseInt(editor
													.getFontSize(), 10) || 12;
											editor.setFontSize(size + 1);
										},
										readOnly: true
									},
									{
										name : "decreaseFontSize",
										bindKey : "Ctrl+-|Ctrl-_",
										exec : function(editor) {
											var size = parseInt(editor
													.getFontSize(), 10) || 12;
											editor.setFontSize(Math
													.max(size - 1 || 1));
										},
										readOnly: true
									}, {
										name : "resetFontSize",
										bindKey : "Ctrl+0|Ctrl-Numpad0",
										exec : function(editor) {
											editor.setFontSize(12);
										},
										readOnly: true
									} ]);
					this.refreshSourceEditor();

				},
				/**
				 * 返回编辑器的内容
				 * 
				 * @function
				 */
				getValue : function() {
					return this._editor.getValue();
				},
				/**
				 * 设置编辑器的内容
				 * 
				 * @function
				 */
				setValue : function(val) {
					this._editor.setValue(val);
				},
				/**
				 * 编辑器获得焦点
				 * 
				 * @function
				 */
				focus : function() {
					this._editor.focus();
				},
				getUndoManager : function() {
					return this._editor.getSession().getUndoManager();
				}

			});

})();