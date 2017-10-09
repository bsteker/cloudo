(function(){
	var getPrototypeType = cloudo.HINT.DoradoHelper.getPrototypeType;
	var AVal = tern.AVal;
	var ExpressionHelper = cloudo.HINT.ExpressionHelper;
	var DoradoHelper = cloudo.HINT.DoradoHelper;
	var Environment = cloudo.HINT.Environment;
	cloudo.HINT.ComputePathController = {
        "dorado.widget.View": {
            "#attributes": function (fnParam, filterValue) {
                var result = {};
                filterValue = filterValue && filterValue.toLowerCase().substring(1);
                var ids = Environment.ids(), i, id;
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
                var ids = Environment.dts(), i, id;
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
                var c_nid = DoradoHelper.nid(c_aid), c_proto = "", c_rid = "", c_protoType = "", aval = new AVal();
                if (c_nid) c_proto = DoradoHelper.jsp(c_nid);
                if (c_nid) c_rid = DoradoHelper.rid(c_nid);
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
                var c_nid = DoradoHelper.tid(c_aid), c_proto, c_rid = "", c_protoType, aval = new AVal();
                if (c_nid) c_rid = DoradoHelper.rid(c_nid);
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
                var callee = fnParam.callee, tparam = "", nid = "", result={};
                if (callee) tparam = ExpressionHelper.getTernParameter(callee);
                if (tparam) nid = tparam.nid;
                if (nid) {
                    var names = Environment.propDefs(nid),ni,name;
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
                var c_protoType = getPrototypeType("dorado.BasePropertyDef"), aval = new AVal;
                if (c_protoType) {
                    aval = new AVal();
                    aval.addType(c_protoType);
                }
                return aval || tern.ANull;
            }
        },

       "dorado.widget.DataSet": {
            "!attributes!": function (fnParam, filterValue) {
                var result = DoradoHelper.defaultAttributeNames(fnParam, filterValue);
                if (!("data" in result))
                    result.data = {};
                return result;
            },
            "attribute:data": function ( fnParam, argValue, callNode ) {
            	return DoradoHelper.computeDataSetDataAttrResultType( fnParam, argValue, callNode );
            }
        },
        "dorado.Entity": {
            "!attributes!": function (fnParam, filterValue) {
                var tparam = ExpressionHelper.getTernParameter(fnParam.callee);
                var dataType, tid, defs = [], di, name, result={};
                if ((dataType = tparam && tparam.dataType) && (tid = Environment.tid(dataType))) {
                    defs = Environment.propDefs(tid);
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
        "dorado.EntityList": {
        	"property:current": function ( fnParam, argValue, callNode ) {
        		return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:first": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:last": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:next": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:previous": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:getLast": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:getFirst": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:createChild": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:getById": function( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListElementReturnAval( fnParam, argValue, callNode );
    		},
    		"method:iterator": function ( fnParam, argValue, callNode ) {
    			return DoradoHelper.computeEntityListIteratorReturnAval( fnParam, argValue, callNode );
    		},
            "!attributes!": function (fnParam, filterValue) {
                var tparam = ExpressionHelper.getTernParameter(fnParam.callee);
                var dataType, tid, defs = [], di, name, result={};
                if ((dataType = tparam && tparam.dataType) && (tid = Environment.tid(dataType))) {
                    defs = Environment.propDefs(tid);
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
        "dorado.util.Iterator": {
        	"method:first": function ( fnParam, attributeName ) {
        		return DoradoHelper.computeUtilIteratorElementReturnAval( fnParam );
        	},
        	"method:last": function ( fnParam, attributeName ) {
        		return DoradoHelper.computeUtilIteratorElementReturnAval( fnParam );
        	},
        	"method:previous": function ( fnParam, attributeName ) {
        		return DoradoHelper.computeUtilIteratorElementReturnAval( fnParam );
        	},
        	"method:next": function ( fnParam, attributeName ) {
        		return DoradoHelper.computeUtilIteratorElementReturnAval( fnParam );
        	},
        	"method:current": function ( fnParam, attributeName ) {
        		return DoradoHelper.computeUtilIteratorElementReturnAval( fnParam );
        	}
        },
        "!attribute!:dataSet": function ( fnParam, attributeName ) {
        	 return DoradoHelper.buildBindingDataSetAval( fnParam, attributeName );
        },        
        "!attributeValue!": function ( fnParam, attributeName ) {
        	return DoradoHelper.defaultAttributeValue( fnParam, attributeName );
        },
        "!attributes!": function ( fnParam, filterValue ) {
        	return DoradoHelper.defaultAttributeNames( fnParam, filterValue );
        }
    };
})();