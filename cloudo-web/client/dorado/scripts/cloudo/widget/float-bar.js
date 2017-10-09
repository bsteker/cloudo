/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-2-18
 * Time: 上午11:03
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var floatBar = {
		_ready: false,
		addHSeparator: function () {
			$(this.content).append($DomUtils.xCreate({
				tagName: "SPAN",
				className: "d-toolbar-sep i-toolbar-sep c-horizontal-separator"
			}));
			floatBar.show();
		},
		addVSeparator: function () {
			$(this.content).append($DomUtils.xCreate({
				tagName: "DIV",
				className: "c-vertical-separator",
				content: {
					tagName: "DIV"
				}
			}));
			floatBar.show();
		},
		clear: function () {
			$(floatBar._controls).each(function () {
				this.destroy();
			});
			floatBar._controls = [];
			$(floatBar.content).empty();
			floatBar.hide();
		},
		addChild: function (control) {
			var controls = this._controls;
			control.render(this.content);
			controls.push(control);
			floatBar.show();
		},
		show: function () {
			if (!floatBar._ready) {
				$(window.document.body).append(floatBoxDom);
				$(floatBoxDom).draggable({containment: window.document.body});
				floatBar._ready = true;
			}
			$(floatBoxDom).removeClass("c-invisible");
		},
		hide: function () {
			$(floatBoxDom).addClass("c-invisible");
		}
	};
	var floatBoxDom = $DomUtils.xCreate({
		tagName: "DIV",
		content: [
			{
				tagName: "div", className: "steer"
			},
			{
				tagName: "div", className: "content", contextKey: "content"
			}
		],
		className: "c-float-box"
	}, null, floatBar);
	cloudo.floatBar = floatBar;
	window.$floatBar = floatBar;
})();