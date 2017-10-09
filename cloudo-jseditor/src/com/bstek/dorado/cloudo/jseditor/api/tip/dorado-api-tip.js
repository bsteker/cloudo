(function() {
	var TipHelper = window.TipHelper = new Object();
	window.openSymbolDoc = function (alias) {
		var name = "";
		var type = "class";
		if ( alias.indexOf("#") !== -1 ) {
			var tempAlias = alias.split("#");
			alias = tempAlias[0];
			name = tempAlias[1];
			type = "method";
		}
		var aliasTemp = alias.split(".");
		var staticMethod = aliasTemp.reverse()[0];
		var code = staticMethod.charCodeAt(0);
		if ( code >= 97 && code <= 122 ) {
			var tempAlias = alias;
			alias = tempAlias.substring( 0, tempAlias.lastIndexOf(".") );
			name = tempAlias.substring( tempAlias.lastIndexOf(".") + 1 );
			type = "method";
		}
		
		if ( alias.indexOf( "[" ) === 0 && alias.indexOf( "]" ) === ( alias.length - 1) ) {
			alias = alias.replace( /^\[/, "" ).replace( /\]$/, "" );
		}
		var headChildren = document.head.children;
		var headChild = "";
		for ( var i = 0; i < headChildren.length; i++ ) {
			headChild = headChildren[i];
			document.head.removeChild( headChild );
		}
		var bodyChildren = document.body.children;
		var bodyChild = "";
		for ( var i = 0; i < bodyChildren.length; i++ ) {
			bodyChild = bodyChildren[i];
			document.body.removeChild( bodyChild );
		}
		
		var href = window.location.origin + window.location.pathname;
		var hrefParams = "?type=" + encodeURIComponent( type ) + 
						 "&owner=" + encodeURIComponent( alias ) + 
						 "&name=" + encodeURIComponent( name );
		href += hrefParams;
	    window.location.href = href;
	};
	
	TipHelper.buildDoradoElementTipDom = function ( doradoElementAPIMetaInfo ) {
		if ( !doradoElementAPIMetaInfo.metaInfo ) {
			return;
		}
		var replaceLinkFunName = doradoElementAPIMetaInfo.metaInfo;
		var mainSymbol = JSON.parse( replaceLinkFunName );
		var type = doradoElementAPIMetaInfo.type;
		switch ( type ) {
			case "class": {
				DomHelper.generateSymbolDesc( mainSymbol );
				break;
			}
			case "method": case "event":{
    			DomHelper.generateMethodDoc( mainSymbol );
    			break;
    		}
			case "property": case "attribute": {
				if ( type === "attribute" ) {
					mainSymbol.elementType = "attribute";
				} else if ( type === "property" ) {
					mainSymbol.elementType = "property";
				}
				DomHelper.generateAttributeDoc( mainSymbol );
			}
		}
	};
	
	var DomHelper = window.DomHelper = new Object();
	function getMemberId(name, memberType) {
		if (memberType == "attribute") name = "attribute:" + name;
		else if (memberType == "event") name = "event:" + name;
		return "elSymbolMember_" + name.replace(':', "__");
	}

	function generateMemberOf(container, memberOf) {
		container.appendChild(document.createTextNode("from "));
		container.appendChild(DomHelper.createSymbolLink( memberOf, memberOf.split('.'), true ));
	}
	
	var createSymbolLink = DomHelper.createSymbolLink = function (alias, text, memberOfFlag ) {
		var dom;
		if ( alias && alias.indexOf( "." ) !== -1 ) {
			dom = document.createElement("A");
			dom.href = "#";
			dom.setAttribute( "data-alias", alias );
			dom.setAttribute( "class", "symbol-link" );
			if ( memberOfFlag ) {
				dom.appendChild( document.createTextNode( text[ text.length - 1 ] || alias ) );
			} else {
				dom.appendChild( document.createTextNode( text || alias ) );
			}
			dom.onclick = function() {
				var alias = this.getAttribute("data-alias");
				openSymbolDoc( alias );
			} ;
		} else {
			dom = document.createTextNode(text || alias);
		}
		return dom;
	};

	DomHelper.createSymbolLinks = function (text) {
		var doms = [];
		if (text) {
			var texts = text.split( "|" );
			for ( var i = 0; i < texts.length; i++ ) {
				section = texts[i];
				var index = section.indexOf("[]"), alias = section, isArray;
				if (index > 0 && index == section.length - 2) {
					isArray = true;
					alias = section.substring(0, section.length - 2);
				}
				if (i > 0) doms.push(document.createTextNode("|"));
				doms.push(createSymbolLink(alias, section));
			}
		}
		return doms;
	};
	DomHelper.generateAttributeDoc = function ( mainSymbol ) {
		var member = mainSymbol;
		var type = member.elementType;
		if ( !type ) {
			return ;
		}
		var elSybmolProps = document.getElementById( "elSybmolProps" );
		elSybmolProps.setAttribute( "style", "display: none;" );
		var symbolTitle = document.getElementById( "symbolTitle" );
		symbolTitle.setAttribute( "style", "display: none;" );
		var hrTags = document.getElementsByTagName( "hr" );
		for ( var i = 0; i < hrTags.length; i++ ) {
			hrTags[i].setAttribute( "style", "display: none;" );
		}
		
		var memberType = type;
		var doms = document.createElement( "div" );
		doms.className = "symbol-member";
		doms.setAttribute( "style", "overflow: hidden" );
		document.body.appendChild( doms );
		
		var memberSyntaxDiv = document.createElement( "DIV" );
		memberSyntaxDiv.setAttribute( "id", getMemberId(member.name, memberType) );
		doms.appendChild( memberSyntaxDiv );
		
		var memberVisibilitySpan = document.createElement( "SPAN" );
		memberVisibilitySpan.className = "member-visibility";
		memberVisibilitySpan.innerText = member.visibility + " ";
		memberVisibilitySpan.setAttribute( "style", "display: " + ( memberType == "property" ? "" : "none" ) );
		memberSyntaxDiv.appendChild( memberVisibilitySpan );
		
		var memberStaticSpan = document.createElement( "SPAN" );
		memberStaticSpan.className = "member-static";
		memberStaticSpan.innerText = " static ";
		memberStaticSpan.setAttribute( "style", "display: " + ( member.isStatic ? "" : "none" ) );
		memberSyntaxDiv.appendChild( memberStaticSpan );
		
		var memberNameLabel = document.createElement( "LABEL" );
		memberNameLabel.className = "member-name  member-name-" + memberType + " member-name-" + member.visibility;
		memberNameLabel.innerText = member.name;
		memberSyntaxDiv.appendChild( memberNameLabel );
		memberSyntaxDiv.appendChild( document.createTextNode( " : " ) );
		
		var memberDataTypeLabel = document.createElement( "LABEL" );
		memberDataTypeLabel.className = "member-data-type member-data-type-" + memberType;
		memberSyntaxDiv.appendChild( memberDataTypeLabel );
		memberSyntaxDiv.appendChild( document.createTextNode( " " ) );

		var memberDefaultLabel = document.createElement( "LABEL" );
		memberDefaultLabel.className = "member-default";
		memberDefaultLabel.innerText = (member.defaultValue ? ("( = " + member.defaultValue + " )") : "");
		memberSyntaxDiv.appendChild( memberDefaultLabel );
		
		var memberOfLabel = document.createElement( "LABEL" );
		memberOfLabel.className = "member-of member-of-" + memberType;
		memberOfLabel.setAttribute( "style", "position: absolute; right: 20px;" );
		memberSyntaxDiv.appendChild( memberOfLabel );
		
		var memberPropsDiv = document.createElement( "DIV" );
		memberPropsDiv.className = "member-props";
		memberPropsDiv.setAttribute( "style", "display: none;" );
		doms.appendChild( memberPropsDiv );
		
		var memberDescDiv = document.createElement( "DIV" );
		memberDescDiv.className = "member-desc member-desc-" + memberType;
		memberDescDiv.innerHTML = member.desc;
		doms.appendChild( memberDescDiv );
		
		var memberSeesP = document.createElement( "P" );
		memberSeesP.className = "member-sees member-sees-" + memberType;
		memberSeesP.setAttribute( "style", "display: none" );
		doms.appendChild( memberSeesP );
		
		var memberExamplesP = document.createElement( "P" );
		memberExamplesP.className = "member-examples member-examples-" + memberType;
		memberExamplesP.setAttribute( "style", "display: none; overflow: auto" );
		doms.appendChild( memberExamplesP );
		
		var memberTailP = document.createElement( "P" );
		memberTailP.className = "member-examples member-examples-" + memberType;
		memberTailP.setAttribute( "style", "display: none; overflow: auto; height: 8;" );
		doms.appendChild( memberTailP );
		
		if (memberType == "attribute") {
			var memberProp = "";
			if (member.readOnly) {
				memberProp = document.createElement( "LABEL" );
				memberProp.className = "member-prop";
				memberProp.appendChild( document.createTextNode( "[ReadOnly]" ) );
				memberPropsDiv.appendChild( memberProp );
			}
			if (member.writeOnly) {
				memberProp = document.createElement( "LABEL" );
				memberProp.className = "member-prop";
				memberProp.appendChild( document.createTextNode( "[WriteOnly]" ) );
				memberPropsDiv.appendChild( memberProp );
			}
			if (member.writeOnce) {
				memberProp = document.createElement( "LABEL" );
				memberProp.className = "member-prop";
				memberProp.appendChild( document.createTextNode( "[WriteOnce]" ) );
				memberPropsDiv.appendChild( memberProp );
			}
			if (member.skipAutoRefresh) {
				memberProp = document.createElement( "LABEL" );
				memberProp.className = "member-prop";
				memberProp.appendChild( document.createTextNode( "[skipAutoRefresh]" ) );
				memberPropsDiv.appendChild( memberProp );
			}
			if (member.writeBeforeReady) {
				memberProp = document.createElement( "LABEL" );
				memberProp.className = "member-prop";
				memberProp.appendChild( document.createTextNode( "[WriteBeforeReady]" ) );
				memberPropsDiv.appendChild( memberProp );
			}
			if ( member.readOnly || member.writeOnly || member.writeOnce || member.skipAutoRefresh || member.writeBeforeReady ) {
				memberPropsDiv.style.display = "";
			}
		}
		
		var memberDataType = (member.type) ? member.type : "void";
		var elements = DomHelper.createSymbolLinks( memberDataType );
		for ( var i = 0; i < elements.length; i++ ) {
			element = elements[i];
			memberDataTypeLabel.appendChild( element );
		}
		
		if (member.memberOf != "_global_") generateMemberOf( memberOfLabel, member.memberOf);
		
		if (member.see) {
			var seesTitles = document.createElement( "DIV" );
			seesTitles.setAttribute( "class", "sees-title" );
			seesTitles.appendChild( document.createTextNode( "See:" ) );
			memberSeesP.appendChild( seesTitles );
			var ulElement = document.createElement("UL");
			var see = "";
			for ( var i = 0; i < member.see.length; i++ ) {
				see = member.see[i];
				var liElement = document.createElement("LI");
				liElement.appendChild(DomHelper.createSymbolLink(see));
				ulElement.appendChild(liElement);
			}
			memberSeesP.appendChild(ulElement);
			memberSeesP.setAttribute( "style", "display: " );
		}
		if (member.example) {
			var example = "";
			for ( var i = 0; i < member.example.length; i++ ) {
				example = member.example[i];
				if (i > 0) memberExamplesP.appendChild("&nbsp;");
				var exampleTitle = document.createElement( "DIV" );
				exampleTitle.setAttribute( "class", "example-title" );
				exampleTitle.appendChild( document.createTextNode( "Example " + (i + 1) + ": " ) );
				memberExamplesP.appendChild( exampleTitle );
				var elExample = document.createElement( "PRE" );
				elExample.className = "brush: js;";
				memberExamplesP.appendChild( elExample );
				elExample.innerHTML = example.desc;
				
			}
			memberExamplesP.setAttribute( "style", "display: " );
		}
	};

	DomHelper.generateMethodDoc = function ( mainSymbol ) {
		var member = mainSymbol;
		var type = member.type;
		if ( !type ) {
			return ;
		}
		var elSybmolProps = document.getElementById( "elSybmolProps" );
		elSybmolProps.setAttribute( "style", "display: none;" );
		var symbolTitle = document.getElementById( "symbolTitle" );
		symbolTitle.setAttribute( "style", "display: none;" );
		var hrTags = document.getElementsByTagName( "hr" );
		for ( var i = 0; i < hrTags.length; i++ ) {
			hrTags[i].setAttribute( "style", "display: none;" );
		}
		
		var memberType = type;
		var doms = document.createElement( "DIV" );
		doms.className = "symbol-member";
		doms.setAttribute( "style", "overflow: hidden" );
		
		var memberSyntax = document.createElement( "DIV" );
		memberSyntax.setAttribute( "id", getMemberId(member.name, memberType) );
		memberSyntax.style = "width: auto; height: auto;";
		doms.appendChild( memberSyntax );
		
		var memberVisibilitySpan = document.createElement( "SPAN" );
		memberVisibilitySpan.className = "member-visibility";
		memberVisibilitySpan.innerText = member.visibility + " ";
		memberVisibilitySpan.style = "display: " + ( memberType == "method" ? "" : "none" );
		memberSyntax.appendChild( memberVisibilitySpan );
		
		var memberStaticSpan = document.createElement( "SPAN" );
		memberStaticSpan.className = "member-static";
		memberStaticSpan.innerText = "static";
		memberStaticSpan.setAttribute( "style", "display: " +  (  member.isStatic ? "" : "none" ) );
		memberSyntax.appendChild( memberStaticSpan );
		
		var memberNameLabel = document.createElement( "LABEL" );
		memberNameLabel.className = "member-name  member-name-" + memberType + " member-name-" + member.visibility + (member.deprecated ? " deprecated" : '');
		memberNameLabel.innerText = member.name;
		memberSyntax.appendChild( memberNameLabel );
		memberSyntax.appendChild( document.createTextNode( " ( " ) );
		
		var memberParamsDefLabel = document.createElement( "LABEL" );
		memberParamsDefLabel.className = "member-param-def member-param-def-" + memberType;
		memberSyntax.appendChild( memberParamsDefLabel );
		memberSyntax.appendChild( document.createTextNode( " ) : " ) );
		
		var memberDataTypeLabel = document.createElement( "LABEL" );
		memberDataTypeLabel.className = "member-data-type member-data-type-" + memberType;
		memberSyntax.appendChild( memberDataTypeLabel );
		
		var memberOfLabel = document.createElement( "LABEL" );
		memberOfLabel.className = "member-of member-of-" + memberType;
		memberOfLabel.setAttribute( "style", "position: absolute; right: 20px;" );
		memberSyntax.appendChild( memberOfLabel );
		
		var memberDescDiv = document.createElement( "DIV" );
		memberDescDiv.className = "member-desc member-desc-" + memberType;
		memberDescDiv.innerHTML = member.desc;
		doms.appendChild( memberDescDiv );
		
		var memberSeesP = document.createElement( "P" );
		memberSeesP.className = "member-sees member-sees-" + memberType;
		memberSeesP.style = "display: none";
		doms.appendChild( memberSeesP );
		
		var memberParamsDiv = document.createElement( "DIV" );
		memberParamsDiv.className = "member-params member-params-" + memberType;
		memberParamsDiv.style = "display: none";
		doms.appendChild( memberParamsDiv );
		
		var memberReturnsDiv = document.createElement( "DIV" );
		memberReturnsDiv.className = "member-returns member-returns-" + memberType;
		memberReturnsDiv.style = "display: none";
		doms.appendChild( memberReturnsDiv );
		
		var memberExceptionsP = document.createElement( "P" );
		memberExceptionsP.className = "member-exceptions member-exceptions-" + memberType;
		memberExceptionsP.style = "display: none";
		doms.appendChild( memberExceptionsP );
		
		var memberExamplesDiv = document.createElement( "DIV" );
		memberExamplesDiv.className = "member-examples member-examples-" + memberType;
		memberExamplesDiv.style = "display: none; overflow: auto";
		doms.appendChild( memberExamplesDiv );
		
		var memberTailDiv = document.createElement( "DIV" );
		memberTailDiv.className = "memberTail";
		memberTailDiv.style = "display: none; overflow: hidden; height: 8;";
		doms.appendChild( memberTailDiv );
		
		document.body.appendChild( doms );
		
		if (member.memberOf != "_global_") generateMemberOf(memberOfLabel, member.memberOf);
		
		if (member.params) {
			var param = "";
			for ( var i = 0; i < member.params.length; i++ ) {
				param = member.params[i];
				if (param.name.indexOf('.') >= 0) continue;
				if (i > 0) memberParamsDefLabel.appendChild(document.createTextNode(" , "));
				var elements = DomHelper.createSymbolLinks(param.type);
				var element = "";
				for ( var j = 0; j < elements.length; j++ ) {
					element = elements[j];
					memberParamsDefLabel.appendChild(element);
				}
				memberParamsDefLabel.appendChild(document.createTextNode(" "));
				var name = param.isOptional ? ('[' + param.name + ']') : param.name;
				var memberParamName = document.createElement( "LABEL" );
				memberParamName.setAttribute( "class", "member-param-name " + (param.isOptional ? "member-param-name-optional" : "") );
				memberParamName.appendChild( document.createTextNode( name ) );
				memberParamsDefLabel.appendChild( memberParamName );
			}
		}
		
		var returnType = (member.returns) ? member.returns.type : "void";
		var returnElements = DomHelper.createSymbolLinks(returnType);
		var returnElement = "";
		for ( var i = 0; i <returnElements.length; i++ ) {
			returnElement = returnElements[i];
			memberDataTypeLabel.appendChild( returnElement );
		}

		if (member.see) {
			var seesTitleDiv = document.createElement( "DIV" );
			seesTitleDiv.setAttribute( "class", "sees-title" );
			seesTitleDiv.appendChild( document.createTextNode( "See:" ) );
			memberSeesP.appendChild( seesTitleDiv );
			var ulElement = document.createElement("UL");
			var see = "";
			for ( var i = 0; i < member.see.length; i++ ) {
				see = member.see[i];
				var liElement = document.createElement("LI");
				liElement.appendChild(DomHelper.createSymbolLink(see));
				ulElement.appendChild(liElement);
			}
			memberSeesP.appendChild(ulElement);
			memberSeesP.style.display = "";
		}
		if (member.params) {
			var paramsTitle = document.createElement( "DIV" );
			paramsTitle.setAttribute( "class", "params-title" );
			paramsTitle.appendChild( document.createTextNode( "Parameters:" ) );
			memberParamsDiv.appendChild( paramsTitle );
			var ulElements = [document.createElement("UL")], currentDeepth = 0, lastLiElement = "";
			var param = "";
			for ( var i = 0; i < member.params.length; i++ ) {
				param = member.params[i];
				var r = param.name.match(/\./g), deepth = r ? r.length : 0;
				if (deepth > currentDeepth) {
					var ulElement = document.createElement("UL");
					if (lastLiElement) lastLiElement.appendChild(ulElement);
					ulElements.push(ulElement);
					currentDeepth++;
				} else if (deepth < currentDeepth) {
					currentDeepth = deepth;
				}
				
				var name = param.name;
				var pos = name.lastIndexOf('.');
				if (pos >= 0) name = name.substring(pos);
				
				var lastLiElement = document.createElement( "LI" );
				lastLiElement.className = "member-param";
				
				var nameLabel = document.createElement( "LABEL" );
				nameLabel.className = "member-param-name";
				nameLabel.innerText = name;
				lastLiElement.appendChild( nameLabel );
				lastLiElement.appendChild( document.createTextNode( " : " ) );
				
				var typeLabel = document.createElement( "LABEL" );
				typeLabel.className = "member-param-type";
				lastLiElement.appendChild( typeLabel );
				
				var paramDefaultLabel = document.createElement( "LABEL" );
				paramDefaultLabel.className = "member-param-default";
				paramDefaultLabel.innerText = (param.defaultValue ? (" ( = " + param.defaultValue + " )") : "");
				lastLiElement.appendChild( paramDefaultLabel );
				
				var paramWriteableLabel = document.createElement( "LABEL" );
				paramWriteableLabel.className = "member-param-writeable";
				paramWriteableLabel.innerText = (param.isOptional ? " [optional]" : "") + (param.writeable ? " [writeable]" : "");
				lastLiElement.appendChild( paramWriteableLabel );
				
				var paramDescDiv = document.createElement( "DIV" );
				paramDescDiv.className = "member-param-desc";
				paramDescDiv.innerText = (param.isOptional ? " [optional]" : "") + (param.writeable ? " [writeable]" : "");
				lastLiElement.appendChild( paramDescDiv );
				
				if (param.isOptional) nameLabel.setAttribute( "class", "member-param-name  member-param-name-optional" );
				var paramElements = DomHelper.createSymbolLinks(param.type);
				var paramElement = "";
				for ( var j = 0; j < paramElements.length; j++ ) {
					paramElement = paramElements[j];
					typeLabel.appendChild( paramElement );
				}
				
				if (param.desc) {
					var desc = param.desc;
					if ( desc ) {
						desc = desc.replace(/<pre class=\"symbol-example code\">/gm, "<pre class=\"brush: js;\">");
						desc = desc.replace(/<code class=\"javascript\">/gm, "");
						desc = desc.replace(/<\/code>/,"");
					}
					if ( desc ) {
						paramDescDiv.innerHTML = desc;
					} else {
						paramDescDiv.innerHTML = param.desc;
					}
				}
				ulElements[currentDeepth].appendChild(lastLiElement);
			}
			memberParamsDiv.appendChild(ulElements[0]);
			memberParamsDiv.style.display = "";
		}
		if ( member.returns ) {//&& member.returns.desc 
			var returnTitlesDiv = document.createElement( "DIV" );
			returnTitlesDiv.setAttribute( "class", "returns-title" );
			returnTitlesDiv.appendChild( document.createTextNode( "Returns:" ) );
			memberReturnsDiv.appendChild( returnTitlesDiv );
			var returnDomsUl = document.createElement( "UL" );
			var retrunDomLi = document.createElement( "LI" );
			
			var returnTypeLabel = document.createElement( "LABEL" );
			returnTypeLabel.className = "member-return-type";
			retrunDomLi.appendChild( returnTypeLabel );

			var returnDescDiv = document.createElement( "DIV" );
			returnDescDiv.className = "member-return-desc";
			retrunDomLi.appendChild( returnDescDiv );
			returnDomsUl.appendChild( retrunDomLi );
			memberReturnsDiv.appendChild( returnDomsUl );
			
			var returnTypeElements = DomHelper.createSymbolLinks( member.returns && member.returns.type || "" );
			var returnTypeElement = "";
			for ( var i = 0; i < returnTypeElements.length; i++ ) {
				returnTypeElement = returnTypeElements[i];
				returnTypeLabel.appendChild( returnTypeElement );
			}
			returnTypeLabel.innerHTML = member.returns.desc ? member.returns.desc : "  ";
			memberReturnsDiv.style.display = "";
		}
		if (member.exceptions) {
			var exceptionsTitle = document.createElement( "DIV" );
			exceptionsTitle.setAttribute( "class", "exceptions-title" );
			exceptionsTitle.appendChild( document.createTextNode( "Exceptions:" ) );
			memberExceptionsP.append( exceptionsTitle );
			var ulElement = document.createElement("UL");
			var liElement = document.createElement("LI");
			var exception = "";
			for ( var i = 0; i < member.exceptions.length; i++ ) {
				exception = member.exceptions[i];
				if (i > 0) liElement.appendChild(document.createTextNode(" , "));
				liElement.appendChild(DomHelper.createSymbolLink(exception));
			}
			ulElement.appendChild( liElement );
			memberExceptionsP.appendChild(ulElement);
			memberExceptionsP.style.display = "";
		}
		if (member.example) {
			var example = "";
			for ( var i = 0; i < member.example.length; i++ ) {
				example = member.example[i];
				var exampleTitleDiv = document.createElement( "DIV" );
				exampleTitleDiv.appendChild( document.createTextNode( "Example " + (i + 1) + ": " ) );
				exampleTitleDiv.setAttribute( "class", "example-title" );
				memberExamplesDiv.appendChild( exampleTitleDiv );
				var elExample = document.createElement( "PRE" );
				elExample.className = "brush: js;";
				elExample.style = "overflow-x: auto";
				
				if (example.desc) {
					var desc = example.desc;
					if ( desc ) {
						desc = desc.replace(/<pre class=\"symbol-example code\">/gm, "<pre class=\"brush: js;\">");
						desc = desc.replace(/<code class=\"javascript\">/gm, "");
						desc = desc.replace(/<\/code>/,"");
					}
					if ( desc ) {
						elExample.innerHTML = desc;
					} else {
						elExample.innerHTML = example.desc;
					}
				}
				memberExamplesDiv.appendChild( elExample );
			}
			memberExamplesDiv.style.display = "";
		}
	};

	DomHelper.generateSymbolDesc = function( mainSymbol ) {
		try {
			if ( !mainSymbol ) {
				return;
			}
			var dom = document.body;

			var elSymbolDesc = document.getElementById( "elSybmolDesc" );
			if (mainSymbol.classDesc || mainSymbol.desc) {
				var classDesc = mainSymbol.classDesc;
				if ( classDesc ) {
					classDesc = classDesc.replace(/<pre class=\"symbol-example code\">/gm, "<pre class=\"brush: js;\">");
					classDesc = classDesc.replace(/<code class=\"javascript\">/gm, "");
					classDesc = classDesc.replace(/<\/code>/,"");
				}
				
				var desc = mainSymbol.desc;
				if ( desc ) {
					desc = desc.replace(/<pre class=\"symbol-example code\">/gm, "<pre class=\"brush: js;\">");
					desc = desc.replace(/<code class=\"javascript\">/gm, "");
					desc = desc.replace(/<\/code>/,"");
				}

				if ( classDesc || desc ) {
					elSybmolDesc.innerHTML = classDesc || desc;
				} else {
					elSymbolDesc.innerHTML = mainSymbol.classDesc || mainSymbol.desc;
				}
			}
			
			var elSymbolType = document.getElementById( "elSymbolType" );
			var elPackageName = document.getElementById( "elPackageName" );
			var elSybmolName = document.getElementById( "elSybmolName" );
			var name = mainSymbol.name, alias = mainSymbol.alias;
			if (name != "_global_") {
				var symbolTypeText;
				if (mainSymbol.type == "object") symbolTypeText = "singleton object";
				else if (mainSymbol.type == "class" && mainSymbol.isAbstract) {
					symbolTypeText = "class abstract";
					elSybmolName.className = "sybmol-name symbol-name-abstract";
				} else symbolTypeText = mainSymbol.type;
				elSymbolType.innerText = symbolTypeText;
			}
			elPackageName.innerText = alias.substring(0, alias.length - name.length);
			elSybmolName.innerText = (name == "_global_") ? "<Global>" : name;
			if ( !!mainSymbol.deprecated ) {
				elSybmolName.className = "deprecated";
			}
			
			if (mainSymbol.type == "namespace") {
				dom.appendChild( elSymbolDesc );
				if (mainSymbol.children) {
					var elSybmolChildren = document.getElementById( "elSybmolChildren" );
					var ulElement = document.createElement("UL");
					var child = "";
					for ( var i = 0; i < mainSymbol.children.length; i++ ) {
						child = mainSymbol.children[i];
						var liElement = document.createElement("LI");
						liElement.appendChild(DomHelper.createSymbolLink(child.alias));
						liElement.appendChild(document.createTextNode(" - "));
						var desc = document.createElement( "LABEL" );
						desc.className = "child-desc";
						desc.innerHTML = child.descBrief;
						liElement.appendChild( desc );
						ulElement.appendChild(liElement);
					}
					elSybmolChildrenappendChild(ulElement);
					dom.appendChild( elSybmolChildren );
				}
			} else {
				var elAuthorRow = document.getElementById( "elAuthorRow" );
				var elAuthor = document.getElementById( "elAuthor" );
				if (mainSymbol.author) elAuthor.innerText = mainSymbol.author;
				else elAuthorRow.style.display = "none";
				
				var elDoradoPackageRow = document.getElementById( "elDoradoPackageRow" );
				var elDoradoPackage = document.getElementById( "elDoradoPackage" );
				if (mainSymbol["package"]) elDoradoPackage.innerText = mainSymbol["package"];
				else elDoradoPackageRow.style.display = "none";
				
				var elShortTypeNameRow = document.getElementById( "elShortTypeNameRow" );
				var elShortTypeName = document.getElementById( "elShortTypeName" );
				if (mainSymbol.shortTypeName) elShortTypeName.innerText = mainSymbol.shortTypeName;
				else elShortTypeNameRow.style.display = "none";
				
				var elExtendsRow = document.getElementById( "elExtendsRow" );
				var elExtends = document.getElementById( "elExtends" );
				var inheritsFrom = mainSymbol.inheritsFrom;
				if (inheritsFrom) {
					var superClass = "";
					for ( var i = 0; i < inheritsFrom.length; i++ ) {
						superClass = inheritsFrom[i];
						if (i > 0) elExtends.appendChild(document.createTextNode(" , "));
						elExtends.appendChild(createSymbolLink(superClass));
					}
				} else {
					elExtendsRow.style.display = "none";
				}
				
				var elSubclassesRow = document.getElementById( "elSubclassesRow" );
				var elSubclasses = document.getElementById( "elSubclasses" );
				var inherits = mainSymbol.inherits;
				if (inherits) {
					var subClass = "";
					for ( var i = 0; i < inherits.length; i++ ) {
						subClass = inherits[i];
						if (i > 0) elSubclasses.appendChild(document.createTextNode(" , "));
						elSubclasses.appendChild(createSymbolLink(subClass));
					}
				} else {
					elSubclassesRow.style.display = "none";
				}
				dom.appendChild( elSymbolDesc );
				if (mainSymbol.constructors && mainSymbol.constructors.length > 0) {
					var constructor = mainSymbol.constructors[0];
					
					var elSybmolParams = document.getElementById( "elSybmolParams" );
					var paramsTitle = document.createElement( "DIV" );
					paramsTitle.className = "params-title";
					paramsTitle.appendChild( document.createTextNode( "Constructor Parameters:" ) );
					elSybmolParams.appendChild( paramsTitle );
					var ulElement = document.createElement("UL");
					var param = "";
					for ( var i = 0; i < constructor.params.length; i++ ) {
						param = constructor.params[i];
						var liElement = document.createElement( "LI" );
						liElement.className = "member-param";
						
						var paramNameLabel = document.createElement( "LABEL" );
						paramNameLabel.className = "member-param-name";
						paramNameLabel.innerText = (param.isOptional ? ('[' + param.name + ']') : param.name);
						liElement.appendChild( paramNameLabel );
						liElement.appendChild( document.createTextNode( " : " ) );
						
						var paramTypeLabel = document.createElement( "LABEL" );
						paramTypeLabel.className = "member-param-type";
						liElement.appendChild( paramTypeLabel );
						liElement.appendChild( document.createTextNode( " " ) );
						
						var paramDefaultLabel = document.createElement( "LABEL" );
						paramDefaultLabel.className = "member-param-default";
						paramDefaultLabel.innerText = (param.defaultValue ? ("( = " + param.defaultValue + " )") : "");
						liElement.appendChild( paramDefaultLabel );
						
						var paramDescLabel = document.createElement( "DIV" );
						paramDescLabel.className = "member-param-desc";
						liElement.appendChild( paramDescLabel );
						
						if (param.isOptional) paramNameLabel.className = "member-param-name member-param-name-optional";
						var elements = DomHelper.createSymbolLinks(param.type);
						for ( var j = 0; j < elements.length; j++ ) {
							paramTypeLabel.appendChild( elements[j] );
						}
						paramDescLabel.innerHTML = param.desc;
						ulElement.appendChild( liElement );
					}
					elSybmolParams.appendChild( ulElement );
					dom.appendChild( elSybmolParams );
				}
				
				if (mainSymbol.see) {
					var elSybmolSees = document.getElementById( "elSybmolSees" );
					var seesTitle = document.createElement( "DIV" );
					seesTitle.setAttribute( "class", "sees-title" );
					seesTitle.appendChild( document.createTextNode( "See:" ) );
					elSybmolSees.appendChild( seesTitle );
					var ulElement = document.createElement("UL");
					var see = "";
					for ( var i = 0; i < mainSymbol.see.length; i++ ) {
						see = mainSymbol.see[i];
						var liElement = document.createElement("LI");
						liElement.appendChild(DomHelper.createSymbolLink(see));
						ulElement.appendChild(liElement);
					}
					elSybmolSees.appendChild( ulElement );
					dom.appendChild( elSybmolSees );
				}
				
				if (mainSymbol.example) {
					var elSybmolExamples = document.getElementById( "elSybmolExamples" );
					elSybmolExamples.setAttribute( "style", "margin-bottom: -40px; margin-top: -20px;" );
					var example = "";
					for ( var i = 0; i < mainSymbol.example.length; i++ ) {
						example = mainSymbol.example[i];
						var exampleTitle = document.createElement( "DIV" );
						exampleTitle.className = "example-title";
						exampleTitle.appendChild( document.createTextNode( "Example " + (i + 1) + ": " ) );
						elSybmolExamples.appendChild( exampleTitle );
						var elExample = document.createElement( "PRE" );
						elExample.className = "brush: js;";
						elSybmolExamples.appendChild(elExample);
						elExample.innerHTML = example.desc;
					}
					dom.appendChild( elSybmolExamples );
				}
			}
		} catch ( e ) {
			console.log( e );
		}
	};
})();