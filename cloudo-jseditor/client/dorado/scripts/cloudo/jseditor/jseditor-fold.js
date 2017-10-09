//-- JavaScriptEditor.ability.fold --
(function(){
  var AB = cloudo.widget.JavaScriptEditor.ability;
  var doFold = CodeMirror.newFoldFunction(function(cm, pos) {
    return CodeMirror.braceRangeFinder(cm, pos);
  });

  AB.fold = function(cm, arg) {
    cm.addKeyMap({
      "Ctrl-Q": function(cm){
        doFold(cm, cm.getCursor().line);
      }
    });
    cm.on("gutterClick", doFold);
  };
})();