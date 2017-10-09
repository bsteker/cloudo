/**
 * Created by Apple on 14-4-17.
 */
cloudo.widget.JSONEditor = $extend(cloudo.widget.JavaScriptEditor, {
    $className: "cloudo.widget.JSONEditor",
    _createDefaultConfig_: function () {
        var defaultConfig = {
            contentOverflow: "hidden",
            children: [
                {
                    $type: "cloudo.widget.CodeMirror", mode: "javascript",
                    init: this._initCodeMirror_.bind(this),
                    layoutConstraint: {type: "center"}
                }
            ]
        };
        return defaultConfig;
    },
    redo: function () {
        this.$cm$.getDoc().redo();
    },
    undo: function () {
        this.$cm$.getDoc().undo();
    }

});