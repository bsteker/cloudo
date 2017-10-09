/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-29
 * Time: 下午3:11
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var CLASS_NAME = "cloudo.widget.DataTypeParentEditor";
    var singleTrigger, singleGrid;

    function createIconDom(scope) {
        var className = "d-icon silk ";
        switch (scope) {
            case cloudo.dataType.scope.GLOBAL:
                className = className + "cloudo-icon-model";
                break;
            case cloudo.dataType.scope.VIEW:
                className = className + "cloudo-icon-view";
                break;
            case cloudo.dataType.scope.BASE:
                className = className + "cloudo-icon-view";
                break;
        }
        return    $DomUtils.xCreate({
            tagName: "i",
            className: className,
            style: "margin: 1px;display:inline-block;"
        });
    }


    singleGrid = new dorado.widget.Grid({ "readOnly": true,
        "columns": [
            {
                "name": "type",
                "width": "22",
                onRenderCell: iconCellRender
            },
            {
                "name": "name"
            }
        ],
        "showHeader": false,
        listener: {
            onDataRowClick: function (self, arg) {
                singleTrigger.close(self.get('currentEntity').name);
            }
        }});

    singleTrigger = new dorado.widget.CustomDropDown({
        control: singleGrid, height: 250,
        listener: {
            onOpen: function (self, arg) {
                var editor = self._editor;
                if (editor instanceof dorado.widget.AbstractTextBox) {
                    var dropDown = self;
                    var filterFn = function () {
                        if (dropDown.get("opened")) {
                            dorado.Toolkits.setDelayedAction(dropDown, "$filterTimeId", function () {
                                var value = editor.doGetText();
                                singleGrid.filter([
                                    {
                                        operator: "like",
                                        property: "name",
                                        value: value
                                    }
                                ]);
                            }, 20);
                        }
                    };
                    editor.addListener("onTextEdit", filterFn);
                }
                var toolkits = cloudo.Toolkits, allItems = [];
                var currentViewNames = toolkits.getDataTypeNames(cloudo.dataType.scope.VIEW);
                var globalNames = toolkits.getDataTypeNames(cloudo.dataType.scope.GLOBAL);
                var dataTypeName = editor.get('node').getPropertyValue("name");

                _.each(currentViewNames, function (name) {

                    if (name != dataTypeName) {
                        allItems.push({type: cloudo.dataType.scope.VIEW,
                            name: name});
                    }
                });

                _.each(globalNames, function (name) {
                    allItems.push({type: cloudo.dataType.scope.GLOBAL,
                        name: name});
                });

                singleGrid.set('items', allItems);
            }
        }
    });

    cloudo.widget.DataTypeParentEditor = $extend(cloudo.widget.DefaultPropertyEditor, {
        $className: CLASS_NAME,
        constructor: function (config) {
            var config = config || {};
            config.width = "100%";
            config.trigger = [singleTrigger];
            $invokeSuper.call(this, [config]);
        }
    });
    cloudo.propertyEditor.register("rid[DataType].name[parent]", CLASS_NAME);


//=====================================Parent 多个选择器暂时关闭================================================================================


    function iconCellRender(self, arg) {
        var data = arg.data;
        $(arg.dom).empty().append(
            createIconDom(data.type));
    }

    function createMultipleSelector() {
        var allGrid, selectionGrid, addButton, removeButton, upButton, downButton, oldValue, textEditor;
        allGrid = new dorado.widget.Grid({
            columns: [
                {
                    name: "type", width: "24", caption: ".",
                    onRenderCell: iconCellRender,
                    filterable: false
                },
                {
                    name: "name", caption: "可选"
                }
            ],
            width: "200",
            showFilterBar: true,
            dragTags: "dataType", dropMode: "onOrInsertItems",
            droppable: true, droppableTags: "dataType",
            draggable: true, readOnly: true,
            layoutConstraint: {
                type: "left"
            }

        });
        selectionGrid = new dorado.widget.Grid({
            columns: [
                {
                    name: "type", width: "24", caption: ".",
                    onRenderCell: iconCellRender,
                    filterable: false
                },
                {
                    name: "name", caption: "\u5DF2\u9009"
                }
            ],
            width: "200", showFilterBar: true,
            dragTags: "dataType", dropMode: "onOrInsertItems",
            droppable: true, droppableTags: "dataType",
            draggable: true, readOnly: true,
            layoutConstraint: {
                "type": "right"
            }
        });
        addButton = new dorado.widget.Button({
            width: "40", caption: " > >",
            listener: {
                onClick: function (self, arg) {
                    var index = allGrid.get('currentIndex'),
                        allItems = allGrid.get('items') || [],
                        selectionItems = selectionGrid.get('items') || [],
                        item = allItems[index];
                    if (index < 0 || !item) {
                        return
                    }

                    allItems.removeAt(index);
                    selectionItems.push(item);
                    allGrid.set('items', allItems);
                    selectionGrid.set('items', selectionItems);

                }
            }
        });
        removeButton = new dorado.widget.Button({
            width: "40", caption: "< <",
            listener: {
                onClick: function (self, arg) {
                    var index = selectionGrid.get('currentIndex'),
                        allItems = allGrid.get('items') || [],
                        selectionItems = selectionGrid.get('items') || [],
                        item = selectionItems[index];
                    if (index < 0 || !item) {
                        return
                    }
                    selectionItems.removeAt(index);
                    allItems.push(item);
                    allGrid.set('items', allItems);
                    selectionGrid.set('items', selectionItems);

                }
            }
        });

        upButton = new dorado.widget.Button({
            width: "40", caption: "\u4E0A\u79FB",
            listener: {
                onClick: function (self, arg) {
                    var index = selectionGrid.get('currentIndex'), items = selectionGrid.get('items');
                    if (index <= 0) {
                        return
                    }
                    var downItem = items[index];
                    var oldIndexItem = items[index - 1];
                    items.splice(index, 1, oldIndexItem);
                    items.splice(index - 1, 1, downItem);
                    selectionGrid.set('items', items);
                }
            }
        });
        downButton = new dorado.widget.Button({
            width: "40", caption: "\u4E0B\u79FB",
            listener: {
                "onClick": function (self, arg) {
                    var index = selectionGrid.get('currentIndex'), items = selectionGrid.get('items');
                    var length = items.length;
                    if (index == length) {
                        return
                    }
                    var downItem = items[index];
                    var oldIndexItem = items[index + 1];
                    items.splice(index, 1, oldIndexItem);
                    items.splice(index + 1, 1, downItem);
                    selectionGrid.set('items', items);
                }
            }
        });

        var dialog = new dorado.widget.Dialog({
            height: "400", width: "500",
            animateType: "none", modalType: "transparent",
            children: [
                allGrid,
                {
                    $type: "Container", width: "100",
                    children: [
                        addButton, removeButton ,
                        upButton, downButton
                    ],
                    layout: {
                        $type: "VBox"
                    },
                    layoutConstraint: {
                        type: "center"
                    }
                },
                selectionGrid     ],
            layout: {
                $type: "Dock", regionPadding: 10
            },
            buttons: [
                {
                    $type: "Button", caption: "确定",
                    listener: {
                        onClick: function (self, arg) {
                            var value = '', selections = selectionGrid.get('items') || [];
                            for (var i = 0, len = selections.length; i < len; i++) {
                                value += selections[i].name;
                                if (i < len - 1)   value += ',';
                            }
                            textEditor.set('value', value);
                            textEditor.get('valueHandler').apply(self, [value]);
                            dialog.close();

                        }
                    }
                },
                {
                    $type: "Button", caption: "关闭",
                    listener: {
                        onClick: function (self, arg) {
                            dialog.close();
                        }
                    }
                }
            ],
            modalType: "dark",
            listener: {
                onShow: function (self, arg) {
                    var toolkits = cloudo.Toolkits, node = textEditor.get('node');
                    var currentName = node.getPropertyValue("name");
                    var selections = [], selectionItems = [], allItems = [];
                    var currentViewNames = toolkits.getDataTypeNames(cloudo.dataType.scope.VIEW);
                    var globalNames = toolkits.getDataTypeNames(cloudo.dataType.scope.GLOBAL);
                    if (oldValue) {
                        selections = oldValue.split(',');
                        _.each(selections, function (name) {
                            var groupName = toolkits.parseDataTypeScope(name);
                            if (groupName && groupName != cloudo.dataType.scope.BASE) {
                                selectionItems.push({type: groupName,
                                    name: name});
                            }
                        });
                    }

                    _.each(currentViewNames, function (name) {
                        if (selections.indexOf(name) < 0 && name != currentName) {
                            allItems.push({type: cloudo.dataType.scope.VIEW,
                                name: name});
                        }
                    });

                    _.each(globalNames, function (name) {
                        if (selections.indexOf(name) < 0) {
                            allItems.push({type: cloudo.dataType.scope.GLOBAL,
                                name: name});
                        }
                    });
                    allGrid.set('items', allItems);
                    selectionGrid.set('items', selectionItems);
                    self.set('caption', currentName + ':parent');
                }
            }

        });


        return new dorado.widget.Trigger({
            iconClass: 'd-trigger-icon-custom',
            listener: {
                onExecute: function (self, arg) {
                    textEditor = arg.editor;
                    oldValue = textEditor.doGetText();
                    if (singleTrigger.get("opened")) {
                        singleTrigger.close(oldValue);
                    }
                    dialog.show();
                }
            }
        });

    }

})();