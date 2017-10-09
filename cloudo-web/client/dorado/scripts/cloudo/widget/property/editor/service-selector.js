/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-14
 * Time: 下午4:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
	cloudo.widget.ServiceLocationExpSelector = $extend(cloudo.widget.DefaultPropertyEditor, {
		$className: "cloudo.widget.RpcValueEditor",
		constructor: function (config) {
			var config = config || {}, editor = this;
			config.trigger = {
				$type: "ListDropDown", minWidth: 350,
				dynaFilter: true, autoOpen: true,
				listener: {
					beforeExecute: function (self, arg) {
						var names = editor.doGetItems();
						self.set("items", names);
					},
					onFilterItems: function (self, arg) {
						arg.filterOperator = "like";
					}
				}
			};
			$invokeSuper.call(this, [config]);
			editor.doGetItems();
		},
		doGetItems: function () {
		}
	});


	cloudo.widget.ExposeSelector = $extend(cloudo.widget.ServiceLocationExpSelector, {
		$className: "cloudo.widget.ExposeSelector",
		doGetItems: function () {
			return  cloudo.portal.exposeNames();
		}
	});

	cloudo.widget.ProviderSelector = $extend(cloudo.widget.ServiceLocationExpSelector, {
		$className: "cloudo.widget.ProviderSelector",
		doGetItems: function () {
			return cloudo.portal.providerNames();
		}
	});


	cloudo.widget.ResolverSelector = $extend(cloudo.widget.ServiceLocationExpSelector, {
		$className: "cloudo.widget.ResolverSelector",
		doGetItems: function () {
			return  cloudo.portal.resolverNames();
		}
	});


	cloudo.widget.ClassNameSelector = $extend(cloudo.widget.ServiceLocationExpSelector, {
		$className: "cloudo.widget.ClassNameSelector",
		doGetItems: function () {
			return cloudo.portal.javaClassNames();
		}
	});


	cloudo.propertyEditor.register("name[service]", "cloudo.widget.ExposeSelector");
	cloudo.propertyEditor.register("name[dataProvider]", "cloudo.widget.ProviderSelector");
	cloudo.propertyEditor.register("name[dataResolver]", "cloudo.widget.ResolverSelector");

	cloudo.propertyEditor.register("name[creationType]", "cloudo.widget.ClassNameSelector");
	cloudo.propertyEditor.register("name[matchType]", "cloudo.widget.ClassNameSelector");


})();