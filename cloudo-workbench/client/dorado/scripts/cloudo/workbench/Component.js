$editorPaths={
		ace:">/dorado/cloudo/source-editor",
		cloudo:">/dorado/cloudo/vidor"
}
function getIconClass(isDirectory, mode) {
	var iconClass = "fa fa-folder-o";
	if (!isDirectory) {
		switch (mode) {
		case "dorado_view":
			iconClass = "silk cloudo-icon-view";
			break;
		case "dorado_touch":
			iconClass = "silk cloudo-icon-touch";
			break;
		case "dorado_model":
			iconClass = "silk cloudo-icon-model";
			break;
		default:
			iconClass = "fa fa-file-o";
		}
	}
	return iconClass;
}

dorado.widget.LargeButton = $extend(dorado.widget.Button, {
	$className : "dorado.widget.LargeButton",
	ATTRIBUTES : {
		height : {
			defaultValue : 40
		}
	},
	refreshDom : function(dom) {
		$invokeSuper.call(this, [ dom ]);
		$(dom).addClass("large-button");
	}
});

dorado.widget.FileTree = $extend(dorado.widget.DataTree, {
	EVENTS : {
		beforeRemoveFile : {},
		onRemoveFile : {}
	},
	constructor : function(config) {
		$invokeSuper.call(this, arguments);
		this.addListener("onDataNodeCreate", function(self, arg) {
			var node = arg.node, data = node.get("data").toJSON();
			node.set({
				iconClass : getIconClass(data.isDirectory, $Mime
						.parseMode(data.path)),
				expandedIconClass : 'fa fa-folder-open-o',
				hasChild : data.isDirectory
			});
		})
	},
	flushData : function() {
		this.get("dataSet").flush();
	},
	refreshCurrent : function() {
		var treeNode = this.get("currentNode");
		if (treeNode) {
			var data = treeNode.get("data");
			if (data.get("isDirectory")) {
				var children = data.get("children");
				children.flush();
//				treeNode.collapse();
			}
		}
	},
	removeFile : function(md5) {
		var node = this.findFileNode(md5), tree = this;
		if (node) {
			var data = node.get("data").toJSON();
			var arg = {
				data : data,
				node : node,
				processDefault : true
			};
			if (tree.getListenerCount("beforeRemoveFile")) {
				tree.fireEvent("beforeRemoveFile", this, arg);
			}
			if (arg.processDefault) {
				dorado.MessageBox.confirm("确认删除 "
						+ (data.isDirectory ? "文件夹" : "文件") + " '" + data.name
						+ "'" + "？", function() {
					node.remove();
					tree.fireEvent("onRemoveFile", tree, arg);
				});
			}
		}
	},
	findFileNode : function(md5) {
		var dataSet = this.get("dataSet"), tree = this;

		function getTreeNode(nmd5) {
			var entity = dataSet.findEntityByMD5(nmd5);
			return tree.findNode(entity);
		}

		var treeNode = getTreeNode(md5);
		if (!treeNode) {
			var relationship = {};

			function findTreeNode(parentTreeNode) {
				var pmd5 = parentTreeNode.get("data.md5");
				if (pmd5 == md5)
					return parentTreeNode;
				var nodes, result;
				parentTreeNode.expand();
				nodes = parentTreeNode.get("nodes").toArray();
				for ( var i = 0, len = nodes.length; i < len; i++) {
					var sNode = nodes[i], nmd5 = sNode.get("data.md5");
					if (relationship[nmd5])
						result = findTreeNode(sNode);
					if (result)
						break;
				}
				return result;
			}

			var parentTreeNode, cEntity = dataSet.findEntityByMD5(md5);
			do {
				if (!cEntity)
					break;
				relationship[cEntity.get('md5')] = cEntity;
				var parentEntityList = cEntity.parent;
				if (!parentEntityList)
					break;
				cEntity = parentEntityList.parent;
				parentTreeNode = tree.findNode(cEntity);
			} while (!parentTreeNode);
			if (parentTreeNode) {
				treeNode = findTreeNode(parentTreeNode)
			}
		}
		return treeNode;
	},

	setCurrent : function(md5) {
		var node = this.findFileNode(md5);
		node && this.set("currentNode", node);
	},
	getCurrentFile : function() {
		var currentEntity = this.get("currentEntity");
		if (currentEntity) {
			return currentEntity.toJSON();
		}
	},
	currentIsProjectRootDirectory : function() {
		var currentNode = this.get("currentNode"), result = false, data = this
				.getCurrentFile();
		if (currentNode) {
			result = currentNode.get("level") == 1 && data.isDirectory;
		}
		return result;
	}
});
dorado.widget.EditorIFrame = $extend(dorado.widget.IFrame, {
	$className : "dorado.widget.EditorIFrame",
	ATTRIBUTES : {
		data : {},
		type : {}
	},
	getEditor : function() {
		var editor = this.getIFrameWindow().editor;
		return editor;
	}
});
dorado.widget.tab.EditorTab = $extend(dorado.widget.tab.ControlTab, {
	$className : "dorado.widget.tab.FileEditorTab",
	ATTRIBUTES : {
		type : {},
		path : {},
		data : {},
		closeable : {
			defaultValue : true
		}
	},
	EVENTS : {
		onEditorChange : {},
		onSave : {}
	},
	constructor : function(config) {
		$invokeSuper.call(this, arguments);
		var data = this._data, path = this._path, type = this._type;
		var tab = this, url = path;
		url += "?path=" + data.path + "";
		if (data.mode) {
			url += "&mode=" + data.mode + "";
		}

		var doEditorChange = function() {
			tab.doEditorChange();
		};
		var onEditorSave = function() {
			tab.fireSaveListeners();
		};

		this.set("control", new dorado.widget.EditorIFrame({
			data : data,
			path : url,
			type : type,
			onLoad : function(self, arg) {
				setTimeout(function() {
					var editor = self.getEditor();
					if (editor) {
						editor.onChange(doEditorChange);
						editor.onSave(onEditorSave);
						doEditorChange();
					}
				}, 1500);
			}
		}));
		this.addListener("beforeClose", function(self, arg) {
			var controlTab = self;
			if (!self.getStatus().isClean) {
				dorado.MessageBox.show({
					icon : dorado.MessageBox.QUESTION_ICON,
					title : "系统消息",
					message : "请选择您的操作",
					buttons : [ "保存并关闭", "关闭" ],
					closeAction : "cancel",
					detailCallback : function(button, text) {
						switch (button) {
						case "保存并关闭": {
							controlTab.save();
							setTimeout(function() {
								controlTab.close();
							}, 100);
							break;
						}
						case "关闭": {
							controlTab.markClean();
							setTimeout(function() {
								controlTab.close();
							}, 100);
							break;
						}
						}
					}
				});
				arg.processDefault = false;
				return false;
			}
		})
	},
	forceClose : function() {
		var tab = this;
		tab.markClean();
		setTimeout(function() {
			tab.close();
		}, 100);
	},
	redo : function() {
		var editor = this.getEditor();
		editor && editor.redo();
	},
	undo : function() {
		var editor = this.getEditor();
		editor && editor.undo();
	},
	save : function() {
		var editor = this.getEditor();
		editor && editor.save();
	},
	fireSaveListeners : function() {
		var tab = this;
		var arg = {
			data : tab._data
		};
		if (tab.getListenerCount("onSave")) {
			tab.fireEvent("onSave", this, arg);
		}
	},
	getEditor : function() {
		var control = this.get("control");
		if (control) {
			return control.getEditor();
		}
	},
	getStatus : function() {
		var editor = this.getEditor();
		return editor ? editor.getStatus() : {
			isClean : true,
			canUndo : false,
			canRedo : false
		}
	},
	markClean : function() {
		var editor = this.getEditor();
		editor && editor.markClean();
	},
	isClean : function() {
		var editor = this.getEditor(), result = true;

		if (editor) {
			result = editor.isClean();
		}
		return result;
	},
	doEditorChange : function() {
		var tab = this, status = tab.getStatus();
		var arg = {
			data : tab._data,
			status : status
		};
		window.top.Interfaces.changeFileStatus(arg);
		$(tab._doms.caption).toggleClass("editor-dirty", !status.isClean);
		if (tab.getListenerCount("onEditorChange")) {
			tab.fireEvent("onEditorChange", this, arg);
		}
	},
	reload : function() {
		var control = this.get("control");
		if (control) {
			control.reload();
		}
	}
});

dorado.widget.tab.EditorTab.TYPES = {
	cloudo : "CLOUDO",
	ace : "ACE"
};

dorado.widget.tab.EditorTab.create = function(data) {
	var type, path;
	if ($Mime.doradoModels.indexOf(data.mode) >= 0) {
		type = dorado.widget.tab.EditorTab.TYPES.cloudo;
		path = $editorPaths.cloudo;
	} else {
		type = dorado.widget.tab.EditorTab.TYPES.ace;
		path = $editorPaths.ace;
	}

	return new dorado.widget.tab.EditorTab({
		name : data.path,
		caption : data.name,
		data : data,
		path : path,
		type : type
	});
}