/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-15
 * Time: 下午6:46
 * To change this template use File | Settings | File Templates.
 */
(function () {
	//自动生成数据节点
	var autoGenerateSubNodes = function (node) {
		var rid = node.rid, $model = cloudo.model, newNode;
		if (rid == 'DataGrid' || rid == 'AutoForm' || "DataTreeGrid") {
			newNode = node.clone();

			var dataSet = node.getPropertyValue('dataSet'),
				dataType = node.getPropertyValue('dataType'),
				dataPath = node.getPropertyValue('dataPath'),
				dataTypeNode, propertyArr = [];

			if (!dataType && dataSet) {
				var dataSetNode = cloudo.model.findParentNode(dataSet);
				if (dataSetNode) {
					dataType = dataSetNode.getPropertyValue('dataType');
					if (dataPath) {
						dataTypeNode = cloudo.Toolkits.getDataPathDataType(dataType, dataPath);
					}
				}
			}

			if (!dataTypeNode && dataType) {
				if (/^\[.*\]$/.exec(dataType)) {
					dataType = dataType.substring(1, dataType.length - 1);
				}
				dataTypeNode = cloudo.Toolkits.getDataTypeByName(dataType);
			}

			if (dataTypeNode) {
				function doPush(pNode) {
					var propDataType = pNode.getPropertyValue("dataType");

					if (/^\[.*\]$/.exec(propDataType)) {
						return;
					} else if (propDataType) {
						var dataTypeGroup = cloudo.Toolkits.parseDataTypeScope(propDataType);
						if (dataTypeGroup != "base") {
							return;
						}
					}
					var name = pNode.getPropertyValue("name");
					name && propertyArr.push(name);
				}

				var dataTypeParser = cloudo.dataType.find(dataTypeNode.rid);
				dataTypeParser.eachProperty(dataTypeNode, function (propertyNode) {
					if (propertyNode.rid.indexOf("Reference") < 0) {
						doPush(propertyNode);
					}
				});


			}
			var elementRid = (rid != 'AutoForm') ? 'DataColumn' : 'AutoFormElement';
			var containerNode = newNode;
			var nodes = newNode.allNode(), haveMap = {};
			if (rid == 'DataTreeGrid'){
				var dtgFind = false;
				if (nodes) {
					var nodeArray = nodes.toArray();
					for (ni=0; ni<nodeArray.length; ni++){
						if (nodeArray[ni].rid == "DataTreeGrid/Wrapper.Columns"){
							containerNode = nodeArray[ni];
							nodes = containerNode.allNode();
							dtgFind = true;
							break;
						}
					}
				}
				if (!dtgFind) {
					return;
				}
			}
			//获得已有的属性列表
			if (nodes && nodes.size > 0) {
				var it = nodes.iterator();
				while (it.hasNext()) {
					var sNode = it.next();
					if (sNode.rid == elementRid) {
						var propertyName = sNode.getPropertyValue('property');
						if (propertyName) {
							haveMap[propertyName] = true;
						}
					}
				}
			}
			//add child node to parent
			for (var i = 0, len = propertyArr.length; i < len; i++) {
				var name = propertyArr[i];
				if (!haveMap[name]) {
					var elementNode = cloudo.Toolkits.createNodeInstance(elementRid);
					elementNode.addProperty(new cloudo.model.Property('name', name));
					elementNode.addProperty(new cloudo.model.Property('property', name));
					containerNode.addNode(elementNode);
				}
			}

			cloudo.viewConfig.replaceNode(node, newNode);
			return;
		}

		if (rid == 'DataType') {
			var json = node.toJSON(true);
			var result = cloudo.portal.dataTypeReflection(JSON.stringify(json));
			var newJson = JSON.parse(result);
			newNode = cloudo.Parser.parseNode(newJson);
			cloudo.viewConfig.replaceNode(node, newNode);
		}
	};

	function valueChanged(holder, property, defaultValue) {
		var name = property.name, value = property.value,
			oldProperty = holder.findProperty(name), changed = true;
		if ((oldProperty && oldProperty.value == value) ||
			(!oldProperty && !value) ||
			(!oldProperty && value == defaultValue)) {
			changed = false;
		}
		return changed;
	}


	var viewConfig = {
		clientType: cloudo.Constant.CLIENT_TYPE_DESKTOP,
		url: null,
		name: "", _cIndex: -1,
		_cleanListeners: [],
		isClean: function () {
			var cIndex = cloudo.commandExecutor.getIndex();
			return cIndex == this._cIndex;
		},
		markClean: function () {
			var cIndex = cloudo.commandExecutor.getIndex();
			this._cIndex = cIndex;
			_.each(this._cleanListeners, function (listener) {
				listener();
			})
		},
		onClean: function (fn) {
			this._cleanListeners.push(fn);
		},
		/**
		 * 初始化
		 * @param {Object} config
		 */
		init: function (config) {
			var parser = cloudo.Parser, constant = cloudo.Constant;
			if (config) {
				viewConfig.url = config.url;
				viewConfig.name = config.name || "";
				viewConfig.clientType = config.clientType || constant.CLIENT_TYPE_DESKTOP;

				var root = viewConfig.root;
				root && cloudo.model.unregister(root);
				root = parser.parseNode(config.data);
				cloudo.model.register(root);
				viewConfig.root = root;
			}

		},
		isTouch: function () {
			return this.clientType === cloudo.Constant.CLIENT_TYPE_TOUCH;
		},
		isModel: function () {
			return this.clientType === cloudo.Constant.CLIENT_TYPE_MODEL;
		},
		isDesktop: function () {
			return this.clientType === cloudo.Constant.CLIENT_TYPE_DESKTOP;
		},
		/**
		 * 获得View 跟节点
		 *
		 * @returns {*}
		 */
		getRoot: function () {
			return viewConfig.root;
		},
		/**
		 *
		 * @returns {cloudo.Node}
		 */
		getViewNode: function () {
			var node, nodes = this.root.allNode();
			var it = nodes.iterator();
			while (it.hasNext()) {
				var n = it.next();
				if (n.rid == 'DefaultView') {
					node = n;
					break;
				}
			}
			if (!node) {
				node = new cloudo.model.Node('DefaultView')
			}
			return node;
		},
		/**
		 *
		 * @returns {cloudo.Node}
		 */
		getModelNode: function () {
			var node, nodes = this.root.allNode();

			var it = nodes.iterator();
			while (it.hasNext()) {
				var n = it.next();
				if (n.rid == 'Model') {
					node = n;
					break;
				}
			}
			if (!node) {
				node = new cloudo.Node('Model')
			}
			return node;
		},
		/**
		 * 添加节点
		 * <p>
		 *   注：所有新增节点操作都应调用此接口
		 *   本方法实现
		 *   1.新增节点和子节点生成ID
		 *   2.注册新增节点
		 *   本方法不实现command相关操作，command操作应在外面自行实现。
		 *   原因：此方法也对command开放.
		 *
		 *   当前节点：新增节点
		 * </p>
		 * @param node
		 * @param parentNode
		 * @param insertMode
		 * @param refNode
		 */
		addNode: function (node, parentNode, insertMode, refNode) {

			var command = new cloudo.AddNodeCommand(node, parentNode, insertMode, refNode);
			$commandExecutor.add(command);
		},
		/**
		 * 删除节点
		 * <p>
		 *   注：所有删除节点操作都应调用此接口
		 *   本方法不实现command相关操作。
		 *   command操作应在外面自行实现。
		 *   原因：此方法也对command开放.
		 *
		 *   当前节点：删除节点的父节点
		 * </p>
		 * @param node
		 */
		removeNode: function (node) {
			if ($nodeHelper.canRemove(node)) {
				if (typeof node == "string") {
					node = cloudo.model.findNode(node);
				}

				var parentNode = node.getParent();
				var command = new cloudo.RemoveNodeCommand(node, parentNode);
				$commandExecutor.add(command);
			}
		},
		/**
		 * 移动节点
		 * <p>
		 *   注：所有移动节点操作都应调用此接口
		 *   本方法不实现command相关操作。
		 *   command操作应在外面自行实现。
		 *   原因：此方法也对command开放
		 * </p>
		 * @param {cloudo.model.Node} node
		 * @param {cloudo.model.Node} newParent
		 * @param {String} insertMode
		 * @param {cloudo.model.Node} refNode
		 */
		moveNode: function (node, newParent, insertMode, refNode) {
			var oldParent = node.getParent();
			if (oldParent && oldParent.id == newParent.id && !insertMode) {
				return;
			}


			var command = new cloudo.MoveNodeCommand(node, newParent, insertMode, refNode);
			$commandExecutor.add(command);
		},
		replaceNode: function (node, newNode) {
			var command = new cloudo.ReplaceNodeCommand(node, newNode);
			$commandExecutor.add(command);
		},
		/**
		 * 设置Node对象属性
		 * @param {cloudo.model.Node} node
		 * @param {cloudo.model.Property} property
		 * @param {String}  parentName
		 */
		setNodeProperty: function (node, property, parentPropertyName) {
			var parentProperty;
			if (parentPropertyName) {
				parentProperty = node.findProperty(parentPropertyName);
				if (!parentProperty) {
					parentProperty = new cloudo.model.Property(parentPropertyName, new cloudo.model.Entity());
					node.addProperty(parentProperty);
				}
			}

			var holder = parentProperty ? parentProperty.getValue() : node;
			var propertyName = property.name;

			var defaultValue = cloudo.Rule.getPropertyDefaultValue(node.rid, propertyName, parentPropertyName);

			if (valueChanged(holder, property, defaultValue)) {
				var oldProperty = holder.findProperty(propertyName);
				var command = new cloudo.NodePropertyCommand(node, property, oldProperty, holder == node ? null : holder, defaultValue);
				$commandExecutor.add(command);
			}
		},

		/**
		 * 设置Layout对象属性
		 * @param {cloudo.model.Node} node
		 * @param {cloudo.model.Property} property
		 * @param {cloudo.model.Layout||cloudo.model.Entity} parent
		 */
		setLayoutProperty: function (node, property, parent) {
			var propertyName = property.name, layout = node.getLayout();
			var type = layout.getPropertyValue('type') || cloudo.Constant.DEFAULT_LAYOUT;
			var ruleID = cloudo.Rule.translateLayoutRuleName(type),
				parentName = parent ? parent.getParent().name : null;
			var defaultValue = cloudo.Rule.getPropertyDefaultValue(ruleID, propertyName, parentName);
			var holder = parent || layout;
			if (valueChanged(holder, property, defaultValue)) {
				var oldProperty = holder.findProperty(propertyName);
				var command = new cloudo.LayoutPropertyCommand(node, property, oldProperty, parent, defaultValue);
				$commandExecutor.add(command);
			}
		},
		/**
		 * 设置Position对象属性
		 * @param {cloudo.model.Node} node
		 * @param {cloudo.model.Property} property
		 * @param {cloudo.model.Layout||cloudo.model.Entity} parent
		 */
		setPositionProperty: function (node, property, parent) {
			var holder = parent || node.getPosition();
			var propertyName = property.name, ruleID = cloudo.NodeHelper.positionRuleId(node);
			var defaultValue = cloudo.Rule.getPropertyDefaultValue(ruleID, propertyName, null);
			if (valueChanged(holder, property, defaultValue)) {
				var oldProperty = holder.findProperty(propertyName);
				var command = new cloudo.PositionPropertyCommand(node, property, oldProperty, parent);
				$commandExecutor.add(command);
			}
		},
		setPosition: function (node, position) {
			var oldPosition = node.getPosition();
			var oldProps = oldPosition.properties;
			var props = position.properties;
			var newPosition = new cloudo.model.Position();
			if (position.operation == "reset") {
				props.eachKey(function (name, value) {
					if (oldProps) {
						if (oldProps.get(name)) {
							newPosition.addProperty(new cloudo.model.Property(name, value.getValue()));
						}
					} else {
						newPosition.addProperty(new cloudo.model.Property(name, value.getValue()));
					}
				});
			} else {
				newPosition = position;
			}

			var command = new cloudo.AnchorPositionCommand(node, newPosition, oldPosition);
			$commandExecutor.add(command);
		},
		/**
		 * 添加事件
		 * @param {cloudo.model.Node} node
		 * @param {cloudo.model.Event} event
		 */
		addEvent: function (node, event) {
			var name = event.name, code = event.getCode(), signature = event.getSignature();
			var oldEvent = node.findEvent(name), _DEFAULT_PARAMETERS = cloudo.Constant.DEFAULT_EVENT_PARAMETERS;

			if (oldEvent) {
				var oldCode = oldEvent.getCode(), oldSignature = oldEvent.getSignature();
				if (signature == oldSignature && !code && !oldCode) return;
				if (signature == _DEFAULT_PARAMETERS && !code) {
					this.removeEvent(node, name);
					return;
				}
				if (signature == oldSignature && oldCode === code) {
					return;
				}
			} else {
				if (signature == _DEFAULT_PARAMETERS && !code)
					return;
			}

			var command = new cloudo.AddEventCommand(node, event, oldEvent);
			$commandExecutor.add(command);
		},
		/**
		 * 删除事件
		 * @param {cloudo.model.Node} node
		 * @param {String} eventName
		 */
		removeEvent: function (node, eventName) {
			var command = new cloudo.RemoveEventCommand(node, eventName);
			$commandExecutor.add(command);
		},

		gridProfile: function (nid, meta) {
			var gridNode = cloudo.model.findNode(nid);
			var parentNode = gridNode.getParent();
			var previous = cloudo.NodeHelper.next(gridNode);
			var nodeJson = gridNode.toJSON();
			delete nodeJson["nodes"];
			nodeJson.rule = nodeJson.rid;
			nodeJson.attrs = nodeJson.properties;
			if (nodeJson.attrs) {
				nodeJson.attrs.fixedColumnCount = meta.fixedColumnCount;
			} else {
				nodeJson.attrs = {
					fixedColumnCount: meta.fixedColumnCount
				}
			}
			var newNode = cloudo.Parser.parseNode(nodeJson);

			function createColumnNode(column) {
				var n = cloudo.Toolkits.createNodeInstance(column.type);
				$.each(column, function (k, v) {
					if (k != "columns" && k != "type" && v) {
						var prop = new cloudo.model.Property(k, v);
						n.addProperty(prop)
					}
				});
				return n;
			}

			function parseColumnGroup(groupColumn) {
				var n = createColumnNode(groupColumn);
				$(groupColumn.columns).each(function () {
					var child;
					if (this.type == "ColumnGroup") {
						child = parseColumnGroup(this);
					} else {
						child = parseColumn(this);
					}
					n.addNode(child);
				});
				return n;
			}

			function parseColumn(column) {
				var n = createColumnNode(column);
				return n;
			}

			var columns = meta.columns;

			$(columns).each(function () {
				var child;
				if (this.type == "ColumnGroup") {
					child = parseColumnGroup(this);
				} else {
					child = parseColumn(this);
				}
				newNode.addNode(child);
			});

			this.removeNode(gridNode);
			if (previous) {
				this.addNode(newNode, parentNode, "begin");
			} else {
				this.addNode(newNode, parentNode, "after", previous);
			}
		},
		_getAssistNodes: function (node) {
			var nodes = [], editorNid = node.id;
			cloudo.model.eachKey(function (nid, n) {
				var rid = n.rid, isOK = true, rule = cloudo.Rule.get(rid);
				if (["DataSet", "Menu"].indexOf(rid) >= 0 || ["Action", "Trigger"].indexOf(rule.category) >= 0) {
					var _node = n;
					do {
						if (editorNid == _node.id) {
							isOK = false;
							break;
						}
						_node = _node.getParent();
					} while (_node);

					isOK && nodes.push(n);
				}
			});
			return nodes;
		},
		autoGenerateSubNodes: function (node) {
			autoGenerateSubNodes(node);
		},
		output: function (node) {
			node = node || this.getRoot();
			var code = "var view = $id('viewMain').objects[0];\nview.removeAllChildren();\n",
				_packages = ["font-awesome", "silk"], _dataTypes = [], _globalNames = [],
				_privateNames = cloudo.Toolkits.getDataTypeNames(cloudo.dataType.scope.VIEW);

			function mergePackages(pcks) {
				pcks.each(function () {
					_packages.indexOf(this) < 0 && _packages.push(this);
				});
			}

			function mergeGlobalNames(names) {
				names.each(function (name) {
					_globalNames.indexOf(name) < 0 && _globalNames.push(name);
				});
			}

			function stringify(obj) {
				return JSON.stringify(obj, null, 5);
			}

			var viewNode = cloudo.viewConfig.getViewNode(),
				viewNodeOutPut = cloudo.DefaultNodeOutputter.output(viewNode);

			mergePackages(viewNodeOutPut.dependsPackages);
			mergeGlobalNames(viewNodeOutPut.globalDataTypes);

			//将私有DataTypes输出到总列表中
			_privateNames.each(function (name) {
				var result = cloudo.DataTypeOutputter.output(cloudo.Toolkits.getDataTypeByName(name));
				var dataType = result.config;
				mergeGlobalNames(result.globalDataTypes);
				dataType.id = cloudo.Constant.DATATYPE_ID_PREFIX + name;
				_dataTypes.push(dataType);
			});

			//将全局DataTypes输出到总列表中
			_globalNames.each(function (name) {
				var result = cloudo.DataTypeOutputter.output(cloudo.Toolkits.getDataTypeByName(name));
				var dataType = result.config;
				dataType.id = name;
				_dataTypes.push(dataType);
			});

			var pckCode = "";
//			if (_packages.indexOf("tree-grid") < 0) {
//				_packages.push("tree-grid");
//			}
			for (var i = 0, len = _packages.length; i < len; i++) {
				pckCode += _packages[i];
				if (i != len - 1) pckCode += ","
			}


			//	code += "window.AUTO_APPEND_TO_TOPVIEW=false;\n ";
			code += "var dataTypeRepository = view.get('dataTypeRepository');\n";

			var nodeConfig, rootNode = cloudo.viewConfig.getRoot();
			if (node !== rootNode) {
				var assistantNodes = this._getAssistNodes(node);
				var nodeOutPut = cloudo.DefaultNodeOutputter.output(node);
				nodeConfig = {
					children: [
						nodeOutPut.config
					]
				};

				var rid = node.rid, rule = cloudo.Rule.get(rid);
				if (rule.category == "Floatable") {
					nodeOutPut.config.floating = false;
				}

				assistantNodes.each(function (assistantNode) {
					var assistantNodeOutput = cloudo.DefaultNodeOutputter.output(assistantNode);
					assistantNodeOutput && assistantNodeOutput.config && nodeConfig.children.push(assistantNodeOutput.config);
				});
			} else {
				nodeConfig = viewNodeOutPut.config;
			}

			if (nodeConfig.packages) {
				pckCode += "," + nodeConfig.packages;
			}

			nodeConfig["$type"] = "Container";
			nodeConfig.style = nodeConfig.style || {};
//			nodeConfig.layoutConstraint = {
//				type: "center"
//			};
			nodeConfig.style.background = nodeConfig.style.background || "transparent";
//			nodeConfig.listener = {
//				onReady: "function (self, arg){setTimeout(function(){self.refresh();},50)}"
//			};

			if (!nodeConfig.children || nodeConfig.children.length < 1) {
				delete nodeConfig.children;
			}

			code += "dataTypeRepository.parseJsonData(" + stringify(_dataTypes) + ");  \n";
			//	code += "view.addChild(dorado.Toolkits.createInstance('widget'," + JSON.stringify(nodeConfig, null, 5) + "));\n";
			code += "view.set('children'," + JSON.stringify([nodeConfig], null, 5) + ");\n";
			//		code += 'window.AUTO_APPEND_TO_TOPVIEW=true;';
			code = "function(){\n" + code + "\n}";
			code = "$import('" + pckCode + "'" + "," + code + ")";
			code = code.replace(/CFunStart/g, 'function (').replace(/CFunCut/g, '){\\n').replace(/CFunEnd/g, '\\n}');
			code = code.replace(/"GET_COMPONENT_REFERENCE_START/g, 'view.getComponentReference(').replace(/GET_COMPONENT_REFERENCE_END"/g, ')');
			code = code.replace(/"DATA_PROVIDER_START/g, 'dorado.DataProvider.create("').replace(/DATA_PROVIDER_END"/g, '")');
			return code;
		}
	};
	cloudo.viewConfig = viewConfig;

})
();