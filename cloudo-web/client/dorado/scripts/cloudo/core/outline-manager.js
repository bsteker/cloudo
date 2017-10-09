/**
 * Cloudo 编辑器管理器
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-11-15
 * Time: 下午2:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var _currentOutLine;

	var manager = {
		init: function (view) {
			var viewConfig = cloudo.viewConfig, rootNode = viewConfig.getRoot();
			var baseOutline = new cloudo.widget.TreeEditor();
			baseOutline.init(rootNode);
			this.baseOutline = baseOutline;
			var tabControl = this._buildTabControl(baseOutline);
			this._tabControl = tabControl;
		},
		_buildTabControl: function (baseOutline) {
			return new dorado.widget.TabControl({
				height: "50%",
				onTabChange: function (self, arg) {
					var tab = arg.newTab;
					_currentOutLine = tab.outline;
					_currentOutLine && _currentOutLine && _currentOutLine.reload();
				},
				onAttributeChange: function (self, arg) {
					var attribute = arg.attribute, value = arg.value;
					if (attribute == "visible") {
						var menuItem = cloudo.actionBar.settingMenu.getItem("showOutLine");
						menuItem.set("caption", value ? "隐藏OutLine" : "显示OutLine");
					}
				},
				tabs: [
					{
						$type: "Control", caption: "PrivateOutLine",
						name: "privateOutline", visible: false
					},
					{
						$type: "Control", caption: "OutLine",
						control: baseOutline,
						name: "baseOutline",
						onCreate: function (self, arg) {
							self.outline = baseOutline;
						}
					}
				]
			});
		},
		visible: function (value) {
			var tabControl = this.getTabControl();
			if (value != undefined) {
				tabControl.set("visible", value);
			} else {
				return tabControl.get("visible");
			}
		},
		setCurrent: function (node) {

		},
		_reloadCurrent: function () {
			_currentOutLine && _currentOutLine.reload();
		},
		reloadBaseOutline: function () {
			try {
				this.baseOutline && this.baseOutline.reload();
			} catch (e) {
			}
		},
		getTabControl: function () {
			return this._tabControl;
		},
		refreshNode: function (node) {
			_currentOutLine && _currentOutLine.refreshNode(node);
		},
		clearTraces: function () {
			_currentOutLine && _currentOutLine.clearTraces();
		},
		replaceProperty: function (node, name, value, oldValue) {
			_currentOutLine && _currentOutLine.replaceProperty(node, name, value, oldValue);
		},
		refreshSelections: function (selections) {
			_currentOutLine && _currentOutLine.refreshSelections(selections);
		},
		addNode: function (node, parentNode, insertMode, refNode) {
			_currentOutLine && _currentOutLine.addNode(node, parentNode, insertMode, refNode);
		},
		removeNode: function (node) {
			_currentOutLine && _currentOutLine.removeNode(node);
		},
		moveNode: function (node, oldParent, insertMode, refNode) {
			_currentOutLine && _currentOutLine.moveNode(node, oldParent, insertMode, refNode);
		}
	};
	cloudo.outlineManager = manager;
	window.$outlineManager = manager;
})();

