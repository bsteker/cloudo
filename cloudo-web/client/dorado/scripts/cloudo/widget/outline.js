/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-12-5
 * Time: 上午10:35
 * To change this template use File | Settings | File Templates.
 */
(function () {

	cloudo.outline = {
		_ALL: {},
		/**
		 * 注册向导
		 *
		 * @param rid 规则ID
		 * @param factory outline工厂
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

	cloudo.outline.AbstractOutline = $extend(cloudo.widget.AbstractNodeEditor, {

	});


//
//
//	cloudo.plugins.register(cloudo.plugins.type.OUTLINE, {
//		rid: "AutoForm",
//		factory: function (config) {
//			return new cloudo.widget.TreeEditor(config);
//		},
//		description: "AutoForm OutLine……"
//	});
})
();