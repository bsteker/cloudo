/**
 * @author Alex Tong(alex.tong@bstek.com)
 * cloude 命名空间定义
 */

(function () {
	window.cloudo = $namespace("cloudo");
	cloudo._ID_SEED = 0;
	cloudo.isBrowser = true;
	cloudo.Skin = {
		highlightColor: "#45b2c2"
	};
	cloudo.Core = {
		/**
		 * 生成一个新的id。
		 * @return {String} 新生成的id。
		 */
		newId: function () {
			return "_c_uid_" + (++cloudo._ID_SEED);
		},
		/**
		 * 根据给定的DOM对象查找Dorado控件。
		 * @param {HTMLElement} el 作为查找起点的DOM对象。
		 * @return {dorado.widget.Control} Dorado控件。
		 *
		 * @example
		 * // 查找某Element所属的控件。
		 * var control = dorado.widget.Control.findParentControl(div);
		 *
		 */
		getDoradoControlByElement: function (el) {
			var node = $DomUtils.findParent(el, function (node) {
				return (!!node.doradoUniqueId);
			});
			var control = null;
			if (node) control = dorado.widget.Component.ALL[node.doradoUniqueId];
			return control;
		}
	};
	cloudo.Constant = {
		/**
		 * 默认label properties
		 * @type {Array}
		 * @private
		 */
		DEFAULT_RULE_LABEL_PROPERTIES: ["caption", "title", "name", "id"],
		/**
		 * 事件默认入参
		 * @type {string}
		 * @private
		 */
		DEFAULT_EVENT_PARAMETERS: "self,arg",
		/**
		 * 默认布局
		 * @type {string}
		 */
		DEFAULT_LAYOUT: "dock",
		/**
		 * 位置信息后缀
		 * @type {string}
		 */
		LAYOUT_CONSTRAINT_SUFFIX: "Constraint",
		/**
		 * cloudo icon uri前缀
		 * @type {string}
		 */
		ICON_URL_PREFIX: '>dorado/res',
		/**
		 * node拖拽标签
		 */
		NODE_DRAG_TAG: "nodeRule",

		CLIENT_TYPE_TOUCH: "touch",
		CLIENT_TYPE_DESKTOP: "desktop",
		CLIENT_TYPE_MODEL: "model",
		DATATYPE_ID_PREFIX: "v:Preview$"
	};


	cloudo.Settings = {
		outputDataProvider: false,
		outputEvents: false,
		dragStep: 4,
		savable: true,
		serverIp: "127.0.0.1",
		saveViewService: "cloudo.remoteService#saveView",
		RUN_MODE_EDIT: "edit",
		RUN_MODE_Debug: "debug",
		RUN_MODE_PREVIEW: "preview",
		runMode: "edit",
		previewPath: "com.bstek.dorado.vidorsupport.view.Preview.d",
		drawPadPath: "com.bstek.dorado.vidorsupport.view.DrawPad.d",
		socketConnect: false,
		"actionBar.visible": true

	};

	cloudo.init = function (view, initData) {
		var ruleSet, viewConfig = initData.viewConfig, uSettings = initData.settings;
		//合并Settings
		for (var k in uSettings) {
			if (uSettings.hasOwnProperty(k)) {
				var value = uSettings[k];

				cloudo.Settings[k] = value;
			}
		}

		//规则文件序列化
		if (initData.ruleSet instanceof Object) {
			ruleSet = initData.ruleSet;
		} else {
			ruleSet = JSON.parse(initData.ruleSet);
		}
		//view.xml 序列化
		if (_.isString(viewConfig.data)) {
			viewConfig.data = JSON.parse(viewConfig.data);
		}
		//注册基础模型列表
		cloudo.dataType.base = initData.baseDataType;

		cloudo.view = view;
		cloudo.Rule.ruleSet = ruleSet;
		cloudo.viewConfig.init(viewConfig);
		cloudo.componentSelector = new cloudo.widget.ComponentSelector();
		cloudo.nodeEditorManager.init(view);
		cloudo.outlineManager.init(view);
		cloudo.propertyEditorManager.init();
	};
	/**
	 * 添加cloudo初始化完的监听器
	 * @param listener
	 */
	cloudo.onInit = function (listener) {
		if (!cloudo.onInitListeners) {
			cloudo.onInitListeners = [];
		}
		cloudo.onInitListeners.push(listener);
	};

	cloudo.run = function (view, initData) {
		window.AUTO_APPEND_TO_TOPVIEW = false;
		cloudo.view = view;
		cloudo.init(view, initData);
		var listeners = cloudo.onInitListeners;
		if (listeners) {
			listeners.each(function (listener) {
				return listener.call(cloudo);
			});
		}
		window.AUTO_APPEND_TO_TOPVIEW = true;
	};

	cloudo.setPosition = function (nid, position) {
		var node = cloudo.model.findNode(nid);
		var positionModel = new cloudo.model.Position();
		$.each(position, function (key, value) {
			var prop = new cloudo.model.Property(key, value + "");
			positionModel.addProperty(prop);
		});
		positionModel.operation = position.operation || "reset";
		cloudo.viewConfig.setPosition(node, positionModel);
	}


	cloudo.setPositionProperty = function (nid, name, value) {
		var node = cloudo.model.findNode(nid);
		var prop = new cloudo.model.Property(name, value);

		cloudo.ViewConfig.setPositionProperty(node, prop);
	};


	cloudo.getDrawPadPath = function () {
		var clientType = cloudo.viewConfig.clientType,
			drawPadPath = cloudo.Settings.drawPadPath,
			path = "", service;

		if (cloudo.getServiceLocation) {
			service = cloudo.getServiceLocation();
		}
		if (service) {
			path = service + "/" + drawPadPath.replace(/\.d$/, "-" + clientType + ".d");
		} else {
			path = ">" + drawPadPath.replace(/\.d$/, "-" + clientType + ".d");
		}
		return path;
	};

	cloudo.getWebResourceRoot = function () {
		return cloudo.isBrowser ? ">" : cloudo.getServiceLocation() + "/";
	};
	/**
	 * 将一段给定URL转换为最终的可以使用的URL。
	 * <p>
	 * 此方法允许用户在定义一个URL时利用">"在URL中植入特定的内容。<br>
	 * 例如：">res/scripts/boot.js"表示应用的根路径下的"res/scripts/boot.js"
	 * 如果此时应用的根路径是"/sampleApp"，
	 * 那么此方法最终返回的URL将是"/sampleApp/res/scripts/boot.js"。
	 *
	 * 如果此是应用运行环境为离线Studio模式，开发服务地址为"http://localhost:8080/projectName"
	 * 那么此方法最终返回的URL将是"http://localhost:8080/projectName/res/scripts/boot.js"。
	 * </p>
	 * @param {String} url 要转换的URL。
	 * @return {String} 转换后得到的URL。
	 */
	cloudo.translateURL = function (url) {
		var webRoot = cloudo.getWebResourceRoot();
		return webRoot + url;
	};

	cloudo.showTip = function (text) {
		dorado.widget.NotifyTipManager.notify(text);
	};

	cloudo.Logger = {
		debug: function (text) {

		},
		info: function (text) {

		},
		warn: function (text) {

		},
		err: function (e) {
			console.error(e)
		}
	};


})
();


