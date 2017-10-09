/**
 * @author Alex Tong(alex.tong@bstek.com)
 * cloude 命名空间定义
 */

(function () {
	window.cloudo = $namespace("cloudo");
	/**
	 * Dorado DataType节点规则统一注册接口
	 * @type {{scope: {BASE: string, VIEW: string, GLOBAL: string}, rules: {}, register: register}}
	 */
	cloudo.dataType = {
		scope: {
			BASE: "base", VIEW: "view", GLOBAL: "global"
		},
		rules: {},
		isDataType: function (rid) {
			if (this.rules[rid]) {
				return true;
			} else {
				return false
			}
		},
		find: function (rid) {
			return this.rules[rid];
		},
		/**
		 *
		 * @param rid 规则ID
		 * @param parser 解析器
		 */
		register: function (rid, parser) {
			var rules = this.rules;
			if (!rules[rid]) {
				rules[rid] = parser;
			}
		}
	};

	cloudo.dataType.register("DataType", {
		eachProperty: function (node, fn) {
			if (fn && node) {
				var nodes = node.allNode();
				var it = nodes.iterator();
				while (it.hasNext()) {
					var sNode = it.next();
					if (sNode.rid == "BasePropertyDef" || sNode.rid == "Reference") {
						fn.call(node, sNode);
					}
				}
			}
		}
	});
})
();


