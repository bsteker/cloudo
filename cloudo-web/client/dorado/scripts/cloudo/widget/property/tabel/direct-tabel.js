/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-6
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var COMMON_PROPS = [
            "id", "name", "text", "image", "path",
            "caption", "content", "label", "width",
            "height", "icon", "property", "dataSet",
            "dataType", "value", "tags", "visible"
        ],
        generalProps;

    function groupBy(rid) {
        var Rule = cloudo.Rule, props = Rule.getPropertyNames(rid),
            commonList = [], privateList = [], publicList = [];

        if (!generalProps) {
            generalProps = [];
            //通用属性列表
            Rule.getPropertyNames("Control").each(function (name) {
                if (COMMON_PROPS.indexOf(name) >= 0) {
                    return true;
                }
                generalProps.push(name);
            });
        }
        ;

        //常用属性列表
        COMMON_PROPS.each(function (name) {
            if (props.indexOf(name) >= 0) {
                commonList.push(name);
            }
        });

        //自身属性列表
        props.each(function (name) {
            if (commonList.indexOf(name) < 0) {
                if (generalProps.indexOf(name) >= 0) {
                    publicList.push(name);
                } else {
                    privateList.push(name);
                }
            }
        });

        return  [commonList, privateList, publicList];
    }

    function editable(property) {
        return !( property.visible === false || property.fixed);
    }

    function valueToString(editorType, value) {
        var result = value,
            types = [
                "any", "pojo",
                "collection[pojo]" ,
                "collection[any]",
                "collection[value]"
            ];

        if (editorType && value && types.indexOf(editorType) >= 0 && value.toJSON) {
            result = JSON.stringify(value.toJSON(), null, 5);
        }
        return result;
    }


    cloudo.widget.DirectPropertyTabel = $extend(cloudo.widget.AbstractPropertyTabel, {
        $className: "cloudo.widget.DirectPropertyTabel",

        constructor: function (config) {
            config = config || {};
            this._buildFilterBar();
            this._buildPropertyGrid(true);
            cloudo.Toolkits.merge(config, {
                children: [
                    this.filterBar,
                    this.propertyGrid
                ],
                layout: {
                    $type: "Dock", regionPadding: 1
                }
            });

            $invokeSuper.call(this, [config]);
        },
        getCellEditor: function (data, column) {
            var nid = column.get("name"),
                node = cloudo.model.findNode(nid),
                propertyName = data.get("propertyName"),
                parentTreeNode = data._node.get("parent"),
                parentName = parentTreeNode.get("label");
            return  cloudo.propertyEditor.get(node.rid, propertyName, parentName, {
                node: node
            });
        },


        _buildFilterBar: function () {
            var propTabel = this;
            this.filterBar = new dorado.widget.TextEditor(
                {
                    blankText: "--按名称过滤--",
                    trigger: [
                        {
                            $type: "Trigger", exClassName: "d-trigger-clear",
                            iconClass: "d-trigger-icon-clear",
                            onExecute: function (self, arg) {
                                arg.editor.set("text", "");
                                arg.editor.post();
                            }
                        },
                        {
                            $type: "Trigger", iconClass: "d-trigger-icon-search"
                        }
                    ],
                    onTextEdit: function (self) {
                        var grid = propTabel.propertyGrid;
                        dorado.Toolkits.setDelayedAction(grid, "$filterTimeId", function () {
                            var value = self.doGetText();
                            propTabel.filter(value);
                        }, 20);
                    },
                    layoutConstraint: {
                        type: "center"
                    }
                }
            );
        },

        refreshData: function () {
            var table = this, propertyGrid = table.propertyGrid,
                propMap, columnConfigs = [], data = {}, selections = cloudo.selections;

            propertyGrid.removeDataColumns();

            function intersect(props) {
                var tmpPropMap = {};
                for (var i = 0, len = props.length; i < len; i++) {
                    var prop = props[i], propName;
                    propName = prop.name;
                    if (propMap) {
                        if (propMap[propName]) {
                            if (propMap[propName].editorType !== prop.editorType) {
                                continue;
                            }
                            tmpPropMap[propName] = prop;
                        }
                    } else {
                        if (editable(prop)) {
                            tmpPropMap[prop.name] = prop;
                        }
                    }
                }
                propMap = tmpPropMap;
            }

            selections.each(function (node) {
                var label = node.parseLabel(),
                    properties = cloudo.Rule.getProperties(node.rid) || [];
                columnConfigs.push({
                    name: node.id, label: label
                });

                intersect(properties);
            });


            selections.each(function (node) {
                var nid = node.id, properties = cloudo.Rule.getProperties(node.rid);


                for (var propName in propMap) {
                    if (!propMap.hasOwnProperty(propName)) {
                        continue;
                    }
                    var propertyRule = _.findWhere(properties, {name: propName}) || {};

                    if (!data[propName]) {
                        data[propName] = {
                            propertyName: propName,
                            propertyRule: propertyRule,
                            defaultValues: {}
                        }
                    }
                    var defaultValue = propertyRule.defaultValue,
                        supProps = propertyRule.properties,
                        value = node.getPropertyValue(propName);

                    if (supProps) {
                        if (!data[propName].nodes) {
                            data[propName].nodes = {};
                        }

                        var nodes = data[propName].nodes;
                        _.each(supProps, function (subProp) {
                            var subPropName = subProp.name, spValue,
                                subPropDefaultValue = subProp.defaultValue;

                            if (!nodes[subPropName]) {
                                nodes[subPropName] = {
                                    propertyName: subPropName,
                                    propertyRule: subProp,
                                    defaultValues: {}
                                };
                            }

                            if (value) {
                                spValue = value.getPropertyValue(subPropName);
                            }
                            spValue = spValue || subPropDefaultValue;
                            nodes[subPropName][nid] = valueToString(subProp.editorType, spValue);
                            nodes[subPropName].defaultValues[nid] = subPropDefaultValue;
                        });


                    } else {
                        value = value || defaultValue;
                        data[propName][nid] = valueToString(propertyRule.editorType, value);
                        data[propName].defaultValues[nid] = defaultValue;
                    }

                }

            });


            for (var i = 0, len = columnConfigs.length; i < len; i++) {
                var columnConfig = columnConfigs[i];
                var column = table.createColumn(columnConfig.name, columnConfig.label);
                propertyGrid.addColumn(column);
            }

            var items = [];
            for (var propName in data) {
                if (data.hasOwnProperty(propName)) {
                    var propData = data[propName];
                    if (propData.nodes) {
                        var nodes = propData.nodes, ns = [];
                        for (var subPropName in nodes) {
                            if (nodes.hasOwnProperty(subPropName)) {
                                var subPropData = nodes[subPropName];
                                ns.push({label: subPropName, data: subPropData});
                            }
                        }
                        items.push({label: propName, data: {}, nodes: ns});
                    } else {
                        items.push({label: propName, data: propData});
                    }
                }
            }
            //属性分组
            if (selections.size === 1) {
                var node = selections.first(),
                    rid = node.rid,
                    newItems = new Array(items.length);

                var propGroups = groupBy(rid),
                    publicProps = propGroups[2];

                var allProps = _.flatten(propGroups), start = allProps.length - publicProps.length;
                items.each(function (item) {
                    var name = item.label, index = allProps.indexOf(name);
                    if (index >= 0) {
                        newItems[index] = item;
                        if (start <= index) {
                            item.data.groupName = "general";
                        }
                    }
                });
                items = _.compact(newItems);
            }

            propertyGrid.set("nodes", items);
        }


    });


})();