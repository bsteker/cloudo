(function(){
	var ExpressionHelper = cloudo.HINT.ExpressionHelper = new Object();
	var computePathController = function () { return cloudo.HINT.ComputePathController; };
	var AVal = tern.AVal;
	var doradoHelper = function() {
    	return cloudo.HINT.DoradoHelper;
    };
	ExpressionHelper.setTernParameter = function ( tobj, param ) {
        tobj["@t-param"] = param;
    };
    ExpressionHelper.getTernParameter = function ( tobj ) {
        return tobj["@t-param"];
    };
	ExpressionHelper.findExpressionAround = function ( ast, wordStart, wordEnd, scope, findExpressionType ) {
		return tern.findExpressionAround ( ast, wordStart, wordEnd, scope, findExpressionType );
	};
	ExpressionHelper.resolvePos = function ( file, cursorPos ) {
		return tern.resolvePos( file, cursorPos );
	};
	ExpressionHelper.isIdentifierChar = function ( text, wordPosition ) {
		return acorn.isIdentifierChar( text.charCodeAt( wordPosition ) );
	};
	ExpressionHelper.expressionType = function ( grandCallExpr ) {
		return tern.expressionType( grandCallExpr );
	};
	
	ExpressionHelper.getExprResultType = function( parentAval, argsType, argNodes, callNode ) {
        try {
        	var parentProtoType = parentAval.name, argValue = "";
            if ( argNodes && argNodes.length == 1 ) {
                var argNode = argNodes[0];
                if (argNode.type === "Literal") {
                	argValue = argNode.value;
                }else{
                	argValue = null;
                }
            }else if( argNodes && argNodes.length == 0 ) {
            	argValue = null;
            }
            
            if (!parentProtoType) {
                var parentDefaultType = parentAval.types[0];
                parentProtoType = parentDefaultType.name;
            }
            var fnParam = {
                jsPrototype: parentProtoType,
                parentAval: parentAval,
                argsType: argsType,
                argNodes: argNodes
            };
            return ExpressionHelper.computeExprResultType(fnParam, argValue, callNode) || tern.ANull;
        } catch (e) {
            console.error(e);
        }
        return tern.ANull;
	};
	
	ExpressionHelper.computeExprResultType = function ( fnParam, argValue, callNode ) {
    	var type = "attribute:";
    	if ( callNode && callNode.type === "MemberExpression" ) {
    		type = "property:";
    		argValue = callNode.property && callNode.property.name;
    	}
		var className = fnParam.jsPrototype, handler = "", result;
    	var c = computePathController()[className];
    	if ( argValue === "dataSet" ) {
    		type = "!attribute!:";
    		handler = computePathController()[ type + argValue ];
    	}
    	
    	if ( !handler && argValue && argValue.length > 0 ) {
        	//compute calleeNode value
            handler = c && c[type + argValue];
        }
        if ( !handler && argValue && argValue.length > 1 ) {
            i = argValue.charAt(0);
            if ( i === "#" || i === "@" ) {
            	handler = handler || c[i + "attributeValue"];
            }
        }
        if( !handler && callNode && callNode.type === "CallExpression" ) {
        	type = "method:";
        	var currentCallName = callNode.callee.property.name;
            handler = c && c[type + currentCallName];
        }
        handler = handler || computePathController()["!attributeValue!"];
       
        if ( handler ) {
            result = handler( fnParam, argValue, callNode );
            return result;
        }
    };
    
    ExpressionHelper.computeValidAssignNode = function( ast, calleeEnd, variableName ) {
    	var initNode = "";
    	acorn.walk.simple(ast, {
    		VariableDeclaration: function(node){
    			if( node.end > calleeEnd ) return;
    			var declarations = node.declarations;
    			declarations.forEach(function(declaration){
    				if( declaration.id.name === variableName ){
    					initNode = declaration.init;
    				}
    			});
    		},
    		ExpressionStatement: function(node){
    			if( node.end > calleeEnd ) return;
    			var expression = node.expression;
    			if( expression.type === "AssignmentExpression" ){
    				
        			if( expression.left.type === "Identifier" && expression.left.name === variableName ){
        				initNode = expression.right;
        			}
    			}
    		}
    	});
    	if ( initNode.type === "Identifier" ) {
    		initNode = ExpressionHelper.computeValidAssignNode( ast, initNode.end, initNode.name );
    	}
    	return initNode;
    };
    ExpressionHelper.computeArgExprDataAValType = function ( callExpression, superCallExpr ) {
    	try {
    		var grandCallNode = superCallExpr.node && superCallExpr.node.object || superCallExpr.object;
        	var argScope = callExpression.state.props[ grandCallNode.name ];
    		var t_param = ExpressionHelper.getTernParameter( argScope );
    		var nid = t_param.self.nid;
    		var dataSet = doradoHelper().value( nid, "dataSet" );
    		var dataType = doradoHelper().value( nid, "dataType" );
    		
    		if ( !( dataType && dataType.currentValue ) && dataSet ) {
    			dataSet = dataSet.currentValue || dataSet;
    			nid = doradoHelper().nid( dataSet );
    			dataType = doradoHelper().value( nid, "dataType" );
    			
    		} else if ( !dataSet ) {
    			throw "dataType and dataSet can't both be null .";
    		}
    		dataType = doradoHelper().computeEntityListBindingDataTypeId( dataType );
        	var argType = argScope.getType();
        	var dataProp = superCallExpr.node && superCallExpr.node.property.name || superCallExpr.property.name;
        	var dataScope = argType.props[ dataProp ];
    		var dataTernType = dataScope.getType();
    		var arg_data_t_param = new tern.AVal( {
    			"dataType": dataType
    		} );
    		arg_data_t_param.addType( dataTernType );
    		return arg_data_t_param;
    	} catch ( e ) {
    		console.log( e );
    	}
    	return tern.ANull;
    };
    
    ExpressionHelper.computeCallExprAValType = function ( callExpression, query ) {
    	var callee = new AVal();
		var calleeNode = callExpression.node.callee || callExpression.node;
		if ( "Identifier" === calleeNode.object.type ) {
		    var calleeName = calleeNode.object.name;
		    callee = callExpression.state.props[calleeName];
		    if ( !ExpressionHelper.getTernParameter(callee) ) {
		    	var calleeEnd = calleeNode.end;
		     	var variableName = calleeNode.object.name;
		     	var ast = query.fileObj && query.fileObj.ast;
		     	var validAssginNode = ExpressionHelper.computeValidAssignNode( ast, calleeEnd, variableName );
		     	
		        if ( validAssginNode.object && validAssginNode.object.type === "Identifier" ) {
		     		var grandCallNode = validAssginNode.object;
		     		if ( grandCallNode.name === "arg" ) {
		     			callee = ExpressionHelper.computeArgExprDataAValType( callExpression, validAssginNode );
		     		}
		     	} else {
		     		var fileObj = query.fileObj;
		         	var	assginNodeEnd = validAssginNode.end;
		            var	superCallExpr = ExpressionHelper.findExpressionAround( ast, null, assginNodeEnd, fileObj.scope, "MemberExpression" );
		            var grandCallExpr = "";
		     		if ( !superCallExpr ) {
		             	superCallExpr = ExpressionHelper.findExpressionAround( ast, null, assginNodeEnd, fileObj.scope, "CallExpression" );
		             	grandCallExpr = ExpressionHelper.findExpressionAround( ast, null, validAssginNode.callee.object.end, fileObj.scope, "CallExpression");
		            } else {
		             	grandCallExpr = ExpressionHelper.findExpressionAround( ast, null, validAssginNode.object.end, fileObj.scope, "CallExpression");
		            }
		     		
		     		var grandCallCallee = ExpressionHelper.expressionType( grandCallExpr );
		            callee = ExpressionHelper.getExprResultType( grandCallCallee, [], grandCallExpr.node.arguments, superCallExpr.node );
		     	}
		    }
		 } else if ( "CallExpression" === calleeNode.object.type ) {
		    var fileObj = query.fileObj;
		    var end = calleeNode.object.callee.property.start;
		    var superCallExpr = ExpressionHelper.findExpressionAround(fileObj.ast, null, end, fileObj.scope, "CallExpression");
		    callee = ExpressionHelper.expressionType(superCallExpr);
		 } else if ( "MemberExpression" === calleeNode.object.type ) {
		 	var fileObj = query.fileObj;
		 	var end = calleeNode.object.property.end;
		 	var superCallExpr = ExpressionHelper.findExpressionAround(fileObj.ast, null, end, fileObj.scope, "MemberExpression");
		 	
		 	if ( superCallExpr.node.object && superCallExpr.node.object.type === "Identifier" ) {
		 		var grandCallNode = superCallExpr.node.object;
		 		if ( grandCallNode.name === "arg" ) {
		 			callee = ExpressionHelper.computeArgExprDataAValType( callExpression, superCallExpr );
		 		} else {
		 			var grandCallCallee = callExpression.state.props[ grandCallNode.name ];
		 			if ( grandCallCallee ) {
		 				callee = ExpressionHelper.getExprResultType( grandCallCallee, [], [], calleeNode.object );
		 			}
		 		}
		 	} else {
		 		var grandCallExpr = ExpressionHelper.findExpressionAround(fileObj.ast, null, superCallExpr.node.object.callee.property.end, fileObj.scope, "CallExpression");
		        var grandCallCallee = ExpressionHelper.expressionType( grandCallExpr );
		     	callee = ExpressionHelper.getExprResultType( grandCallCallee, [], grandCallExpr.node.arguments, calleeNode.object );
		 	}
		 }
		 return callee;
    };
    
    ExpressionHelper.computeDoradoElementInfo = function ( query, expr, file ) {
    	var Doc = query.doc.doc;
 	    var doradoElementType = "", node = expr.node;
 	    var superCallExpr = "", superNode = "", superNodePos = "";
 	    var owner = "", name = "";
 	    if ( node.type === "MemberExpression" ) {
 	    	superNode = expr.node.object;
 	    	if ( superNode ) {
    	    	superNodePos = Doc.posFromIndex( superNode.end );
    	    	if ( query.end ) {
        	    	delete query.end;
    	    	}
    	    	query.end = superNodePos;
    	    	superCallExpr = tern.findQueryExpr(file, query);
    	    	superType = ExpressionHelper.expressionType( superCallExpr );
    	    	superType = superType.getType( false );
    	    	owner = superType && superType.name;
    	    	name = node.property && node.property.name;
    	    	var type = ExpressionHelper.expressionType( expr ); 
    	    	type  = type.getType( false );
    	    	if ( type ) {
    	    		var tempName = type.name;
    	    		var tempArray = tempName.split( "." );
    	    		var queryName = tempArray.reverse()[0];
    	    		if ( tempName.indexOf( "prototype" ) !== -1 && queryName !== "EVENTS" && queryName !== "ATTRIBUTES" ) {
    	    			doradoElementType = "method";
    	    		} else {
    	    			doradoElementType = "property";
    	    		}
    	    	}
    	    }
 	    	
 	    } else if ( node.type === "Literal" ) {
     	    var currentCallExpr = ExpressionHelper.findExpressionAround( file.ast, null, expr.node.end, file.scope, "CallExpression" );
     	    if ( currentCallExpr ) {
     	    	var args = currentCallExpr.node.arguments;
          	    name = args[0].value || arg[0].raw;
          	    superNode = currentCallExpr.node.callee.object;
          	    
          	    var superType = "";
           	    if ( superNode ) {
           	    	superNodePos = Doc.posFromIndex( superNode.end );
           	    	if ( query.end ) {
               	    	delete query.end;
           	    	}
           	    	query.end = superNodePos;
           	    	superCallExpr = tern.findQueryExpr(file, query);
           	    	superType = ExpressionHelper.expressionType( superCallExpr );
           	    	superType = superType.getType( false );
           	    	owner = superType && superType.name;
           	    	doradoElementType = "attribute";
           	    }
     	    }
     	    
 	    } else if ( node.type === "Identifier" ) {
 	    	var type = ExpressionHelper.expressionType( expr ); 
	    	type  = type.getType( false );
	    	owner = type && type.name;
 	    	doradoElementType = "class";
 	    }

        if (doradoElementType)
            return {
                type: doradoElementType,
                owner: owner,
                name: name
            }
        else
            return null;
    };
})();