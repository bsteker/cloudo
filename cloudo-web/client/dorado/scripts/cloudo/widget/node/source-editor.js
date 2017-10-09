/**
 *
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-6-5
 * Time: 上午11:03
 * To change this template use File | Settings | File Templates.
 */
(function () {


	cloudo.widget.SourceView = $extend([cloudo.widget.CodeMirror, cloudo.widget.AbstractNodeEditor], {
		$className: "cloudo.widget.TreeEditor",
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
		init: function (node) {
			this._node = node;
		},
		refreshNode: function (node) {

		},
		replaceProperty: function (node, name, value) {

		},

		reload: function () {
			var node = this._node;

		},
		addNode: function (node, parentNode, insertMode, refNode) {

		},
		removeNode: function (node) {

		},
		moveNode: function (node, oldParent, insertMode, refNode) {

		}
	});
})
();