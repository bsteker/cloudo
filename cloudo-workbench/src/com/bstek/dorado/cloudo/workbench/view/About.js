/** @Controller */

var offsetLeft = 40;

				var logoHeight = 50;
//@Bind view.onCreate
!function(self, arg) {
	self.set("children", [ {
		$type : "Container",
		height : logoHeight,
		children : [ {
			$type : "Label",
			text : "Dorado Cloudo",
			exClassName : "app-name",
			layoutConstraint : "top",
			height : "50%"
		}, {
			$type : "Label",
			text : "一个轻量级、可扩展的编辑器"
		} ],
		layoutConstraint : {
			left : offsetLeft,
			top : 60,
			right : 40
		}
	}, {
		$type : "Container",
		height : logoHeight,
		children : [ {
			$type : "Label",
			text : "版本: 0.1.0-BETA",
			width : 200,
			layoutConstraint : "top"
		}, {
			$type : "Button",
			caption : "获取最新版本…",
			layoutConstraint : "center"
		} ],
		layoutConstraint : {
			left : offsetLeft,
			top : 50,
			anchorTop : "previous",
			right : 40
		}
	}, {
		$type : "HtmlContainer",
		content : [ {
			tagName : "div",
			contentText : "Dorado Cloudo"
		}, {
			tagName : "div",
			contentText : "上海锐道信息技术有限公司 版权所有 Copyright @2015"
		}, {
			tagName : "div",
			contentText : "Dorado Cloudo  All Rights Reserved"
		} ],
		layoutConstraint : {
			left : offsetLeft,
			top : 50,
			anchorTop : "previous",
			right : 40
		}
	} ]);
}