//-- CodeMirror --
(function () {
    $namespace("cloudo.widget");
    var W = cloudo.widget;

    var CodeMirror$setOption = function (val, attr) {
        if (this.$cm$) {
            this.$cm$.setOption(attr, val);
        }
        this['_' + attr] = val;
    };

    var CodeMirror$ATTRIBUTES = {
        value: {
            defaultValue: "",
            setter: function (v) {
                if (this.$cm$)
                    this.$cm$.setValue(v);
                this._value = v;
            },
            getter: function () {
                if (this.$cm$)
                    return this.$cm$.getValue();
                if (this._value) return this._value;
                return "";
            }
        },
        mode: { defaultValue: "javascript", setter: CodeMirror$setOption },
        theme: { defaultValue: "neat", setter: CodeMirror$setOption },
        tabSize: { defaultValue: 2, setter: CodeMirror$setOption },
        lineNumbers: { defaultValue: true, setter: CodeMirror$setOption },
        readOnly: { defaultValue: false, setter: CodeMirror$setOption },
        dragDrop: { defaultValue: false, setter: CodeMirror$setOption },
        autoCloseBrackets: { defaultValue: true, setter: CodeMirror$setOption },
        matchBrackets: { defaultValue: true, setter: CodeMirror$setOption },
        highlightSelectionMatches: { defaultValue: {showToken: /\w/}, setter: CodeMirror$setOption },
        styleActiveLine: { defaultValue: true, setter: CodeMirror$setOption },
        autofocus: { defaultValue: false, setter: CodeMirror$setOption }
    };
    W.CodeMirror = $extend(dorado.widget.Control, {
        $className: "cloudo.widget.CodeMirror",
        ATTRIBUTES: CodeMirror$ATTRIBUTES,

        constructor: function (config) {
            if (config && config.init) {
                this._initCodeMirror_ = config.init;
                delete config.init;
            }

            dorado.widget.Control.prototype.constructor.call(this, config);
            this.addListener("onRefreshDom", function (self, arg) {
                self.$cm$.refresh();
            });
        },
        /**
         * @override
         * @returns {HTMLElement}
         */
        createDom: function () {
            var A = CodeMirror$ATTRIBUTES, ks = Object.keys(A), options = {}, i, k, v;
            for (i = 0; i < ks.length; i++) {
                k = ks[i];
                v = this.get(k);
                options[k] = v;
            }
            var dom, cm = this.$cm$ = new CodeMirror(function (wapper) {
                dom = wapper;
            }, options);
            this._initCodeMirror_(cm);
            return dom;
        },
        /*
         * @desc 初始化CodeMirror对象
         * @protected
         */
        _initCodeMirror_: function (cm) {
        }
    });
})();

//-- JavaScriptEditor --
(function () {
    $namespace("cloudo.widget");
    var W = cloudo.widget;
    var FN_UNDO = function (cm) {
        cm.getDoc().undo();
    };
    var FN_REDO = function (cm) {
        cm.getDoc().redo();
    };

    var Editor = W.JavaScriptEditor = $extend(dorado.widget.Container, {
        constructor: function (config) {
            config = config || this._createDefaultConfig_();
            dorado.widget.Container.prototype.constructor.call(this, config);
        },
        /**
         * 返回默认配置信息
         * @protected
         * @returns {{contentOverflow: string, children: Array}} 默认配置信息
         * @private
         */
        _createDefaultConfig_: function () {
            var defaultConfig = {
                "contentOverflow": "hidden",
                children: [
                    {
                        "$type": "cloudo.widget.CodeMirror",
                        mode: "javascript",
                        init: this._initCodeMirror_.bind(this),
                        layoutConstraint: {type: "center"},
                        value: ""
                    }
                ]
            };
            return defaultConfig;
        },

        ATTRIBUTES: {
            apiDefs: {},
            contextCodes: {},
            contextVars: {},
            code: {
                defaultValue: "",
                getter: function () {
                    if (this.$cm$) {
                        this._code = this.$cm$.getDoc().getValue();
                    }
                    return this._code;
                },
                setter: function (v) {
                    this._code = v;
                    if (this.$cm$) {
                        this.$cm$.setValue(v);
                    }
                }
            },
            fileName: {defaultValue: "code.js"}
        },
        callCodeMirror: function (fn) {
            var cm = this.$cm$;
            return fn(cm);
        },
        undo: function () {
            this.callCodeMirror(FN_UNDO);
        },
        redo: function () {
            this.callCodeMirror(FN_REDO);
        },
        update: function () {
            this._ternServer_ = null;
            if (this.$cm$) {
                this._initCodeMirror_(this.$cm$);
            }
        },
        codeFormat: function() {
            var cm = this.$cm$,code,selectionCode = cm.getSelection();
            code = selectionCode || cm.getValue();
            code = js_beautify(code, {'indent_size': 2,'indent_char': ' '});
            if (selectionCode) {
                cm.replaceSelection(code);
            } else {
                cm.setValue(code);
            }
        },
        codeSearch: function(){
            var cm = this.$cm$;
            cm.execCommand("find");
        },
        codeReplace: function(){
            var cm = this.$cm$;
            cm.execCommand("replace");
        },
        codeRename: function(){
            var cm = this.$cm$,editor = cm.CloudoEditor,contextVars = editor.get("contextVars"),
                 token = cm.getTokenAt(cm.getCursor()),renameVarName = token.string,server;
            if (!contextVars.hasOwnProperty(renameVarName)) {
                server = editor.getTernServer();
                server.rename(cm);
            }
        },
        codeJumpToDef: function () {
            var cm = this.$cm$,editor = cm.CloudoEditor,
                server = editor.getTernServer();
            server.jumpToDef(cm);
        },
        codeShowType: function () {
            var cm = this.$cm$,editor = cm.CloudoEditor,
                server = editor.getTernServer();
            server.showType(cm);
        },
        getCodeMirror: function(){
            return this.$cm$;
        },
         _initCodeMirror_: function (cm) {
            var server = this.getTernServer(),
                doc = cm.getDoc(),
                codes = this.get("contextCodes") || [], ci, cd, cn, c,
                fileName = this.get("fileName"),
                code = this.get("code");

            server.addDoc(fileName, doc);
            doc.name = fileName;
            for (ci = 0; ci < codes.length; ci++) {
                cd = new CodeMirror.Doc(c = codes[ci], "javascript");
                cn = cd.name = "contextCode" + ci + ".js";
                server.addDoc(cn, cd);
            }
            cm.getDoc().setValue(code);

            cm.CloudoEditor = this;
            this.$cm$ = cm;

            this._initFold(cm);
            this._initHints(cm);
            this._initShowApi(cm);
        },
        _initFold: function(cm){
            var doFold = CodeMirror.newFoldFunction(function(cm, pos) {
                return CodeMirror.braceRangeFinder(cm, pos);
            });
            cm.addKeyMap({
                "Ctrl-Q": function(cm){
                    doFold(cm, cm.getCursor().line);
                }
            });
            cm.on("gutterClick", doFold);
        },
        _initHints: function(cm){
            var doHint = function (cm) {
                var editor = cm.CloudoEditor;
                var server = editor.getTernServer();
                server.complete(cm);
            };
            var keyMap = {
                ".": function (cm) {
                    if (!cm.hasFocus()) return;
                    var doc = cm.getDoc();
                    if (doc.somethingSelected()) {
                        doc.replaceSelection(".");
                        cm.execCommand("goCharRight");
                    } else {
                        var curPos = doc.getCursor();
                        if (!curPos) return;
                        var lineCode = doc.getLine(curPos.line);
                        var ch = curPos.ch;
                        if (ch == 0) {
                            doc.setLine(curPos.line, "." + lineCode);
                        } else if (ch == lineCode.length) {
                            doc.setLine(curPos.line, lineCode + ".");
                        } else {
                            lineCode = lineCode.substring(0, ch) + "." + lineCode.substring(ch);
                            doc.setLine(curPos.line, lineCode);
                        }
                        doc.setCursor({line: curPos.line, ch: ch + 1});
                        doHint(cm);
                    }
                },
                "Shift-Space": doHint,
                "Ctrl-/": doHint,
                "Ctrl-.": doHint,
                "Alt-/": doHint
            };
            cm.addKeyMap(keyMap);
        },
        _initShowApi: function(cm){
            var keyMap = {
                "Ctrl-I": this.codeShowType.bind(this)
            };
            cm.addKeyMap(keyMap);
        },
        _createTernServer_: function () {
            var apiDefs = this.get("apiDefs"),options = {
                defs: apiDefs,
                debug: true,
                plugins: {dorado: {}, doc_comment: {}, "dorado_hint": {}},
                contextVars: this.get("contextVars")
            },server;

            server = new CodeMirror.TernServer(options);
            server.server.options.contextVars = options.contextVars;
            return server;
        },
        _ternServer_: null,
        getTernServer: function () {
            return this._ternServer_ || (this._ternServer_ = this._createTernServer_());
        }
    });

    var apiDefs = [];
    Editor.prototype.ATTRIBUTES.apiDefs.defaultValue = apiDefs;
    Editor.registerApi = function (def) {
        var name = def["!name"], adef, ai, aname, found = false;
        if (name) {
            for (ai = 0; ai < apiDefs.length; ai++) {
                adef = apiDefs[ai];
                aname = adef["!name"];
                if (name === aname) {
                    apiDefs[ai] = def;
                    found = true;
                    break;
                }
            }
        }
        if (!found) apiDefs.push(def);
    };
    Editor.getApi = function (name) {
        var i, def;
        for (i = 0; i < apiDefs.length; i++) {
            def = apiDefs[i];
            if (def["!name"] === name) return def;
        }
    }

    var AB = Editor.ability = {};
})();