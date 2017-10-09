/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-9
 * Time: 上午10:32
 * To change this template use File | Settings | File Templates.
 */
(function () {
	/**
	 * 属性值编辑器管理器接口
	 *
	 */
	cloudo.propertyEditor = {
		_ALL: {},
		propertyTypes: {
			DIRECT: "Node",
			LAYOUT: "Layout",
			POSITION: "Position"
		},
		/**
		 * 注册值编辑器
		 * @param exp 规则表达式
		 * @param className 编辑器ClassName
		 */
		register: function (exp, className) {
			this._ALL[exp] = className;
		},
		/**
		 * 注销值编辑器
		 * @param exp
		 */
		unregister: function (exp) {
			delete this._ALL[exp];
		},
		/**
		 * 获得值编辑器实例
		 * 注：
		 * 属性编辑器可通过此方法直接获得属性编辑器
		 * @param rid
		 * @param name
		 * @param parentName
		 * @param config
		 * @return {}
		 */
		get: function (rid, name, parentName, config) {
			var _ALL = this._ALL, constr;

			var ridname= "rid[" + rid + "].name[" + name + "]";
			constr=_ALL[ridname];
			if (!(name == "parameter") && !constr) {
				constr = _ALL["name[" + name + "]"];
				if (!constr) {
					var propertyRule = cloudo.Rule.getProperty(rid, name, parentName);
					if (propertyRule) {
						var editorType = propertyRule.editorType;
						if (editorType) {
							var editorMeta = cloudo.Rule.getEditorMeta(editorType);
							constr = _ALL["editorType[" + editorMeta.type + "]"];
						}
					}
				}
			}
			config = config || {};
			if (!constr) {
				constr = "cloudo.widget.DefaultPropertyEditor";
			}

			cloudo.Toolkits.merge(config, {
				rid: rid, name: name,
				parentName: parentName,
				onPost: function (self, arg) {
					if (self.get("autoPost")) {
						self.commit && self.commit();
					}
				}
			});

			return new (eval(constr))(config);
		}

	};

	cloudo.widget.AbstractPropertyEditor = $extend(dorado.widget.AbstractEditor, {
		$className: "cloudo.widget.AbstractPropertyEditor",
		ATTRIBUTES: {
			autoPost: {
				defaultValue: true
			},
			propertyType: {
				defaultValue: cloudo.propertyEditor.propertyTypes.DIRECT
			},
			/**
			 * 规则ID
			 * 可选值：Node.rid,Layout.rid,Position.rid
			 */
			rid: {},
			/**
			 * 属性名称
			 */
			name: {},
			/**
			 * parent属性名称
			 */
			parentName: {},
			/**
			 * 部分属性编辑器需通过node获得初始化数据
			 * 如:dataPath的编辑器需要通过node的dataSet或者dataType获得dataPath树
			 */
			node: {}
		},
		getEditorMeta: function () {
			var rid = this.get("rid"), name = this.get("name"),
				parentName = this.get("parentName"), propertyMeta;

			propertyMeta = cloudo.Rule.getProperty(rid, name, parentName);
			if (propertyMeta && propertyMeta.editorType) {
				return  cloudo.Rule.getEditorMeta(propertyMeta.editorType);
			}
		},
		getValue: function () {
			return this.get("value");
		},
		commit: function () {
			if (this.get("autoPost")) {
				var value = this.getValue(),
					propertyType = this.get("propertyType"),
					propertyName = this.get("name"),
					parentName = this.get("parentName"),
					node = this.get("node");
				var property = new cloudo.model.Property(propertyName, value);
				var sendFn = cloudo.viewConfig["set" + propertyType + "Property"];
				sendFn(node, property, parentName);
			}
		}
	});


	cloudo.widget.DefaultPropertyEditor = $extend([  dorado.widget.TextEditor, cloudo.widget.AbstractPropertyEditor], {
		$className: "cloudo.widget.DefaultPropertyEditor"
	});


})
();