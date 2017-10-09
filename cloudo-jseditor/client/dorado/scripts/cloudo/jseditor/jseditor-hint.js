//-- JavaScriptEditor.ability.hint --
(function () {
    var HintHelper = cloudo.HINT = {}, ARG_FLAGS = {
        "#": {}, "@": {}
    };
    var expressionHelper = function() {
    	return cloudo.HINT.ExpressionHelper;
    };
    var doradoHelper = function() {
    	return cloudo.HINT.DoradoHelper;
    };
    var tipHelper = function () {
    	return cloudo.HINT.TipHelper;
    };
    var getExprResultType = function( parentAval, argsType, argNodes, callNode ) {
    	return expressionHelper().getExprResultType( parentAval, argsType, argNodes, callNode );
    };
    HintHelper.doradoElementDefAjaxAction = function ( type, owner, name ) {
    	return tipHelper().doradoElementDefAjaxAction( type, owner, name );
    };
    HintHelper.buildDoradoElementTipDom = function ( doradoElementAPIMetaInfo, doradoElementAPIMetaInfo ) {
    	return tipHelper().buildDoradoElementTipDom( doradoElementAPIMetaInfo, doradoElementAPIMetaInfo );
    };
    HintHelper.tempDoradoElementAPITooltip = function( cm, dom ) {
    	return tipHelper().tempDoradoElementAPITooltip( cm, dom );
    };
    
    tern.registerPlugin( "dorado", function ( server, options ) {
        var def = cloudo.widget.JavaScriptEditor.getApi("dorado");
        return {defs: def};
    });
    tern.registerPlugin( "dorado_hint", function( server, options ) {
        return {
            passes:{
                preInfer: (function ( Server, options ) {
                    return function( ast, scope ) {
                        var thisServer = Server;
                        var contextVars = thisServer.options.contextVars;
                        if ( scope == tern.cx().topScope ) {
                           doradoHelper().registerVars( scope, contextVars );
                        }
                    };
                })(server, options)
            }
        };
    });
    
    tern.registerFunction( "doradoGet", getExprResultType );
    tern.registerFunction( "doradoEntity", getExprResultType );
    tern.registerFunction( "doradoIterator", getExprResultType );
    tern.defineQueryType( "doradoElementAPITip", {
    	takesFile: true,
    	run: function ( Server, query, file ) {
    		var expr = tern.findQueryExpr(file, query);
    		tern.resetGuessing();
		    if (query.depth != null && typeof query.depth != "number")
		    	throw ternError(".query.depth must be a number");
		    var doradoElementInfo = expressionHelper().computeDoradoElementInfo( query, expr, file );
    	    return doradoElementInfo;
    	}
    } );
    tern.defineQueryType( "doradoCompletions", {
        takesFile: true,
        run: function ( Server, query, file ) {
            var wordEnd = expressionHelper().resolvePos( file, query.end ), wordStart = wordEnd, text = file.text;
            while ( wordStart && ( expressionHelper().isIdentifierChar( text, wordStart - 1 ) ) ) --wordStart;
            if ( ARG_FLAGS[text.charAt(wordStart - 1)] ) {
                --wordStart;
                query.from.ch -= 1;
            }
            if ( query.expandWordForward !== false )
                while ( wordEnd < text.length && expressionHelper().isIdentifierChar( text, wordEnd ) ) ++wordEnd;
            query.wordStart = wordStart;
            query.wordEnd = wordEnd;
            query.filterWord = text.substring( wordStart, wordEnd );
            query.fileObj = file;
            var callExpression = expressionHelper().findExpressionAround( file.ast, null, wordEnd, file.scope, "CallExpression" );
            var doradoCompletions = HintHelper.callArgCompletions( callExpression, query );

            return {
                from: query.from,
                completions: doradoCompletions
            };
        }
    });
   
    HintHelper.callArgCompletions = function ( callExpression, query ) {
        var completions = [], methodName;
        var funcs, fi, fn, fnCompletions;
        if ( callExpression == null ) {
            return [];
        }
        var calleeNode = callExpression.node.callee || callExpression.node;
        methodName = calleeNode.property.name;
        var handlerHintFuncs = doradoHelper().handlerHintFuncs;
        funcs = handlerHintFuncs[methodName];
        if ( !funcs ) {
            return completions;
        }
        
        var callee = expressionHelper().computeCallExprAValType( callExpression, query );
        var calleeType = new Object(), calleePrototype = "", fnParam = {};
        
        if (callee) calleeType = callee.getType(false);
        if (calleeType) calleePrototype = calleeType.proto;
        if (!calleePrototype) return completions;

        fnParam = {
            callee: callee,
            calleePrototype: calleePrototype,
            callExpression: callExpression,
            query: query
        };
        for (fi = 0; fi < funcs.length; fi++) {
            fn = funcs[fi];
            fnCompletions = fn(fnParam);
            if (fnCompletions)
                return fnCompletions;
        }
        return completions;
    };

    HintHelper.showDoradoElementAPITip = function (dapiData) {
    	var type=dapiData.type, owner=dapiData.owner, name=dapiData.name;
    	var dom = document.createElement( "iframe" );
	    dom.setAttribute( "id", "doradoElementAPITip" );
	    if ( type === "event" ) {
	    	dom.setAttribute( "data-dorado-element-type", "event" );
	    }
	    dom.className = "CodeMirror-Tern-tooltip";
	    dom.setAttribute( "sandbox", "allow-same-origin allow-scripts" );
	    //规避链接中的特殊字符，
	    var src = window.location.protocol + "//" + window.location.host + $setting["common.contextPath"];
	    src += "dorado/cloudo/api/client-javascript/tip?" +
				"type=" + encodeURIComponent( type ) + 
				"&owner=" + encodeURIComponent( owner ) + 
				"&name=" + encodeURIComponent( name );
	    dom.src = src;
	    dom.onload = function () {
	    	var wrap = cm.getWrapperElement();
	    	var domWidth = wrap.offsetWidth;
	    	var gutterWidth = cm.getGutterElement().offsetWidth;
			domWidth = domWidth - gutterWidth - 5;
			this.setAttribute( "width", ( domWidth ) + "px" );
	    	var body = this.contentDocument.body, child;
	    	var height = 0, textCount = 0;
	    	for ( var i = 0; i < body.childNodes.length; i++ ) {
	    		child = body.childNodes[i];
	    		if ( child.nodeName !== "#text" ) {
	    			height += child.offsetHeight;
	    		} else {
	    			textCount++;
	    		}
	    	}
	    	height = height + textCount * 5;
            height = height > 260 ? 260: height;
            height = height < 40 ? 40: height;
	    	var style = "height: " + height + "px; " +
	    				"z-index: 100000; position: absolute; resize: both;";
	    	this.setAttribute( "style", style );
	    	var where = cm.cursorCoords( true, "local" );
            var position = cm.cursorCoords( true, "page" );
            
    		var belowHeight = wrap.offsetHeight - where.top + cm.defaultTextHeight();
    		var eventType = dom.getAttribute( "data-dorado-element-type" );
    		var direction = dom.getAttribute( "data-direction" );
    		if ( !eventType ) {
    			if ( direction === "bottom" || ( direction !== "top" &&  belowHeight > height ) ) {
    				dom.setAttribute( "data-direction", "bottom" );
    				this.style.left = ( position.right + 1 ) + "px";
    				if ( belowHeight > height + 30 ) {
        				 this.style.top = position.top + cm.defaultTextHeight() + "px";
    				} else {
       				 	this.style.top = position.top + belowHeight - 20 - height + "px";
    				}
    			} else {
    				dom.setAttribute( "data-direction", "top" );
    				this.style.left = ( position.right + 1 ) + "px";
    				this.style.top = ( position.top - height - cm.defaultTextHeight() + 7 ) + "px";
    			}
    		} else {
    			if ( direction === "bottom" || ( direction !== "top" && wrap.offsetHeight > height ) ) {
    				dom.setAttribute( "data-direction", "bottom" );
    				this.style.left = ( position.right - where.right + 1 ) + "px";
	    			this.style.top = ( position.top - where.top ) + "px";
	   			} else {
	   				dom.setAttribute( "data-direction", "top" );
	   				this.style.left = ( position.right - where.right + 1 ) + "px";
	   				this.style.top = ( position.top - where.top - height - 62 ) + "px";
	   			}
    		}
	    	document.body.appendChild( this );
	    };
	    document.body.appendChild(dom);
	    var cm = cloudo.eventEditor.getCodeEditor().getCodeMirror();
	    function clear() {
	      if (!dom.parentNode) return;
	      cm.off("mousedown", clear);
	      fadeOut(dom);
	    }
	    cm.on("mousedown", clear);
	    function fadeOut( dom ) {
	    	dom.style.opacity = "0";
		    setTimeout(function() { remove(dom); }, 600);
		}

		function remove(dom) {
		    var p = dom && dom.parentNode;
		    if (p) p.removeChild(dom);
		}
    };

})();
