/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-6
 * Time: 下午12:18
 * To change this template use File | Settings | File Templates.
 */

cloudo.onInit(function () {
    var $componentSelector = cloudo.componentSelector,
        $selections = cloudo.selections;

    //刷新浮动面板
    $selections.addListener(function () {
        var floatBar = cloudo.floatBar;
        floatBar.clear();

        if ($selections.size === 1) {
            var node = $selections.at(0);
            setTimeout(function () {
                var nodeMeta, iconPrefix = cloudo.Constant.ICON_URL_PREFIX;
                nodeMeta = cloudo.NodeHelper.meta(node.id);


                //添加固有子节点按钮
                var fixedChildren = nodeMeta.fixedChildrenMeta;
                if (fixedChildren && fixedChildren.length > 0) {
                    fixedChildren.each(function (child) {
                        floatBar.addChild(new dorado.widget.SimpleIconButton({
                            icon: iconPrefix + child.icon, userData: child.nid,
                            listener: {
                                onClick: function (self, arg) {
                                    var node = cloudo.model.findNode(self.get("userData"));
                                    $selections.add(node, {merge: false});
                                    arg.returnValue = false;
                                    return false;
                                }
                            }
                        }));
                    });
                }


                //处理向导
                if (cloudo.wizard.find(node.rid)) {
                    floatBar.addChild(new dorado.widget.toolbar.Button({
                        iconClass: "fa fa-magic",
                        caption: "向导打开",
                        onClick: function () {
                            cloudo.wizard.show(node.rid, {
                                node: node, parentNode: node.getParent(),
                                operationType: cloudo.wizard.OPERATION_TYPE.MODIFY
                            });
                        }
                    }));
                }
            }, 200);
        }

    });


    /**
     * 设置编辑器当前节点
     * 实现功能列表
     * 1.属性编辑器属性变为当前节点属性列表
     * 2.Events编辑器变为当前节点Event列表
     * 注：此方法需要规避节点树渲染时的事件迭代
     * @param {*} arg
     */
    $selections.addListener(function () {
        var tabControl = $propertyEditorManager.getTabControl(),
            positioned = false, layoutable = false, hasEvent = false;

        $selections.each(function () {
            var _rule = cloudo.Rule.get(this.rid);
            if (!positioned) {
                positioned = _rule.positioned
            }
        });

        if ($selections.size === 1) {
            var rule = cloudo.Rule.get($selections.at(0).rid);
            layoutable = rule.layoutable;
            hasEvent = rule.events;
        }

        tabControl.getTab(1).set("visible", layoutable);
        tabControl.getTab(2).set("visible", positioned);
        tabControl.getTab(3).set("visible", hasEvent);

        $propertyEditorManager.refreshCurrentData();
    });

    //刷新组件选择器数据
    $selections.addListener(function () {
        var children, node;
        if ($selections.size === 1) {
            node = $selections.first();
            children = cloudo.Rule.getChildren(node.rid);
            $componentSelector.setData({rid: node.rid, children:children});
        }
    });

    $selections.addListener(function () {
        with ($nodeEditorManager) {
            clearTraces();
            refreshSelections($selections.pluck("id"));
        }
        with ($outlineManager) {
            clearTraces();
            refreshSelections($selections.pluck("id"));
        }
    });

    $selections.addListener(function () {
        var copy, paste;

        copy = $clipboard.canCopy();
        paste = $clipboard.canPaste();
        if ($selections.size === 1) {
            var node = $selections.at(0);
        }
        with ($actionBar) {
            copyBtn.set('disabled', !copy);
            cutBtn.set('disabled', !copy);
            removeBtn.set('disabled', !copy);
            pasteBtn.set('disabled', !paste);
        }
    });


})
;
