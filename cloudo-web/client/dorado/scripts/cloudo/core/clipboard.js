/**
 * cloudo 剪贴板
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-4-23
 * Time: 下午3:17
 * To change this template use File | Settings | File Templates.
 */
(function () {
	function canShared() {
		var parentWindow = window.parent, result = false;
		if (parentWindow && parentWindow.cloudoClipboard) {
			result = true;
		}
		return result;
	}

	var clipboard = {
		_nodes: [],
		/**
		 * 复制当前节点
		 */
		copy: function () {
			var _nodes = [];

			function copy(node) {
				var proxyNode = node.clone();

				function destroyID(_un) {
					var it = _un.allNode().iterator();
					while (it.hasNext()) {
						var n = it.next();
						destroyID(n);
					}
					delete _un["id"];
				}

				destroyID(proxyNode);

				delete proxyNode["_parent"];
				_nodes.push(proxyNode);
			}

			$selections.getPasteNodes().each(function (node) {
				copy(node);
			});
			clipboard._setNodes(_nodes);
		},
		/**
		 * 剪切当前节点
		 */
		cut: function () {
			clipboard.copy();
			var pasteNodes = $selections.getPasteNodes();
			pasteNodes.each(function (node) {
				cloudo.viewConfig.removeNode(node);
			});
		},
		/**
		 * 粘贴剪贴板内元素到当前节点
		 * @returns {cloudo.Node}
		 */
		paste: function () {
			var nodes = clipboard._getNodes();
			if (nodes && nodes.length > 0 && $selections.size === 1) {
				var parent = $selections.first();
				nodes.each(function (node) {
					var proxy = node.clone();
					cloudo.viewConfig.addNode(proxy, parent);
				});
			}
		},
		canCopy: function () {
			var nodes = $selections.getPasteNodes(), copy = true;
			nodes.each(function (node) {
				if (!$nodeHelper.canRemove(node)) {
					copy = false;
					return false;
				}
			});
			return copy;
		},
		canPaste: function () {
			var _nodes = clipboard._getNodes(), paste = true;
			if ($selections.size === 1 && _nodes && _nodes.length > 0) {
				var i = _nodes.length, targetNode = $selections.first();
				while (i--) {
					var node = _nodes[i];
					if (!$nodeHelper.canPaste(targetNode, node)) {
						return false;
					}
				}
			} else {
				paste = false;
			}

			return paste;
		},
		_getNodes: function () {
			var nodes = [];
			if (canShared()) {
				var nodesStr = window.parent.cloudoClipboard.nodes;
				if (nodesStr) {
					var nodesObj = JSON.parse(nodesStr);
					if (_.isArray(nodesObj)) {
						nodesObj.each(function (nodeObj) {
							nodes.push(cloudo.Parser.parseNode(nodeObj));
						});
					}
				}
			} else {
				nodes = clipboard._nodes;
			}

			return nodes;
		},
		_setNodes: function (nodes) {
			if (canShared()) {
				window.parent.cloudoClipboard.nodes = JSON.stringify(nodes);
			} else {
				clipboard._nodes = nodes;
			}
		}
	};


	window.$clipboard = cloudo.Clipboard = clipboard;


})();