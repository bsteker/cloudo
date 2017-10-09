/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-4-20
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */
(function () {
	cloudo.nodeOutputter = {
		_ALL: {},

		register: function (rid, outputter) {
			this._ALL[rid] = outputter;
		},

		unregister: function (rid) {
			delete this._ALL[rid];
		},

		get: function (rid) {
			return this._ALL[rid] || cloudo.DefaultNodeOutputter;
		}
	};
	var DATATYPE_ID_PREFIX = cloudo.Constant.DATATYPE_ID_PREFIX;
	var dataTypePropertyHandler = function (dataType, parentName) {
			var id, name = dataType, isArray = false;
			var scope = cloudo.Toolkits.parseDataTypeScope(dataType);
			if (/^\[.*\]$/.exec(dataType)) {
				isArray = true;
				name = dataType.substring(1, dataType.length - 1)
			}

			if (dataType == "SELF" || dataType == "[SELF]") {
				id = dataTypePropertyHandler(parentName).id;
			} else {
				id = scope === cloudo.dataType.scope.VIEW ? DATATYPE_ID_PREFIX + name : name;
			}

			return {
				value: isArray ? DATATYPE_ID_PREFIX + '[' + id + ']' : id,
				id: id,
				name: name,
				scope: scope
			};
		},
		referencePropertyHandler = function (reference) {
			var iDs = reference.split(",");
			if (iDs.length == 1) {
				return "GET_COMPONENT_REFERENCE_START'" + reference + "'GET_COMPONENT_REFERENCE_END";
			} else {
				var referenceArr = [];
				for (var i = 0; i < iDs.length; i++) {
					referenceArr.push("GET_COMPONENT_REFERENCE_START'" + iDs[i] + "'GET_COMPONENT_REFERENCE_END");
				}
				return referenceArr;
			}
		},
		stringArrayTypePropertyHandler = function (value) {
			return value.split(',');
		},
		mappingPropertyHandler = function (mapping) {
			var result = [];
			if (mapping && mapping.mapValues) {
				var keyProperty = mapping.keyProperty, valueProperty = mapping.valueProperty, mapValues = mapping.mapValues;
				for (var i = 0; i < mapValues.length; i++) {
					var entity = mapValues[i];
					result.push({key: entity[keyProperty],
						value: entity[valueProperty]});
				}
			}
			return result;
		},
		importNodeReplace = function (cid) {
			var node = cloudo.Toolkits.createNodeInstance("Label");
			node.addProperty(new cloudo.model.Property("text", "Import Element"));
			node.addProperty(new cloudo.model.Property("exClassName", "c-import"));
			node.id = cid;
			return node;
		},
		placeHolderNodeReplace = function (cid) {
			var node = cloudo.Toolkits.createNodeInstance("Label");
			node.addProperty(new cloudo.model.Property("text", "PlaceHolder Element"));
			node.addProperty(new cloudo.model.Property("exClassName", "c-placeHolder"));
			node.id = cid;
			return node;
		};
	/**
	 * 默认节点输出器
	 *
	 * @type {{output: Function}}
	 */
	cloudo.DefaultNodeOutputter = {
		/**
		 * 输出节点配置
		 * @param {cloudo.Node} node
		 */
		output: function (node) {
			var settings = cloudo.Settings;
			var _dependPkgs = [], _globalDataTypes = [];

			var auxiliaryRuleNames = cloudo.Rule.auxiliaryRuleNames;

			/**
			 * @param {cloudo.Node} _node
			 */
			function parseNode(_node) {
				if (!_node) return;

				if (auxiliaryRuleNames.indexOf(_node.rid) >= 0) {
					if (_node.rid == "Import") {
						_node = importNodeReplace(_node.id);
					} else if (_node.rid == "PlaceHolder") {
						_node = placeHolderNodeReplace(_node.id);
					} else {
						return;
					}
				}

				var nodes = _node.allNode().toArray(),
					rid = _node.rid,
					rule = cloudo.Rule.get(rid),
					propertiesRules = cloudo.Rule.getProperties(rid),
					result = {},
					properties = _node.properties;

				properties && properties.eachKey(function (key, value) {
					if (!result) result = {};
					var v = value.toJSON();

					var propertyRule = _.findWhere(propertiesRules, {name: key});
					if (propertyRule) {
						var editorType = propertyRule.editorType;
						if (editorType) {
							if (editorType === "array[string]") {
								v = stringArrayTypePropertyHandler(v);
							} else if (editorType) {
								var editorMeta = cloudo.Rule.getEditorMeta(editorType);
								if (editorMeta.type === "reference") {
									v = referencePropertyHandler(v);
								}
							}
						}
					}
					if (key === "dataType") {
						var dataType;
						if (v === "SELF" || v === "[SELF]") {
							var parentNode = _node.getParent();
							var parentName = parentNode.getPropertyValue("name");
							if (parentName) {
								dataType = dataTypePropertyHandler(v, parentName);
							}
						} else {
							dataType = dataTypePropertyHandler(v);
						}

						v = dataType.value;
						if (dataType.scope === cloudo.dataType.scope.GLOBAL && _globalDataTypes.indexOf(dataType.name) < 0) {
							_globalDataTypes.push(dataType.name);
						}
					}

					if (key == "editorType" && v) {
						result["editor"] = {$type: v};

					}


					if (/.*(Width|Height|Count)$/.exec(key)) {
						v = parseInt(v);
					}

					if (key == "dataProvider") {
						v = "DATA_PROVIDER_START" + v + "DATA_PROVIDER_END";
					}

					if (key == 'mapping') {
						v = mappingPropertyHandler(v);
					}
					if (key != 'dataProvider' || settings.outputDataProvider) {
						if (v) {
							if (v == "true") {
								v = true
							}
							if (v == "false") {
								v = false
							}
							result[key] = v;
						}
					}


				});


				result.$type = rule.jsShortType ? rule.jsShortType : rule.jsPrototype;

				if (rule.properties) {
					var hasCaptionProp, hasIconProp;

					//TODO 此处需要改进
					$(rule.properties).each(function (k, v) {
						if (v.name == "caption") {
							hasCaptionProp = true;
						}
						if (v.name == "icon") {
							hasIconProp = true;
						}
					});

					if (hasCaptionProp && hasIconProp && !result.caption && !result.icon) {
						result.caption = rule.label;
					} else if (hasCaptionProp && !hasIconProp && !result.caption && !(/.*Column/.exec(rid))) {
						result.caption = rule.label;
//                    } else if (/.*[Label,Link].*/.exec(rid) && !result.text) {
//                        result.text = rule.label;
					} else if (!hasCaptionProp && hasIconProp && !result.icon) {
						result.icon = "url(>skin>common/icons.gif) -160px -260px";
					}


				}


				delete result["creationType"]
				delete result["matchType"]
				delete result["autoCreatePropertyDefs"]


				var children = rule.children, j = 0;
				if (children) {
					for (var i = 0; i < children.length; i++) {
						var child = children[i];
						var memberAggregated = (typeof child.memberAggregated == "undefined");
						if (!result[child.property]) {
							result[child.property] = memberAggregated ? [] : null;
						}

						if (j < nodes.length) {
							if (child.fixed) {
								//与规则一同创建
								var childName = child.name;

								var n = nodes[j];

								if (n.rid.indexOf(childName) < 0) {
									continue;
								}

								if (memberAggregated) {
									var _nodes = n.allNode(),
										_it = _nodes.iterator();
									while (_it.hasNext()) {
										var childOut = parseNode(_it.next());
										childOut && result[child.property].push(childOut);
									}
								} else {
									if (n) {
										var sNodes = n.allNode();
										if (sNodes.size > 0) {
											var childOut = parseNode(sNodes.getFirst());
											if (childOut) {
												result[child.property] = childOut;
											}

										} else {
											delete  result[child.property];
										}
									} else {
										delete  result[child.property];
									}
								}
							} else {
								if (nodes[j]) {
									if (memberAggregated) {
										while (j < nodes.length) {
											var childOut = parseNode(nodes[j]);
											childOut && result[child.property].push(childOut);
											j++;
										}
										break;
									} else {
										var childOut = parseNode(nodes[j]);
										if (childOut) {
											result[child.property] = childOut;
										}
									}
								} else {
									delete  result[child.property]
								}
							}
						} else {
							break;
						}
						j++;

					}
				}
				if (!result.$type || result.$type == 'Default') {
					delete  result['$type'];
				}

				if (result.sections && result.sections.length == 0) {
					delete result["sections"];
				}

				if (!result.control && rid == "Section") {
					delete result["control"];
				}


				result.$cloudoID = _node.id;
				var positioned = rule.positioned, layoutable = rule.layoutable;
				if (layoutable && _node.layout) {
					var layout = _node.layout.toJSON();
					result.layout = layout;
					var layoutType = layout.type;
					layoutType = layoutType || cloudo.Constant.DEFAULT_LAYOUT;
					result.layout.$type = cloudo.Rule.getLayoutRuleByName(layoutType).jsShortType;
					delete result.layout['type'];
				}

				if (positioned && _node.position) {
					result.layoutConstraint = _node.position;
				}
				if (settings.outputEvents) {
					var events = _node.allEvent();
					if (!events.isEmpty()) {
						var listener = result.listener = {};
						events.eachKey(function (eventName, evt) {
							var signatureStr = evt.getSignature(), code = evt.getCode(), autowire = false;
							var signatureArr = signatureStr.split(',');
							for (var i = 0, len = signatureArr.length; i < len; i++) {
								if ('self,arg'.indexOf(signatureArr[i]) < 0) {
									autowire = true;
									break;
								}
							}
							var fn = 'CFunStart' + signatureStr + 'CFunCut' + code + 'CFunEnd';
							if (autowire) {
								listener[eventName] = {
									"fn": fn,
									"options": {
										"autowire": autowire
									}
								};
							} else {
								listener[eventName] = fn;
							}
						})
					}
				}
				if (rule.dependsPackage) {
					var pckName = rule.dependsPackage;
					if (_dependPkgs.indexOf(pckName) < 0)  _dependPkgs.push(pckName);
				}


				return  result;
			}

			return {config: parseNode(node), dependsPackages: _dependPkgs, globalDataTypes: _globalDataTypes};
		}

	};


	cloudo.DataTypeOutputter = {
		output: function (node) {
			var outputter = cloudo.nodeOutputter.get(node.rid);
			
			var dataType = outputter.output(node);
			
			var propertyDefs = dataType.config.propertyDefs;
			if (propertyDefs) {
				dataType.id = DATATYPE_ID_PREFIX + dataType.name;
			}
			delete dataType.config["parent"];
			return dataType;
		}
	}
	/**
	 * Model节点输出器
	 * <p>DataType配置规则输出是需要定义id和重新定义自引用配置</p>
	 * @type {{output: Function}}
	 */
	cloudo.ModelNodeOutputter = {

		output: function (model) {
			var nodes = model.allNode().toArray(), rule = cloudo.Rule.get(model.rid),
				result = model.toJSON().attrs || {},
				children = rule.children;

			var _dependPkgs = [], _globalDataTypes = [];

			function dataTypeHandler(dataType) {
				var propertyDefs = dataType.propertyDefs;
				if (propertyDefs) {
					dataType.id = DATATYPE_ID_PREFIX + dataType.name;
					for (var i = 0; i < propertyDefs.length; i++) {
						var def = propertyDefs[i];
						if (def.dataType && def.dataType.indexOf('SELF') >= 0) {
							def.dataType = def.dataType.replace("SELF", dataType.name);
						}
					}
				}
			}

			for (var i = 0; i < children.length; i++) {
				var child = children[i], memberRuleIDs = child.memberRuleIDs;
				result[child.property] = new Array();
				for (var j = 0; j < memberRuleIDs.length; j++) {
					var ruleID = memberRuleIDs[j];
					nodes.each(function () {
						if (this.rule == ruleID) {
							var outputter = cloudo.nodeOutputter.get(ruleID);
							var config = outputter.output(this);

							ruleID == 'DataType' && dataTypeHandler(config.config);
							result[child.property].push(config.config);
							var dependsPackages = config.dependsPackages;
							$(dependsPackages).each(function (_i, _v) {
								_dependPkgs.indexOf(_v) < 0 && _dependPkgs.push(_v);
							});
							var globalDataTypes = config.globalDataTypes;
							$(globalDataTypes).each(function (_i, _v) {
								_globalDataTypes.indexOf(_v) < 0 && _globalDataTypes.push(_v);
							});
						}
					});
				}
			}

			return   {config: result, dependsPackages: _dependPkgs, globalDataTypes: _globalDataTypes};


		}

	};

	


})();

