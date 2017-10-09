/** @Controller */

var offsetLeft = 40;
// @Bind view.onCreate
!function(self, arg) {
	self.set("width", 1024);
	self
			.set(
					"children",
					[
							{
								$type : "Container",
								children : [ {
									$type : "HtmlContainer",
									exClassName : "feedback ",
									layoutConstraint : "top",
									content : [
											{
												tagName : "Div",
												className : "clickable",
												content : [
														{
															tagName : "i",
															className : "fa fa-qq"
														},
														{
															tagName : "Div",
															content : [
																	{
																		tagName : "span",
																		contentText : "Dorado互助群"
																	},
																	{
																		tagName : "span",
																		contentText : "210325679"
																	} ]
														} ]
											},
											{
												tagName : "Div",
												className : "clickable",
												content : [
														{
															tagName : "i",
															className : "fa fa-user"
														},
														{
															tagName : "Div",
															content : [
																	{
																		tagName : "span",
																		contentText : "BSDN"
																	},
																	{
																		tagName : "a",
																		contentText : "在线问答",
																		onclick : function() {
																			window
																					.open("http://bsdn.org/projects/dorado7/issue");
																		}
																	} ]
														} ]
											},
											{
												tagName : "Div",
												className : "clickable",
												content : [
														{
															tagName : "i",
															className : "fa fa-phone"
														},
														{
															tagName : "Div",
															content : [
																	{
																		tagName : "span",
																		contentText : "电话咨询"
																	},
																	{
																		tagName : "span",
																		contentText : "4008-202-993"
																	} ]
														} ]
											} ]

								}

								],
								layoutConstraint : {
									left : 100,
									top : 100,
									right : 100
								}
							},
							{
								$type : "HtmlContainer",
								exClassName : "link clickable",
								content : [
										{
											tagName : "Div",
											content : [
													{
														tagName : "span",
														contentText : "锐道官网"
													},
													{
														tagName : "a",
														contentText : "www.bstek.com",
														onclick : function() {
															window
																	.open("http://www.bstek.com");
														}
													} ]
										},
										{
											tagName : "Div",
											content : [
													{
														tagName : "span",
														contentText : "Dorado官网"
													},
													{
														tagName : "a",
														contentText : "www.dorado.io",
														onclick : function() {
															window
																	.open("http://www.dorado.io");
														}
													} ]
										},
										{
											tagName : "Div",
											content : [
													{
														tagName : "span",
														contentText : "锐客网"
													},
													{
														tagName : "a",
														onclick : function() {
															window
																	.open("http://www.bsdn.org");
														},
														contentText : "www.bsdn.org"
													} ]
										} ],
								layoutConstraint : {
									left : 100,
									top : 20,
									anchorTop : "previous"
								}
							} ]);

}