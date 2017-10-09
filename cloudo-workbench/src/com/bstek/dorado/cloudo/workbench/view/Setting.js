/** @Controller */

//@Bind view.onCreate
!function(self, arg) {
	var tabColumnWidth = 140;
	window.Ui = {};
	function registUI(self, arg) {
		window.Ui[self.get("id")] = self;
	}
	self.set("children", [ {
		$type : "Container",
		layoutConstraint : "top",
		children : [ {
			$type : "Container",
			exClassName : "d-tabcolumn",
			width : tabColumnWidth,
			height : "100%",
			layoutConstraint : "left",
			layout : {
				$type : "Anchor"
			},
			children : [ new dorado.widget.SimpleIconButton({
				iconClass : "fa fa-arrow-left",
				exClassName : "back",
				width : 27,
				height : 27,
				layoutConstraint : {
					left : 10,
					top : 10
				},
				onClick : function() {
					window.parent.Interfaces.hideSettingLayer();
				}
			}) ]
		}, {
			$type : "Container",
			exClassName : "tab-title-container",
			height : "100%",
			layoutConstraint : "center",
			layout : {
				$type : "Anchor"
			},
			children : [ new dorado.widget.Label({
				exClassName : "tab-title",
				text : "新建",
				id : "tabTitle",
				onCreate : registUI,
				layoutConstraint : {
					left : 50,
					bottom : 10
				}
			}) ]
		} ],
		height : "50px"
	}, {
		$type : "VerticalTabControl",
		layoutConstraint : "center",
		onCreate : function(self, arg) {
			window.setCurrent = function(name) {
				self.set("currentTab", self.getTab(name));
			}
		},
		exClassName : "main-menu",
		onTabChange : function(self, arg) {
			Ui.tabTitle.set("text", arg.newTab.get("caption"));
		},
		tabColumnWidth : tabColumnWidth,
		tabs : [ {
			$type : "Control",
			caption : "关于",
			name : "about",
			control : {
				$type : "IFrame",
				path : ">dorado/cloudo/about"
			}
		}, {
			$type : "Control",
			caption : "帮助",
			name : "help",
			control : {
				$type : "IFrame",
				path : ">dorado/cloudo/help"
			}
		}, {
			$type : "Control",
			caption : "反馈",
			name : "feedback",
			control : {
				$type : "IFrame",
				path : ">dorado/cloudo/feedback"
			}
		} ]
	}

	]);
}