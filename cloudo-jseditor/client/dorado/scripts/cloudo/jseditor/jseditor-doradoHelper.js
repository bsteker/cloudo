(function () {
    $namespace("cloudo");
    var computePathController = function() {return cloudo.HINT.ComputePathController; };
    var ExpressionHelper = cloudo.HINT.ExpressionHelper;
    var DoradoHelper = cloudo.HINT.DoradoHelper = {};
    var AVal = tern.AVal;
    var Environment = cloudo.HINT.Environment = {
        getRuleSet: function () {
            return cloudo.Rule.ruleSet;
        },nid: function (aid) {
            var nid = cloudo.Toolkits.translateControlID(aid);
            return nid;
        },tid: function (nam) {
            var nid = cloudo.Toolkits.translateDataTypeName(nam);
            return nid;
        },rid: function (nid) {
            var rid = cloudo.Toolkits.getRid(nid);
            return rid;
        },ids: function () {
            var ids = cloudo.Toolkits.getControlIds();
            return ids;
        },dts: function () {
            var dts = cloudo.Toolkits.getDataTypeNames(cloudo.dataType.scope.VIEW);
            return dts;
        },propDefs: function (nid) {
            var names = cloudo.Toolkits.getDataTypePropDefNames(nid);
            return names;
        },values: function (nid, attr) {
            var values = cloudo.Toolkits.getPropertyValues(nid, attr);
            return values;
        },value: function (nid, attr) {
            var valueMeta = cloudo.Toolkits.getPropertyValueMeta(nid, attr);
            return valueMeta;
        },getDataPathDataType: function ( dataTypeNid, dataPath ) {
        	var actualDataType = cloudo.Toolkits.getDataPathDataType( dataTypeNid, dataPath );
        	return actualDataType;
        },jsp: function(nid){
            if (nid) {
                var rid = cloudo.Toolkits.getRid(nid);
                if (rid) {
                    var rule = Environment.getRuleSet().rules.data[rid];
                    if (rule) {
                        var p = rule.jsPrototype;
                        return p;
                    }
                }
            }
        }
    };
	
    //---------------------------------------------
    DoradoHelper.nid = Environment.nid;
    DoradoHelper.tid = Environment.tid;
    DoradoHelper.rid = Environment.rid;
    DoradoHelper.jsp = Environment.jsp;
    DoradoHelper.value = Environment.value;
    DoradoHelper.propDefs = Environment.propDefs;

    DoradoHelper.getDataPathDataType = function ( dataTypeNid, dataPath ){
    	dataPath = dataPath && dataPath.currentValue;
     	if ( dataPath && dataPath.indexOf("#") === 0 && dataPath.indexOf(".") === 1 ) {
     		dataPath = dataPath.substring( 2 );
     	} 
     	if ( dataPath ) {
     		dataPath = dataPath.split(".");
     	} else {
     		return ;
     	}
    	var actualDataType = Environment.getDataPathDataType( dataTypeNid, dataPath );
    	return actualDataType;
    };
	
    DoradoHelper.getDoradoAPI = function () {
    	var doradoAPI = {};
    	tern.cx().parent.options.defs.forEach( function( def ) {
    		if ( def["!group"] === "dorado" && def["!name"] === "core" ) {
    			doradoAPI = def;
    		}
    	} );
    	return doradoAPI;
    };
    
    //注册变量
    DoradoHelper.registerVars = function ( scope, contextVars ) {
        var vi, v, vk, vks = Object.keys(contextVars), aval;
        for (vi=0; vi<vks.length; vi++) {
        	var c_proto, c_protoType = "";
            vk = vks[vi]; v = contextVars[vk];
            delete scope.props[vk];
            aval = new AVal(v);
            
            if ( vk !== "arg" ) {
            	c_proto = v.jsPrototype;
                if (c_proto) c_protoType = DoradoHelper.getPrototypeType(c_proto);
                if (c_protoType) aval.addType(c_protoType);
            } else if ( vk === "arg" ) {
            	try {
            		var argAVal = DoradoHelper.buildArgAVal( v );
            		if ( argAVal === false ) {
            			continue;
            		}
                	aval.addType( argAVal.getType() );
            	} catch ( e ) {
            		console.log( e );
            	}
            }
            
            //tern.Scope#defProp(prop, originNode)
            scope.props[vk] = aval;
            //scope, which defaults to the context’s top scope.
            scope.broadcastProp(vk, aval, true);
        }
    };
    
    DoradoHelper.defaultAttributeValue = function ( fnParam, attributeName ) {
	    var type, sPrototype = fnParam.jsPrototype;
	    if ( sPrototype &&  attributeName ) {
	        type = DoradoHelper.getAttributeType(sPrototype, attributeName) || tern.ANull;
	        return type;
	    }
	};
	
	DoradoHelper.defaultAttributeNames = function ( fnParam, filterValue ) {
	    var className = fnParam.className;
	    filterValue = filterValue && filterValue.toLowerCase();
	    var rule = _toRule_(className), ATTRS = "", ns, ni, nb, nnb, nm;
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
    
    //获取属性类型
    DoradoHelper.getAttributeType = function (jsPrototype, attr) {
        var rule = _toRule_(jsPrototype), type = "";
        if (rule)
            type = _toType_(rule, attr);
        return type;
    };

    //获取属性的建议值列表
    DoradoHelper.getAttributeValues = function (fnParam, attr) {
        var callee = fnParam.callee, tparam = new tern.Obj(), nid = "";
        var values = [], result=[], vi, v = "";
        if (callee) tparam = ExpressionHelper.getTernParameter(callee);
        if (tparam) nid = tparam.nid;
        if (nid) values = Environment.values(nid, attr);
        if (values && values.length > 0) {
            for (vi=0; vi<values.length; vi++) {
                if (v = values[vi]) {
                    if ("true" !== v && "false" !== v)
                        v = "\"" + v + "\"";
                    result.push({name: v});
                };
            };
        }
        return result;
    };

    //获取控件的属性集合对象（flow Tern format）
    DoradoHelper.getAttributeNames = function (fnParam, filterValue) {
        var jsPrototype = fnParam.calleePrototype.name;
        var prp = ".prototype", position = jsPrototype.length - prp.length, className = jsPrototype;
        if (jsPrototype.lastIndexOf(prp) === position) {
            className = jsPrototype.substr(0, jsPrototype.length - prp.length);
        }
        fnParam.className = className;
        
        var handler = "", c, i, h;
        c = computePathController()[className];
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

        handler = handler || computePathController()["!attributes!"];
        var result = handler(fnParam, filterValue);
        return result;
    };
    
    //handle DataSet Controller
    
    DoradoHelper.computeDataSetDataAttrResultType = function ( fnParam, argValue, callNode ) {
    	var data = "";
    	var dataType = DoradoHelper.computeDataType( fnParam, argValue, callNode );
    	dataType = dataType && dataType.currentValue || dataType;
    	var prototype = DoradoHelper.handlerPrototype( dataType );
    	if ( prototype ) {
    		data = new AVal({
    			"dataType": dataType
    		});
    		data.addType( prototype );
    	}
    	return data;
    };
    
    //handle EntityList Controller
    
    DoradoHelper.computeEntityListElementReturnAval = function ( fnParam, argValue, callNode ) {
    	var data = "";
    	var dataType = DoradoHelper.computeDataType( fnParam, argValue, callNode );
		dataType = DoradoHelper.computeDataTypeId( dataType );
		var prototype = DoradoHelper.handlerPrototype( dataType );
		if ( prototype ) {
			 data = new AVal({
	                "dataType": dataType
	             });
			 data.addType( prototype );
		}
	    return data;
    };
    
    DoradoHelper.computeDataType = function ( fnParam, argValue, callNode ) {
		var parentAval = fnParam.parentAval, tparam = ExpressionHelper.getTernParameter( parentAval );
        var nid, dataType = tparam && tparam.dataType;
        if ( !dataType ) {
        	nid = tparam && tparam.nid;
        	dataType = nid && Environment.value(nid, "dataType");
        	
        	var selfNid = tparam.selfNid;
        	var dataPath = "";
        	if ( selfNid ) {
        		dataPath = DoradoHelper.value( selfNid, "dataPath" );
        	}
        	var actualDataType = "";
        	if ( dataPath ) {
            	var dataTypeId = DoradoHelper.computeDataTypeId( dataType );
            	var dataTypeNid = DoradoHelper.tid( dataTypeId );
            	actualDataType = DoradoHelper.getDataPathDataType( dataTypeNid, dataPath );
        	}
        	if ( actualDataType ) {
        		dataType = actualDataType;
        	}
        }
		return dataType;
	};
    
	DoradoHelper.computeDataTypeId = function ( dataType ) {
    	dataType = dataType && dataType.currentValue || dataType;
    	if ( dataType.charAt(0) === "[" && dataType.charAt(dataType.length-1) === "]" ) {
    		dataType = dataType.substring( 1, dataType.length - 1 );
    	} 
    	return dataType;
    };
    
    DoradoHelper.computeEntityListIteratorReturnAval = function ( fnParam, argValue, callNode ) {
    	var data = "";
    	var dataType = DoradoHelper.computeDataType( fnParam, argValue, callNode );
		var type = "dorado.util.Iterator";
		var prototype = DoradoHelper.getPrototypeType( type );
		if ( prototype ) {
			 data = new AVal({
	                "dataType": dataType,
	                "entityJsPrototype": fnParam.jsPrototype 
	             });
			 data.addType( prototype );
		}
	    return data;
    };
    
    DoradoHelper.handlerPrototype = function ( dataType ) {
    	var nsPrototypeType = "";
    	if (dataType.charAt(0) === "[" && dataType.charAt(dataType.length-1) === "]") {
            nsPrototypeType = DoradoHelper.getPrototypeType("dorado.EntityList");
        } else {
            nsPrototypeType = DoradoHelper.getPrototypeType("dorado.Entity");
        }
    	return nsPrototypeType;
       
    };
    
    DoradoHelper.buildBindingDataSetAval = function ( fnParam ) {
    	try {
    		var parentAval = fnParam.parentAval;
        	var t_param = ExpressionHelper.getTernParameter( parentAval );
        	var nid = t_param.nid;
        	var dataSetId = DoradoHelper.value( nid, "dataSet" );
    		dataSetId = dataSetId && dataSetId.currentValue || dataSetId;
        	var dataSetNid = DoradoHelper.nid( dataSetId );
        	var dataSetPrototype = "dorado.widget.DataSet";
        	var dataSetAval  = new AVal( {
        			jsPrototype: dataSetPrototype,
        			nid: dataSetNid,
        			rid: "DataSet",
        			selfNid: nid
        	} );
        	
        	var dataSetType = DoradoHelper.getPrototypeType( dataSetPrototype );
        	if ( dataSetType ) {
        		dataSetAval.addType( dataSetType );
        	} 
        	return dataSetAval; 
    	} catch ( e ) {
    		console.log( e );
    	} 
    	return tern.ANull;
    };
    
    //handle Util Iterator Contorller
    
    DoradoHelper.computeUtilIteratorElementReturnAval = function ( fnParam ) {
    	var parentAval = fnParam.parentAval;
    	var t_param = ExpressionHelper.getTernParameter( parentAval );
    	var dataType = t_param.dataType;
    	dataType = DoradoHelper.computeDataTypeId( dataType );
    	var entityJsPrototype = t_param.entityJsPrototype;
    	if ( entityJsPrototype === "dorado.EntityList" ) {
    		entityJsPrototype = "dorado.Entity";
    	}
    	var data = new AVal( {
    		dataType: dataType,
    	} );
    	var entityPrototypeType = DoradoHelper.getPrototypeType( entityJsPrototype );
    	if ( entityPrototypeType ) {
    		data.addType( entityPrototypeType );
    	}
    	return data || tern.ANull;
    };
    
    DoradoHelper.getPrototypeType = function ( controlPrototype ) {
        try {
            var cx = tern.cx();
            var scope = cx.topScope;
            var ns, nsType = scope, nsPrototype, nsPrototypeType;
            var pns = controlPrototype.split("."), pni;
            //get the all meybe hint by using its class path
            for (pni = 0; pni < pns.length; pni++) {
                ns = nsType.getProp(pns[pni]);
                nsType = ns.getType();
            }
        	nsPrototype = nsType.props.prototype;
            nsPrototypeType = nsPrototype.getType();

            return new tern.Obj(nsPrototypeType);
        } catch (e) {
            console.log(e);
        }
    };
    
    DoradoHelper.buildArgAVal = function ( arg ) {
    	"use strict";
    	var doradoAPI =  DoradoHelper.getDoradoAPI();
    	var argPath =  arg.path || arg;
		var extendEvents = [];
		var argPathArray = argPath.split(".");
		var currentArgAPI = doradoAPI;
		var customArgAVal = "";
		
		var eventName = function ( argPathArray ) {
			for ( var i = 0; i < argPathArray.length; i++ ) {
				if ( argPathArray[i] === "!events" ) {
					return argPathArray[ i + 1 ];
				};
			};
		};
		
		argPathArray.every( function( path ) {
			if ( currentArgAPI["!type"] === "fn()" && currentArgAPI["!extends"] ) {
				extendEvents = [].concat( extendEvents, currentArgAPI["!extends"] );
			}
			currentArgAPI = currentArgAPI[path];
			if ( !currentArgAPI ) {
				return false;
			}
			return true;
		}, currentArgAPI );
		
		if ( !currentArgAPI ) {
			var extendEventsPath = [];
			extendEvents.filter( function ( extendEvent, index, extendEvents  ) {
				extendEvent += ".!events." + this + ".!arg";
				extendEventsPath.push( extendEvent );
				return !!extendEvent;
			}, eventName( argPathArray ) );
			extendEventsPath.some( function ( extendEventPath ) {
				customArgAVal = DoradoHelper.buildArgAVal( extendEventPath );
				return !!customArgAVal;
			}, customArgAVal );
		} else if ( currentArgAPI ) {
			customArgAVal = new tern.AVal( {} );
			var argType = new tern.Obj( true, "arg" );
			Object.keys( currentArgAPI ).forEach( function ( prop ) {
				var type = currentArgAPI[ prop ]["!type"];
				if ( !type ) {
					type = new tern.Obj(null, "Object.prototype");
				} else if ( type && type.indexOf( "+" ) === 0 ) {
					type = type.substring( 1 );
					type = DoradoHelper.getPrototypeType( type );
				} else if ( type === "string" ) {
					type = tern.cx().str;
				} else if ( type === "number" ) {
					type = tern.cx().num;
				} else if ( type === "bool" ) {
					type = tern.cx().bool;
				} else if ( type === "fn()" ) {
					type = new tern.Obj(true, "Function.prototype");
				} else if ( type === "[?]" ) {
					type = new tern.Obj(true, "Array.prototype");
				};
				prop = argType.defProp(prop);
				prop.addType( type );
			}, currentArgAPI );
			customArgAVal.addType( argType );
			return customArgAVal;
		}
		if ( customArgAVal ) {
			return customArgAVal;
		}
		return false;
    };

    function _toType_(ar, attr) {
        var type = "", cx = tern.cx(), editorType;
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
    };

    var jsPrototype2rule_cache = {};
	function _toRule_(className) {
        var r = "";
        if (className in jsPrototype2rule_cache) {
            r = jsPrototype2rule_cache[className];
            return r;
        } else {
            var data = Environment.getRuleSet().rules.data, d, key;
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
    };
    
    DoradoHelper.handlerHintFuncs = {
	    set: [
            //1.第1个参数的全部提示: set(|)
            function (fnParam) {
                var callExpr = fnParam.callExpression;
                var completions = "", attrs, attrName = "", Attr;
                if (callExpr.node.arguments.length === 0) {
                    completions = [];
                    attrs = DoradoHelper.getAttributeNames(fnParam);
                    if (attrs) for (attrName in attrs) {
                        if (attrName.charAt(0) !== "!") {
                            Attr = attrs[attrName];
                            completions.push({
                                name: "\"" + attrName + "\"",
                                type: Attr["!type"],
                                doc: Attr["!doc"]
                            });
                        }
                    }
                }
                return completions;
            },
            //2.第1个参数的全部提示: set(|,xxx)
            function (fnParam) {
            	var callExpr = fnParam.callExpression, query = fnParam.query;
                var arg1, attrs, attrName = "", Attr, completions = "";
                if (callExpr.node.arguments.length === 1) {
                    arg1 = callExpr.node.arguments[0];
                    if (query.wordEnd < arg1.start) {
                        completions = [];
                        //get the custom DataType's attribute names to hint
                        attrs = DoradoHelper.getAttributeNames(fnParam);
                        if (attrs) for (attrName in attrs) {
                            if (attrName.charAt(0) !== "!") {
                                Attr = attrs[attrName];
                                completions.push({
                                    name: "\"" + attrName + "\"",
                                    type: Attr["!type"],
                                    doc: Attr["!doc"]
                                });
                            }
                        }
                    }
                }
                return completions;
            },
            //3.过滤第1个参数提示: set(xxx|)
            function (fnParam) {
                var callExpr = fnParam.callExpression, query = fnParam.query;
                var arg1, attrs, attrName = "", Attr, completions = "", filterValue;
                if (callExpr.node.arguments.length === 1) {
                    arg1 = callExpr.node.arguments[0];
                    if (query.wordEnd >= arg1.start && arg1.type === "Identifier") {
                        completions = [];
                        filterValue = arg1.name;
                        attrs = DoradoHelper.getAttributeNames(fnParam, filterValue);
                        if (attrs) for (attrName in attrs) {
                            if (attrName.charCodeAt(0) != 33) {
                                Attr = attrs[attrName];
                                completions.push({
                                    name: "\"" + attrName + "\"",
                                    type: Attr["!type"],
                                    doc: Attr["!doc"]
                                });
                            }
                        }
                    }
                }
                return completions;
            },
            //4.提示第2个参数: set(xxx,|)
            function (fnParam) {
                var callExpr = fnParam.callExpression, query = fnParam.query;
                var arg1, attrName, completions = null;
                if (callExpr.node.arguments.length === 1) {
                    arg1 = callExpr.node.arguments[0];
                    if (query.wordEnd >= arg1.start && arg1.type === "Literal") {
                        completions = [];
                        attrName = arg1.value;
                        if (attrName) {
                            var values = DoradoHelper.getAttributeValues(fnParam, attrName);
                            if (values) {
                                completions = completions.concat(values);
                            }
                        }
                    }
                }
                return completions;
            },
            //5.过滤第1个参数提示: set(xxx|, xxx)
            function (fnParam) {
                var callExpr = fnParam.callExpression, query = fnParam.query;
                var attrs, attrName = "", Attr, completions = "", filterValue, arg1;
                if (callExpr.node.arguments.length === 2) {
                    arg1 = callExpr.node.arguments[0];
                    if (query.wordStart === arg1.start && ( arg1.type === "Identifier" || arg1.type === "Literal" ) ) {
                        completions = [];
                        filterValue = arg1.name;
                        attrs = DoradoHelper.getAttributeNames(fnParam, filterValue);
                        if (attrs) {
                            for (attrName in attrs) {
                                if (attrName.charCodeAt(0) != 33) {
                                    Attr = attrs[attrName];
                                    completions.push({
                                        name: "\"" + attrName + "\"",
                                        type: Attr["!type"],
                                        doc: Attr["!doc"]
                                    });
                                }
                            }
                        }
                    }
                }
                return completions;
            }
	     ],
         get: [
               //1.提示全部的提示: get(|),get(#|)
               function (fnParam) {
                   var callExpr = fnParam.callExpression;
                   var attrs, attrName = "", Attr, completions = "", filterValue = fnParam.query.filterWord;
                   if (callExpr.node.arguments.length === 0) {
                       completions = [];
                       attrs = DoradoHelper.getAttributeNames(fnParam, filterValue);
                       if (attrs) for (attrName in attrs) {
                           if (attrName.charAt(0) !== "!") {
                               Attr = attrs[attrName];
                               completions.push({
                                   name: "\"" + attrName + "\"",
                                   type: Attr["!type"],
                                   doc: Attr["!doc"]
                               });
                           }
                       }
                   }
                   return completions;
               },
               //2.过滤提示: get(xxx|),get(#xxx|)
               function (fnParam) {
                   var callExpr = fnParam.callExpression;
                   var attrs, attrName = "", Attr, completions = "", filterValue, arg1;
                   if (callExpr.node.arguments.length === 1) {
                       arg1 = callExpr.node.arguments[0];
                       completions = [];
                       if (arg1.type === "Identifier" || arg1.type === "Literal") {
                           filterValue = fnParam.query.filterWord;
                           attrs = DoradoHelper.getAttributeNames(fnParam, filterValue);
                           if (attrs) {
                               for (attrName in attrs) {
                                   if (attrName.charCodeAt(0) != 33) {
                                       Attr = attrs[attrName];
                                       completions.push({
                                           name: "\"" + attrName + "\"", type: Attr["!type"], doc: Attr["!doc"]
                                       });
                                   }
                               }
                           }
                       }
                   }
                   return completions;
              }
         ]
    };
})();

