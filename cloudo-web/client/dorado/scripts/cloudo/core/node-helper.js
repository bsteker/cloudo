/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-1-15
 * Time: 上午10:12
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var $model = cloudo.model;


    var NodeHelper = {
        /**
         *
         * @param nid String
         * @returns {String}
         */
        ruleId: function (nid) {
            var node = $model.findNode(nid);
            if (node) {
                return   node.rid;
            }
        },

        layoutRuleId: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            if (/\/Wrapper/ig.exec(node.rid)) {
                node = node.getParent();
            }
            var rule = cloudo.Rule.get(node.rid);
            if (rule.layoutable) {
                var layout = node.getLayout();
                var layoutType;
                if (node.rid == "AutoForm") {
                    layoutType = "form";
                } else {
                    layoutType = layout.getPropertyValue('type') || cloudo.Constant.DEFAULT_LAYOUT;
                }
                return cloudo.Rule.translateLayoutRuleName(layoutType);
            }
        },
        layoutRuleName: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            if (node) {
                if (/\/Wrapper/ig.exec(node.rid)) {
                    return null;
                }
                var rule = cloudo.Rule.get(node.rid);
                if (rule.layoutable) {
                    var layout = node.getLayout();
                    var layoutType;
                    if (node.rid == "AutoForm") {
                        layoutType = "form";
                    } else {
                        layoutType = layout.getPropertyValue('type') || cloudo.Constant.DEFAULT_LAYOUT;
                    }
                    return layoutType;
                }
            }
        },
        positionRuleId: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);

            var parentNode = node.getParent();
            if (parentNode && /\/Wrapper/ig.exec(parentNode.rid)) {
                parentNode = parentNode.getParent();
            }
            var parentLayout = parentNode && parentNode.getLayout();
            var layoutType;
            if (parentNode.rid == 'AutoForm') {
                layoutType = 'form';
            } else {
                layoutType = parentLayout.getPropertyValue('type') || cloudo.Constant.DEFAULT_LAYOUT;
            }

            var layoutRuleID = cloudo.Rule.translateLayoutRuleName(layoutType);

            return layoutRuleID + cloudo.Constant.LAYOUT_CONSTRAINT_SUFFIX;
        },
        padding: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);

            var padding, layout = node.getLayout();
            if (layout) {
                padding = layout.getPropertyValue("padding");
            }
            return  padding || 0;
        },
        parentPadding: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);

            var parentNode = node.getParent();
            if (/\/Wrapper/ig.exec(parentNode.rid)) {
                parentNode = parentNode.getParent();
            }
            return this.padding(parentNode.id);
        },
        position: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var position = node.getPosition(), result = {}, properties = position.properties;
            properties && properties.eachKey(function (name, value) {
                result[name] = value.getValue();
            });
            return result;
        },

        meta: function (nid) {
            var node = $model.findNode(nid);
            var parentNode = node.getParent(),
                ruleId = node.rid;
            if (!parentNode) {
                return {
                    nid: nid, rid: ruleId,
                    rule: cloudo.Rule.get(ruleId)
                };
            }
            var parentRuleId = parentNode.rid;
            var fixedChildrenMeta = [], nodes = node.allNode();

            var it = nodes.iterator();
            while (it.hasNext()) {
                var n = it.next();
                if (/\/Wrapper/ig.exec(n.rid)) {
                    var nRule = cloudo.Rule.get(n.rid);
                    fixedChildrenMeta.push({
                        rid: n.rid,
                        nid: n.id,
                        icon: $url(nRule.icon)
                    });
                }
            }

            return {
                nid: nid, rid: ruleId,
                rule: cloudo.Rule.get(ruleId),
                parentMeta: {
                    nid: parentNode.id, rid: parentRuleId,
                    rule: cloudo.Rule.get(parentRuleId)
                },
                fixedChildrenMeta: fixedChildrenMeta
            };
        },
        _findEntry: function (node) {
            var parent = node.getParent();
            if (parent && parent.nodes) {
                var keyedList = parent.nodes;
                return  keyedList.findEntry(node);
            }
        },
        /**
         * 获得下一个兄弟节点
         * @returns {model.Node}
         */
        next: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var entry = this._findEntry(node);
            if (entry) {
                var nextEntry = entry.next;
                if (nextEntry) {
                    return nextEntry.data;
                }
            }
        },

        /**
         * 获得上一个兄弟节点
         * @returns {model.Node}
         */
        previous: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var entry = this._findEntry(node);
            if (entry) {
                var previousEntry = entry.previous;
                if (previousEntry) {
                    return previousEntry.data;
                }
            }
        },
        canAdd: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var addable = node._addable;
            var children = cloudo.Rule.get(node.rid).children;
            if (addable == undefined) {
                addable = true;
                //是否可添加子元素
                if (children) {
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];

                        if (!child.fixed) {
                            var memberAggregated = (typeof child.memberAggregated == "undefined");
                            if (!memberAggregated) {
                                addable = node.allNode().size == 0;
                            }
                        } else {
                            addable = false;
                            break;
                        }
                    }
                } else {
                    addable = false;
                }
                node._addable = addable;
            }
            return  addable;
        },

        canPaste: function (pn, n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var parentNode = pn instanceof $model.Node ? pn : $model.findNode(pn);
            var addable = false;
            if (parentNode.rid == 'ViewConfig') {
                var nodes = parentNode.allNode();
                if (nodes && nodes.size > 0) {
                    var it = nodes.iterator();
                    while (it.hasNext()) {
                        var n = it.next();
                        if (n.rid === node.rid) {
                            return false;
                        }
                    }
                }
            }
            if (node && this.canAdd(parentNode)) {
                var children = cloudo.Rule.getChildren(parentNode.rid);
                if (children.length > 0) {
                    for (var i = 0; i < children.length; i++) {
                        var category = children[i];
                        for (var j = 0; j < category.rids.length; j++) {
                            if (category.rids[j] == node.rid) {
                                addable = true;
                                break;
                            }
                        }
                        if (addable) break;
                    }
                }
            }

            return addable;
        },
        /**
         * 可拆卸性验证
         * @returns {boolean}
         */
        canRemove: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var removable = true;

            if (/\/Wrapper/ig.exec(node.rid)) {
                removable = false;
            }
            var vConfig = cloudo.viewConfig;
            if (!vConfig.isModel()) {
                if (node.getParent() == vConfig.root) {
                    removable = false;
                }
            }


            return removable;
        },
        /**
         * 判断是否可上移
         * @returns {boolean}
         */
        canUp: function (n) {
            var up = false;
            var previous = this.previous(n);
            if (previous) {
                up = true;
            }
            return up;
        },
        /**
         * 判断是否可下移
         * @returns {boolean}
         */
        canDown: function (n) {
            var down = false;
            var next = this.next(n);
            if (next) {
                down = true;
            }
            return down;
        },
        getEditorFactory: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var rid = node.rid,
                categoryNames = ["General", "Floatable", "Form", "Collection"],
                factory = cloudo.nodeEditor.find(rid);

            var rule = cloudo.Rule.get(rid), category = rule.category;
            if (factory) {
                return factory;
            }

            if (rid != "DataSet" && categoryNames.indexOf(category) >= 0 && /\.Widget\./ig.exec(rule.jsPrototype)) {
                return function (config) {
                    return new cloudo.widget.DrawEditor(config);
                }
            }
        },
        canCreateEditor: function (n) {
            var editable = false, factory = this.getEditorFactory(n);
            if (factory) {
                editable = true;
            }
            return editable;
        },
        hasEvent: function (n) {
            var node = n instanceof $model.Node ? n : $model.findNode(n);
            var events = node.events;
            if (events) {
                return !events.isEmpty();
            }
            return false;
        }
    };


    cloudo.NodeHelper = NodeHelper;
    $model.Node.Support = NodeHelper;
    window.$nodeHelper = NodeHelper;
})();