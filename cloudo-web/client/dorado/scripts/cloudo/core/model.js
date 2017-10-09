/**
 * @author Alex Tong(mailto:alex.tong@bstek.com)
 */
(function () {

	var model = cloudo.model = {};

	model.BaseModel = $class({
		$className: "model.BaseModel",
		setParent: function (parent) {
			this._parent = parent;
		},
		getParent: function () {
			return this._parent;
		},
		//类似Backbone url方法
		url: function () {
			var id = this.id, parentModel = this.getParent(), url = "/" + id;
			return parentModel ? parentModel.url() + url : url;
		}
	});
	model.Value = $extend(model.BaseModel, {
		constructor: function (value) {
			this.value = value;
			this.id = cloudo.Core.newId();
		},
		/**
		 * 设置值
		 * 注：此值数据类型为简单类型
		 * @param value
		 */
		setValue: function (value) {
			this.value = value;
		},
		getValue: function () {
			return this.value;
		},
		toJSON: function () {
			return this.value;
		}
	});

	model.Event = $extend(model.BaseModel, {
		constructor: function (name, signature, code) {
			this.name = name;
			this.signature = signature;
			this.code = code;
		},
		setCode: function (code) {
			this.code = code;
		},
		getCode: function () {
			return this.code;
		},
		setSignature: function (signature) {
			this.signature = signature;
		},
		getSignature: function () {
			return this.signature
		},
		toJSON: function () {
			var result = {
				name: this.name,
				signature: this.signature,
				text: this.code
			};
			return result;

		}
	});
	model.Property = $extend(model.BaseModel, {
		$className: "cloudo.model.Property",
		constructor: function (name, value) {
			this.name = name;
			if (value) {
				this.setValue(value);
			}
		},
		/**
		 * 设置属性值
		 * @param {model.Value||model.Entity||model.Collection||String||Number||Boolean||Date} value
		 */
		setValue: function (value) {
			this.value = value;

			value && value.setParent && value.setParent(this);
		},
		/**
		 *  获得属性值
		 * @returns {model.Value||model.Entity||model.Collection||String||Number||Boolean||Date} value
		 */
		getValue: function () {
			return this.value;
		},
		toJSON: function () {
			var value = this.value, result;
			if (value && value instanceof Object && !(value instanceof Date)) {
				result = value.toJSON();
			} else {
				result = value;
			}
			return result;
		},
		url: function () {
			var id = this.id, parentModel = this.getParent(), url = "/" + id;
			if (parentModel) {
				if (parentModel instanceof model.Node) {
					url = "/" + parentModel.id + url;
				} else {
					url = parentModel.url() + url;
				}
			}
			return url;
		}
	});


	model.Property.HOLDER = {
		NODE: "cloudo.model.Node",
		LAYOUT: "cloudo.model.Layout",
		POSITION: "cloudo.model.Position"
	};

	model.Entity = $extend(model.BaseModel, {
		$className: "cloudo.model.Entity",
		constructor: function () {
			this.id = cloudo.Core.newId();
		},
		/**
		 * 增加一个Property
		 * @param {cloudo.model.Property} property
		 */
		addProperty: function (property) {
			var name = property.name;
			if (!name) return;
			property.setParent(this);
			if (!this.properties) {
				this.properties = new dorado.util.Map();
			}
			this.properties.put(name, property);
		},
		/**
		 * 按名称删除Property
		 *
		 * @param name
		 */
		removeProperty: function (name) {
			var properties = this.properties;
			properties && properties.remove(name);
		},
		removeAllProperty: function () {
			var properties = this.properties;
			properties && properties.clear();
		},
		/**
		 * 获得Property
		 * @param name
		 * @returns {cloudo.model.Property}
		 */
		findProperty: function (name) {
			var properties = this.properties;
			return properties ? properties.get(name) : null;
		},

		getPropertyValue: function (name) {
			var property = this.findProperty(name);
			if (property) {
				return property.getValue();
			}
		},

		toJSON: function () {
			var result = {}, properties = this.properties;
			properties && properties.eachKey(function (key, value) {
				var v = value.toJSON();
				if (v) {
					result[key] = v;
				}
			});
			return result;
		}
	});

	model.Collection = $extend(model.BaseModel, {
		$className: "cloudo.model.CollectionProperty",
		size: 0,
		constructor: function () {
			this.elements = new dorado.util.KeyedList(function (obj) {
				return obj.id
			});
		},
		/**
		 * 添加一个子元素
		 * @param {model.Value||model.Entity} element
		 * @param insertMode
		 * @param {model.Value||model.Entity} refElement
		 */
		addElement: function (element, insertMode, refElement) {
			var oldParent = element.getParent();
			oldParent && oldParent.removeElement(element.id);
			element.setParent(this.parent);
			this.elements.insert(element, insertMode, refElement);
			this.size = this.elements.size;
		},
		/**
		 * 根据ID删除一个元素
		 * @param id
		 */
		removeElement: function (id) {
			this.elements.removeKey(id);
			this.size = this.elements.size;
		},
		/**
		 * 返回键值对集合的迭代器。
		 * @return {dorado.util.KeyedListIterator} 键值对集合的迭代器。
		 */
		iterator: function () {
			return this.elements.iterator();
		},

		each: function (fn, scope) {
			return this.elements.each(fn, scope);
		},

		/**
		 * 将集成从所有的对象导出至一个数组中。
		 * @return {Array} 包含所有集合元素的数组。
		 */
		toArray: function () {
			return this.elements;
		},
		toJSON: function () {
			var result = [];
			this.elements.each(function (obj) {
				result.push(obj.toJSON());
			})

			return result;
		}
	});


	model.Layout = $extend(model.Entity, {
		$className: "cloudo.model.Layout"
	});
	model.Position = $extend(model.Entity, {
		$className: "cloudo.model.Position"
	});

	model.Node = $extend(model.Entity, {
		$className: "cloudo.model.Node",
		rid: null,
		id: null,
		/**
		 * 构造方法
		 *
		 * @param {String} rid
		 */
		constructor: function (rid) {
			this.rid = rid;
			this.id = cloudo.Core.newId();
		},

		/**
		 * 设置布局约束
		 * @param {model.Layout} layout
		 */
		setLayout: function (layout) {
			this.layout = layout;
			layout.setParent(this);
		},
		/**
		 *
		 * @returns {model.Layout}
		 */
		getLayout: function () {
			if (!this.layout) {
				var layout = new model.Layout();
				layout.setParent(this);
				this.layout = layout;
			}
			return  this.layout;
		},
		/**
		 * 设置位置约束
		 * @param {model.Position} position
		 */
		setPosition: function (position) {
			this.position = position;
			position.setParent(this);
		},
		/**
		 *
		 * @returns {model.Position}
		 */
		getPosition: function () {
			if (!this.position) {
				var position = new model.Position();
				position.setParent(this);
				this.position = position;
			}
			return this.position;
		},
		addEvent: function (event) {
			event.setParent(this);
			if (!this.events) {
				this.events = new dorado.util.Map();
			}
			var name = event.name;
			this.events.put(name, event);
		},
		findEvent: function (name) {
			var events = this.events;
			if (events) {
				return   events.get(name);
			}
		},
		allEvent: function () {
			if (!this.events) {
				this.events = new dorado.util.Map();
			}
			return this.events;
		},
		removeEvent: function (name) {
			if (this.events) {
				this.events.remove(name);
			}
		},
		/**
		 * 获得子节点列表
		 *
		 * @returns {dorado.util.KeyedList}
		 */
		allNode: function () {
			if (!this.nodes) {
				this.nodes = new dorado.util.KeyedList(function (obj) {
					return obj.id
				});
			}
			return this.nodes;
		},

		/**
		 *
		 * @param node
		 * @param insertMode
		 * @param refNode
		 */
		addNode: function (node, insertMode, refNode) {
			if (!node) return;
			var parent = node.getParent();
			parent && parent.removeNode(node);
			node.setParent(this);
			if (!this.nodes) {
				this.nodes = new dorado.util.KeyedList(function (obj) {
					return obj.id
				});
			}

			model.register(node);
			this.nodes.insert(node, insertMode, refNode);
		},

		/**
		 * 移除子节点
		 *
		 * @param node
		 * @returns {*}
		 */
		removeNode: function (node) {
			if (this.nodes) {
				this.nodes.remove(node);
				model.unregister(node);
				delete node['_parent'];
			}
		},
		/**
		 * 按ID获得指定节点
		 *
		 * @param id
		 * @returns {model.Node}
		 */
		findNode: function (id) {
			var nodes = this.nodes;
			if (nodes) {
				return nodes.get(id);
			}
		},

		eq: function (node) {
			return node.id == this.id;
		},

		parseLabel: function () {
			var parser = cloudo.labelParser.get(this.rid);
			return parser.parse(this);
		},
		/**
		 * 克隆Node
		 * @returns {cloudo.Node}
		 */
		clone: function () {
			var json = this.toJSON();
			return  cloudo.Parser.parseNode(json);
		},
		/**
		 * 将Node转换成一个JSON数据对象。
		 *
		 * @returns {Object}
		 */
		toJSON: function (option) {
			var result = option ? {rule: this.rid} : {
				id: this.id,
				rid: this.rid
			};
			var attrsName = option ? "attrs" : "properties";
			var properties = this.properties;
			if (properties && !properties.isEmpty()) {
				result[attrsName] = {};
				properties.eachKey(function (key, value) {
					var v = value.toJSON();
					if (v) {
						result[attrsName][key] = v;
					}
				})
			}

			var events = this.events;
			if (events && !events.isEmpty()) {
				result.events = [];
				events.eachKey(function (eventName, evt) {
					var v = evt.toJSON();

					if (v) {
						result.events.push(v);
					}
				})
			}

			var nodes = this.nodes;
			if (nodes && nodes.size > 0) {
				result.nodes = [];
				var it = nodes.iterator();
				while (it.hasNext()) {
					var node = it.next();
					if (node) {
						result.nodes.push(node.toJSON(option));
					}
				}
			}

			if (this.layout) {
				result.layout = this.layout.toJSON();
			}

			if (this.position) {
				result.position = this.position.toJSON();
			}

			if (this.uv_properties) {
				result.uv_properties = this.uv_properties;
			}

			if (this.meta) {
				result.meta = this.meta;
			}
			return result;
		}
	});

	model.ALL = {};
	/**
	 * 注册Node
	 * <p>
	 *     此方法一同注册所有子节点
	 * </p>
	 * @param {cloudo.model.Node} node
	 */
	model.register = function (node) {
		var it = node.allNode().iterator();
		while (it.hasNext()) {
			var n = it.next();
			this.register(n);
		}
		this.ALL[node.id] = node;
	};
	/**
	 *  注销Node
	 * @param node
	 */
	model.unregister = function (node) {
		if (!node) return;
		if (node instanceof model.Node) {
			var it = node.allNode().iterator();
			while (it.hasNext()) {
				var n = it.next();
				this.unregister(n);
			}
		}
		var nid = node instanceof Object ? node.id : node;
		delete this.ALL[nid];
	};
	model.findNode = function (id) {
		return   this.ALL[id];
	};
	model.findNodes = function (type, callback) {
		var list = [];
		this.eachKey(function (k, n) {
			if (n.rid == type) {
				list.push(n);
				if (callback) {
					callback.call(n, n);
				}
			}
		});

		return list;

	};

	/**
	 * 遍历所有键值对。
	 * @param {Function} fn 针对数组中每一个元素的回调函数。此函数支持下列两个参数:
	 * <ul>
	 * <li>id - {String} 当前遍历到的键。</li>
	 * <li>node - {Object} 当前遍历到的键值。</li>
	 * </ul>
	 * 另外，此函数的返回值可用于通知系统是否要终止整个遍历操作。
	 * 返回true或不返回任何数值表示继续执行遍历操作，返回false表示终止整个遍历操作。<br>
	 * 此回调函数中的this指向正在被遍历的数组。
	 *
	 */
	model.eachKey = function (fn) {
		if (!fn) return;
		var map = this.ALL;
		for (var k in map) {
			if (map.hasOwnProperty(k)) fn.call(this, k, map[k]);
		}
	};
	/**
	 *
	 * @param key 属性值
	 * @param type 规则ID
	 * @param keyProperty 属性名
	 * @returns {*}
	 */

	model.findParentNode = function (key, type, keyProperty) {
		var node;

		this.eachKey(function (k, n) {
			if (type) {
				keyProperty = keyProperty || "name";
				if (n.getPropertyValue(keyProperty) == key && n.rid == type) {
					node = n;
					return false;
				}
			} else {
				if (n.getPropertyValue("id") == key) {
					node = n;
					return false;
				}
			}


		});

		return node;
	}


})
();