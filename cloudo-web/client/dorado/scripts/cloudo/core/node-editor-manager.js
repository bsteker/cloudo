/**
 * Cloudo 编辑器管理器
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-11-15
 * Time: 下午2:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var SourceView = $extend([cloudo.widget.CodeMirror, cloudo.widget.AbstractNodeEditor], {
		$className: "cloudo.widget.TreeEditor",
		ATTRIBUTES: {
			mode: {
				defaultValue: "xml"
			}
		},
		constructor: function (config) {
			var node;
			config = config || {};
			if (config.node) {
				node = config.node;
				delete config["node"]
			}

			$invokeSuper.call(this, [config]);
			node && this.init(node);
		},
		_initCodeMirror_: function (cm) {
			cm.setOption("lineWrapping", true);
			cm.setOption("extraKeys", {"Ctrl-Q": function (cm) {
				cm.foldCode(cm.getCursor());
			}});
			cm.setOption("foldGutter", true);
			cm.setOption("gutters", ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]);
		},
		init: function (node) {
			this._node = node;
			this.reload();
		},
		refreshNode: function () {
			this.reload();
		},
		replaceProperty: function () {
			this.reload();
		},
		reload: function () {
			var str = cloudo.portal.jsonToXml();
			this.set("value", str);
		},
		addNode: function () {
			this.reload();
		},
		removeNode: function () {
			this.reload();
		},
		moveNode: function () {
			this.reload();
		}
	});

	var manager = {
		init: function (view) {
			var viewConfig = cloudo.viewConfig,
				tabControl = this._buildTabControl(),
				rootNode = viewConfig.getRoot(), editorMap;
			var isModel = viewConfig.isModel();

			editorMap = {
				treeEditor: new cloudo.widget.TreeEditor(),
				sourceView: new SourceView({readOnly: true})
			};

			manager._editorMap = editorMap;

			tabControl.addTab(this._buildTab(rootNode, editorMap.treeEditor, "treeEditor"));
			if (!isModel) {
				editorMap.rootDraw = new cloudo.widget.DrawEditor({node: rootNode});
				tabControl.addTab(this._buildTab(rootNode, editorMap.rootDraw, "rootDraw"));
			}


			tabControl.addTab(new dorado.widget.tab.ControlTab({
				caption: "源文件", iconClass: "c-tab-icon fa fa-file-code-o",
				control: editorMap.sourceView, name: "sourceView"
			}));
			editorMap.treeEditor.init(rootNode);

			editorMap.sourceView.init(rootNode);
			this._current = editorMap.treeEditor;
			manager._tabControl = tabControl;
			manager._captionBar = this._buildCaptionBar();
			manager._breadcrumb = this._buildBreadcrumb();
			manager._container = this._buildContainer();
			with (manager._container) {
				addChild(manager._tabControl);
				addChild(manager._captionBar);
				addChild(manager._breadcrumb);
			}
			tabControl.set("currentTab", editorMap.treeEditor.tab);
			editorMap.treeEditor.tab.set({"iconClass": "c-tab-icon fa fa-sitemap", icon: "", caption: "结构树"});
			!isModel && editorMap.rootDraw.tab.set("caption", "可视化");

		},
		_buildContainer: function () {
			return  new dorado.widget.Container({
				layout: {
					$type: "Anchor"
				},
				contentOverflow: "hidden"
			});
		},
		_buildTabControl: function () {
			return new dorado.widget.TabControl({
				tabPlacement: "bottom",
				listener: {
					onTabChange: function (self, arg) {
						var tabName = arg.newTab.get("name");
						manager._setCurrent(tabName);
					}
				},
				layoutConstraint: {
					left: 0, top: 27,
					bottom: 0, right: 0
				}
			});
		},
		_buildCaptionBar: function () {
			return new dorado.widget.CaptionBar({
				layoutConstraint: {
					left: 0, top: 0, right: 0
				},
				buttons: [
					{
						$type: "SimpleIconButton", iconClass: "fa fa-wrench",
						menu: $actionBar.settingMenu, showTrigger: true
					},
					{
						$type: "SimpleIconButton", iconClass: "fa fa-refresh",
						onClick: function () {
							manager._reloadCurrent();
						}
					}
				]
			});
		},

		_buildBreadcrumb: function () {
			var breadcrumb = new cloudo.widget.Breadcrumb({
				items: [], previewWidth: 4,
				beginOpen: 2, endOpen: 2,
				listener: {
					onItemClick: function (self, arg) {
						var node = cloudo.model.findNode(arg.item.nid);
						cloudo.selections.add(node, {merge: false});
					}
				},
				layoutConstraint: {
					left: 0, top: 0, right: 60
				}
			});
			return breadcrumb;
		},
		_buildTab: function (node, editor, name) {
			name = name || node.id;
			var caption = node.parseLabel(),
				icon = cloudo.Rule.getIcon(node.rid);
			icon = cloudo.Constant.ICON_URL_PREFIX + icon;
			var tab = new dorado.widget.tab.ControlTab({
				icon: icon, caption: caption,
				control: editor, name: name
			});
			tab.cNode = node;
			editor.tab = tab;
			return tab;
		},
		_destroyEditor: function (nid) {
			var editorMap = manager._editorMap;
			var editor = editorMap[nid];
			if (editor) {
				editor.destroy();
				editor.tab.close();
			}
			delete editorMap[nid];
		},
		_setCurrent: function (name) {
			var editor = this._editorMap[name];
			if (editor) {
				var tabControl = this._tabControl,
					tab = editor.tab;
				tabControl.set("currentTab", tab);
				this._current = editor;
			}
			if (name === "treeEditor") {
				editor.reload();
			}
		},
		_refreshBreadcrumb: function () {
			var currentNode = cloudo.selections.first(), breadcrumb = this._breadcrumb;
			var node = currentNode, nodeId = currentNode.nid, paths = [];
			do {
				var label = node.parseLabel();
				paths.push({
					text: label,
					label: label,
					nid: nodeId
				});
				node = node.getParent();
				if (!node) {
					break
				}

				nodeId = node.id;
			} while (true);

			paths = paths.reverse();
			breadcrumb.set("items", paths);

		},
		_reloadCurrent: function () {
			this._current.reload();
		},
		reloadTreeEditor: function () {
			try {
				this._editorMap.treeEditor.reload();
			} catch (e) {
			}
		},

		getDrawPad: function () {
			var currentEditor = this._current;
			if (currentEditor instanceof cloudo.widget.DrawEditor) {
				return  currentEditor.getDrawPad();
			}
		},
		getTabControl: function () {
			return this._tabControl;
		},
		getContainer: function () {
			return manager._container;
		},
		openEditor: function (node) {
			var nid = node.id;
			var editor = this._editorMap[nid];
			var tabControl = this._tabControl;
			if (!editor) {
				var node = cloudo.model.findNode(nid);
				editor = $nodeHelper.getEditorFactory(node)({node: node });
				var tab = this._buildTab(node, editor);
				tab.set("closeable", true);
				var tabs = tabControl.get("tabs");
				tab.addListener("onClose", function (self, arg) {
					manager._destroyEditor(nid);
					manager._setCurrent("treeEditor");
				});
				tab.isDrawEditor = true;
				this._editorMap[nid] = editor;
				tabControl.addTab(tab, tabs.size - 1);
			}
			this._setCurrent(nid);
		},

		refreshNode: function (node) {
			this._current.refreshNode(node);

		},
		clearTraces: function () {
			this._current.clearTraces();

		},
		replaceProperty: function (node, name, value, oldValue) {
			this._current.replaceProperty(node, name, value, oldValue);

		},
		refreshSelections: function (selections) {
			this._current.refreshSelections(selections);
			this._refreshBreadcrumb();
		},
		addNode: function (node, parentNode, insertMode, refNode) {
			this._current.addNode(node, parentNode, insertMode, refNode);
		},
		removeNode: function (node) {
			this._current.removeNode(node);
		},
		moveNode: function (node, oldParent, insertMode, refNode) {
			this._current.moveNode(node, oldParent, insertMode, refNode);
		},
		drawAll: function () {
			var currentEditor = this._current;
			if (currentEditor instanceof cloudo.widget.DrawEditor) {
				currentEditor.drawAll();
			}
		}
	}
	cloudo.nodeEditorManager = manager;
	window.$nodeEditorManager = manager;
})();

