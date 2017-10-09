(function () {

    var TagsDropDown = $extend(dorado.widget.ListDropDown, {
        $className: "dorado.widget.TagListDropDown",
        ATTRIBUTES: {
            dynaFilter: {
                defaultValue: true
            },
            filterOnOpen: {
                defaultValue: true
            },
            autoOpen: {
                defaultValue: true
            }
        },

        assignValue: function (editor, entityForAssignment, eventArg) {
            var value = eventArg.selectedValue;
            value && editor.addTags(value, true);
        },
        refreshRowListData: function () {
            var rowList = this.get("box.control");
            if (!rowList) return;
            var editor = this._editor;

            rowList.set("items", editor.getDropDownTags());
            //  rowList.refresh(true);
        },
        /**
         * 对下拉数据项进行过滤。
         * @protected
         * @param {String} filterValue
         */
        onFilterItems: function (filterValue) {
            this.refreshRowListData();
            $invokeSuper.call(this, [filterValue]);
        }
    });


    dorado.widget.TagListEditor = $extend(dorado.widget.TextEditor, {
        $className: "dorado.widget.TagListEditor",
        _triggerChanged: true,

        ATTRIBUTES: {
            height: {
                independent: true
            },
            /**
             * 文本形式的标签值，各标签之间以textSeperator属性所设定的分隔符分隔。
             * @type String
             * @attribute
             */
            text: {
                skipRefresh: true,
                getter: function () {
                    var text;
                    if (this._editorFocused) {
                        text = jQuery.trim(this._textDom.value);
                    } else {
                        text = this._text;
                    }
                    this._text = text;
                    return text;
                },
                setter: function (text) {
                    var text = jQuery.trim(text), value;
                    if (text) {
                        value = text;
                    } else {
                        value = "";
                    }
                    this._value = value;
                    this.doSetText(value);
                }
            },
            value: {
                skipRefresh: false,
                getter: function () {
                    return this._value;
                },
                setter: function (value) {
                    this.set("text", value);
                }
            },

            /**
             * 当以文本形式读写标签值时各标签键的分隔符。
             * @type String
             * @default ","
             * @attribute
             */
            textSeperator: {
                defaultValue: ","
            },

            /**
             * 可用的标签数组。
             * @type String[]
             * @attribute
             */
            availableTags: {
                skipRefresh: true
            },
            /**
             * 必选的标签数组。
             * @type String[]
             * @attribute
             */
            requiredTags: {
                skipRefresh: true,
                writeBeforeReady: true
            }
        },

        constructor: function () {
            $invokeSuper.call(this, arguments);
            this._triggerChanged = true;
        },
        refreshDom: function () {
            if (!this._defaultTrigger) {
                this._defaultTrigger = new TagsDropDown({
                    height: 200, items: this.getDropDownTags()
                });
                this.set("trigger", this._defaultTrigger);
            }

            $invokeSuper.call(this, arguments);
        },
        textEdited: function () {
            var tagEditor = this;
            var _dropdown = tagEditor._defaultTrigger;
            if (_dropdown) {
                dorado.Toolkits.setDelayedAction(tagEditor, "$autoOpenDropDownOnEditTimerId", function () {
                    var opened = _dropdown.get("opened");
                    !opened && _dropdown.open(tagEditor);
                    var filterValue = tagEditor.doGetText();
                    _dropdown.onFilterItems(filterValue);
                }, 500);
            } else {
                dorado.Toolkits.cancelDelayedAction(tagEditor, "$autoOpenDropDownOnEditTimerId");
            }

            $invokeSuper.call(tagEditor);
        },
        getAvailableTags: function () {
            if (this._availableTags) {
                return this._availableTags;
            }
            return [];
        },
        doSetText: function (text) {
            var requiredTags = this._requiredTags;

            if (requiredTags) {
                if (!text) {
                    text = requiredTags.join(this._textSeperator);
                }
            }
            if (this._textDom) {
                this._textDom.value = text;
            }
            this._text = text;
        },
        getDropDownTags: function () {
            var currentValues = this.getCurrentValues();
            var availableTags = this.getAvailableTags();
            var items = [];
            _.each(availableTags, function (v) {
                if (currentValues.indexOf(v) < 0) {
                    items.push(v);
                }
            });
            return items;
        },
        post: function (force, silent) {
            var text = this.get("text");

            if (text) {
                var values = text.split(this._textSeperator)||[];
                var valueText = "";
                for (var i = 0; i < values.length; i++) {
                    var v = values[i];
                    if (v) {
                        if (i > 0) {
                            valueText += "," + v;
                        } else {
                            valueText += v;
                        }
                    }
                }

                text=valueText;
            }
            this.set("text", text);
            $invokeSuper.call(this, [force, silent]);
        },
        getCurrentValues: function () {
            if (!this._textDom) return '';
            var values = [], currentValues = [];
            var editingText = jQuery.trim(this._textDom.value);
            if (editingText) {
                values = editingText.split(this._textSeperator)||[];
            }
            var cursorPosition = this._textDom.selectionEnd, vls = "";
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                if (i > 0) {
                    vls += "," + v;
                } else {
                    vls += v;
                }
                if (vls.length >= cursorPosition) {
                    for (var j = i + 1; j < values.length; j++) {
                        values[j] && currentValues.push(values[j]);
                    }
                    break;
                } else {
                    v && currentValues.push(v);
                }
            }

            return currentValues;
        },

        doGetText: function () {
            if (!this._textDom) return '';

            var values = [];
            var editingText = jQuery.trim(this._textDom.value);
            if (editingText) {
                values = editingText.split(this._textSeperator)||[];
            }
            var filterValue = "", cursorPosition = this._textDom.selectionEnd, vls = "";
            for (var i = 0; i < values.length; i++) {
                if (i > 0) {
                    vls += "," + values[i];
                } else {
                    vls += values[i];
                }

                if (vls.length >= cursorPosition) {
                    filterValue = values[i];
                    break;
                }
            }
            return filterValue;
        },
        addTags: function (newTag) {
            if (!this._textDom) return '';
            var values = [], newValues = [];
            var editingText = jQuery.trim(this._textDom.value);
            if (editingText) {
                values = editingText.split(this._textSeperator)||[];
            }
            var cursorPosition = this._textDom.selectionEnd, vls = "", append = false;
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                if (i > 0) {
                    vls += "," + values[i];
                } else {
                    vls += values[i];
                }

                if (vls.length >= cursorPosition) {
                    if (!append) {
                        newValues.push(newTag);
                        append = true;
                    } else {
                        newValues.push(v);
                    }
                } else {
                    v && newValues.push(v);
                }
            }

            newValues.length == 0 && newValues.push(newTag);
            var requiredTags = this._requiredTags;
            if (requiredTags) {
                for (var i = requiredTags.length; i > 0;) {
                    var t = requiredTags[--i];
                    newValues.indexOf(t) < 0 && t != newTag && newValues.unshift(t);
                }
            }

            var finalText = newValues.join(this._textSeperator);
            this._textDom.value = finalText;
            this.set("text", finalText);
        }


    });

})();