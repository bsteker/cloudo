/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-6
 * Time: 下午12:18
 * To change this template use File | Settings | File Templates.
 */

cloudo.onInit(function () {
    $commandExecutor.onExecute(function () {
        window.$editor && window.$editor.emit();
    });

    //修改Redo,Undo按钮状态
    $commandExecutor.onExecute(function () {
        var canRedo = $commandExecutor.canRedo(),
            canUndo = $commandExecutor.canUndo();
        with ($actionBar) {
            redoBtn.set("disabled", !canRedo);
            undoBtn.set("disabled", !canUndo);
        }
    });


    //监听Node增删和移动
    $commandExecutor.onExecute(function (args) {
        var command = args.command, commandType = args.event;
        if (command instanceof cloudo.OperateNodeCommand) {
            if (command instanceof cloudo.RemoveNodeCommand) {
                if (commandType == "undo") {
                    $outlineManager.addNode(command.node, command.parentNode);
                    $nodeEditorManager.addNode(command.node, command.parentNode);
                } else {
                    $nodeEditorManager.removeNode(command.node);
                    $outlineManager.removeNode(command.node);
                }
            }

            if (command instanceof cloudo.AddNodeCommand) {
                if (commandType == "undo") {
                    $nodeEditorManager.removeNode(command.node);
                    $outlineManager.removeNode(command.node);
                } else {
                    $nodeEditorManager.addNode(command.node, command.parentNode, command.insertMode, command.refNode);
                    $outlineManager.addNode(command.node, command.parentNode, command.insertMode, command.refNode);
                }
            }

            if (command instanceof cloudo.ReplaceNodeCommand) {
                if (commandType == "undo") {
                    $nodeEditorManager.removeNode(command.newNode);
                    $nodeEditorManager.addNode(command.node, command.parentNode, command.insertMode, command.refNode);
                    $outlineManager.removeNode(command.newNode);
                    $outlineManager.addNode(command.node, command.parentNode, command.insertMode, command.refNode);
                } else {
                    $nodeEditorManager.removeNode(command.node);
                    $nodeEditorManager.addNode(command.newNode, command.parentNode, command.insertMode, command.refNode);
                    $outlineManager.removeNode(command.node);
                    $outlineManager.addNode(command.newNode, command.parentNode, command.insertMode, command.refNode);
                }
            }

            if (command instanceof cloudo.MoveNodeCommand) {
                if (commandType == "undo") {
                    var insertMode = command.oldInsertMode;
                    if (command.oldRefNode) {
                        insertMode = insertMode || "after";
                    }
                    $nodeEditorManager.moveNode(command.node, command.newParent, insertMode, command.oldRefNode);
                    $outlineManager.moveNode(command.node, command.newParent, insertMode, command.oldRefNode);
                } else {
                    var insertMode = command.newInsertMode;
                    if (command.oldParent && command.oldParent.eq(command.newParent) && !command.newRefNode) {
                        $nodeEditorManager.moveNode(command.node, command.oldParent, "begin");
                        $outlineManager.moveNode(command.node, command.oldParent, "begin");
                    } else {
                        if (command.newRefNode) {
                            insertMode = insertMode || "after";
                        }
                        $nodeEditorManager.moveNode(command.node, command.oldParent, insertMode, command.newRefNode);
                        $outlineManager.moveNode(command.node, command.oldParent, insertMode, command.newRefNode);
                    }
                }
            }
            if (cloudo.socket) {
                var code = cloudo.viewConfig.output();
                cloudo.socket && cloudo.socket.emit("draw all", {
                    token: cloudo.socket._token,
                    code: code
                });
            }
        }
    });


    //监听属性值变化
    $commandExecutor.onExecute(function (args) {
        var command = args.command;
        if (command instanceof cloudo.PropertyCommand) {
            var node = command.node, property = command.property, commandType = args.event, className = command.constructor.className;
//TODO 暂时关闭节点切换
//			if (!cloudo.selections.find(node.id)) {
//				cloudo.selections.add(node, {merge: false});
//			}
            if (className === "cloudo.LayoutPropertyCommand" && property.name === "type") {
                var it = node.allNode().iterator();
                while (it.hasNext()) {
                    var child = it.next();
                    if (/\/Wrapper/ig.exec(child.rid)) {
                        var childIt = child.allNode().iterator();
                        while (childIt.hasNext()) {
                            childIt.next().setPosition(new cloudo.model.Position());
                        }
                    } else {
                        child.setPosition(new cloudo.model.Position());
                    }
                }
                $nodeEditorManager.drawAll();
                var layoutPropertyEditor = $propertyEditorManager.getTabel("layout");
                layoutPropertyEditor && layoutPropertyEditor.refreshData();
            }
            //广播到编辑器
            if (className === "cloudo.NodePropertyCommand") {
                var name = property.name, value, oldValue, socket = cloudo.socket;
                if (commandType == "undo") {
                    var oldProperty = command.oldProperty;
                    if (oldProperty) {
                        value = oldProperty.getValue();
                    }

                    oldValue = property.getValue();
                } else {
                    value = property.getValue();
                    var oldProperty = command.oldProperty;
                    if (oldProperty) {
                        oldValue = oldProperty.getValue();
                    }
                }

                if (!value) {
                    value = cloudo.Rule.getPropertyDefaultValue(node.rid, name);
                }

                if (!oldValue) {
                    oldValue = cloudo.Rule.getPropertyDefaultValue(node.rid, name);
                }
                $nodeEditorManager.replaceProperty(node, name, value, oldValue);
                $outlineManager.replaceProperty(node, name, value, oldValue);
                socket && socket.emit("property value", {
                    token: cloudo.socket._token,
                    nid: node.id,
                    name: name,
                    value: value
                });
            }

            if (commandType !== "add") {
                cloudo.propertyEditorManager.refreshCurrentData();
            } else {
                //兼容Firefox浏览器
                if (window.event) {
                    var srcElement = window.event.srcElement || window.event.target;
                    if (!dorado.widget.findParentControl(srcElement, "cloudo.widget.AbstractPropertyTabel")) {
                        cloudo.propertyEditorManager.refreshCurrentData();
                    }
                }
            }
        }
    });


    //通过监听属性变化实现智能联动修改
    $commandExecutor.onExecute(function (args) {
        var command = args.command, event = args.event, className = command.constructor.className;
        if (className === "cloudo.NodePropertyCommand") {
            var node = command.node, property = command.property;
            var rid = node.rid, propName = property.name;
            var rules = [
                {rid: "DataType", propertyName: "name", relationProperty: "dataType"},
                {rid: "DataSet", propertyName: "id", relationProperty: "dataSet"},
                {rid: "Action", propertyName: "id", relationProperty: "action"},
                {rid: "Menu", propertyName: "id", relationProperty: "menu"}
            ];
            var interceptable = false, relationProperty;
            for (var i = 0, len = rules.length; i < len; i++) {
                var rule = rules[i];
                if (rule.rid == rid && rule.propertyName == propName) {
                    interceptable = true;
                    relationProperty = rule.relationProperty;
                }
            }
            if (interceptable) {
                var value, oldPropValue, oldProperty = command.oldProperty;
                if (event === "undo") {
                    if (oldProperty) {
                        value = oldProperty.getValue();
                    }
                    oldPropValue = property.getValue();
                }
                else {
                    value = property.getValue();
                    if (oldProperty) {
                        oldPropValue = oldProperty.getValue();
                    }
                }

                cloudo.model.eachKey(function (k, v) {
                    var property = v.findProperty(relationProperty);
                    var propertyTabel = cloudo.propertyEditorManager.getTabel("direct");
                    if (relationProperty == "dataType") {
                        if (property) {
                            var propValue = property.getValue(), tmpValue = propValue;
                            if (/^\[.*\]$/.exec(propValue)) {
                                tmpValue = tmpValue.substring(1, tmpValue.length - 1);
                            }
                            if (tmpValue === oldPropValue) {
                                if (value && /^\[.*\]$/.exec(propValue)) {
                                    value = "[" + value + "]";
                                }
                                if (cloudo.selections.find(v.id)) {
                                    var row = propertyTabel.getRow(propName);
                                    if (row) {
                                        var entity = row._data;
                                        entity && entity.set(v.id, value);
                                        row.refresh();
                                    }
                                }
                                property.setValue(value);
                            }
                        }
                    } else {
                        if (property && oldPropValue == property.getValue()) {
                            if (cloudo.selections.find(v.id)) {
                                var row = propertyTabel.getRow(propName);
                                if (row) {
                                    var entity = row._data;
                                    entity && entity.set(v.id, value);
                                    row.refresh();
                                }
                            }
                            property.setValue(value);
                        }
                    }
                });
                //TODO BasePropertyDef 节点名称的监听在Vidor2.0 处理
            }
        }
    });

    $commandExecutor.onExecute(function (args) {
        var command = args.command;
        if (command instanceof cloudo.EventCommand) {
            var node = command.node, eventName = command.eventName, signature, code, event;
            var hasEvent = !node.allEvent().isEmpty();

            var DEFAULT_PARAM = cloudo.Constant.DEFAULT_EVENT_PARAMETERS;
            event = node.findEvent(eventName);
            signature = event ? event.getSignature() : DEFAULT_PARAM;
            code = event ? event.getCode() : "";
            if (cloudo.selections.size == 1 && cloudo.selections.first().eq(node)) {
                //刷新控件树
                var eventTabel = $propertyEditorManager.getTabel("eventBox").get("control");
                //刷新事件列表状态
                var row = eventTabel.getRow(command.eventName);
                if (row) {
                    var rowData = row._data;
                    rowData.set('signature', signature);
                    var hasEvent = false;
                    if (event) {
                        if (signature != DEFAULT_PARAM || code) {
                            hasEvent = true;
                        }
                    }
                    rowData.set('hasEvent', hasEvent);
                    row.refresh();
                }
            }

            if (cloudo.socket) {
                var code = cloudo.viewConfig.output();
                cloudo.socket && cloudo.socket.emit("draw all", {
                    token: cloudo.socket._token,
                    code: code
                });
            }
            $nodeEditorManager.refreshNode(node);

        }
    });
    $commandExecutor.onExecute(function (args) {
        var command = args.command;
        if (command instanceof cloudo.AnchorPositionCommand) {
            var node = command.node;
            var drawPad = $nodeEditorManager.getDrawPad();
            drawPad && drawPad.repositionControl(node.id);
            cloudo.propertyEditorManager.refreshCurrentData();
        }
    });


})
;
