(function () {

    var fullWindowLayers = [], _TEMP_TIMEOUT;

    $fly(window).bind(dorado.Browser.isTouch ? "orientationchange" : "resize", function () {
        if (_TEMP_TIMEOUT) {
            clearTimeout(_TEMP_TIMEOUT);
        }
        _TEMP_TIMEOUT = setTimeout(function () {
            for (var i = 0, j = fullWindowLayers.length; i < j; i++) {
                var layer = fullWindowLayers[i];
                if (layer && layer._status) {
                    layer.disableListeners();
                    layer.show({
                        animateType: "none"
                    });
                    layer.enableListeners();
                }
            }
        }, 500);

        for (var i = 0, j = fullWindowLayers.length; i < j; i++) {
            var layer = fullWindowLayers[i];
            if (layer && layer._status) {
                layer.resetDimension();
            }
        }
    });
    /**
     * @author Alex Tong(mailto:alex.tong@bstek.com)
     */
    cloudo.widget.Layer = $extend(dorado.widget.FloatPanel, /** @scope dorado.touch.Layer.prototype */ {
        $className: "cloudo.widget.Layer",
        _inherentClassName: "i-layer",
        focusable: true,

        ATTRIBUTES: /** @scope cloudo.widget.Layer.prototype */ {
            className: {
                defaultValue: "c-layer d-panel"
            },
            direction: {
                defaultValue: "bottom"
            },
            /**
             * 是否已经最大化。
             *
             * @attribute
             * @default true
             * @type boolean
             */
            maximized: {
                defaultValue: false
            },
            animateType: {
                defaultValue: "slide"
            }

        },
        EVENTS: /** @scope cloudo.widget.Layer.prototype */{
            /**
             * 在对话框最大化之前触发此事件。
             * @param {Object} self 事件的发起者，即组件本身。
             * @param {Object} arg 事件参数。
             * @return {boolean} 是否要继续后续事件的触发操作，不提供返回值时系统将按照返回值为true进行处理。
             * @event
             */
            beforeMaximize: {},

            /**
             * 在对话框最大化之后触发此事件。
             * @param {Object} self 事件的发起者，即组件本身。
             * @param {Object} arg 事件参数。
             * @return {boolean} 是否要继续后续事件的触发操作，不提供返回值时系统将按照返回值为true进行处理。
             * @event
             */
            onMaximize: {},
            /**
             * 在对话框从最大化状态恢复到普通状态之前触发此事件。
             * @param {Object} self 事件的发起者，即组件本身。
             * @param {Object} arg 事件参数。
             * @return {boolean} 是否要继续后续事件的触发操作，不提供返回值时系统将按照返回值为true进行处理。
             * @event
             */
            beforeMaximizeRestore: {},

            /**
             * 在对话框从最大化状态恢复到普通状态之后触发此事件。
             * @param {Object} self 事件的发起者，即组件本身。
             * @param {Object} arg 事件参数。
             * @return {boolean} 是否要继续后续事件的触发操作，不提供返回值时系统将按照返回值为true进行处理。
             * @event
             */
            onMaximizeRestore: {},
            onResize: {}
        },
        constructor: function () {
            $invokeSuper.call(this, arguments);
            fullWindowLayers.push(this);
        },
        destroy: function () {
            $invokeSuper.call(this, arguments);
            fullWindowLayers.remove(this);
        },
        doOnAttachToDocument: function () {
            if (this._maximized) {
                this.maximize();
            }
            $invokeSuper.call(this, arguments);
        },
        refreshDom: function (dom) {
            $fly(dom).toggleClass(this._className + "-maximized", !!this._maximized);
            $invokeSuper.call(this, arguments);
        },
        /**
         * 使Panel从最大化状态恢复到普通状态。
         * @protected
         */
        maximizeRestore: function () {
            var layer = this, dom = layer._dom, arg = {processDefault: true};
            if (dom && (layer._maximizedDirty || layer._maximized)) {
                layer.fireEvent("beforeMaximizeRestore", layer, arg);
                if (arg.processDefault === false) {
                    return;
                }
                $invokeSuper.call(this, arguments);
                layer.fireEvent("onMaximizeRestore", layer);
            }
        },

        /**
         * 使Panel从普通状态到最大化状态。
         * @protected
         */
        maximize: function () {
            var layer = this, dom = layer._dom, arg = {processDefault: true};
            if (dom) {
                layer.fireEvent("beforeMaximize", layer, arg);
                if (arg.processDefault === false) {
                    return;
                }
                $invokeSuper.call(this, arguments);
                layer.fireEvent("onMaximize", layer);
            }
        },
        doShow: function (options) {
            options = options || {};
            document.activeElement.blur();
            this._status = true;
            var direction = this._direction;
            this._anchorTarget = options.anchorTarget;


            switch (direction) {
                case "right":
                    options.direction = "r2l";
                    options.align = "innerright";
                    break;
                case "left":
                    options.direction = "l2r";
                    options.align = "innerleft";
                    break;
                case "top":
                    options.direction = "t2b";
                    options.vAlign = "innertop";
                    break;
                case "bottom":
                    options.direction = "b2t";
                    options.vAlign = "innerbottom";
                    break;
            }

            this.resetDimension();
            $invokeSuper.call(this, arguments);
        },
        doHide: function (options) {
            options = options || {};
            this._status = false;
            var direction = this._direction;
            switch (direction) {
                case "right":
                    options.direction = "l2r";
                    break;
                case "left":
                    options.direction = "r2l";
                    break;
                case "top":
                    options.direction = "b2t";
                    break;
                case "bottom":
                    options.direction = "t2b";
                    break;
            }
            document.activeElement.blur();
            this._maximized && this.maximizeRestore();
            $invokeSuper.call(this, arguments);
        },


        /**
         * 重设对象的尺寸。
         * @protected
         * @param {boolean} [forced] 是否强制重设对象的尺寸，忽略对于宽高值是否发生过改变的判断。
         * @return {boolean} 本次操作是否改变了对象的尺寸设置。
         */
        resetDimension: function (forced) {
            $invokeSuper.call(this, arguments);
            var anchorTarget = this._anchorTarget, fixedElement;

            if (anchorTarget) {
                if (anchorTarget instanceof dorado.widget.Control) {
                    fixedElement = anchorTarget._dom;
                } else if (dorado.Object.isInstanceOf(anchorTarget, dorado.RenderableElement)) {
                    fixedElement = anchorTarget._dom;
                } else if (typeof anchorTarget == "string") {
                    fixedElement = jQuery(anchorTarget)[0];
                } else {
                    fixedElement = anchorTarget;
                }

                var $el = $fly(fixedElement), realContainerWidth = $el.width(), realContainerHeight = $el.height(), realH = this.getRealHeight(), realW = this.getRealWidth(),
                    width = realW, height = realH, $dom = $(this._dom);

                if (realH.constructor == String && realH.match('%')) {
                    var rate = parseInt(realH);
                    if (!isNaN(rate)) {
                        height = rate * realContainerHeight / 100;
                    }
                    if (height && this._currentHeight != height) {
                        if (height < 0) {
                            this._currentHeight = null;
                            $dom.height("");
                        } else {
                            this._currentHeight = height;
                            $dom.outerHeight(height, true);
                        }

                    }
                }
                if (realW.constructor == String && realW.match('%')) {
                    var rate = parseInt(realW);
                    if (!isNaN(rate)) {
                        width = rate * realContainerWidth / 100;
                    }

                    if (width && this._currentWidth != width) {
                        if (width < 0) {
                            this._currentWidth = null;
                            $dom.width("");
                        } else {
                            this._currentWidth = width;
                            $dom.outerWidth(width, true);
                        }
                    }


                }


            }


        }

    });
})();