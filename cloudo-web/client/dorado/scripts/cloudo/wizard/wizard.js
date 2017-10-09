/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-12-5
 * Time: 上午10:35
 * To change this template use File | Settings | File Templates.
 */
(function () {

	cloudo.wizard = {
		_ALL: {},
		OPERATION_TYPE: {
			NEW: "new",
			MODIFY: "modify"
		},
		enabled: true,
		/**
		 * 注册向导
		 *
		 * @param rid 规则ID
		 * @param factory
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
			if (!this.enabled) {
				return;
			}

			var _ALL = this._ALL;
			return _ALL[rid];
		},
		createInstance: function (className, config) {
			if (className) {
				return  new (eval(className))(config);
			}
		},
		show: function (rid, config) {
			var factory, wizard;
			factory = this.find(rid);
			wizard = factory(config);
			wizard.show();
			return wizard;
		}

	};
	/**
	 * @author cloudo向导统一接口类
	 * @type {*}
	 */
	cloudo.wizard.AbstractWizard = $extend(dorado.widget.Dialog, {
		ATTRIBUTES: {
			node: {},
			/**
			 * parent节点
			 */
			parentNode: {},
			/**
			 * 参照节点
			 */
			refNode: {},
			/**
			 * 插入方式
			 */
			insertMode: {},
			/**
			 * Node操作类型
			 * 可选值：new、modify
			 * @type String
			 * @default "new"
			 */
			operationType: {
				defaultValue: "new"
			}
		},
		/**
		 * 关闭向导
		 */
		close: function () {
			$invokeSuper.call(this, arguments);
			if (!this._destroyed) {
				this.destroy();
			}
		},
		/**
		 * 执行Post
		 * @param node 原Node
		 * @param newNode 此参数在operationType=“modify”时必需参数,充当替换原有node
		 */
		doPost: function (node, newNode) {
			var wizard = this, parentNode, refNode, insertMode;
			if (node !== newNode) {
				parentNode = node.getParent();
				refNode = $nodeHelper.previous(node);

				if (refNode) {
					insertMode = "after";
				} else {
					refNode = $nodeHelper.next(node);
					if (refNode) {
						insertMode = "before";
					}
				}

				cloudo.viewConfig.removeNode(node);
			} else {
				parentNode = wizard.get("parentNode");
				refNode = wizard.get("refNode");
				insertMode = wizard.get("insertMode");
				if (!parentNode && refNode) {
					parentNode = refNode.getParent();
				}
			}

			if ($nodeHelper.canPaste(parentNode, newNode)) {
				cloudo.viewConfig.addNode(newNode, parentNode, refNode, insertMode);
			}
		},
		/**
		 * 此方法供子类复写
		 */
		post: function () {
		}

	});

})
();