(function () {
	$namespace("cloudo.widget");
	/**
	 * @author Alex Tong (mailto:alex.tong@bstek.com)
	 * @component Advance
	 * @class Dorado面包屑控件
	 * @extends cloudo.widget.Control
	 */

	cloudo.widget.Breadcrumb = $extend(
		dorado.widget.Control,
		/** @scope cloudo.widget.Breadcrumb.prototype */
		{
			$className: "cloudo.widget.Breadcrumb",
			ATTRIBUTES: /** @scope cloudo.widget.Breadcrumb.prototype */
			{
				className: {
					defaultValue: "c-breadcrumb"
				},
				items: {
					defaultValue: []
				},
				endOpen: {
					defaultValue: 1
				},
				beginOpen: {
					defaultValue: 1
				},
				previewWidth: {
					defaultValue: 3
				},
				collapsible: {
					defaultValue: false
				},
				width: {
					defaultValue: 100
				},
				height: {
					independent: true,
					readOnly: true
				}
			},
			EVENTS: /** @scope cloudo.widget.Breadcrumb.prototype */
			{
				onRenderItem: {},
				onItemClick: {},
				onItemDoubleClick: {},
				onItemMouseDown: {},
				onItemMouseUp: {}
			},
			createDom: function () {
				var doms = {};
				var dom = $DomUtils.xCreate({
					tagName: "SPAN",
					content: [
						{
							tagName: "ul",
							contextKey: "ul"
						}
					]
				}, null, doms);
				this._doms = doms;
				return dom;
			},
			refreshDom: function (dom) {
				$invokeSuper.call(this, arguments);
				var breadcrumb = this, doms = this._doms, itemDoms = [], items = this._items;
				var $ul = $(doms.ul);
				$ul.empty();
				for (var i = 0, len = items.length; i < len; i++) {
					var item = items[i];
					var el = this._createElementDom(item);
					itemDoms.push(el);
					$ul.append(el);
				}

				this._itemDoms = itemDoms;
				this._collapsible && setTimeout(function () {
					breadcrumb._doCollapsed();
				}, 100);
			},
			_doCollapsed: function () {
				var breadcrumb = this, previewWidth = parseInt(this._previewWidth), itemDoms = this._itemDoms;
				for (var i = breadcrumb._beginOpen, len = itemDoms.length; i < (len - breadcrumb._endOpen); i++) {
					var itemDom = $(itemDoms[i].lastChild);
					var oldWidth = itemDom.width();
					$(itemDoms[i]).hover(function () {
						$(this.lastChild).css({
							width: this._oldWidth + "px"
						});
					}, function () {
						$(this.lastChild).css({
							width: previewWidth + "px"
						});
					});

					itemDoms[i]._oldWidth = oldWidth;
					itemDom.css("width", previewWidth + "px");
				}
			},
			setCurrent: function (index) {
				var itemDoms = this._itemDoms;
				for (var i = 0, len = itemDoms.length; i < len; i++) {
					var dom = itemDoms[i];
					$(dom).toggleClass("current",i== index);
				}

			},
			_createElementDom: function (item) {
				var self = this;

				function buildArg(evt) {
					return {
						button: evt.button,
						event: evt,
						item: item,
						returnValue: true
					};
				}

				var dom = $DomUtils.xCreate({
					tagName: "li",
					content: [
						{
							tagName: "a",
							href: "#",
							content: [
								{
									tagName: "i",
									className: "i-before"
								},
								{
									tangName: "div",
									className: "content",
									contentText: item.label
								},
								{
									tagName: "i",
									className: "i-after"
								}
							]
						}
					]
				});
				jQuery(dom).click(function (evt) {
					var arg = buildArg(evt);
					self.fireEvent("onItemClick", self, arg);
					return arg.returnValue;
				}).bind("dblclick", function (evt) {
					var arg = buildArg(evt);
					self.fireEvent("onItemDoubleClick", self, arg);
					return arg.returnValue;
				}).mouseup(function (evt) {
					var arg = buildArg(evt);
					self.fireEvent("onItemMouseUp", self, arg);
					return arg.returnValue;
				}).mousedown(function (evt) {
					var arg = buildArg(evt);
					self.fireEvent("onItemMouseDown", self, arg);
					return arg.returnValue;
				});
				return dom;
			}
		});

})();