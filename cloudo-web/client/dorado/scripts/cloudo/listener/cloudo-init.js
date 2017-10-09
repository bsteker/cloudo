/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-6
 * Time: 下午12:18
 * To change this template use File | Settings | File Templates.
 */
cloudo.onInit(function () {
	var view = cloudo.view,
		componentSelector = cloudo.componentSelector,
		propTab = $propertyEditorManager.getTabControl(),
		outlineTab = $outlineManager.getTabControl();

	cloudo.eventEditor = new cloudo.widget.EventEditor({
		height: 300, width: "100%", caption: "事件编辑器",
		maximizeable: true, closeable: true,
		onReady: function (self, arg) {
			$(self.getDom()).shadow({
				mode: "frame"
			});
		}
	});


	view.addChild(cloudo.eventEditor);

	cloudo.floatBar.show();
	var actionBarVisible = cloudo.Settings["actionBar.visible"];
	$actionBar.set("visible", actionBarVisible);

	var isModel = cloudo.viewConfig.isModel();

	with ($actionBar) {
		openLocatorBtn.set("visible", !isModel);
		openEditorBtn.set("visible", !isModel);

		editModelBtn.set("visible", !isModel);
		previewModelBtn.set("visible", !isModel);

		//previewBtn.set("visible", !isModel);
		//qrCodeBtn.set("visible", !isModel);
		settingBtn.set("visible", !isModel);
	}
	//TODO 自动控制状态栏的显示
	if (window.parent && window.parent.cloudoClipboard) {
		cloudo.statusBar.hide();
	}


	//预览区域初始化
	var nodeEditorContainer = $nodeEditorManager.getContainer();
	var rightSplitPanel = new dorado.widget.SplitPanel({
		position: "50%", direction: "bottom", previewable: true,
		mainControl: propTab,  //所见即所得
		sideControl: outlineTab//组件选择器
	});
	view.addChild($actionBar);
	view.addChild(new dorado.widget.SplitPanel(
			{
				tags: "editorSplitPanel",
				direction: "right", position: 320, layoutConstraint: "center",
				mainControl: {
					$type: "SplitPanel", position: 125,
					mainControl: nodeEditorContainer,  //所见即所得
					sideControl: componentSelector//组件选择器
				},
				sideControl: rightSplitPanel
			})
	);
	var tabControl = $nodeEditorManager.getTabControl();
	tabControl.addListener("beforeTabChange", function (self, arg) {

		var newTab = arg.newTab, newTabName = newTab.get("name");
		if (newTab.isDrawEditor && !cloudo.isBrowser && !cloudo.testServiceLocation()) {
			dorado.widget.NotifyTipManager.notify("此功能需启动Web服务！");
			arg.processDefault = false;
		}

		var isTreeEditor = newTabName === "treeEditor";
		rightSplitPanel.set("collapsed", isTreeEditor);
		if (!isTreeEditor) {
			var node = newTab.cNode;
			$outlineManager.setCurrent(node);
		}


	});
});
