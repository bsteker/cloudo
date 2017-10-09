/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-2-17
 * Time: 下午2:17
 * To change this template use File | Settings | File Templates.
 */
(function () {
	function buildDrawPadSizeSettingDialog() {
		var devices = cloudo.device.touch;
		var context = {
			trigger: new dorado.widget.ListDropDown({
				items: devices, property: "name",
				onValueSelect: function (self, arg) {
					var name = arg.selectedValue;
					devices.each(function (device) {
						if (device.name === name) {
							context.setDevice(device);
							return false;
						}
					});
				}
			}),
			getDevice: function () {
				return {
					name: context.nameEditor.get("value"),
					width: context.widthEditor.get("value")[0],
					height: context.heightEditor.get("value")[0]
				}
			},
			setDevice: function (device) {
				var type = "custom";

				function doDevice(dev) {
					with (context) {
						widthEditor.set("value", [dev.width]);
						heightEditor.set("value", [dev.height ]);
						nameEditor.set("value", dev.name);
					}
				}

				device && devices.each(function (item) {
					if (item.name === device.name) {
						type = "default"
						return false;
					}
				});

				doDevice(device ? device : {name: "", width: 0, height: 0});
				context.refreshEditor(type);
			},
			refreshEditor: function (type) {
				var editable = type !== "default";
				with (context) {
					nameEditor.set("editable", editable);
					widthEditor.set("readOnly", !editable);
					heightEditor.set("readOnly", !editable);
					saveButton.set("disabled", !editable);
					trigger.set({buttonVisible: !editable,
						autoOpen: !editable});
				}
			}

		};

		return  new dorado.widget.Dialog({
			height: 250, width: 310,
			contentOverflow: "hidden", caption: "画布设备",
			buttons: [
				{
					$type: "Button", caption: "保存", disabled: true, visible: false,
					onCreate: function (self) {
						context.saveButton = self;
					}
				},
				{
					$type: "Button", caption: "确定"
				}
			],
			children: [
				{
					$type: "RadioGroup", value: "default",
					radioButtons: [
						{
							text: "默认", value: "default"
						},
						{
							text: "自定义", value: "custom"
						}
					],
					layoutConstraint: {
						type: "top"
					},
					onValueChange: function (self) {
						var editable = self.get("value") !== "default";
						context.setDevice(editable ? null : devices[0]);
					},
					onCreate: function (self) {
						context.radioGroup = self;
					}
				},
				{
					$type: "Container", height: 100,
					style: {
						background: "#F7F7F7"
					},
					layout: {
						$type: "Anchor"
					},
					layoutConstraint: {
						type: "center"
					},
					children: [
						{
							$type: "FormElement", showHint: false,
							label: "设备:", labelWidth: 40, width: 230,
							layoutConstraint: {
								left: 10, top: 20
							},
							onCreate: function (self, arg) {
								context.nameEditor = self;
							},
							editor: new dorado.widget.TextEditor({
								trigger: context.trigger
							})
						},
						{
							height: 40, $type: "Container",
							children: [
								{
									width: 100, pattern: "宽度: [0,9999]",
									$type: "CustomSpinner",
									onCreate: function (self, arg) {
										context.widthEditor = self;
									}
								},
								{
									$type: "SimpleIconButton",
									iconClass: "fa fa-exchange",
									onClick: function () {
										var device = context.getDevice();
										context.widthEditor.set("value", [device.height]);
										context.heightEditor.set("value", [device.width]);
									}
								},
								{
									width: 100, pattern: "高度: [0,9999]",
									$type: "CustomSpinner",
									onCreate: function (self, arg) {
										context.heightEditor = self;
									}
								}
							],
							layout: {
								align: "top", regionPadding: 5,
								$type: "HBox"
							},
							layoutConstraint: {
								left: 10, top: 10, right: 0,
								anchorTop: "previous"
							}
						}
					],
					onCreate: function (self, arg) {
						context.editorContainer = self;
					}
				}
			],
			layout: {
				padding: 10, regionPadding: 10,
				$type: "Dock"
			},
			layoutConstraint: {
				type: "top"
			}
		});
	}

	function buildQrCodeDialog() {
		var container = new dorado.widget.HtmlContainer();

		return  new dorado.widget.Dialog({
			caption: "页面地址&二维码", contentOverflow: "hidden",
			width: "500", height: "400",
			children: [
				container
			],
			onShow: function () {
				var context = {};
				var path = cloudo.getPreviewPath();
				container.set("content", $DomUtils.xCreate({
					tagName: "DIV", className: "c-qrcode",
					content: [
						{
							tagName: "DIV",
							contextKey: "pathText",
							content: [
								{
									tagName: "SPAN", className: "content",
									contentText: path
								}
							]
						}
					]
				}, null, context));
				$.get("/qrcode?text=" + path,
					function (data) {
						$(context.pathText).prepend(data)
					}
				);
			}
		});
	}

	var drawPadSettingDialog = buildDrawPadSizeSettingDialog(),
		qrCodeDialog = buildQrCodeDialog(),
		saveBtn = new dorado.widget.SimpleIconButton({
			tip: "保存", iconClass: "fa fa-save", visible: true, hideMode: "display",
			onClick: function () {
				cloudo.portal.save();
			}
		}),
		copyBtn = new dorado.widget.SimpleIconButton({
			tip: "复制",
			iconClass: "fa fa-files-o",
			onClick: function (self, arg) {
				cloudo.Clipboard.canCopy() && cloudo.Clipboard.copy();
			}
		}),
		pasteBtn = new dorado.widget.SimpleIconButton({
			tip: "粘贴", iconClass: "fa fa-clipboard",
			onClick: function (self, arg) {
				cloudo.Clipboard.canPaste() && cloudo.Clipboard.paste();
			}
		}),
		cutBtn = new dorado.widget.SimpleIconButton({
			tip: "剪切", iconClass: "fa fa-scissors",
			onClick: function (self, arg) {
				cloudo.Clipboard.canCopy() && cloudo.Clipboard.cut();
			}
		}),
		removeBtn = new dorado.widget.SimpleIconButton({
			tip: "删除", iconClass: "fa fa-eraser",
			onClick: function (self, arg) {
				if (cloudo.Clipboard.canCopy()) {
					cloudo.selections.toArray().each(
						function (node) {
							cloudo.viewConfig.removeNode(node);
						}
					);
				}
			}
		}),

		undoBtn = new dorado.widget.SimpleIconButton({
			tip: "撤销", iconClass: "fa fa-reply", visible: true, hideMode: "display",
			onClick: function () {
				$commandExecutor.undo();
			}
		}),
		redoBtn = new dorado.widget.SimpleIconButton({
			tip: "恢复", iconClass: "fa fa-share", visible: true, hideMode: "display",
			onClick: function () {
				$commandExecutor.redo();
			}
		}),
		previewBtn = new dorado.widget.SimpleIconButton({
			tip: "最终预览", iconClass: "fa fa-play-circle",
			visible: false,
			onClick: function () {
				if (cloudo.Settings.savable) {
				} else {
					dorado.widget.NotifyTipManager.notify("此环境不支持最终预览！");
				}
			}
		}),
		qrCodeBtn = new dorado.widget.SimpleIconButton({
			tip: "二维码", iconClass: "fa fa-qrcode",
			visible: false,
			onClick: function () {
				if (cloudo.Settings.socketConnect) {
					qrCodeDialog.show();
				} else {
					dorado.widget.NotifyTipManager.notify("此环境不支持多平台预览！");
				}
			}
		}),
		openLocatorBtn = new dorado.widget.SimpleIconButton({
			tip: "打开定位器", iconClass: "fa fa-location-arrow",
			onClick: function () {
				var drawPad = $nodeEditorManager.getDrawPad(), selections = cloudo.selections;
				if (selections.size === 1) {
					drawPad && drawPad.showPositionEditor(selections.first().id);
				}
			}
		}),
		openEditorBtn = new dorado.widget.SimpleIconButton({
			tip: "单开编辑", iconClass: "fa fa-pencil-square-o",
			onClick: function () {
				var selections = cloudo.selections;
				if (selections.size === 1) {
					$nodeEditorManager.openEditor(selections.at(0));
				}
			}
		}),
		settingMenu = new dorado.widget.Menu(
			{
				items: [
					{
						$type: "Checkable", name: "outputDataProvider",
						caption: "禁用DataProvider",
						onCheckedChange: function (self) {
							var checked = self
								.get('checked');
							cloudo.Settings.outputDataProvider = !checked;
						}
					},
					{
						$type: "Checkable", name: "outputEvents",
						caption: "禁用Events",
						onCheckedChange: function (self, arg) {
							var checked = self.get('checked');
							cloudo.Settings.outputEvents = !checked;
						}
					}
				],
				modalType: "dark",
				listener: {
					beforeShow: function (self, arg) {
						var menuItems = self.get('items'),
							menuItemMap = menuItems._keyMap;
						menuItemMap['outputDataProvider'].set('checked', !cloudo.Settings.outputDataProvider);
						menuItemMap['outputEvents'].set('checked', !cloudo.Settings.outputEvents);
					}
				}
			}),
		settingBtn = new dorado.widget.toolbar.Button({
			caption: "设置", iconClass: "fa fa-cog",
			menu: settingMenu
		}),
		helpBtn = new dorado.widget.SimpleIconButton({
			tip: "帮助", iconClass: "fa fa-question"
		}),
		editModelBtn , previewModelBtn;

	var runModel = cloudo.Settings.runMode, previewModel = cloudo.Settings.RUN_MODE_PREVIEW;
	editModelBtn = new dorado.widget.SimpleIconButton({
		tip: "编辑模式", iconClass: "fa fa-pencil",
		disabled: runModel != previewModel,
		onClick: function (self, arg) {
			previewModelBtn.set("disabled", false);
			editModelBtn.set("disabled", true);
			var settings = cloudo.Settings;
			settings.runMode = settings.RUN_MODE_EDIT;
			$nodeEditorManager.refreshSelections($selections.pluck("id"));
		}
	});
	previewModelBtn = new dorado.widget.SimpleIconButton({
		tip: "预览模式", iconClass: "fa fa-hand-o-up",
		disabled: runModel == previewModel,
		onClick: function (self, arg) {
			previewModelBtn.set("disabled", true);
			editModelBtn.set("disabled", false);
			var settings = cloudo.Settings;
			settings.runMode = settings.RUN_MODE_PREVIEW;

			$nodeEditorManager.refreshSelections($selections.pluck("id"));
		}
	});
	var itemOnReady = function (self, arg) {
		self.set("visible", !cloudo.viewConfig.isModel());
	};

	var filterButton = themeButton = new dorado.widget.toolbar.Button({
		caption: "显示所有元素",
		menu: {
			$type: "Menu", items: [
				{
					caption: "显示所有元素",
					onClick: function () {
						$nodeEditorManager._editorMap.treeEditor.filter();
						filterButton.set("caption", "显示所有元素");
					}
				},
				{
					caption: "仅显示有事件元素",
					onClick: function () {
						$nodeEditorManager._editorMap.treeEditor.filter("hasEvent");
						filterButton.set("caption", "仅显示有事件元素");
					}
				}
			]
		}
	});

	var actionBar = new dorado.widget.ToolBar({
		hideMode: "display",
		items: [
			saveBtn,
			undoBtn,
			redoBtn,
			copyBtn,
			pasteBtn,
			cutBtn,
			removeBtn,
			{ $type: "Separator", onReady: itemOnReady},
			openLocatorBtn,
			openEditorBtn,
			{ $type: "Separator", onReady: itemOnReady},
			editModelBtn,
			previewModelBtn,
			{ $type: "Separator", onReady: itemOnReady},
			previewBtn,
			qrCodeBtn,
			{ $type: "Fill" }, filterButton    ]
	});


	actionBar.saveBtn = saveBtn;
	actionBar.undoBtn = undoBtn;
	actionBar.redoBtn = redoBtn;
	actionBar.copyBtn = copyBtn;
	actionBar.pasteBtn = pasteBtn;
	actionBar.cutBtn = cutBtn;
	actionBar.removeBtn = removeBtn;

	actionBar.openLocatorBtn = openLocatorBtn;
	actionBar.openEditorBtn = openEditorBtn;

	actionBar.editModelBtn = editModelBtn;
	actionBar.previewModelBtn = previewModelBtn;

	actionBar.previewBtn = previewBtn;
	actionBar.qrCodeBtn = qrCodeBtn;
	actionBar.settingBtn = settingBtn;

	actionBar.settingMenu = settingMenu;

	cloudo.actionBar = actionBar;

	cloudo.statusBar = {
		hide: function () {
			cloudo.actionBar.saveBtn.set("visible", false);
			cloudo.actionBar.redoBtn.set("visible", false);
			cloudo.actionBar.undoBtn.set("visible", false);
		},
		show: function () {
			cloudo.actionBar.saveBtn.set("visible", true);
			cloudo.actionBar.redoBtn.set("visible", true);
			cloudo.actionBar.undoBtn.set("visible", true);
		}
	}


	window.$actionBar = actionBar;


})();