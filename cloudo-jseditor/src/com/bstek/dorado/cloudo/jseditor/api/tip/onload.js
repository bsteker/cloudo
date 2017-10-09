document.onkeydown  = function() {
	if ( event.keyCode == 27 && window.parent !== self ) {
		var frames =  window.parent.document.getElementsByTagName("iframe");
		var frame = "";
		for ( var i = 0; i < frames.length; i++ ) {
			frame = frames[i];
			if ( frame.contentDocument === self.document ) {
				window.parent.document.body.removeChild( frame );
			}
		}
	}
};

window.onload = function(){
	if ( doradoElementAPIMetaInfo.metaInfo ) {
		TipHelper.buildDoradoElementTipDom( doradoElementAPIMetaInfo );
		SyntaxHighlighter.defaults.toolbar = false;
		SyntaxHighlighter.highlight( document.body ); 
	} else {
		var elSybmolProps = document.getElementById( "elSybmolProps" );
		elSybmolProps.setAttribute( "style", "display: none;" );
		var symbolTitle = document.getElementById( "symbolTitle" );
		symbolTitle.setAttribute( "style", "display: none;" );
		var hrTags = document.getElementsByTagName( "hr" );
		for ( var i = 0; i < hrTags.length; i++ ) {
			hrTags[i].setAttribute( "style", "display: none;" );
		}
		var body = document.body;
		for ( var i = 0; i < body.childNodes.length; i++ ) {
			document.body.removeChild( body.childNodes[i] );
    	}
		for ( var i = 0; i < body.children.length; i++ ) {
			body.children[i].setAttribute( "style", "display: none;" );
    	}
		var div = document.createElement( "div" );
		div.setAttribute( "style", "color: red;" );
		div.appendChild( document.createTextNode( "the dorado element doesn\'t have API description !" ) );
		document.body.appendChild( div );
	}
};