/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-8
 * Time: 上午9:33
 * To change this template use File | Settings | File Templates.
 */
(function () {
	cloudo.nodeEditor = {
		_ALL: {},
		/**
		 * 注册向导
		 *
		 * @param rid 规则ID
		 * @param className 向导ClassName
		 */
		register: function (rid, factory) {
			this._ALL[rid] = factory;
		},
		unregister: function (rid) {
			delete this._ALL[rid];
		},
		/**
		 * 获得向导实体
		 * 注：当用户关闭了向导功能时返回空
		 * 所以用户无需在获得之前判断当亲向导功能是否在开启
		 * @param rid
		 * @returns {*}
		 */
		find: function (rid) {
			var _ALL = this._ALL;
			return _ALL[rid];
		}

	};


	/**
	 * Node编辑器所需具备的接口定义类
	 * @type {*}
	 */
	cloudo.widget.AbstractNodeEditor = $class({
		$className: "cloudo.widget.AbstractNodeEditor",
		/**
		 * 初始化
		 * @param node
		 */
		init: function (node) {
		},
		/**
		 * 刷新指定Node的显示
		 * @param node
		 */
		refreshNode: function (node) {
		},
		/**
		 * 重新装载
		 */
		reload: function () {

		},
		/**
		 * 刷新全部
		 */
		refreshAll: function () {

		},
		/**
		 * 更改节点属性显示
		 * @param node
		 * @param name
		 * @param newValue
		 * @param oldValue
		 */
		replaceProperty: function (node, name, newValue, oldValue) {
		},
		/**
		 * 刷新选择项列表
		 * @param selections
		 */
		refreshSelections: function (selections) {

		},
		clearTraces: function () {

		},
		/**
		 * 添加节点
		 * <p>
		 *   注：所有新增节点操作都应调用此接口
		 *   本方法不实现command相关操作，command操作应在外面自行实现。
		 *   原因：此方法也对command开放.
		 * </p>
		 * @param node
		 * @param parentNode
		 * @param insertMode
		 * @param refNode
		 */
		addNode: function (node, parentNode, insertMode, refNode) {

		},
		/**
		 * 删除节点
		 * <p>
		 *   注：所有删除节点操作都应调用此接口
		 *   本方法不实现command相关操作。
		 *   原因：此方法也对command开放.
		 * </p>
		 * @param node
		 */
		removeNode: function (node) {

		},
		/**
		 * 移动节点
		 * <p>
		 *   注：所有移动节点操作都应调用此接口
		 *   本方法不实现command相关操作。
		 *   command操作应在外面自行实现。
		 *   原因：此方法也对command开放
		 * </p>
		 * @param {cloudo.Node} node
		 * @param {cloudo.Node} oldParent
		 * @param {String} insertMode
		 * @param {cloudo.Node} refNode
		 * @returns {cloudo.Node}
		 */
		moveNode: function (node, oldParent, insertMode, refNode) {

		},
		/**
		 * 过滤器 （查询支持）
		 * @param condition
		 * @param keyword
		 */
		filter: function (condition, keyword) {

		}
	});
})();
