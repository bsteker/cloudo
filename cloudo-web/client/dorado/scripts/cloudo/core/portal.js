/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-1-13
 * Time: 下午2:16
 * To change this template use File | Settings | File Templates.
 */
(function () {

	var SyncAction = $extend(dorado.widget.AjaxAction,
		{
			$className: "cloudo.widget.AjaxAction",
			ATTRIBUTES: {
				async: {
					defaultValue: false
				}
			},
			getAjaxOptions: function () {
				var jsonData = {
					action: "remote-service",
					service: this._service,
					supportsEntity: this._supportsEntity,
					parameter: dorado.JSON.evaluate(this._parameter),
					sysParameter: this._sysParameter ? this._sysParameter.toJSON() : undefined,
					context: (this._view ? this._view.get("context") : null)
				}

				if (this._supportsEntity) {
					jsonData.loadedDataTypes = this.get("dataTypeRepository").getLoadedDataTypes();
				}
				var options;
				options = $setting["ajax.remoteServiceOptions"];
				if (!cloudo.isBrowser) {
					var service = cloudo.getServiceLocation();
					options.url = service + "/dorado/view-service"
				}
				return dorado.Object.apply({
					jsonData: jsonData,
					timeout: this._timeout,
					batchable: this._batchable
				}, options);
			}

		});


	/**
	 * Cloudo 出入口统一接口
	 * 注：与后台交互方法都应在此处实现
	 * User: Alex Tong(mailto:alex.tong@bstek.com)
	 */
	var portal = {
		/**
		 * 保存viewConfig
		 */
		save: function () {
			var vc = cloudo.viewConfig.getRoot().toJSON(true);
			vc = dorado.JSON.stringify(vc);
			var saveTip=dorado.widget.NotifyTipManager.notify("正在保存……");
			if (cloudo.isBrowser) {
				if (cloudo.Settings.savable) {

					var serviceName = cloudo.Settings.saveViewService,
						action = portal[serviceName];
					if (!action) {
						action = new SyncAction({
							service: serviceName, modal: false, async: false,
							onSuccess: function () {
								cloudo.viewConfig.markClean();
								saveTip.hide();
							}
						});
						portal[serviceName] = action;
					}
					action.set('parameter', {
						json: vc,
						url: cloudo.viewConfig.url
					});
					action.execute();
				} else {
					//TODO 此处也应该实现刷新保存时间提示信息区域
					dorado.widget.NotifyTipManager.notify("此环境不支持保存！");
				}
			} else {
				Studio.App.viewPortal.write(cloudo.viewConfig.url, vc);
				saveTip.hide();
				cloudo.viewConfig.markClean();
			}

		},

		/**
		 * 获得Expose 服务表达式列表
		 * @returns {Array}
		 */
		exposeNames: function () {
			var serviceName = "dorado.vidor.remoteService#getExposeNames";
			return this._executeAction(serviceName, null, []);
		},
		/**
		 * 获得DataProvider 服务表达式列表
		 * @returns {Array}
		 */
		providerNames: function () {
			var serviceName = "dorado.vidor.remoteService#getDataProviderNames";
			return this._executeAction(serviceName, null, []);
		},
		/**
		 *  获得DataResolver 服务表达式列表
		 * @returns {Array}
		 */
		resolverNames: function () {
			var serviceName = "dorado.vidor.remoteService#getDataResolverNames";
			return this._executeAction(serviceName, null, []);
		},
		jsonToXml: function () {
			var serviceName = "dorado.vidor.remoteService#jsonToXml";
			var vc = cloudo.viewConfig.getRoot().toJSON(true);
			vc = dorado.JSON.stringify(vc);
			var xml = "";
			if (cloudo.isBrowser) {
				xml = this._syncExecuteAction(serviceName, vc);
			} else {
				xml = Studio.App.viewPortal.toXML(vc);
			}
			return xml;
		},
		/**
		 *  获得javaClass 名称列表
		 * @returns {Array}
		 */
		javaClassNames: function () {
			var serviceName = "dorado.vidor.remoteService#getJavaClassNames";
			return this._executeAction(serviceName, null, []);
		},
		/**
		 * 获得全局DataType 列表
		 * @returns {Array}
		 */
		globalDataTypes: function () {
			var serviceName = "dorado.vidor.remoteService#getModelNames";
			return this._executeAction(serviceName, null, []);
		},
		baseDataTypes: function () {
			return cloudo.dataType.base;
		},
		/**
		 * 获得制定全局DataType完整结构
		 * @param name
		 */
		globalDataType: function (name) {
			var serviceName = "dorado.vidor.remoteService#dataTypeJSON",
				parameter = name;
			return this._syncExecuteAction(serviceName, parameter, {});
		},
		dataTypeReflection: function (json) {
			var serviceName = "dorado.vidor.remoteService#dataTypeReflection",
				parameter = json;
			return this._syncExecuteAction(serviceName, parameter, {});
		},
		dataTypeCompleteJSON: function (jsonMap, name) {
			var serviceName = "dorado.vidor.remoteService#dataTypeJSON",
				parameter = {
					jsonMap: jsonMap,
					name: name
				};
			return this._syncExecuteAction(serviceName, parameter, {});
		},
		getAction: function (serviceName) {
			var action = portal[serviceName];
			if (!action) {
				action = new SyncAction({
					service: serviceName, modal: false
				});
				portal[serviceName] = action;
			}
			return action;
		},
		_syncExecuteAction: function (serviceName, parameter, defaultValue) {
			var action = portal.getAction(serviceName);

			if (!cloudo.isBrowser && !cloudo.testServiceLocation()) {
				dorado.widget.NotifyTipManager.notify("此功能需启动Web服务！");
				return defaultValue;
			}

			action.set("parameter", parameter);
			action.execute();
			return action.get("returnValue");
		},
		_executeAction: function (serviceName, parameter, defaultValue) {
			var action = portal.getAction(serviceName);
			if ((new Date() - (action._executeTimestamp || 0)) > 3000) {
				if (!cloudo.isBrowser && !cloudo.testServiceLocation()) {
					dorado.widget.NotifyTipManager.notify("此功能需启动Web服务！");
					action._$result = defaultValue;
				} else {
					parameter && action.set("parameter", parameter);
					action.execute(function (result) {
						action._$result = result;
					});
				}
				action._executeTimestamp = new Date();
			}
			return action._$result || defaultValue;
		},
		translateURL:function(url){

		}
	}

	cloudo.portal = portal;

})();