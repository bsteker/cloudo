(function () {
    $namespace("cloudo");
    var ENV = cloudo.jsENV = {}, PROTOCOL = {
        getRuleSet: function () {
            return cloudo.Rule.ruleSet;
        },
        nid: function (aid) {
            var nid = cloudo.Toolkits.translateControlID(aid);
            return nid;
        },
        tid: function (nam) {
            var nid = cloudo.Toolkits.translateDataTypeName(nam);
            return nid;
        },
        rid:function(nid){
            cloudo.Toolkits.getRid(nid);
        },
        ids: function () {
            var ids = cloudo.Toolkits.getControlIds();
            return ids;
        },
        dts: function () {
            var dts = cloudo.Toolkits.getDataTypeNames(cloudo.dataType.scope.VIEW);
            return dts;
        },
        propDefs: function (nid) {
            var names = cloudo.Toolkits.getDataTypePropDefNames(nid);
            return names;
        },
        values: function (nid, attr) {
            var values = cloudo.Toolkits.getPropertyValues(nid, attr);
            return values;
        },
        value: function (nid, attr) {
            var valueMeta = cloudo.Toolkits.getPropertyValueMeta(nid, attr);
            return valueMeta;
        }
    }, AVal = tern.AVal;

    //---------------------------------------------
    ENV.nid = function (aid) {
        var nid = PROTOCOL.nid(aid);
        return nid;
    };
    ENV.tid = function (aid) {
        var nid = PROTOCOL.tid(aid);
        return nid;
    };
    ENV.rid = function (nid) {
        var rid = PROTOCOL.rid(nid);
        return rid;
    };
    ENV.jsp = function (nid) {
        if (nid) {
            var rid = PROTOCOL.rid(nid);
            if (rid) {
                var rule = PROTOCOL.getRuleSet().rules.data[rid];
                if (rule) {
                    var p = rule.jsPrototype;
                    return p;
                }
            }
        }
    };
    ENV.registerVars = function(scope, contextVars) {
        var vi, v, vk, vks = Object.keys(contextVars), aval,c_proto, c_protoType;
        for (vi=0; vi<vks.length; vi++){
            vk = vks[vi]; v = contextVars[vk];
            delete scope.props[vk];

            aval = new AVal(v);
            c_proto = v.jsPrototype;
            if (c_proto) c_protoType = getPrototypeType(c_proto);
            if (c_protoType) aval.addType(c_protoType);

            //tern.Scope#defProp(prop, originNode)
            scope.props[vk] = aval;
            scope.broadcastProp(vk, aval, true);
        }
    };

    //获取属性类型
    ENV.getAttributeType = function (jsPrototype, attr) {
        var rule = _toRule_(jsPrototype), type;
        if (rule)
            type = _toType_(rule, attr);
        return type;
    };

    //获取属性的建议值列表
    ENV.getAttributeValues = function (fnParam, attr) {
        var callee = fnParam.callee,tparam,nid,values,result=[], vi,v;
        if (callee) tparam = ENV.getTernParameter(callee);
        if (tparam) nid = tparam.nid;
        if (nid) values = PROTOCOL.values(nid, attr);
        if (values && values.length > 0) {
            for (vi=0; vi<values.length; vi++) {
                if (v = values[vi]) {
                    if ("true" !== v && "false" !== v)
                        v = "\"" + v + "\"";
                    result.push({name: v});
                }
            }
        }
        return result;
    };

    ENV.getAttributeValue = function (fnParam, attributeName) {
        var className = fnParam.jsPrototype, handler, result;
        if (className && attributeName) {
            if (attributeName.length > 0) {
                var c = AttributeHandlers[className];
                handler = c && c["attributeValue:" + attributeName];
            }
            if (!handler && attributeName.length > 1) {
                i = attributeName.charAt(0);
                handler = handler || c[i + "attributeValue"];
            }

            handler = handler || AttributeHandlers["!attributeValue!"];
        }
        if (handler) {
            result = handler(fnParam, attributeName);
            return result;
        }
    };

    //获取控件的属性集合对象（flow Tern format）
    ENV.getAttributeNames = function (fnParam, filterValue) {
        var jsPrototype = fnParam.calleePrototype.name;
        var prp = ".prototype", position = jsPrototype.length - prp.length, className = jsPrototype;
        if (jsPrototype.lastIndexOf(prp) === position) {
            className = jsPrototype.substr(0, jsPrototype.length - prp.length);
        }
        fnParam.className = className;

        var handler, c, i, h;
        c = AttributeHandlers[className];
        if (filterValue) {
            i = filterValue.charAt(0);
            if (c) {
                h = c[i + "attributes"] || c["!attributes!"];
                if (h) handler = h;
            }
        } else {
            if (c) {
                h = c["!attributes!"];
                if (h) handler = h;
            }
        }

        handler = handler || AttributeHandlers["!attributes!"];
        var result = handler(fnParam, filterValue);
        return result;
    };

    var defaultAttributeValue = function (fnParam, attributeName) {
        var type, sPrototype = fnParam.jsPrototype;
        if (sPrototype && attributeName) {
            type = ENV.getAttributeType(sPrototype, attributeName) || tern.ANull;
            return type;
        }
    };
    var defaultAttributeNames = function (fnParam, filterValue) {
        var className = fnParam.className;
        filterValue = filterValue && filterValue.toLowerCase();
        var rule = _toRule_(className), ATTRS, ns, ni, nb, nnb, nm;
        try {
            ns = className.split(".");
            nb = window;
            for (ni = 0; ni < ns.length; ni++) {
                nm = ns[ni];
                nnb = nb[nm];
                nb = nnb;
            }
            ATTRS = nb.prototype.ATTRIBUTES;
        } catch (e) {
        }

        var names, name, result = {}, ni;
        if (rule && rule.properties) {
            names = rule.properties.names;
            for (ni = 0; ni < names.length; ni++) {
                name = names[ni];
                if (!ATTRS || ATTRS[name]) {
                    if (!filterValue || name.toLowerCase().indexOf(filterValue) >= 0) {
                        result[name] = {
                            "!type": _toType_(rule, name).name
                        };
                    }
                }
            }
            return result;
        } else {
            if (ATTRS) {
                names = Object.keys(ATTRS);
                for (ni = 0; ni < names.length; ni++) {
                    name = names[ni];
                    if (!filterValue ||
                        name.toLowerCase().indexOf(filterValue) >= 0) {
                        result[name] = {};
                    }
                }
            }
        }
        return result;
    };

    var AttributeHandlers = {
        "dorado.widget.View": {
            "#attributes": function (fnParam, filterValue) {
                var result = {};
                filterValue = filterValue && filterValue.toLowerCase().substring(1);
                var ids = PROTOCOL.ids(), i, id;
                for (i = 0; i < ids.length; i++) {
                    id = ids[i];
                    if (!filterValue || id.toLowerCase().indexOf(filterValue) >= 0) {
                        result["#" + id] = {};
                    }
                }
                return result;
            },
            "@attributes": function (fnParam, filterValue) {
                var result = {};
                filterValue = filterValue && filterValue.toLowerCase().substring(1);
                var ids = PROTOCOL.dts(), i, id;
                for (i = 0; i < ids.length; i++) {
                    id = ids[i];
                    if (!filterValue || id.toLowerCase().indexOf(filterValue) >= 0) {
                        result["@" + id] = {};
                    }
                }
                return result;
            },
            "#attributeValue": function (fnParam, attributeName) {
                var c_aid = attributeName.substring(1);
                var c_nid = ENV.nid(c_aid), c_proto, c_rid, c_protoType, aval;
                if (c_nid) c_proto = ENV.jsp(c_nid);
                if (c_nid) c_rid = ENV.rid(c_nid);
                if (c_proto) c_protoType = getPrototypeType(c_proto);
                if (c_protoType) {
                    aval = new AVal({
                        "aid": c_aid, "nid": c_nid, "rid": c_rid
                    });
                    aval.addType(c_protoType);
                }

                return aval || tern.ANull;
            },
            "@attributeValue": function (fnParam, attributeName) {
                var c_aid = attributeName.substring(1);
                var c_nid = ENV.tid(c_aid), c_proto, c_rid, c_protoType, aval;
                if (c_nid) c_rid = ENV.rid(c_nid);
                c_proto = "dorado.EntityDataType";
                c_protoType = getPrototypeType(c_proto);
                if (c_protoType) {
                    aval = new AVal({
                        "aid": c_aid, "nid": c_nid, "rid": c_rid
                    });
                    aval.addType(c_protoType);
                }

                return aval || tern.ANull;
            }
        },
        "dorado.EntityDataType": {
            "#attributes": function (fnParam, filterValue) {
                filterValue = filterValue && filterValue.toLowerCase().substring(1);
                var callee = fnParam.callee,tparam,nid,result={};
                if (callee) tparam = ENV.getTernParameter(callee);
                if (tparam) nid = tparam.nid;
                if (nid) {
                    var names = PROTOCOL.propDefs(nid),ni,name;
                    if (names && names.length > 0) {
                        for (ni=0; ni<names.length; ni++){
                            name = names[ni];
                            if (!filterValue || name.toLowerCase().indexOf(filterValue) >= 0) {
                                result["#"+name] = {};
                            }
                        }
                    }
                }
                return result;
            },
            "#attributeValue": function (fnParam, attributeName) {
                var c_protoType = getPrototypeType("dorado.BasePropertyDef"), aval;
                if (c_protoType) {
                    aval = new tern.AVal();
                    aval.addType(c_protoType);
                }
                return aval || tern.ANull;
            }
        },

        "dorado.widget.DataSet": {
            "!attributes!": function (fnParam, filterValue) {
                var result = defaultAttributeNames(fnParam, filterValue);
                if (!("data" in result))
                    result.data = {};
                return result;
            },
            "attributeValue:data": function (fnParam, filterValue) {
                var self = fnParam.self, data, tparam = ENV.getTernParameter(self),nid,
                    dataType = tparam && tparam.dataType;
                if(!dataType) {
                    nid = tparam && tparam.nid;
                    dataType = nid && PROTOCOL.value(nid, "dataType");
                }
                if (dataType) {
                    dataType = dataType && dataType.currentValue;
                    if (dataType) {
                        var nsPrototypeType;
                        if (dataType.charAt(0) === "[" && dataType.charAt(dataType.length-1) === "]") {
                            nsPrototypeType = getPrototypeType("dorado.EntityList");
                        } else {
                            nsPrototypeType = getPrototypeType("dorado.Entity");
                        }
                        if (nsPrototypeType) {
                            data = new AVal({
                                "dataType": dataType
                            });
                            data.addType(nsPrototypeType);
                        }
                    }
                }
                return data || tern.ANull;
            }
        },
        "dorado.Entity": {
            "!attributes!": function (fnParam, filterValue) {
                var tparam = ENV.getTernParameter(fnParam.callee), dataType, tid, defs, di, name, result={};
                if ((dataType = tparam && tparam.dataType) && (tid = PROTOCOL.tid(dataType))) {
                    defs = PROTOCOL.propDefs(tid);
                }
                if (defs && defs.length > 0) {
                    filterValue = filterValue && filterValue.toLowerCase();
                    for (di=0; di<defs.length; di++) {
                        name = defs[di];
                        if (!filterValue || name.toLowerCase().indexOf(filterValue) >= 0) {
                            result[name] = {};
                        }
                    }
                }

                return result;
            }
        },

        "!attributeValue!": defaultAttributeValue,
        "!attributes!": defaultAttributeNames
    };

    ENV.setTernParameter = function (tobj, param) {
        tobj["@t-param"] = param;
    };
    ENV.getTernParameter = function (tobj) {
        return tobj["@t-param"];
    };

    //--
    var jsPrototype2rule_cache = {};

    function _toRule_(className) {
        var r;
        if (className in jsPrototype2rule_cache) {
            r = jsPrototype2rule_cache[className];
            return r;
        } else {
            var data = PROTOCOL.getRuleSet().rules.data, d, key, keys;
            if (className === "dorado.EntityDataType"){
                r = data["DataType"];
            } else {
                for (var ki = 0, keys = Object.keys(data); ki < keys.length; ki++) {
                    key = keys[ki];
                    d = data[key];
                    if (d && d["jsPrototype"] === className) {
                        r = d;
                        break;
                    }
                }
            }
            jsPrototype2rule_cache[className] = r;
            return r;
        }
    }

    function _toType_(ar, attr) {
        var type, cx = tern.cx(), editorType;
        if (ar && attr) {
            if (ar && ar.properties && ar.properties.data && ar.properties.data[attr]) {
                editorType = ar.properties.data[attr].editorType;
                if ("boolean" === editorType) {
                    type = cx.bool;
                }
            }
        }
        //cx.protos.Object
        if (!type) type = cx.str;
        return type;
    }

    function getPrototypeType(controlPrototype) {
        try {
            var cx = tern.cx();
            var scope = cx.topScope;
            var ns, nsType = scope, nsPrototype, nsPrototypeType;
            var pns = controlPrototype.split("."), pni;
            for (pni = 0; pni < pns.length; pni++) {
                ns = nsType.getProp(pns[pni]);
                nsType = ns.getType();
            }
            nsPrototype = nsType.props.prototype;
            nsPrototypeType = nsPrototype.getType();

            return new tern.Obj(nsPrototypeType);
        } catch (e) {
            console.error(e);
        }
    }

})();

