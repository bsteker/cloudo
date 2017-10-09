/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-23
 * Time: 下午3:24
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var cloudo = window.cloudo, $model = cloudo.model, updateDataTypeTimestamp = 0, completeDataTypeTimestamp = 0;

	//var REG_DATATYPE_Rule = /.*DataType$/;

	var toolkits = {
		/**
		 * 控件ID转NodeID
		 * @param controlID
		 * @returns {String}
		 */
		translateControlID: function (controlID) {
			var node = $model.findParentNode(controlID);
			if (node) {
				return node.id;
			}
		},
		translateDataTypeName: function (name) {
			var nid = "";
			$model.eachKey(function (id, n) {
				if (cloudo.dataType.isDataType(n.rid) && n.getPropertyValue("name") == name) {
					nid = id;
					return false;
				}
			});
			return nid;

		},
		getRid: function (nid) {
			var node = $model.findNode(nid);
			if (node) {
				return node.rid;
			}
		},
		/**
		 * 获得所有控件ID列表
		 * @returns {[String]}
		 */
		getControlIds: function () {
			var ids = [];
			$model.eachKey(function (key, node) {
				var id = node.getPropertyValue('id');
				id && ids.push(id);
			});
			return ids;
		},

		/**
		 * 获得属性可选值列表
		 * @param nid  节点ID
		 * @param propertyName 属性名称
		 * @param parentPropertyName  父属性名称可以null
		 * @returns {Array}
		 */
		getPropertyValues: function (nid, propertyName, parentPropertyName) {
			var values = [], editorMeta = toolkits._parsePropertyEditorMeta(nid, propertyName, parentPropertyName);
			if (editorMeta && editorMeta.type == "reference") {
				$model.eachKey(function (id, n) {
					var rid = n.rid, isAction = editorMeta.rule == 'Action';
					if ((!isAction && rid == editorMeta.rule) || (isAction && /.*Action$/.exec(rid))) {
						var value = n.getPropertyValue(editorMeta.property);
						value && values.push(value);
					}
				});

			} else if (editorMeta && editorMeta.type == "enum") {
				values = editorMeta.enumValues;
			}

			return values;
		},
		/**
		 *  获得属性值信息
		 *  返回值介绍：
		 *  <pre>
		 *    1.非reference
		 *    {
         *      editorType："boolean",
         *      currentValue:"false",
         *      defaultValue:"true",
         *     }
		 *    2.reference
		 *    {
         *      editorType："reference",
         *      currentValue:"dataSet1",
         *      defaultValue:null,
         *      reference:{
         *           rule: "DataSet",
         *           property: "id",
         *           jsPrototype: "dorado.widget.DataSet",
         *           node:{cloudo.Node},
         *           nodeId:"_c_uid_8"
         *            }
         *    }
		 * </pre>
		 * @param nid 节点ID
		 * @param propertyName 属性名称
		 * @param parentName  父属性名称可以null
		 * @returns {}
		 */
		getPropertyValueMeta: function (nid, propertyName, parentName) {
			var editorMeta = toolkits._parsePropertyEditorMeta(nid, propertyName, parentName);
			var currentValue, node = $model.findNode(nid);
			if (parentName) {
				var parentProperty = node.getPropertyValue(parentName);
				if (parentProperty) {
					currentValue = parentProperty.getPropertyValue(propertyName);
				}
			} else {
				currentValue = node.getPropertyValue(propertyName);
			}
			var valueMeta = {editorType: editorMeta.editorType, defaultValue: editorMeta.defaultValue, currentValue: currentValue};
			if (editorMeta && editorMeta.type == "reference") {
				valueMeta.editorType = "reference";
				var rule = cloudo.Rule.get(editorMeta.rid);
				var reference = {
					rule: editorMeta.rule,
					property: editorMeta.prototype,
					jsPrototype: rule.jsPrototype
				};

				valueMeta.jsPrototype = rule.jsPrototype;
				if (currentValue) {

					var vNode;
					if (editorMeta.prototype == "id") {
						vNode = $model.findParentNode(currentValue);
					} else if (editorMeta.rule == "DataType" && editorMeta.prototype == "name") {
						vNode = $model.findParentNode(currentValue, "DataType")
					}

					if (vNode) {
						reference.node = vNode;
						reference.nodeId = vNode.id;
						var vNodeRule = cloudo.Rule.get(vNode.rid);
						reference.jsPrototype = vNodeRule.jsPrototype
					}
				}

				valueMeta.reference = reference;
			}

			return valueMeta;
		},
//=============================================================================================================================================================

		/**
		 * 获得DataType域
		 * @param name
		 * @returns {string}
		 */
		parseDataTypeScope: function (name) {
			if (name) {
				var dataTypeName = name;
				if (/^\[.*\]$/.exec(dataTypeName)) {
					dataTypeName = dataTypeName.substring(1, dataTypeName.length - 1);
				}
				var scope = toolkits.getDataTypeNames();
				var scopeArry = [
					{dataTypes: scope.base, name: 'base'},
					{dataTypes: scope.view, name: 'view'},
					{dataTypes: scope.global, name: 'global'}
				];
				for (var i = 0; i < scopeArry.length; i++) {
					var group = scopeArry[i];
					var groupName = group.name, dataTypes = group.dataTypes;
					for (var j = 0, len = dataTypes.length; j < len; j++) {
						if (dataTypes[j] === dataTypeName) {
							return groupName;
						}
					}
				}
			}
		},


		/**
		 * 根据Datatype节点ID获得PropertyDef列表 这里默认包含parent DataType属性列表
		 *
		 * @param nid
		 * @returns {Array}
		 */
		getDataTypePropDefNames: function (nid) {
			var propDefNames = [], node = $model.findNode(nid);
			if (!node)
				return propDefNames;
			var dataTypeNode = this.getDataTypeByName(node.getPropertyValue("name"));
			if (dataTypeNode) {
				var dataTypeParser = cloudo.dataType.find(dataTypeNode.rid);
				dataTypeParser.eachProperty(dataTypeNode, function (propertyNode) {
					if (propertyNode.rid.indexOf("Reference") < 0) {
						var name = propertyNode.getPropertyValue("name");
						name && propDefNames.push(name);
					}
				});
			}

			return propDefNames;
		},
		/**
		 * 根据DataTypeName获得DataType完整对象
		 * @param name
		 * @returns {cloudo.Node}
		 */
		getDataTypeByName: function (name) {
			if (/^\[.*\]$/.test(name)) {
				name = name.substring(1, name.length - 1);
			}
			var node, json, groupName = toolkits.parseDataTypeScope(name);
			if (groupName == "global") {
				json = cloudo.portal.globalDataType(name);
			} else if (groupName == "view") {
				var nid = this.translateDataTypeName(name);
				node = $model.findNode(nid);
				if (node.getPropertyValue("parent")) {
					var jsonMap = toolkits._dataTypesToJsonMap();
					json = cloudo.portal.dataTypeCompleteJSON(jsonMap, name);
				}
			}
			if (json) {
				node = cloudo.Parser.parseNode(JSON.parse(json));
			}
			return node;
		},
		/**
		 * 获得DataType名称列表
		 * 注意：入参groupName（null=="ALL"） 返回全部
		 * all:{
         *   base:[],
         *   view:[],
         *   global:[] 
         *}
		 * @param scopeName
		 * @returns {*}
		 */
		getDataTypeNames: function (scopeName) {
			var dataType = this._dataType || {}, scope = cloudo.dataType.scope;

			function updateViewDataTypes() {
				if ((new Date() - updateDataTypeTimestamp) > 1000) {
					var viewNames = [];

					$model.eachKey(function (id, node) {
						if (cloudo.dataType.isDataType(node.rid)) {
							var name = node.getPropertyValue("name");
							name && viewNames.push(name);
						}
					});

					dataType[scope.VIEW] = viewNames;
				}
			}

			function updateGlobalDataTypes() {
				if ((new Date() - updateDataTypeTimestamp) > 3000) {
					dataType[scope.GLOBAL] = cloudo.portal.globalDataTypes();
				}
			}


			dataType[scope.BASE] = cloudo.dataType.base;
			updateViewDataTypes(true);
			updateGlobalDataTypes(true);
			updateDataTypeTimestamp = new Date();


			this._dataType = dataType;

			return scopeName ? dataType[scopeName] : dataType;

		},
		/**
		 * 获得dataPath对应的dataType
		 * @param rootDataTypeName   根DataTypeName
		 * @param dataPath
		 * @returns {cloudo.model.Node}
		 */
		getDataPathDataType: function (rootDataTypeName, dataPath) {
			var toolkits = this, rootDataType = toolkits.getDataTypeByName(rootDataTypeName),
				dataPath = dorado.DataPath.create(dataPath), dataType = rootDataType;

			dataPath.compile();
			function parseDataType(section, propertyNode) {
				if (section.property === propertyNode.getPropertyValue("name")) {
					var dataTypeName = propertyNode.getPropertyValue("dataType");
					if (dataTypeName) {
						dataType = toolkits.getDataTypeByName(dataTypeName);
						return false;
					}
				}
				return true;
			}

			var compiledPath = dataPath._compiledPath;
			for (var i = 0; i < compiledPath.length; i++) {
				var section = compiledPath[i], isContinue = true;
				if (section.property) {
					var dtParser = cloudo.dataType.find(dataType.rid);
					dtParser && dtParser.eachProperty(dataType, function (propertyNode) {
						if (isContinue) {
							isContinue = parseDataType(section, propertyNode);
						}
					});

				}
				if (!dataType) {
					break;
				}
			}


			return dataType;
		},
		/**
		 * 创建Node实例
		 * 注：此方法主要提供给子页面调用
		 * @param rid 规则ID
		 * @returns {cloudo.model.Node}
		 */
		createNodeInstance: function (rid) {
			var rule = cloudo.Rule.get(rid);
			var node = new cloudo.model.Node(rid),
				children = rule.children;
			if (children) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i];
					if (child.fixed) {
						var ids = child.memberRuleIDs, id = ids[0];
						var n = new cloudo.model.Node(id);
						node.addNode(n);
					}
				}
			}
			return node;
		},
		_dataTypesToJsonMap: function () {
			if ((new Date() - completeDataTypeTimestamp) > 2000) {
				var privateDataTypeNodes = $model.findNodes("DataType"), map = {};
				jQuery.each(privateDataTypeNodes, function () {
					var dataTypeObj = this.toJSON(true);
					map[dataTypeObj.attrs.name] = JSON.stringify(dataTypeObj);
				});
				toolkits._dataTypeJsonMap = map;
				completeDataTypeTimestamp = new Date();
			}
			return toolkits._dataTypeJsonMap;
		},
		_parsePropertyEditorMeta: function (nid, propertyName, parentPropertyName) {
			var node = $model.findNode(nid);
			var editorMeta = {editorType: "string"};
			var propertyData = cloudo.Rule.getProperty(node.rid, propertyName, parentPropertyName);
			if (propertyData && propertyData.editorType) {
				editorMeta = cloudo.Rule.getEditorMeta(propertyData.editorType);
				editorMeta.editorType = propertyData.editorType;
				editorMeta.defaultValue = propertyData.defaultValue;
			}

			return editorMeta;
		},
		merge: function (toObj, fromObj, force) {
			$.each(fromObj, function (key, value) {
				if (typeof toObj[key] === "undefined") {
					toObj[key] = value;
				} else {
					if (force) toObj[key] = value;
				}
			});
			return toObj;
		}

	};

	cloudo.Toolkits = toolkits;


})();