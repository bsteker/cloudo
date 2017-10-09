(function () {
    var CLOUDO_LAYOUTHOLDER_RULEID = "LayoutHolder",
        cloudo = $namespace("cloudo"),
        auxiliaryRuleNames = ["Import", "GroupStart", "GroupEnd", "PlaceHolder", "PlaceHolderStart", "PlaceHolderEnd"],
        liningUpRuleNames = ["AutoForm", "ToolBar"],
        localRuleCache = {};
    /**
     * @author Alex Tong (mailto:alex.tong@bstek.com)
     * @class 规则文件解析通用接口
     * @abstract
     */
    var Rule = {
        layoutHolder: null,
        //TODO 规则文件本地化
        ruleSet: null,
        auxiliaryRuleNames: auxiliaryRuleNames,
        /**
         * 经过克隆保护规则原结构
         * @param rule
         * @returns {Object}
         * @private
         */
        _clone: function (rule) {
            return  dorado.Core.clone(rule, true);
        },
        /**
         *
         * @param id
         * @returns {*}
         * @private
         */
        _find: function (id) {
            return  this.ruleSet.rules.data[id];
        },
        /**
         * 解析 properties子属性
         * @param property
         * @returns {Array}
         * @private
         */
        _parseProperties: function (property) {
            function doParser(property) {
                var propertiesObj = property.properties, properties = [];
                if (propertiesObj) {
                    var data = propertiesObj.data,
                        names = propertiesObj.names;
                    _.each(names, function (name) {
                        var r = data[name], _rule = r || {};
                        _rule.name = name;
                        if (_rule.properties) {
                            _rule.properties = Rule._parseProperties(_rule);
                        }
                        properties.push(_rule);
                    });
                }
                return properties;
            }

            return property ? doParser(property) : null;
        },
        /**
         * 解析events子属性
         * @param {Object}rule
         * @private
         */
        _parseEvents: function (rule) {
            function doParser(events) {
                var data = events.data,
                    names = events.names, _events = [];
                _.each(names, function (name) {
                    var _event = data[name] ? data[name] : {};
                    _event.name = name;
                    _event.signature = "self,arg";
                    _events.push(_event);
                });
                return _events;
            }

            var events = rule.events;
            return events ? doParser(events) : null;
        },
        _parseIcon: function (id) {
            var rule = this._find(id), icon = rule.icon;
            if (!icon && /\/Wrapper/ig.exec(id)) {
                if (/.*Tools$/.exec(id)) {
                    icon = this._parseIcon("Panel/Wrapper.Tools");
                } else if (/.*Buttons$/.exec(id)) {
                    icon = this._parseIcon("Panel/Wrapper.Buttons");
                } else if (/.*Children$/.exec(id)) {
                    icon = this._parseIcon("Panel/Wrapper.Children");
                }
            }
            return icon || this._parseIcon("Control");
        },
        /**
         * 根据ID获得指定规则对象
         * 注：此获得的指定规则对象的深度克隆对象而不是对象本身
         *@param {String} id
         * @return {object}
         */
        get: function (id) {
            var rule = localRuleCache[id];
            if (!rule) {
                rule = this._clone(this._find(id));
                rule.id = id;
                rule.properties = this._parseProperties(rule);
                rule.events = this._parseEvents(rule);
                rule.icon = rule.icon || this._parseIcon(id);
                localRuleCache[id] = rule;
            }
            return rule;
        },
        getEvents: function (id) {
            var rule = this.get(id);
            return   rule.events;
        },
        getIcon: function (id) {
            var rule = this.get(id), icon = rule.icon;
            return icon;
        },
        getJsPrototype: function (id) {
            var rule = this.get(id);
            return rule.jsPrototype;
        },
        getLabel: function (id) {
            var rule = this.get(id);
            return rule.label;
        },
        getPropertyNames: function (id) {
            var rule = this.get(id), properties = rule.properties, names = [];
            if (properties) {
                names = _.pluck(properties, "name");
            }
            return names;
        },
        getProperties: function (id) {
            var rule = this.get(id);
            return rule.properties;
        },
        getProperty: function (id, name, parentName) {
            var rule = this.get(id);
            var properties = rule.properties, result;
            if (properties) {
                if (parentName) {
                    var parentProperty = _.findWhere(properties, {name: parentName});
                    if (parentProperty) {
                        result = _.findWhere(parentProperty.properties, {name: name});
                    }
                } else {
                    result = _.findWhere(properties, {name: name});
                }
            }
            return result || {};
        },
        getPropertyDefaultValue: function (ruleId, name, parentName) {
            var propertyRule = this.getProperty(ruleId, name, parentName);
            return propertyRule ? propertyRule.defaultValue : null;
        },
        getAuxiliaryRules: function () {
            var iconPrefix = cloudo.Constant.ICON_URL_PREFIX;
            var data = [];
            auxiliaryRuleNames.each(function (rid) {
                var r = Rule._find(rid);
                data.push({
                    caption: r.label,
                    icon: iconPrefix + (r.icon || Rule.getIcon(rid)),
                    rid: rid
                });
            });

            return data;
        },
        /**
         * 获得子节点分组
         * @param id
         * @returns [{name:"",rids:["AutoForm","DataSet"]}]
         */
        getChildren: function (id) {
            var rule = this.get(id),
                children = rule.children,
                defaultCategory = "other",
                isTouch = cloudo.viewConfig.isTouch();

            var result = [];

            function supportsDesktop(types) {
                return types == 0 || (types & 1) != 0;
            }

            function supportsTouch(types) {
                return types == 0 || (types & 2) != 0;
            }

            if (children && children.length > 0) {
                _.each(children, function (child) {
                    _.each(child.memberRuleIDs, function (rid) {
                        if (!/^Abstract*/i.test(rid)) {
                            var r = Rule._find(rid),
                                categoryName = r.category || defaultCategory;
                            var clientTypes = r.clientTypes;
                            var category = _.findWhere(result, {name: categoryName});
                            if (!category) {
                                category = {name: categoryName, rids: []};
                                result.push(category);
                            }

                            if (isTouch) {
                                supportsTouch(clientTypes) && category.rids.push(rid);
                            } else {
                                supportsDesktop(clientTypes) && category.rids.push(rid);
                            }
                        }
                    });
                });


            }
            result.push({name: "Auxiliary", rids: auxiliaryRuleNames});
            function liningUp(ruleid, oldData) {
                var newData = [];
                newData.push(_.findWhere(oldData, {name: ruleid}));
                _.each(oldData, function (category) {
                    if (category.name != ruleid) {
                        newData.push(category);
                    }
                });
                return newData;
            }

            if (liningUpRuleNames.indexOf(id) >= 0) {
                result = liningUp(id, result);
            }
            return result;
        },
        translateLayoutRuleName: function (name) {
            var layoutHolder = this.layoutHolder;
            if (!layoutHolder) {
                layoutHolder = {};
                var children = this.get(CLOUDO_LAYOUTHOLDER_RULEID).children;
                _.each(children, function (child) {
                    layoutHolder[child.name] = (child.memberRuleIDs)[0];
                });
                this.layoutHolder = layoutHolder;
            }
            return layoutHolder[name.toLowerCase()];
        },
        /**
         * 获得布局规则
         * @param name
         * @returns {*}
         */
        getLayoutRuleByName: function (name) {
            var rid = this.translateLayoutRuleName(name);
            return this.get(rid);
        },
        getEditorMeta: function (id) {
            return  dorado.Core.clone(this.ruleSet.editorMetas[id], true);
        }
    };


    window.$rule = Rule;
    cloudo.Rule = Rule;

})();