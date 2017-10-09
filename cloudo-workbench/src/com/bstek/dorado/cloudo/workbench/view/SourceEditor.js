/** @Controller */

var codeEditor, saveAction;

function getUndoManager() {
    return codeEditor.getUndoManager();
}
window.editor = {
    filePath: null,
    changeListeners: [],
    saveListeners: [],
    isClean: function() {
        var undoManager = getUndoManager();
        var result = undoManager.isClean();
        return result;
    },
    markClean: function() {
        getUndoManager().markClean();
    },
    save: function() {
        var data = codeEditor.getValue();
        saveAction.execute();
        this.markClean();
        this.emit();
    },
    undo: function() {
        getUndoManager().undo();
    },
    redo: function() {
        getUndoManager().redo();
    },
    canUndo: function() {
        return getUndoManager().hasUndo();
    },
    canRedo: function() {
        return getUndoManager().hasRedo();
    },
    emit: function() {
        var parenWindow = window.parent;
        if (parenWindow && parenWindow.emit) {
            parenWindow.emit(this.filePath, this.getStatus());
        }
        _.each(editor.changeListeners, function(listener) {
            listener.call();
        });
    },
    onChange: function(fn) {
        editor.changeListeners.push(fn);
    },
    onSave: function(fn) {
        editor.saveListeners.push(fn);
    },
    getStatus: function() {
        return {
            isClean: this.isClean(),
            canUndo: this.canUndo(),
            canRedo: this.canRedo()
        };
    }
};

// @Bind #writeFileAction.beforeExecute
function writeFileActionBeforeExecute(self, arg, sourceEditor) {
        var value = sourceEditor.getValue();
        var path = sourceEditor.get("userData");
        self.set("parameter", {
            path: path,
            data: value
        });
    }
    // @Bind #writeFileAction.onSuccess
function writeFileActionOnSuccess() {
        dorado.widget.NotifyTipManager.notify("保存成功！");
    }
    // @Bind #sourceEditor.onCreate
function sourceEditorOnCreate(self, arg) {
        var filePath = self.get("userData");
        editor.filePath = filePath;
    }
    // @Bind #sourceEditor.onReady
function sourceEditorOnReady(self, arg, writeFileAction) {
    codeEditor = self;
    saveAction = writeFileAction;
    var fileMode = codeEditor.get("mode");
    codeEditor.getEditor().commands.addCommands([{
            name: "saveFile",
            bindKey: {
                win: "Ctrl-S",
                mac: "Command-S"
            },
            exec: function() {
                window.editor.save();
            },
            readOnly: true
        }, {
            name: "increaseFontSize",
            bindKey: "Ctrl-=|Ctrl-+",
            exec: function(editor) {
                var size = parseInt(editor.getFontSize(), 10) || 12;
                editor.setFontSize(size + 1);
            },
            readOnly: true
        }, {
            name: "decreaseFontSize",
            bindKey: "Ctrl+-|Ctrl-_",
            exec: function(editor) {
                var size = parseInt(editor.getFontSize(), 10) || 12;
                editor.setFontSize(Math.max(size - 1 || 1));
            },
            readOnly: true
        }, {
            name: "resetFontSize",
            bindKey: "Ctrl+0|Ctrl-Numpad0",
            exec: function(editor) {
                editor.setFontSize(12);
            },
            readOnly: true
        },

        {
            name: "beautifyFile",
            bindKey: {
                win: "Ctrl-Shift-F",
                mac: "Command-Shift-F"
            },
            exec: function(editor) {
                window.beautify(editor, fileMode);
            },
            readOnly: true
        }
    ]);

}

// @Bind #sourceEditor.onChange
function sourceEditorOnChange(self, arg) {
    editor.emit();
}
