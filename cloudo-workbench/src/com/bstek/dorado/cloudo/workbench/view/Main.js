/** @Controller */

window.Ui = {};
window.cloudoClipboard = {};
function registUI(self, arg) {
	window.Ui[self.get("id")] = self;
}

Interfaces = {

	changeFileStatus : function(arg) {
		var status = arg.status;
		Ui.saveButton.set("disabled", status.isClean);
		Ui.undoButton.set("disabled", !status.canUndo);
		Ui.redoButton.set("disabled", !status.canRedo);
	},
	hideSettingLayer : function() {
		Ui.settingLayer.hide();
	},
	showSettingLayer : function(name) {
		name = name || "about";
		Ui.settingLayer.show();
		SETTINGIFRAME_TIMER = setInterval(function() {
			var iFrameWin = Ui.settingIFrame.getIFrameWindow();
			if (iFrameWin && iFrameWin.setCurrent) {
				try {
					iFrameWin.setCurrent(name);
				} catch (e) {
				}
				clearInterval(SETTINGIFRAME_TIMER);
			}
		}, 200);
	},
	openFile: function (fileData) {
		Ui.editorTabControl.open(fileData);
	},
	editors: {
		current: {
			undo: function () {
				var tab = Ui.editorTabControl.get("currentTab");
				tab && tab.undo();
			},
			redo: function () {
				var tab = Ui.editorTabControl.get("currentTab");
				tab && tab.redo();
			},
			save: function () {
				var tab = Ui.editorTabControl.get("currentTab");
				tab && tab.save();
			}
		},
		saveAll: function () {
			Ui.editorTabControl.saveAll();
		},
		closeAll: function () {
			Ui.editorTabControl.closeAllTabs(true);
		},
		closeOthers: function () {
			Ui.editorTabControl.closeOtherTabs(Ui.editorTabControl.get("currentTab"), true);
		},
		makeClean: function () {
			Ui.editorTabControl.makeClean();
		},
		isClean: function () {
			return Ui.editorTabControl.isClean();
		}
	},
	onClose: function () {
		var tabs = Ui.editorTabControl.get("tabs");
		var paths = [];
		tabs.each(function (tab) {
			paths.push(tab.get("data").path);
		});
		Studio.App.metadata.set("openFiles", paths);
	}
}
// @Bind view.onCreate
!function(self, arg) {
	if (!dorado.Browser.chrome) {
		dorado.MessageBox
				.alert("Dorado Cloudo建议使用谷歌浏览器(Chrome) 打开！，将获得更好的使用体验！");
	}
}

// @Bind #FileDataSet.onCreate
function viewOnCreate(self, arg) {
	var view = self.get("view");

	var toolsContainer = $extend(dorado.widget.FloatContainer, {
		$className : "dorado.widget.toolsContainer",
		doOnBlur : function() {
			$invokeSuper.call(this, arguments);
			if (this._floating) {
				this.hide();
			}
		}
	});
	
$(window).bind('beforeunload', function(e) {
	if(!Interfaces.editors.isClean()){
		return '存在尚未保存项，确认关闭？';
	}else{
		return '确认离开？';
	}
})


	var SaveAction = new dorado.widget.UpdateAction({
		updateItems : [ {
			$type : "UpdateItem",
			dataSet : view.getComponentReference("SaveDataSet")
		} ],
		dataResolver : dorado.DataResolver
				.create("cloudo.workbench.FileController#saveFile")
	});
	var RemoveFileAction = new dorado.widget.AjaxAction({
		service : "cloudo.workbench.FileController#removeFile"
	});
	var TopBar = new dorado.widget.Container({
		exClassName : "topbar d-toolbar",
		children : [ new dorado.widget.LargeButton({
			caption : "Dorado Studio",
			exClassName : "setting topbar-left",
			layoutConstraint : "left",
			onClick : function() {
				Ui.settingLayer.show();
			}
		}), new dorado.widget.LargeButton({
			id : "saveButton",
			onCreate : registUI,
			exClassName : "border-left",
			iconClass : "fa fa-floppy-o",
			disabled : true,
			layoutConstraint : "left",
			onClick:function(){
				Interfaces.editors.current.save();
			}
		}), new dorado.widget.LargeButton({
			id : "undoButton",
			onCreate : registUI,
			iconClass : "fa fa-reply",
			disabled : true,
			layoutConstraint : "left",
			onClick:function(){
				Interfaces.editors.current.undo();
			}
		}), new dorado.widget.LargeButton({
			id : "redoButton",
			onCreate : registUI,
			iconClass : "fa fa-share",
			disabled : true,
			layoutConstraint : "left",
			onClick:function(){
				Interfaces.editors.current.redo();
			}
		}), new dorado.widget.LargeButton({
			iconClass : "fa fa-th",
			exClassName : "topbar-left ",
			layoutConstraint : "right",
			showTrigger : false,
			onClick : function(self, arg) {
				Ui.toolsContainer.show({
					anchorTarget : self,
					align : "innerleft",
					vAlign : "bottom"
				});
			}
		}), new dorado.widget.LargeButton({
			iconClass : "fa fa-question-circle",
			tip : "帮助",
			layoutConstraint : "right",
			onClick : function() {
				Interfaces.showSettingLayer("help");
			}
		}) ]
	});

	function tabControlOnCreate(self, arg) {
		registUI(self, arg);
		var tabControl = self;

		self.addListener("onContextMenu", function(self, arg) {
			Ui.tabContextMenu.show({
				event : arg.event
			});
		});
		self.canAdd = function() {
			var settingCount = 10;
			var tabCount = tabControl.get("tabs").items.length;
			return tabCount <= settingCount;
		};
		self.open = function(fileData) {
			var filePath = fileData.path, editorTab;
			editorTab = tabControl.getTab(filePath);
			if (!editorTab) {
				if (!tabControl.canAdd()) {
					showNotifyTip("打开文件数量已达到上限,请关闭部分文件！");
					return;
				}
				var mode = $Mime.parseMode(filePath);
				fileData.mode = mode;
				if (mode) {
					editorTab = dorado.widget.tab.EditorTab.create(fileData);
					if (editorTab) {
						tabControl.addTab(editorTab, null, true);
					}
				} else {
					showNotifyTip("此文件不支持打开！");
				}
			} else {
				tabControl.set("currentTab", editorTab);
			}
		};
		self.makeClean = function() {
			var tabs = tabControl.get("tabs");
			tabs && tabs.each(function(tab) {
				!tab.isClean() && tab.makeClean();
			});
		};
		self.isClean = function() {
			var tabs = tabControl.get("tabs"), clean = true;
			tabs && tabs.each(function(tab) {
				clean = tab.isClean();
				return clean;
			});
			return clean;
		};
		self.saveAll = function() {
			var tabs = tabControl.get("tabs");
			tabs && tabs.each(function(tab) {
				!tab.isClean() && tab.save();
			});
		}
	}
	;
	function newFile(self, arg) {
		var editor = Ui.newFileDialog;
		var data = self.get("userData"), name = "";
		if (data.type === "file") {
			name = "blank." + data.extName;
		}
		editor.fileMeta = data;
		editor.set("caption", self.get("caption"));
		editor.nameEditor.set("value", name);
		editor.show();
	}

	var CenterContainer = new dorado.widget.Container(
			{
				layout : "Dock",
				layoutConstraint : "center",
				children : [
						{
							$type : "SplitPanel",
							position : 200,
							previewable : true,
							layoutConstraint : "center",
							sideControl : {
								$type : "Panel",
								caption : "工程目录",
								layout : {
									$type : "Dock",
									regionPadding : 1
								},
								tools : [
										{
											$type : "SimpleIconButton",
											iconClass : "fa fa-crosshairs",
											onClick : function() {
												var currentTab = Ui.editorTabControl
														.get("currentTab");
												if (currentTab
														&& currentTab instanceof dorado.widget.tab.EditorTab) {
													Ui.fileTree
															.setCurrent(currentTab
																	.get("data").md5);
												}
											}
										},
										{
											$type : "SimpleIconButton",
											iconClass : "fa fa-caret-left",
											onClick : function(self, arg) {
												var splitPnl = dorado.widget.Control
														.findParentControl(
																self.getDom(),
																dorado.widget.SplitPanel);
												splitPnl.set("collapsed", true);
											}
										} ],
								children : [ new dorado.widget.FileTree(
										{
											id : "fileTree",
											onCreate : registUI,
											scrollMode : "lazyRender",
											showLines:true,
											onRemoveFile:function(self,arg){
												var view=self.get("view");
												var action=view.get("#removeFileAction");
												
												action.set("parameter",arg.data.path);
												action.execute();
												
											},
											onContextMenu : function(self, arg) {
												setTimeout(function() {
													Ui.fileContextMenu.show({
														event : arg.event
													});
												}, 100);
											},
											bindingConfigs : [ {
												name : "File",
												childrenProperty : "children",
												labelProperty : "name",
												recursive : true
											} ],
											onDataRowDoubleClick : function(
													self, arg) {
												var data = self
														.getCurrentFile();
												if (data.isDirectory) {
													var treeNode = self
															.findFileNode(data.md5);
													treeNode
															.set(
																	"expanded",
																	!treeNode
																			.get("expanded"));
												} else {
													Ui.editorTabControl
															.open(data);
												}
											},
											dataSet : view
													.getComponentReference("FileDataSet")
										}) ]
							},
							mainControl : new dorado.widget.TabControl({
								tabs : [],
								id : 'editorTabControl',
								onCreate : tabControlOnCreate,
								onTabChange : function(self, arg) {
									var items = [], newTab = arg.newTab;
									if (newTab) {

									}

									Ui.breadcrumb.set("items", items);
								}
							})
						},
						new cloudo.widget.Breadcrumb({
							layoutConstraint : "bottom",
							width : "100%",
							previewWidth : 4,
							id : "breadcrumb",
							onCreate : registUI,
							beginOpen : 2,
							endOpen : 2,
							items : []
						}),
						new dorado.widget.Menu(
								{
									id : "fileContextMenu",
									onCreate : registUI,
									items : [
											{
												name : "newViewFile",
												caption : "新建View文件",
												iconClass : "silk cloudo-icon-view",
												tags : [ "folder" ],
												userData : {
													extName : "view.xml",
													type : "file"
												},
												onClick : newFile
											},
											{
												name : "newTouchFile",
												caption : "新建Touch文件",
												userData : {
													extName : "touch.xml",
													type : "file"
												},
												iconClass : "silk cloudo-icon-touch",
												tags : [ "folder" ],
												onClick : newFile
											},
											{
												name : "newModelFile",
												caption : "新建Model文件",
												userData : {
													extName : "model.xml",
													type : "file"
												},
												iconClass : "silk cloudo-icon-model",
												tags : [ "folder" ],
												onClick : newFile
											},
											{
												$type : "Separator",
												tags : [ "folder" ]
											},
											{
												name : "newFile",
												caption : "新建文件",
												userData : {
													extName : "",
													type : "file"
												},
												iconClass : "fa fa-file-text",
												tags : [ "folder" ],
												onClick : newFile
											},
											{
												name : "newDirectory",
												tags : [ "folder" ],
												iconClass : "fa fa-folder",
												caption : "新建文件夹",
												userData : {
													type : "folder"
												},
												onClick : newFile
											},
											{
												$type : "Separator",
												tags : [ "folder" ]
											},
											{

												name : "removeFile",
												iconClass : "fa fa-times",
												caption : "删除",
												tags : [ "folder", "file" ],
												onClick : function() {
													Ui.fileTree
															.removeFile(Ui.fileTree
																	.getCurrentFile().md5);
												}
											},
											{
												$type : "Separator",
												tags : [ "folder", "file" ]
											},
											{
												name : "refresh",
												caption : "Refresh",
												iconClass : "fa fa-refresh",
												tags : [ "folder" ],
												onClick : function() {
													Ui.fileTree
															.refreshCurrent();
												}
											}

									],
									beforeShow : function(self, arg) {
										var data = Ui.fileTree.getCurrentFile();
										var tag = data.isDirectory ? "folder"
												: "file";
										self
												.get("items")
												.each(
														function(item) {
															var tags = item
																	.get("tags");
															tags
																	&& item
																			.set(
																					"visible",
																					tags
																							.indexOf(tag) >= 0);
														});
									}
								}),
						new dorado.widget.Menu(
								{
									id : "tabContextMenu",
									onCreate : registUI,
									items : [
											{
												name : "closeAll",
												caption : "关闭所有",
												iconClass : "fa fa fa-times",
												onClick : function() {
													Ui.editorTabControl
															.closeAllTabs(true);
												}
											},
											{
												name : "closeOthers",
												caption : "关闭其他",
												iconClass : "fa fa-times-circle-o",
												onClick : function() {
													Ui.editorTabControl
															.closeOtherTabs(
																	Ui.editorTabControl
																			.get("currentTab"),
																	true);
												}
											},
											{
												name : "reload",
												caption : "重新装载",
												iconClass : "fa fa-refresh",
												onClick : function() {
													var currentTab = Ui.editorTabControl
															.get("currentTab");
													currentTab
															&& currentTab
																	.reload();
												}
											} ]
								}),
						new dorado.widget.Dialog(
								{
									id : "newFileDialog",
									contentOverflow : "hidden",
									width : 300,
									height : 180,
									onCreate : function(self, arg) {
										registUI(self, arg);
										var fileDialog = self;
										var nameEditor = new dorado.widget.TextEditor(
												{
													onKeyDown : function(self,
															arg) {
														if (arg.keyCode == 13) {
															fileDialog.post();
															return false;
														}
													}
												});
										self.addChild(new dorado.widget.Label({
											text : "请输入文件名"
										}));
										self.addChild(nameEditor);
										self.nameEditor = nameEditor;
										self.post = function() {
											var meta = fileDialog.fileMeta;
											var name = nameEditor.get("text");
											var nodeData = Ui.fileTree
													.getCurrentFile();
											var path = nodeData.path;
											var view = self.get("view");
											var existsAction = view
													.get("#existsAction");
											var newFileAction = view
													.get("#newFileAction");
											var mkdirAction = view
													.get("#mkdirAction");
									
											
											existsAction.set("parameter",{
												path:path,
												name:name
											})

											if (!existsAction.execute()) {
												$(nameEditor._dom).toggleClass(
														"d-text-box-error",
														false);
											
												var file;
												if(meta.type === "file"){
													newFileAction.set("parameter",{
														path:path,
														name:name,
														mode:$Mime.parseMode(name)||""
													});
													file=newFileAction.execute();
												}else{
													mkdirAction.set("parameter",{
														path:path,
														name:name
													});
													file=mkdirAction.execute();
												}
												
												
												
												
												fileDialog.close();
												Ui.fileTree.refreshCurrent();
												if (file && !file.isDirectory) {
													setTimeout(
															function() {
																Ui.fileTree
																		.setCurrent(file.md5);
															}, 300);
												}
											} else {
												$(nameEditor._dom).toggleClass(
														"d-text-box-error",
														true);
											}
										}
									},
									layout : {
										$type : "VBox",
										padding : 20,
										regionPadding : 10
									},
									buttons : [
											{
												$type : "Button",
												caption : "确定",
												onClick : function(self, arg) {
													dorado.widget.Control
															.findParentControl(
																	self
																			.getDom(),
																	dorado.widget.Dialog)
															.post();
												}
											},
											{
												$type : "Button",
												caption : "取消",
												onClick : function(self, arg) {
													dorado.widget.Control
															.findParentControl(
																	self
																			.getDom(),
																	dorado.widget.Dialog)
															.close();
												}
											} ]
								}) ]
			});
	var settingLayer = Ui.settingLayer = new dorado.widget.FloatContainer({
		id : "settingLayer",
		onCreate : registUI,
		width : "100%",
		height : "100%",
		animateType : "none",
		children : [ {
			$type : "IFrame",
			id : "settingIFrame",
			onCreate : registUI,
			width : "100%",
			height : "100%",
			path : ">dorado/cloudo/setting"
		} ]
	});
	view.addChild(new toolsContainer({
		id : "toolsContainer",
		exClassName : "tools",
		onCreate : registUI,
		animateType : "slide",
		hideAnimateType : "none",
		width : 225,
		height : 120,
		children : [ {
			$type : "BlockView",
			blockWidth : 100,
			blockHeight : 100,
			onCreate : function(self, arg) {
				self.set("renderer",
						new dorado.widget.blockview.ImageBlockRenderer({
							captionProperty : "caption",
							imageProperty : "icon",
							padding : 10,
							spacing : 10
						}));
			},
			blockLayout : "horizontal",
			items : [ {
				icon : ">dorado/cloudo/res/images/jsdoc.png",
				caption : "JS文档",
				path : "http://dorado7.bsdn.org/jsdoc/"
			}, {
				icon : ">dorado/cloudo/res/images/icons.png",
				caption : "进入问答",
				path : "http://bsdn.org/projects/dorado7/issue"
			} ],
			onBlockClick : function(self, arg) {
				window.open(arg.data.path);
			}
		}

		]
	}));

	view.addChild(TopBar);
	view.addChild(CenterContainer);
	view.addChild(settingLayer);

}
