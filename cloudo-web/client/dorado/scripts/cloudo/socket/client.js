/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-4-9
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */

dorado.onInit(function () {
	function getToken(key) {
		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
		return result && unescape(result[1]) || "";
	};
	var ControlMap = {
		_ALL_Control: {},
		put: function (nid, control) {
			this._ALL_Control[nid] = control;
		},
		find: function (nid) {
			return this._ALL_Control[nid];
		},
		clear: function () {
			this._ALL_Control = {};
		}
	}, KEY_PROPERTY = "$cloudoID";
	var token = getToken("token");
	if (token) {
		var socket = io.connect("http://" + window.location.hostname + ":3030");
		//监听连接
		socket.on("connect", function () {
			socket.emit("subscribe", token);
			socket.emit("get view config", token);
		});
		//刷新属性值
		socket.on("property value", function (data) {
			var control = ControlMap.find(data.nid);
			if (control) {
				control.set(data.name, data.value);
			}
		});
		//绘制所有
		socket.on("draw all", function (data) {
			var iDocument = window.document, scriptElement = iDocument.createElement("script");
			scriptElement.type = "text/javascript";
			ControlMap.clear();
			scriptElement.text = "(function(){\n" + data.code + "\n})()";
			var head = iDocument.getElementsByTagName("head")[0];
			if (head) {
				try {
					head.appendChild(scriptElement);
				} finally {
					head.removeChild(scriptElement);
				}
			}
		});
	}

	var oldCreateInstance = dorado.Toolkits.createInstance;
	dorado.Toolkits.createInstance = function (namespace, config, typeTranslator) {
		var cloudoId, _KEY = KEY_PROPERTY;
		if (config) {
			cloudoId = config && config[_KEY];
			delete config[_KEY];
			if (config.listener) {
				var listener = config.listener;
				for (var k in listener) {
					if (listener.hasOwnProperty(k)) {
						var code, evt = listener[k];
						if (evt instanceof Object) {
							eval("code=" + evt.fn);
							evt.fn = code;
						} else {
							eval("code=" + evt);
							if (typeof code == "function") {
								listener[k] = code;
							}
						}
					}
				}
			}
		}
		var args = Array.prototype.slice.call(arguments);
		var instance = oldCreateInstance.apply(dorado.Toolkits, args);
		if (cloudoId) {
			ControlMap.put(cloudoId, instance);
			instance[_KEY] = cloudoId;
		}
		return instance;
	};
});
