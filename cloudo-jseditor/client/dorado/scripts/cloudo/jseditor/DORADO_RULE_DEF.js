var DORADO_RULE_DEF = {
	"version" : "1.1",
	"rules" : {
		"ids" : [ "DataType", "Model", "CustomDropDown", "ViewConfig", "DatePicker", "EnumValidator", "TabColumn", "IndicatorColumn", "PlaceHolderStart", "GroupStart", "GroupBox", "CardBook", "IFrameTab", "Separator", "VboxLayout", "CharLengthValidator", "FormSubmitAction", "DataSet", "UpdateItem", "AnchorLayout", "HtmlContainer", "AutoMappingDropDown", "DataListBox", "Node", "PlaceHolderEnd", "PasswordEditor", "DefaultView", "UpdateAction", "ProgressBar", "BasePropertyDef", "Button_1", "DataGrid", "DataColumn", "HboxLayout", "RegExpValidator", "Control", "SplitPanel", "Panel", "TextEditor", "Action", "Tree", "LengthValidator", "ControlMenuItem", "Grid", "GroupEnd", "FloatContainer", "DataMessage", "DirectDataResolver", "NativeLayoutConstraint", "CustomValidator", "RowSelectorColumn", "HashMap", "FloatPanel", "ControlTab", "DateTimeSpinner", "Link", "CustomSpinner", "Tip", "Label", "SubViewHolder", "PlaceHolder", "BindingConfig", "DockLayoutConstraint", "SimpleIconButton", "IFrame", "YearMonthDropDown", "DataSetDropDown", "RowNumColumn", "Menu", "MenuButton", "Button", "TabControl", "RadioGroup", "ColumnGroup", "AjaxValidator", "Tab", "AutoFormElement", "ListDropDown", "FormLayout", "AutoForm", "DirectDataProvider", "DataLabel", "LayoutHolder", "ToolBar", "DataTreeGrid", "DateDropDown", "VerticalTabControl", "TreeGrid", "DataTree", "TabBar", "Reference", "SimpleButton", "DataPilot", "Import", "CheckableMenuItem", "Accordion", "VboxLayoutConstraint", "NumberSpinner", "NativeLayout", "TextArea", "Separator_1", "Slider", "FormLayoutConstraint", "Trigger", "AjaxAction", "Label_1", "CheckBox", "Fill", "DataBlockView", "BlockView", "MockDataSet", "Container", "YearMonthPicker", "DockLayout", "HboxLayoutConstraint", "FormProfile", "RadioButton", "Dialog", "FieldSet", "AnchorLayoutConstraint", "RangeValidator", "Section", "ListBox", "MenuItem", "RequiredValidator", "Auxiliary", "FormElement", "ViewConfig/Arguments", "ViewConfig/Arguments/Argument", "ViewConfig/Context", "ViewConfig/Context/Attribute", "GroupBox/Wrapper.Buttons", "GroupBox/Wrapper.Children", "DataColumn/Wrapper.Editor", "SplitPanel/Wrapper.MainControl", "SplitPanel/Wrapper.SideControl", "Panel/Wrapper.Buttons", "Panel/Wrapper.Children", "Panel/Wrapper.Tools", "FloatPanel/Wrapper.Buttons", "FloatPanel/Wrapper.Children", "FloatPanel/Wrapper.Tools", "AutoFormElement/Wrapper.Editor", "DataTreeGrid/Wrapper.BindingConfigs", "DataTreeGrid/Wrapper.Columns", "TreeGrid/Wrapper.Columns", "TreeGrid/Wrapper.Nodes", "DataTree/Wrapper.BindingConfigs", "Dialog/Wrapper.Buttons", "Dialog/Wrapper.Children", "Dialog/Wrapper.Tools", "FieldSet/Wrapper.Buttons", "FieldSet/Wrapper.Children", "FormElement/Wrapper.Editor" ],
		"data" : {
			"DataType" : {
				"label" : "DataType",
				"icon" : "/com/bstek/dorado/data/type/DataType.png",
				"properties" : {
					"names" : [ "impl", "listener", "name", "overwrite", "parent", "acceptUnknownProperty", "acceptValidationState", "autoCreatePropertyDefs", "creationType", "defaultDisplayProperty", "matchType", "metaData", "tags", "userData" ],
					"data" : {
						"overwrite" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"acceptUnknownProperty" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"acceptValidationState" : {
							"defaultValue" : "ok",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"autoCreatePropertyDefs" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onEntityLoad", "onDataChange", "onRemove", "beforeDataChange", "onMessageChange", "onInsert", "beforeStateChange", "beforeInsert", "beforeRemove", "onEntityToText", "onCurrentChange", "beforeCurrentChange", "onStateChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "propertyDefs",
					"property" : "propertyDefs",
					"aggregated" : false,
					"memberRuleIDs" : [ "BasePropertyDef", "Reference" ]
				} ]
			},
			"Model" : {
				"label" : "Model",
				"icon" : "/com/bstek/dorado/view/manager/Model.png",
				"children" : [ {
					"name" : "DataProvider",
					"property" : "dataProvider",
					"memberRuleIDs" : [ "DirectDataProvider" ]
				}, {
					"name" : "DataResolver",
					"property" : "dataResolver",
					"memberRuleIDs" : [ "DirectDataResolver" ]
				}, {
					"name" : "DataType",
					"property" : "dataType",
					"memberRuleIDs" : [ "DataType" ]
				} ]
			},
			"CustomDropDown" : {
				"category" : "Trigger",
				"label" : "CustomDropDown",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/CustomDropDown.png",
				"jsPrototype" : "dorado.widget.CustomDropDown",
				"jsShortType" : "CustomDropDown",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "assignmentMap", "autoOpen", "buttonVisible", "editable", "height", "icon", "iconClass", "ignored", "maxHeight", "maxWidth", "metaData", "minHeight", "minWidth", "postValueOnSelect", "tags", "userData", "width" ],
					"data" : {
						"autoOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"postValueOnSelect" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute", "onOpen", "onValueSelect", "onClose" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Control",
					"property" : "control",
					"aggregated" : false,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"ViewConfig" : {
				"label" : "ViewConfig",
				"icon" : "/com/bstek/dorado/view/manager/ViewConfig.png",
				"properties" : {
					"names" : [ "listener", "template", "metaData", "scope" ],
					"data" : {
						"metaData" : {
							"editorType" : "pojo"
						},
						"scope" : {
							"defaultValue" : "request",
							"editorType" : "com.bstek.dorado.core.bean.Scope"
						}
					}
				},
				"children" : [ {
					"name" : "Arguments",
					"property" : "arguments",
					"aggregated" : false,
					"memberRuleIDs" : [ "ViewConfig/Arguments" ]
				}, {
					"name" : "Context",
					"property" : "context",
					"aggregated" : false,
					"memberRuleIDs" : [ "ViewConfig/Context" ]
				}, {
					"name" : "Model",
					"property" : "model",
					"aggregated" : false,
					"memberRuleIDs" : [ "Model" ]
				}, {
					"name" : "View",
					"property" : "view",
					"aggregated" : false,
					"memberRuleIDs" : [ "DefaultView" ]
				} ]
			},
			"DatePicker" : {
				"category" : "General",
				"label" : "DatePicker",
				"icon" : "/com/bstek/dorado/view/widget/base/DatePicker.png",
				"jsPrototype" : "dorado.widget.DatePicker",
				"jsShortType" : "DatePicker",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "date", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "showClearButton", "showConfirmButton", "showTimeSpinner", "showTodayButton", "style", "tags", "tip", "userData", "visible", "width", "yearMonthFormat" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showClearButton" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showConfirmButton" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showTimeSpinner" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showTodayButton" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onRefreshDateCell", "onPick", "onConfirm", "onCancel" ],
					"data" : [ ]
				}
			},
			"EnumValidator" : {
				"label" : "EnumValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.EnumValidator",
				"jsShortType" : "Enum",
				"properties" : {
					"names" : [ "type", "defaultResultState", "enumValues", "resultMessage", "revalidateOldValue", "runAt" ],
					"data" : {
						"type" : {
							"defaultValue" : "enum",
							"visible" : false,
							"fixed" : true
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"enumValues" : {
							"editorType" : "collection[pojo]"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						}
					}
				}
			},
			"TabColumn" : {
				"category" : "General",
				"label" : "TabColumn",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/TabColumn.png",
				"jsPrototype" : "dorado.widget.TabColumn",
				"jsShortType" : "TabColumn",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "alwaysShowNavButtons", "className", "currentTab", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tabPlacement", "tags", "tip", "userData", "verticalText", "visible", "width" ],
					"data" : {
						"alwaysShowNavButtons" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"tabPlacement" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.base.tab.VerticalTabPlacement"
						},
						"userData" : {
							"editorType" : "any"
						},
						"verticalText" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTabContextMenu", "beforeTabChange", "onTabChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "tabs",
					"property" : "tabs",
					"aggregated" : false,
					"memberRuleIDs" : [ "Tab" ]
				} ]
			},
			"IndicatorColumn" : {
				"label" : "IndicatorColumn",
				"icon" : "/com/bstek/dorado/view/widget/grid/IndicatorColumn.png",
				"jsShortType" : "*",
				"properties" : {
					"names" : [ "align", "caption", "filterBarRenderer", "footerRenderer", "headerAlign", "headerRenderer", "ignored", "metaData", "name", "renderer", "resizeable", "supportsOptionMenu", "tags", "userData", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"headerAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"resizeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"supportsOptionMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onRenderHeaderCell", "onHeaderClick", "onGetCellEditor", "onRenderFooterCell", "onRenderCell" ],
					"data" : [ ]
				}
			},
			"PlaceHolderStart" : {
				"category" : "Auxiliary",
				"label" : "PlaceHolderStart",
				"icon" : "/com/bstek/dorado/idesupport/icons/PlaceHolderStart.png",
				"properties" : {
					"names" : [ "id" ],
					"data" : { }
				}
			},
			"GroupStart" : {
				"category" : "Auxiliary",
				"label" : "GroupStart",
				"icon" : "/com/bstek/dorado/idesupport/icons/GroupStart.png",
				"properties" : {
					"names" : [ "id" ],
					"data" : { }
				}
			},
			"GroupBox" : {
				"category" : "General",
				"label" : "GroupBox",
				"icon" : "/com/bstek/dorado/view/widget/base/GroupBox.png",
				"jsPrototype" : "dorado.widget.GroupBox",
				"jsShortType" : "GroupBox",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "buttonAlign", "caption", "className", "collapseable", "collapsed", "contentOverflow", "contentOverflowX", "contentOverflowY", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layout", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"buttonAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"collapseable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"collapsed" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onCollapsedChange", "beforeCollapsedChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "GroupBox/Wrapper.Buttons" ]
				}, {
					"name" : "Children",
					"property" : "children",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "GroupBox/Wrapper.Children" ]
				} ]
			},
			"CardBook" : {
				"category" : "General",
				"label" : "CardBook",
				"icon" : "/com/bstek/dorado/view/widget/base/CardBook.png",
				"jsPrototype" : "dorado.widget.CardBook",
				"jsShortType" : "CardBook",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "currentControl", "currentIndex", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"currentControl" : {
							"visible" : false,
							"deprecated" : true
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onCurrentChange", "beforeCurrentChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Controls",
					"property" : "controls",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"IFrameTab" : {
				"label" : "IFrameTab",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/IFrameTab.png",
				"jsPrototype" : "dorado.widget.tab.IFrameTab",
				"jsShortType" : "IFrame",
				"properties" : {
					"names" : [ "caption", "className", "closeable", "disabled", "exClassName", "height", "icon", "ignored", "metaData", "name", "path", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"closeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				}
			},
			"Separator" : {
				"label" : "Separator",
				"icon" : "/com/bstek/dorado/view/widget/base/menu/Separator.png",
				"jsPrototype" : "dorado.widget.menu.Separator",
				"jsShortType" : "Separator",
				"properties" : {
					"names" : [ "className", "exClassName", "height", "ignored", "name", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				}
			},
			"VboxLayout" : {
				"label" : "VBoxLayout",
				"jsShortType" : "VBox",
				"properties" : {
					"names" : [ "align", "className", "pack", "padding", "regionPadding", "stretch" ],
					"data" : {
						"align" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"pack" : {
							"defaultValue" : "start",
							"editorType" : "com.bstek.dorado.view.widget.layout.Pack"
						},
						"padding" : {
							"defaultValue" : "2"
						},
						"regionPadding" : {
							"defaultValue" : "2"
						},
						"stretch" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				}
			},
			"CharLengthValidator" : {
				"label" : "CharLengthValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.CharLengthValidator",
				"jsShortType" : "CharLength",
				"properties" : {
					"names" : [ "type", "defaultResultState", "maxLength", "minLength", "resultMessage", "revalidateOldValue", "runAt" ],
					"data" : {
						"type" : {
							"defaultValue" : "charLength",
							"visible" : false,
							"fixed" : true
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						}
					}
				}
			},
			"FormSubmitAction" : {
				"category" : "Action",
				"label" : "FormSubmitAction",
				"icon" : "/com/bstek/dorado/view/widget/action/FormSubmitAction.png",
				"jsPrototype" : "dorado.widget.FormSubmitAction",
				"jsShortType" : "FormSubmitAction",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "action", "async", "caption", "confirmMessage", "disabled", "executingMessage", "hotkey", "icon", "iconClass", "ignored", "metaData", "method", "modal", "parameter", "successMessage", "tags", "target", "tip", "userData" ],
					"data" : {
						"async" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hotkey" : {
							"editorType" : "_editor_15"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"method" : {
							"defaultValue" : "post",
							"editorType" : "com.bstek.dorado.view.widget.action.SubmitMethod"
						},
						"modal" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"parameter" : {
							"editorType" : "any"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onFailure", "onSuccess", "beforeExecute", "onExecute" ],
					"data" : [ ]
				}
			},
			"DataSet" : {
				"category" : "General",
				"label" : "DataSet",
				"icon" : "/com/bstek/dorado/view/widget/data/DataSet.png",
				"jsPrototype" : "dorado.widget.DataSet",
				"jsShortType" : "DataSet",
				"dependsPackage" : "widget",
				"properties" : {
					"names" : [ "id", "listener", "cacheable", "dataProvider", "dataType", "ignored", "loadMode", "metaData", "pageSize", "parameter", "readOnly", "tags", "userData" ],
					"data" : {
						"cacheable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"loadMode" : {
							"defaultValue" : "lazy",
							"editorType" : "com.bstek.dorado.view.widget.data.LoadMode"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"parameter" : {
							"editorType" : "any"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onLoadData", "onDataLoad", "beforeLoadData" ],
					"data" : [ {
						"onLoadData" : {
							"deprecated" : true
						}
					} ]
				}
			},
			"UpdateItem" : {
				"label" : "UpdateItem",
				"icon" : "/com/bstek/dorado/view/widget/action/UpdateItem.png",
				"properties" : {
					"names" : [ "alias", "autoResetEntityState", "dataPath", "dataSet", "firstResultOnly", "refreshMode", "submitOldData", "submitSimplePropertyOnly" ],
					"data" : {
						"autoResetEntityState" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"dataPath" : {
							"defaultValue" : "!DIRTY_TREE",
							"editorType" : "_editor_18"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"firstResultOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"refreshMode" : {
							"defaultValue" : "value",
							"editorType" : "com.bstek.dorado.view.widget.action.RefreshMode"
						},
						"submitOldData" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"submitSimplePropertyOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				}
			},
			"AnchorLayout" : {
				"label" : "AnchorLayout",
				"jsShortType" : "Anchor",
				"properties" : {
					"names" : [ "className", "padding" ],
					"data" : { }
				}
			},
			"HtmlContainer" : {
				"category" : "General",
				"label" : "HtmlContainer",
				"icon" : "/com/bstek/dorado/view/widget/HtmlContainer.png",
				"jsPrototype" : "dorado.widget.HtmlContainer",
				"jsShortType" : "HtmlContainer",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "containerExpression", "content", "contentFile", "contentOverflow", "contentOverflowX", "contentOverflowY", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layout", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"content" : {
							"editorType" : "multilines"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "Panel", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"AutoMappingDropDown" : {
				"category" : "Trigger",
				"label" : "AutoMappingDropDown",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/AutoMappingDropDown.png",
				"jsPrototype" : "dorado.widget.AutoMappingDropDown",
				"jsShortType" : "AutoMappingDropDown",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "assignmentMap", "autoOpen", "buttonVisible", "displayProperty", "dynaFilter", "editable", "filterOnOpen", "filterOnTyping", "height", "icon", "iconClass", "ignored", "maxHeight", "maxWidth", "metaData", "minFilterInterval", "minHeight", "minWidth", "postValueOnSelect", "property", "tags", "useEmptyItem", "userData", "width" ],
					"data" : {
						"autoOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"dynaFilter" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"filterOnOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"filterOnTyping" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"minFilterInterval" : {
							"defaultValue" : "300"
						},
						"postValueOnSelect" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"property" : {
							"defaultValue" : "value"
						},
						"useEmptyItem" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute", "onOpen", "onValueSelect", "onClose", "onFilterItems", "onFilterItem" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"DataListBox" : {
				"category" : "Collection",
				"label" : "DataListBox",
				"icon" : "/com/bstek/dorado/view/widget/list/DataListBox.png",
				"jsPrototype" : "dorado.widget.DataListBox",
				"jsShortType" : "DataListBox",
				"positioned" : true,
				"dependsPackage" : "list",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "className", "dataPath", "dataSet", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "exClassName", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "layoutConstraint", "metaData", "property", "renderOn", "renderTo", "renderer", "rowHeight", "scrollMode", "selectionMode", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "insertItems",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onRenderRow", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				}
			},
			"Node" : {
				"label" : "Node",
				"icon" : "/com/bstek/dorado/view/widget/tree/Node.png",
				"properties" : {
					"names" : [ "autoCheckChildren", "checkable", "checked", "data", "expanded", "expandedIcon", "expandedIconClass", "hasChild", "icon", "iconClass", "ignored", "label", "tags", "tip", "userData" ],
					"data" : {
						"autoCheckChildren" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"checkable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"checked" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"expanded" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hasChild" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				},
				"children" : [ {
					"name" : "Nodes",
					"property" : "nodes",
					"aggregated" : false,
					"memberRuleIDs" : [ "Node" ]
				} ]
			},
			"PlaceHolderEnd" : {
				"category" : "Auxiliary",
				"label" : "PlaceHolderEnd",
				"icon" : "/com/bstek/dorado/idesupport/icons/PlaceHolderEnd.png"
			},
			"PasswordEditor" : {
				"category" : "Form",
				"label" : "PasswordEditor",
				"icon" : "/com/bstek/dorado/view/widget/form/PasswordEditor.png",
				"jsPrototype" : "dorado.widget.PasswordEditor",
				"jsShortType" : "PasswordEditor",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "blankText", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "editable", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "maxLength", "metaData", "minLength", "property", "readOnly", "renderOn", "renderTo", "required", "selectTextOnFocus", "style", "supportsDirtyFlag", "tags", "text", "tip", "trigger", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"required" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"selectTextOnFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onTextEdit", "onValidationStateChange", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"DefaultView" : {
				"category" : "General",
				"label" : "View",
				"icon" : "/com/bstek/dorado/view/DefaultView.png",
				"jsPrototype" : "dorado.widget.View",
				"jsShortType" : "View",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "contentOverflow", "contentOverflowX", "contentOverflowY", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "javaScriptFile", "layout", "layoutConstraint", "metaData", "packages", "pageTemplate", "pageUri", "renderOn", "renderTo", "style", "styleSheetFile", "tags", "tip", "title", "userData", "visible", "width" ],
					"data" : {
						"id" : {
							"visible" : false
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onComponentUnregistered", "onDataLoaded", "onComponentRegistered" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "Panel", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"UpdateAction" : {
				"category" : "Action",
				"label" : "UpdateAction",
				"icon" : "/com/bstek/dorado/view/widget/action/UpdateAction.png",
				"jsPrototype" : "dorado.widget.UpdateAction",
				"jsShortType" : "UpdateAction",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "alwaysExecute", "async", "caption", "confirmMessage", "dataResolver", "disabled", "executingMessage", "hotkey", "icon", "iconClass", "ignored", "metaData", "modal", "parameter", "successMessage", "tags", "tip", "userData" ],
					"data" : {
						"alwaysExecute" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"async" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hotkey" : {
							"editorType" : "_editor_15"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"parameter" : {
							"editorType" : "any"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onFailure", "onSuccess", "beforeExecute", "onExecute", "onGetUpdateData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "UpdateItems",
					"property" : "updateItems",
					"aggregated" : false,
					"memberRuleIDs" : [ "UpdateItem" ]
				} ]
			},
			"ProgressBar" : {
				"category" : "General",
				"label" : "ProgressBar",
				"icon" : "/com/bstek/dorado/view/widget/base/ProgressBar.png",
				"jsPrototype" : "dorado.widget.ProgressBar",
				"jsShortType" : "ProgressBar",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "effectEnable", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "maxValue", "metaData", "minValue", "renderOn", "renderTo", "showText", "style", "tags", "textPattern", "tip", "userData", "value", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"effectEnable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"maxValue" : {
							"defaultValue" : "100"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showText" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"textPattern" : {
							"defaultValue" : "{percent}%"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"BasePropertyDef" : {
				"label" : "PropertyDef",
				"icon" : "/com/bstek/dorado/data/type/property/BasePropertyDef.png",
				"jsPrototype" : "dorado.BasePropertyDef",
				"jsShortType" : "Default",
				"properties" : {
					"names" : [ "name", "acceptUnknownMapKey", "dataType", "defaultValue", "displayFormat", "ignored", "label", "mapping", "metaData", "propertyPath", "readOnly", "required", "submittable", "tags", "userData", "visible" ],
					"data" : {
						"acceptUnknownMapKey" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"mapping" : {
							"properties" : {
								"names" : [ "keyProperty", "mapValues", "valueProperty" ],
								"data" : {
									"mapValues" : {
										"editorType" : "collection[pojo]"
									}
								}
							}
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"required" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"submittable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onGetText", "onGet", "onSet", "onValidate" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Validators",
					"property" : "validators",
					"aggregated" : false,
					"memberRuleIDs" : [ "RequiredValidator", "LengthValidator", "CharLengthValidator", "RangeValidator", "EnumValidator", "RegExpValidator", "AjaxValidator", "CustomValidator" ]
				} ]
			},
			"Button_1" : {
				"category" : "ToolBar",
				"label" : "ToolBarButton",
				"icon" : "/com/bstek/dorado/view/widget/base/toolbar/Button.png",
				"jsPrototype" : "dorado.widget.toolbar.ToolBarButton",
				"jsShortType" : "ToolBarButton",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "action", "caption", "className", "disabled", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMenuOnMouseLeave", "hideMenuOnMouseLeaveDelay", "hideMode", "icon", "iconClass", "ignored", "layoutConstraint", "menu", "metaData", "renderOn", "renderTo", "showMenuOnHover", "showTrigger", "splitButton", "style", "tags", "tip", "toggleOnShowMenu", "toggleable", "toggled", "triggerToggled", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMenuOnMouseLeave" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMenuOnMouseLeaveDelay" : {
							"defaultValue" : "300"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"menu" : {
							"editorType" : "Menu:id"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showMenuOnHover" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showTrigger" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"splitButton" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"toggleOnShowMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"toggleable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"toggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"triggerToggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"DataGrid" : {
				"category" : "Collection",
				"label" : "DataGrid",
				"icon" : "/com/bstek/dorado/view/widget/grid/DataGrid.png",
				"jsPrototype" : "dorado.widget.DataGrid",
				"jsShortType" : "DataGrid",
				"positioned" : true,
				"dependsPackage" : "grid",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "autoCreateColumns", "cellRenderer", "className", "dataPath", "dataSet", "dataType", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "dynaRowHeight", "exClassName", "filterBarRenderer", "filterMode", "fixedColumnCount", "footerRenderer", "footerRowHeight", "groupFooterRenderer", "groupHeaderRenderer", "groupOnSort", "groupProperty", "headerRenderer", "headerRowHeight", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "layoutConstraint", "metaData", "readOnly", "renderOn", "renderTo", "rowHeight", "rowRenderer", "rowSelectionProperty", "scrollMode", "selectionMode", "showFilterBar", "showFooter", "showGroupFooter", "showHeader", "sortMode", "stretchColumnsMode", "style", "supportsPaging", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"dataType" : {
							"deprecated" : true
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "insertItems",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dynaRowHeight" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"filterMode" : {
							"defaultValue" : "clientSide",
							"editorType" : "com.bstek.dorado.view.widget.grid.FilterMode"
						},
						"groupOnSort" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"showFilterBar" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showFooter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showGroupFooter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHeader" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"sortMode" : {
							"defaultValue" : "clientSide",
							"editorType" : "com.bstek.dorado.view.widget.grid.SortMode"
						},
						"stretchColumnsMode" : {
							"defaultValue" : "stretchableColumns",
							"editorType" : "com.bstek.dorado.view.widget.grid.StretchColumnsMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsPaging" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onRenderHeaderCell", "onHeaderClick", "beforeCellValueEdit", "onRenderFooterCell", "onRenderRow", "onRenderCell", "onCellValueEdit", "onGetCellEditor", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"DataColumn" : {
				"label" : "DataColumn",
				"labelProperties" : [ "name", "property" ],
				"icon" : "/com/bstek/dorado/view/widget/grid/DataColumn.png",
				"properties" : {
					"names" : [ "align", "caption", "dataType", "defaultFilterOperator", "displayFormat", "editable", "editorType", "filterBarRenderer", "filterable", "footerRenderer", "headerAlign", "headerRenderer", "ignored", "metaData", "name", "property", "readOnly", "renderer", "required", "resizeable", "sortState", "summaryType", "supportsOptionMenu", "tags", "trigger", "typeFormat", "userData", "visible", "width", "wrappable" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editorType" : {
							"defaultValue" : "TextEditor",
							"editorType" : "_editor_31"
						},
						"filterable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"headerAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"required" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"resizeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"sortState" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.grid.SortState"
						},
						"summaryType" : {
							"editorType" : "_editor_33"
						},
						"supportsOptionMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"wrappable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onRenderHeaderCell", "onHeaderClick", "onGetCellEditor", "onRenderFooterCell", "onRenderCell" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Editor",
					"property" : "editor",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "DataColumn/Wrapper.Editor" ]
				} ]
			},
			"HboxLayout" : {
				"label" : "HBoxLayout",
				"jsShortType" : "HBox",
				"properties" : {
					"names" : [ "align", "className", "pack", "padding", "regionPadding", "stretch" ],
					"data" : {
						"align" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.VerticalAlign"
						},
						"pack" : {
							"defaultValue" : "start",
							"editorType" : "com.bstek.dorado.view.widget.layout.Pack"
						},
						"padding" : {
							"defaultValue" : "2"
						},
						"regionPadding" : {
							"defaultValue" : "2"
						},
						"stretch" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				}
			},
			"RegExpValidator" : {
				"label" : "RegExpValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.RegExpValidator",
				"jsShortType" : "RegExp",
				"properties" : {
					"names" : [ "type", "blackRegExp", "defaultResultState", "resultMessage", "revalidateOldValue", "runAt", "validateMode", "whiteRegExp" ],
					"data" : {
						"type" : {
							"defaultValue" : "regExp",
							"visible" : false,
							"fixed" : true
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						},
						"validateMode" : {
							"editorType" : "com.bstek.dorado.view.type.property.validator.RegExpValidatorMode"
						}
					}
				}
			},
			"Control" : {
				"category" : "General",
				"label" : "Control",
				"icon" : "/com/bstek/dorado/view/widget/Control.png",
				"jsPrototype" : "dorado.widget.Control",
				"jsShortType" : "Control",
				"positioned" : true,
				"dependsPackage" : "widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"SplitPanel" : {
				"category" : "General",
				"label" : "SplitPanel",
				"icon" : "/com/bstek/dorado/view/widget/base/SplitPanel.png",
				"jsPrototype" : "dorado.widget.SplitPanel",
				"jsShortType" : "SplitPanel",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "collapseable", "collapsed", "direction", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "maxPosition", "metaData", "minPosition", "position", "previewable", "renderOn", "renderTo", "resizeable", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"collapseable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"collapsed" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"direction" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Direction"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"position" : {
							"defaultValue" : "100"
						},
						"previewable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"resizeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "MainControl",
					"property" : "mainControl",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "SplitPanel/Wrapper.MainControl" ]
				}, {
					"name" : "SideControl",
					"property" : "sideControl",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "SplitPanel/Wrapper.SideControl" ]
				} ]
			},
			"Panel" : {
				"category" : "General",
				"label" : "Panel",
				"icon" : "/com/bstek/dorado/view/widget/base/Panel.png",
				"jsPrototype" : "dorado.widget.Panel",
				"jsShortType" : "Panel",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "background", "border", "buttonAlign", "caption", "className", "closeAction", "closeable", "collapseable", "collapsed", "contentOverflow", "contentOverflowX", "contentOverflowY", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "icon", "iconClass", "ignored", "layout", "layoutConstraint", "maximizeable", "maximized", "metaData", "renderOn", "renderTo", "showCaptionBar", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"border" : {
							"defaultValue" : "normal",
							"editorType" : "com.bstek.dorado.view.widget.base.PanelBorder"
						},
						"buttonAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"closeAction" : {
							"defaultValue" : "hide",
							"editorType" : "com.bstek.dorado.view.widget.base.CloseAction"
						},
						"closeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"collapseable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"collapsed" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"maximizeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"maximized" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onCollapsedChange", "beforeCollapsedChange", "onMaximize", "beforeMaximize" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "Panel/Wrapper.Buttons" ]
				}, {
					"name" : "Children",
					"property" : "children",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "Panel/Wrapper.Children" ]
				}, {
					"name" : "Tools",
					"property" : "tools",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "Panel/Wrapper.Tools" ]
				} ]
			},
			"TextEditor" : {
				"category" : "Form",
				"label" : "TextEditor",
				"icon" : "/com/bstek/dorado/view/widget/form/TextEditor.png",
				"jsPrototype" : "dorado.widget.TextEditor",
				"jsShortType" : "TextEditor",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "blankText", "className", "dataPath", "dataSet", "dataType", "displayFormat", "dragTags", "draggable", "droppable", "droppableTags", "editable", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "mapping", "maxLength", "metaData", "minLength", "password", "property", "readOnly", "renderOn", "renderTo", "required", "selectTextOnFocus", "style", "supportsDirtyFlag", "tags", "text", "tip", "trigger", "typeFormat", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"mapping" : {
							"properties" : {
								"names" : [ "keyProperty", "mapValues", "valueProperty" ],
								"data" : {
									"mapValues" : {
										"editorType" : "collection[pojo]"
									}
								}
							}
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"password" : {
							"defaultValue" : "false",
							"editorType" : "boolean",
							"visible" : false
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"required" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"selectTextOnFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onTextEdit", "onValidationStateChange", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"Action" : {
				"category" : "Action",
				"label" : "Action",
				"icon" : "/com/bstek/dorado/view/widget/action/Action.png",
				"jsPrototype" : "dorado.widget.Action",
				"jsShortType" : "Action",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "async", "caption", "confirmMessage", "disabled", "executingMessage", "hotkey", "icon", "iconClass", "ignored", "metaData", "modal", "parameter", "successMessage", "tags", "tip", "userData" ],
					"data" : {
						"async" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hotkey" : {
							"editorType" : "_editor_15"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"parameter" : {
							"editorType" : "any"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onFailure", "onSuccess", "beforeExecute", "onExecute" ],
					"data" : [ ]
				}
			},
			"Tree" : {
				"category" : "Collection",
				"label" : "Tree",
				"icon" : "/com/bstek/dorado/view/widget/tree/Tree.png",
				"jsPrototype" : "dorado.widget.Tree",
				"jsShortType" : "Tree",
				"positioned" : true,
				"dependsPackage" : "tree",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "className", "defaultExpandedIcon", "defaultExpandedIconClass", "defaultIcon", "defaultIconClass", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "exClassName", "expandingAnimated", "expandingMode", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "indent", "layoutConstraint", "metaData", "renderOn", "renderTo", "renderer", "rowHeight", "scrollMode", "selectionMode", "showLines", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "onItem",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"expandingAnimated" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"expandingMode" : {
							"defaultValue" : "async",
							"editorType" : "com.bstek.dorado.view.widget.tree.ExpandingMode"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"showLines" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onNodeCheckedChange", "onRenderNode", "beforeCurrentChange", "onExpand", "beforeCollapse", "onCollapse", "beforeExpand", "onNodeDetached", "beforeNodeCheckedChange", "onNodeAttached" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Nodes",
					"property" : "nodes",
					"aggregated" : false,
					"memberRuleIDs" : [ "Node" ]
				} ]
			},
			"LengthValidator" : {
				"label" : "LengthValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.LengthValidator",
				"jsShortType" : "Length",
				"properties" : {
					"names" : [ "type", "defaultResultState", "maxLength", "minLength", "resultMessage", "revalidateOldValue", "runAt" ],
					"data" : {
						"type" : {
							"defaultValue" : "length",
							"visible" : false,
							"fixed" : true
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						}
					}
				}
			},
			"ControlMenuItem" : {
				"label" : "ControlMenuItem",
				"icon" : "/com/bstek/dorado/view/widget/base/menu/ControlMenuItem.png",
				"jsPrototype" : "dorado.widget.menu.ControlMenuItem",
				"jsShortType" : "Control",
				"properties" : {
					"names" : [ "action", "caption", "className", "disabled", "exClassName", "height", "hideOnClick", "icon", "iconClass", "ignored", "name", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideOnClick" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onClick" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Control",
					"property" : "control",
					"aggregated" : false,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu" ]
				} ]
			},
			"Grid" : {
				"category" : "Collection",
				"label" : "Grid",
				"icon" : "/com/bstek/dorado/view/widget/grid/Grid.png",
				"jsPrototype" : "dorado.widget.Grid",
				"jsShortType" : "Grid",
				"positioned" : true,
				"dependsPackage" : "grid",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "cellRenderer", "className", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "dynaRowHeight", "exClassName", "filterBarRenderer", "fixedColumnCount", "footerRenderer", "footerRowHeight", "groupFooterRenderer", "groupHeaderRenderer", "groupOnSort", "groupProperty", "headerRenderer", "headerRowHeight", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "items", "layoutConstraint", "metaData", "readOnly", "renderOn", "renderTo", "rowHeight", "rowRenderer", "scrollMode", "selectionMode", "showFilterBar", "showFooter", "showGroupFooter", "showHeader", "stretchColumnsMode", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "insertItems",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dynaRowHeight" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"groupOnSort" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"items" : {
							"editorType" : "collection[pojo]"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"showFilterBar" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showFooter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showGroupFooter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHeader" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"stretchColumnsMode" : {
							"defaultValue" : "stretchableColumns",
							"editorType" : "com.bstek.dorado.view.widget.grid.StretchColumnsMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onRenderHeaderCell", "onHeaderClick", "beforeCellValueEdit", "onRenderFooterCell", "onRenderRow", "onRenderCell", "onCellValueEdit", "onGetCellEditor" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"GroupEnd" : {
				"category" : "Auxiliary",
				"label" : "GroupEnd",
				"icon" : "/com/bstek/dorado/idesupport/icons/GroupEnd.png"
			},
			"FloatContainer" : {
				"category" : "Floatable",
				"label" : "FloatContainer",
				"icon" : "/com/bstek/dorado/view/widget/base/FloatContainer.png",
				"jsPrototype" : "dorado.widget.FloatContainer",
				"jsShortType" : "FloatContainer",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "align", "anchorTarget", "animateTarget", "animateType", "autoAdjustPosition", "center", "className", "contentOverflow", "contentOverflowX", "contentOverflowY", "continuedFocus", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "floating", "floatingClassName", "focusAfterShow", "handleOverflow", "height", "hideAnimateType", "hideMode", "ignored", "layout", "layoutConstraint", "left", "metaData", "modal", "modalType", "offsetLeft", "offsetTop", "renderOn", "renderTo", "shadowMode", "showAnimateType", "style", "tags", "tip", "top", "userData", "vAlign", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAlign",
							"visible" : false
						},
						"anchorTarget" : {
							"visible" : false
						},
						"animateTarget" : {
							"visible" : false
						},
						"animateType" : {
							"defaultValue" : "zoom",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"autoAdjustPosition" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"center" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"continuedFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"floating" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"focusAfterShow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"handleOverflow" : {
							"defaultValue" : "true",
							"editorType" : "boolean",
							"visible" : false
						},
						"hideAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"modalType" : {
							"editorType" : "com.bstek.dorado.view.widget.ModalType"
						},
						"shadowMode" : {
							"defaultValue" : "sides",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlShadowMode"
						},
						"showAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vAlign" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlVAlign",
							"visible" : false
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforeShow", "beforeHide", "beforeClose", "onShow", "onClose", "onHide" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"DataMessage" : {
				"category" : "Form",
				"label" : "DataMessage",
				"icon" : "/com/bstek/dorado/view/widget/form/DataMessage.png",
				"jsPrototype" : "dorado.widget.DataMessage",
				"jsShortType" : "DataMessage",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "property", "renderOn", "renderTo", "showIconOnly", "showMultiMessage", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showIconOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showMultiMessage" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				}
			},
			"DirectDataResolver" : {
				"label" : "DirectDataResolver",
				"icon" : "/com/bstek/dorado/data/resolver/DirectDataResolver.png",
				"properties" : {
					"names" : [ "impl", "listener", "name", "overwrite", "parent", "scope", "type", "interceptor", "metaData", "parameter" ],
					"data" : {
						"overwrite" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"scope" : {
							"editorType" : "com.bstek.dorado.core.bean.Scope"
						},
						"type" : {
							"defaultValue" : "direct",
							"visible" : false,
							"fixed" : true
						},
						"metaData" : {
							"editorType" : "pojo"
						}
					}
				}
			},
			"NativeLayoutConstraint" : {
				"label" : "CommonLayoutConstraint"
			},
			"CustomValidator" : {
				"label" : "CustomValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.CustomValidator",
				"jsShortType" : "Custom",
				"properties" : {
					"names" : [ "type", "defaultResultState", "revalidateOldValue", "runAt" ],
					"data" : {
						"type" : {
							"defaultValue" : "custom",
							"visible" : false,
							"fixed" : true
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						}
					}
				},
				"events" : {
					"names" : [ "onValidate" ],
					"data" : [ ]
				}
			},
			"RowSelectorColumn" : {
				"label" : "RowSelectorColumn",
				"icon" : "/com/bstek/dorado/view/widget/grid/RowSelectorColumn.png",
				"jsShortType" : "[]",
				"properties" : {
					"names" : [ "align", "caption", "filterBarRenderer", "footerRenderer", "headerAlign", "headerRenderer", "ignored", "metaData", "name", "renderer", "resizeable", "supportsOptionMenu", "tags", "userData", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"headerAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"resizeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"supportsOptionMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onRenderHeaderCell", "onHeaderClick", "onGetCellEditor", "onRenderFooterCell", "onRenderCell" ],
					"data" : [ ]
				}
			},
			"HashMap" : {
				"label" : "HashMap"
			},
			"FloatPanel" : {
				"category" : "Floatable",
				"label" : "FloatPanel",
				"icon" : "/com/bstek/dorado/view/widget/base/FloatPanel.png",
				"jsPrototype" : "dorado.widget.FloatPanel",
				"jsShortType" : "FloatPanel",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "align", "anchorTarget", "animateTarget", "animateType", "autoAdjustPosition", "background", "border", "buttonAlign", "caption", "center", "className", "closeAction", "closeable", "collapseable", "collapsed", "contentOverflow", "contentOverflowX", "contentOverflowY", "continuedFocus", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "floating", "floatingClassName", "focusAfterShow", "handleOverflow", "height", "hideAnimateType", "hideMode", "icon", "iconClass", "ignored", "layout", "layoutConstraint", "left", "maximizeable", "maximized", "metaData", "modal", "modalType", "offsetLeft", "offsetTop", "renderOn", "renderTo", "shadowMode", "showAnimateType", "showCaptionBar", "style", "tags", "tip", "top", "userData", "vAlign", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAlign",
							"visible" : false
						},
						"anchorTarget" : {
							"visible" : false
						},
						"animateTarget" : {
							"visible" : false
						},
						"animateType" : {
							"defaultValue" : "zoom",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"autoAdjustPosition" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"border" : {
							"defaultValue" : "normal",
							"editorType" : "com.bstek.dorado.view.widget.base.PanelBorder"
						},
						"buttonAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"center" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"closeAction" : {
							"defaultValue" : "hide",
							"editorType" : "com.bstek.dorado.view.widget.base.CloseAction"
						},
						"closeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"collapseable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"collapsed" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"continuedFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"floating" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"focusAfterShow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"handleOverflow" : {
							"defaultValue" : "true",
							"editorType" : "boolean",
							"visible" : false
						},
						"hideAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"maximizeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"maximized" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"modalType" : {
							"editorType" : "com.bstek.dorado.view.widget.ModalType"
						},
						"shadowMode" : {
							"defaultValue" : "sides",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlShadowMode"
						},
						"showAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vAlign" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlVAlign",
							"visible" : false
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onCollapsedChange", "beforeCollapsedChange", "onMaximize", "beforeMaximize", "beforeShow", "beforeHide", "beforeClose", "onShow", "onClose", "onHide" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "FloatPanel/Wrapper.Buttons" ]
				}, {
					"name" : "Children",
					"property" : "children",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "FloatPanel/Wrapper.Children" ]
				}, {
					"name" : "Tools",
					"property" : "tools",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "FloatPanel/Wrapper.Tools" ]
				} ]
			},
			"ControlTab" : {
				"label" : "ControlTab",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/ControlTab.png",
				"jsPrototype" : "dorado.widget.tab.ControlTab",
				"jsShortType" : "Control",
				"properties" : {
					"names" : [ "caption", "className", "closeable", "disabled", "exClassName", "height", "icon", "ignored", "metaData", "name", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"closeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"children" : [ {
					"name" : "Control",
					"property" : "control",
					"aggregated" : false,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"DateTimeSpinner" : {
				"category" : "Form",
				"label" : "DateTimeSpinner",
				"icon" : "/com/bstek/dorado/view/widget/form/DateTimeSpinner.png",
				"jsPrototype" : "dorado.widget.DateTimeSpinner",
				"jsShortType" : "DateTimeSpinner",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "date", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "hours", "ignored", "layoutConstraint", "metaData", "minutes", "month", "postValueOnSpin", "property", "readOnly", "renderOn", "renderTo", "seconds", "showSpinTrigger", "step", "style", "supportsDirtyFlag", "tags", "text", "tip", "trigger", "type", "userData", "visible", "width", "year" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"postValueOnSpin" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showSpinTrigger" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"step" : {
							"defaultValue" : "1"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"type" : {
							"defaultValue" : "time",
							"editorType" : "com.bstek.dorado.view.widget.form.DateTimeSpinnerType"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onTextEdit", "onValidationStateChange", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"Link" : {
				"category" : "Form",
				"label" : "Link",
				"icon" : "/com/bstek/dorado/view/widget/form/Link.png",
				"jsPrototype" : "dorado.widget.Link",
				"jsShortType" : "Link",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "href", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "target", "text", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"CustomSpinner" : {
				"category" : "Form",
				"label" : "CustomSpinner",
				"icon" : "/com/bstek/dorado/view/widget/form/CustomSpinner.png",
				"jsPrototype" : "dorado.widget.CustomSpinner",
				"jsShortType" : "CustomSpinner",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "pattern", "postValueOnSpin", "property", "readOnly", "renderOn", "renderTo", "showSpinTrigger", "step", "style", "supportsDirtyFlag", "tags", "text", "tip", "trigger", "userData", "value", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"postValueOnSpin" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showSpinTrigger" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"step" : {
							"defaultValue" : "1"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"text" : {
							"visible" : false
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onTextEdit", "onValidationStateChange", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"Tip" : {
				"category" : "Floatable",
				"label" : "Tip",
				"icon" : "/com/bstek/dorado/view/widget/base/Tip.png",
				"jsPrototype" : "dorado.widget.Tip",
				"jsShortType" : "Tip",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "align", "anchorTarget", "animateTarget", "animateType", "arrowAlign", "arrowDirection", "arrowOffset", "autoAdjustPosition", "caption", "center", "className", "closeable", "content", "continuedFocus", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "floating", "floatingClassName", "focusAfterShow", "handleOverflow", "height", "hideAnimateType", "hideMode", "icon", "ignored", "layoutConstraint", "left", "metaData", "modal", "modalType", "offsetLeft", "offsetTop", "renderOn", "renderTo", "shadowMode", "showAnimateType", "showDuration", "style", "tags", "text", "tip", "top", "userData", "vAlign", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAlign",
							"visible" : false
						},
						"anchorTarget" : {
							"visible" : false
						},
						"animateTarget" : {
							"visible" : false
						},
						"animateType" : {
							"defaultValue" : "fade",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"arrowAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.base.TipArrowAlign"
						},
						"arrowDirection" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.base.TipArrowDirection"
						},
						"autoAdjustPosition" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"center" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"closeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"continuedFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"floating" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"focusAfterShow" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"handleOverflow" : {
							"defaultValue" : "true",
							"editorType" : "boolean",
							"visible" : false
						},
						"hideAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"icon" : {
							"editorType" : "_editor_48"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"modalType" : {
							"editorType" : "com.bstek.dorado.view.widget.ModalType"
						},
						"shadowMode" : {
							"defaultValue" : "drop",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlShadowMode"
						},
						"showAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"text" : {
							"editorType" : "multilines"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vAlign" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlVAlign",
							"visible" : false
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforeShow", "beforeHide", "beforeClose", "onShow", "onClose", "onHide" ],
					"data" : [ ]
				}
			},
			"Label" : {
				"category" : "Form",
				"label" : "Label",
				"icon" : "/com/bstek/dorado/view/widget/form/Label.png",
				"jsPrototype" : "dorado.widget.Label",
				"jsShortType" : "Label",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "text", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"SubViewHolder" : {
				"category" : "General",
				"label" : "SubViewHolder",
				"icon" : "/com/bstek/dorado/view/widget/SubViewHolder.png",
				"jsPrototype" : "dorado.widget.SubViewHolder",
				"jsShortType" : "SubViewHolder",
				"positioned" : true,
				"dependsPackage" : "widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "subView", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"PlaceHolder" : {
				"category" : "Auxiliary",
				"label" : "PlaceHolder",
				"icon" : "/com/bstek/dorado/idesupport/icons/PlaceHolder.png",
				"properties" : {
					"names" : [ "id" ],
					"data" : { }
				}
			},
			"BindingConfig" : {
				"label" : "BindingConfig",
				"icon" : "/com/bstek/dorado/view/widget/tree/BindingConfig.png",
				"properties" : {
					"names" : [ "autoCheckChildren", "checkable", "checkedProperty", "childrenProperty", "expandLevel", "expandedIcon", "expandedIconClass", "expandedIconProperty", "hasChild", "hasChildProperty", "icon", "iconClass", "iconProperty", "ignored", "labelProperty", "name", "recursive", "tags", "tipProperty" ],
					"data" : {
						"autoCheckChildren" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"checkable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"recursive" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				},
				"children" : [ {
					"name" : "ChildBindingConfigs",
					"property" : "childBindingConfigs",
					"aggregated" : false,
					"memberRuleIDs" : [ "BindingConfig" ]
				} ]
			},
			"DockLayoutConstraint" : {
				"label" : "DockLayoutConstraint",
				"properties" : {
					"names" : [ "className", "padding", "type" ],
					"data" : {
						"type" : {
							"editorType" : "com.bstek.dorado.view.widget.layout.DockMode"
						}
					}
				}
			},
			"SimpleIconButton" : {
				"category" : "General",
				"label" : "SimpleIconButton",
				"icon" : "/com/bstek/dorado/view/widget/base/SimpleIconButton.png",
				"jsPrototype" : "dorado.widget.SimpleIconButton",
				"jsShortType" : "SimpleIconButton",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "action", "className", "disabled", "disabledClassName", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "hoverClassName", "icon", "iconClass", "ignored", "layoutConstraint", "menu", "metaData", "mouseDownClassName", "renderOn", "renderTo", "showTrigger", "style", "tags", "tip", "toggleOnShowMenu", "toggleable", "toggled", "toggledClassName", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"menu" : {
							"editorType" : "Menu:id"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showTrigger" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"toggleOnShowMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"toggleable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"toggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"IFrame" : {
				"category" : "General",
				"label" : "IFrame",
				"icon" : "/com/bstek/dorado/view/widget/base/IFrame.png",
				"jsPrototype" : "dorado.widget.IFrame",
				"jsShortType" : "IFrame",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "path", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onLoad" ],
					"data" : [ ]
				}
			},
			"YearMonthDropDown" : {
				"category" : "Trigger",
				"label" : "YearMonthDropDown",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/YearMonthDropDown.png",
				"jsPrototype" : "dorado.widget.YearMonthDropDown",
				"jsShortType" : "YearMonthDropDown",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "assignmentMap", "autoOpen", "buttonVisible", "editable", "height", "icon", "iconClass", "ignored", "maxHeight", "maxWidth", "metaData", "minHeight", "minWidth", "postValueOnSelect", "tags", "userData", "width" ],
					"data" : {
						"autoOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"postValueOnSelect" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute", "onOpen", "onValueSelect", "onClose" ],
					"data" : [ ]
				}
			},
			"DataSetDropDown" : {
				"category" : "Trigger",
				"label" : "DataSetDropDown",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/DataSetDropDown.png",
				"jsPrototype" : "dorado.widget.DataSetDropDown",
				"jsShortType" : "DataSetDropDown",
				"dependsPackage" : "base-widget,grid",
				"properties" : {
					"names" : [ "id", "listener", "assignmentMap", "autoOpen", "buttonVisible", "dataPath", "dataSet", "displayProperty", "dynaFilter", "editable", "filterMode", "filterOnOpen", "filterOnTyping", "height", "icon", "iconClass", "ignored", "maxHeight", "maxWidth", "metaData", "minFilterInterval", "minHeight", "minWidth", "postValueOnSelect", "property", "reloadDataOnOpen", "tags", "useDataBinding", "useEmptyItem", "userData", "width" ],
					"data" : {
						"autoOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"dynaFilter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"filterMode" : {
							"defaultValue" : "serverSide",
							"editorType" : "com.bstek.dorado.view.widget.form.trigger.FilterMode"
						},
						"filterOnOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"filterOnTyping" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"minFilterInterval" : {
							"defaultValue" : "300"
						},
						"postValueOnSelect" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"reloadDataOnOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"useDataBinding" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"useEmptyItem" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute", "onOpen", "onValueSelect", "onClose", "onFilterItems", "onFilterItem", "onGetBindingDataType", "onSetFilterParameter", "onGetBindingData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"RowNumColumn" : {
				"label" : "RowNumColumn",
				"icon" : "/com/bstek/dorado/view/widget/grid/RowNumColumn.png",
				"jsShortType" : "#",
				"properties" : {
					"names" : [ "align", "caption", "filterBarRenderer", "footerRenderer", "headerAlign", "headerRenderer", "ignored", "metaData", "name", "renderer", "resizeable", "supportsOptionMenu", "tags", "userData", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"headerAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"resizeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"supportsOptionMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onRenderHeaderCell", "onHeaderClick", "onGetCellEditor", "onRenderFooterCell", "onRenderCell" ],
					"data" : [ ]
				}
			},
			"Menu" : {
				"category" : "Floatable",
				"label" : "Menu",
				"icon" : "/com/bstek/dorado/view/widget/base/menu/Menu.png",
				"jsPrototype" : "dorado.widget.Menu",
				"jsShortType" : "Menu",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "align", "anchorTarget", "animateTarget", "animateType", "autoAdjustPosition", "center", "className", "continuedFocus", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "floating", "floatingClassName", "focusAfterShow", "handleOverflow", "height", "hideAnimateType", "hideMode", "iconPosition", "ignored", "layoutConstraint", "left", "metaData", "modal", "modalType", "offsetLeft", "offsetTop", "renderOn", "renderTo", "shadowMode", "showAnimateType", "style", "tags", "tip", "top", "userData", "vAlign", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAlign",
							"visible" : false
						},
						"anchorTarget" : {
							"visible" : false
						},
						"animateTarget" : {
							"visible" : false
						},
						"animateType" : {
							"defaultValue" : "zoom",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"autoAdjustPosition" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"center" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"continuedFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"floating" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"focusAfterShow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"handleOverflow" : {
							"defaultValue" : "true",
							"editorType" : "boolean",
							"visible" : false
						},
						"hideAnimateType" : {
							"defaultValue" : "fade",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"iconPosition" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.IconPosition"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"modalType" : {
							"editorType" : "com.bstek.dorado.view.widget.ModalType"
						},
						"shadowMode" : {
							"defaultValue" : "sides",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlShadowMode"
						},
						"showAnimateType" : {
							"defaultValue" : "slide",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vAlign" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlVAlign",
							"visible" : false
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforeShow", "beforeHide", "beforeClose", "onShow", "onClose", "onHideTopMenu", "onHide" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Items",
					"property" : "items",
					"aggregated" : false,
					"memberRuleIDs" : [ "CheckableMenuItem", "ControlMenuItem", "MenuItem", "Separator" ]
				} ]
			},
			"MenuButton" : {
				"category" : "ToolBar",
				"label" : "MenuButton",
				"icon" : "/com/bstek/dorado/view/widget/base/toolbar/MenuButton.png",
				"jsPrototype" : "dorado.widget.toolbar.ToolBarButton",
				"jsShortType" : "ToolBarButton",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "action", "caption", "className", "disabled", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMenuOnMouseLeave", "hideMenuOnMouseLeaveDelay", "hideMode", "icon", "iconClass", "ignored", "layoutConstraint", "menu", "metaData", "renderOn", "renderTo", "showMenuOnHover", "showTrigger", "splitButton", "style", "tags", "tip", "toggleOnShowMenu", "toggleable", "toggled", "triggerToggled", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMenuOnMouseLeave" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMenuOnMouseLeaveDelay" : {
							"defaultValue" : "300"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"menu" : {
							"editorType" : "Menu:id",
							"visible" : false,
							"deprecated" : true
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showMenuOnHover" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showTrigger" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"splitButton" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"toggleOnShowMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"toggleable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"toggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"triggerToggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTriggerClick" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Items",
					"property" : "items",
					"aggregated" : false,
					"memberRuleIDs" : [ "CheckableMenuItem", "ControlMenuItem", "MenuItem", "Separator" ]
				} ]
			},
			"Button" : {
				"category" : "General",
				"label" : "Button",
				"icon" : "/com/bstek/dorado/view/widget/base/Button.png",
				"jsPrototype" : "dorado.widget.Button",
				"jsShortType" : "Button",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "action", "caption", "className", "disabled", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "icon", "iconClass", "ignored", "layoutConstraint", "menu", "metaData", "renderOn", "renderTo", "showTrigger", "splitButton", "style", "tags", "tip", "toggleOnShowMenu", "toggleable", "toggled", "triggerToggled", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"menu" : {
							"editorType" : "Menu:id"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showTrigger" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"splitButton" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"toggleOnShowMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"toggleable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"toggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"triggerToggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"TabControl" : {
				"category" : "General",
				"label" : "TabControl",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/TabControl.png",
				"jsPrototype" : "dorado.widget.TabControl",
				"jsShortType" : "TabControl",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "alwaysShowNavButtons", "className", "currentTab", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "showMenuButton", "style", "tabMinWidth", "tabPlacement", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"alwaysShowNavButtons" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showMenuButton" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"tabPlacement" : {
							"defaultValue" : "top",
							"editorType" : "com.bstek.dorado.view.widget.base.tab.TabPlacement"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTabContextMenu", "beforeTabChange", "onTabChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "tabs",
					"property" : "tabs",
					"aggregated" : false,
					"memberRuleIDs" : [ "ControlTab", "IFrameTab" ]
				} ]
			},
			"RadioGroup" : {
				"category" : "Form",
				"label" : "RadioGroup",
				"icon" : "/com/bstek/dorado/view/widget/form/RadioGroup.png",
				"jsPrototype" : "dorado.widget.RadioGroup",
				"jsShortType" : "RadioGroup",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layout", "layoutConstraint", "metaData", "property", "readOnly", "renderOn", "renderTo", "style", "supportsDirtyFlag", "tags", "tip", "userData", "value", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"defaultValue" : "flow",
							"editorType" : "com.bstek.dorado.view.widget.form.RadioGroupLayout",
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onValueChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "RadioButtons",
					"property" : "radioButtons",
					"aggregated" : false,
					"memberRuleIDs" : [ "RadioButton" ]
				} ]
			},
			"ColumnGroup" : {
				"label" : "ColumnGroup",
				"icon" : "/com/bstek/dorado/view/widget/grid/ColumnGroup.png",
				"jsShortType" : "Group",
				"properties" : {
					"names" : [ "align", "caption", "headerAlign", "headerRenderer", "ignored", "metaData", "name", "supportsOptionMenu", "tags", "userData", "visible" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"headerAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"supportsOptionMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onRenderHeaderCell", "onHeaderClick", "onGetCellEditor" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"AjaxValidator" : {
				"label" : "AjaxValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.AjaxValidator",
				"jsShortType" : "Ajax",
				"properties" : {
					"names" : [ "type", "ajaxAction", "async", "defaultResultState", "executingMessage", "revalidateOldValue", "runAt", "service" ],
					"data" : {
						"type" : {
							"defaultValue" : "ajax",
							"visible" : false,
							"fixed" : true
						},
						"ajaxAction" : {
							"editorType" : "AjaxAction:id"
						},
						"async" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						}
					}
				},
				"events" : {
					"names" : [ "beforeExecute" ],
					"data" : [ ]
				}
			},
			"Tab" : {
				"label" : "Tab",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/Tab.png",
				"jsPrototype" : "dorado.widget.tab.Tab",
				"jsShortType" : "Tab",
				"properties" : {
					"names" : [ "caption", "className", "closeable", "disabled", "exClassName", "height", "icon", "ignored", "metaData", "name", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"closeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				}
			},
			"AutoFormElement" : {
				"category" : "AutoFormElement",
				"label" : "AutoFormElement",
				"labelProperties" : [ "id", "name", "property" ],
				"icon" : "/com/bstek/dorado/view/widget/form/autoform/AutoFormElement.png",
				"jsPrototype" : "dorado.widget.autoform.AutoFormElement",
				"jsShortType" : "Default",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "editable", "editorType", "editorWidth", "exClassName", "formProfile", "height", "hideMode", "hint", "hintPosition", "hintSpacing", "hintWidth", "ignored", "label", "labelAlign", "labelPosition", "labelSeparator", "labelSpacing", "labelWidth", "layoutConstraint", "metaData", "name", "property", "readOnly", "renderOn", "renderTo", "showHint", "showHintMessage", "showLabel", "style", "tags", "tip", "trigger", "type", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editorType" : {
							"editorType" : "_editor_55"
						},
						"formProfile" : {
							"editorType" : "FormProfile:id"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"hintPosition" : {
							"defaultValue" : "right",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementHintPosition"
						},
						"hintSpacing" : {
							"defaultValue" : "3"
						},
						"hintWidth" : {
							"defaultValue" : "22"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"labelAlign" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"labelPosition" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementLabelPosition"
						},
						"labelSeparator" : {
							"defaultValue" : ":"
						},
						"labelSpacing" : {
							"defaultValue" : "3"
						},
						"labelWidth" : {
							"defaultValue" : "80"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHint" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showHintMessage" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showLabel" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"type" : {
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementType",
							"visible" : false
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Editor",
					"property" : "editor",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "AutoFormElement/Wrapper.Editor" ]
				} ]
			},
			"ListDropDown" : {
				"category" : "Trigger",
				"label" : "ListDropDown",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/ListDropDown.png",
				"jsPrototype" : "dorado.widget.ListDropDown",
				"jsShortType" : "ListDropDown",
				"dependsPackage" : "base-widget,list",
				"properties" : {
					"names" : [ "id", "listener", "assignmentMap", "autoOpen", "buttonVisible", "displayProperty", "dynaFilter", "editable", "filterOnOpen", "filterOnTyping", "height", "icon", "iconClass", "ignored", "items", "maxHeight", "maxWidth", "metaData", "minFilterInterval", "minHeight", "minWidth", "postValueOnSelect", "property", "tags", "useEmptyItem", "userData", "width" ],
					"data" : {
						"autoOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"dynaFilter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"filterOnOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"filterOnTyping" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"items" : {
							"editorType" : "collection[any]"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"minFilterInterval" : {
							"defaultValue" : "300"
						},
						"postValueOnSelect" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"useEmptyItem" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute", "onOpen", "onValueSelect", "onClose", "onFilterItems", "onFilterItem" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"FormLayout" : {
				"label" : "FormLayout",
				"jsShortType" : "Form",
				"properties" : {
					"names" : [ "className", "colPadding", "cols", "padding", "rowHeight", "rowPadding", "stretchWidth" ],
					"data" : {
						"colPadding" : {
							"defaultValue" : "6"
						},
						"padding" : {
							"defaultValue" : "8"
						},
						"rowPadding" : {
							"defaultValue" : "6"
						},
						"stretchWidth" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				}
			},
			"AutoForm" : {
				"category" : "Form",
				"label" : "AutoForm",
				"icon" : "/com/bstek/dorado/view/widget/form/autoform/AutoForm.png",
				"jsPrototype" : "dorado.widget.AutoForm",
				"jsShortType" : "AutoForm",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "autoCreateElements", "className", "colPadding", "cols", "createOwnEntity", "createPrivateDataSet", "dataPath", "dataSet", "dataType", "dragTags", "draggable", "droppable", "droppableTags", "editorWidth", "exClassName", "formProfile", "height", "hideMode", "hintPosition", "hintSpacing", "hintWidth", "ignored", "labelAlign", "labelPosition", "labelSeparator", "labelSpacing", "labelWidth", "layoutConstraint", "metaData", "padding", "readOnly", "renderOn", "renderTo", "rowHeight", "rowPadding", "showHint", "showHintMessage", "showLabel", "stretchWidth", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"autoCreateElements" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"colPadding" : {
							"defaultValue" : "6"
						},
						"createOwnEntity" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"createPrivateDataSet" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"formProfile" : {
							"editorType" : "FormProfile:id"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"hintPosition" : {
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementHintPosition"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"labelAlign" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"labelPosition" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementLabelPosition"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"padding" : {
							"defaultValue" : "8"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"rowHeight" : {
							"defaultValue" : "22"
						},
						"rowPadding" : {
							"defaultValue" : "6"
						},
						"showHint" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showHintMessage" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showLabel" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"stretchWidth" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Elements",
					"property" : "elements",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "AutoFormElement" ]
				} ]
			},
			"DirectDataProvider" : {
				"label" : "DirectDataProvider",
				"icon" : "/com/bstek/dorado/data/provider/DirectDataProvider.png",
				"properties" : {
					"names" : [ "impl", "listener", "name", "overwrite", "parent", "scope", "type", "interceptor", "metaData", "parameter", "result" ],
					"data" : {
						"overwrite" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"scope" : {
							"editorType" : "com.bstek.dorado.core.bean.Scope"
						},
						"type" : {
							"defaultValue" : "direct",
							"visible" : false,
							"fixed" : true
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"parameter" : {
							"editorType" : "pojo"
						},
						"result" : {
							"editorType" : "pojo"
						}
					}
				}
			},
			"DataLabel" : {
				"category" : "Form",
				"label" : "DataLabel",
				"icon" : "/com/bstek/dorado/view/widget/form/DataLabel.png",
				"jsPrototype" : "dorado.widget.DataLabel",
				"jsShortType" : "DataLabel",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "property", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				}
			},
			"LayoutHolder" : {
				"label" : "LayoutHolder",
				"children" : [ {
					"name" : "anchor",
					"property" : "anchor",
					"aggregated" : false,
					"memberRuleIDs" : [ "AnchorLayout" ]
				}, {
					"name" : "dock",
					"property" : "dock",
					"aggregated" : false,
					"memberRuleIDs" : [ "DockLayout" ]
				}, {
					"name" : "hbox",
					"property" : "hbox",
					"aggregated" : false,
					"memberRuleIDs" : [ "HboxLayout" ]
				}, {
					"name" : "vbox",
					"property" : "vbox",
					"aggregated" : false,
					"memberRuleIDs" : [ "VboxLayout" ]
				}, {
					"name" : "form",
					"property" : "form",
					"aggregated" : false,
					"memberRuleIDs" : [ "FormLayout" ]
				}, {
					"name" : "native",
					"property" : "native",
					"aggregated" : false,
					"memberRuleIDs" : [ "NativeLayout" ]
				} ]
			},
			"ToolBar" : {
				"category" : "General",
				"label" : "ToolBar",
				"icon" : "/com/bstek/dorado/view/widget/base/toolbar/ToolBar.png",
				"jsPrototype" : "dorado.widget.ToolBar",
				"jsShortType" : "ToolBar",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "fixRight", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "showMenuOnHover", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"fixRight" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showMenuOnHover" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Items",
					"property" : "items",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "Button_1", "Fill", "Label_1", "MenuButton", "Separator_1" ]
				} ]
			},
			"DataTreeGrid" : {
				"category" : "Collection",
				"label" : "DataTreeGrid",
				"icon" : "/com/bstek/dorado/view/widget/treegrid/DataTreeGrid.png",
				"jsPrototype" : "dorado.widget.DataTreeGrid",
				"jsShortType" : "DataTreeGrid",
				"positioned" : true,
				"dependsPackage" : "tree-grid",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "autoCreateColumns", "cellRenderer", "className", "currentNodeDataPath", "dataPath", "dataSet", "dataType", "defaultExpandedIcon", "defaultExpandedIconClass", "defaultIcon", "defaultIconClass", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "dynaRowHeight", "exClassName", "expandingAnimated", "expandingMode", "fixedColumnCount", "footerRenderer", "footerRowHeight", "headerRenderer", "headerRowHeight", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "indent", "layoutConstraint", "metaData", "readOnly", "renderOn", "renderTo", "rowHeight", "rowRenderer", "scrollMode", "selectionMode", "showFooter", "showHeader", "showLines", "stretchColumnsMode", "style", "tags", "tip", "treeColumn", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "onItem",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dynaRowHeight" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"expandingAnimated" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"expandingMode" : {
							"defaultValue" : "async",
							"editorType" : "com.bstek.dorado.view.widget.tree.ExpandingMode"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"showFooter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHeader" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showLines" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"stretchColumnsMode" : {
							"defaultValue" : "stretchableColumns",
							"editorType" : "com.bstek.dorado.view.widget.grid.StretchColumnsMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onRenderHeaderCell", "onHeaderClick", "beforeCellValueEdit", "onRenderFooterCell", "onRenderRow", "onRenderCell", "onCellValueEdit", "onGetCellEditor", "onNodeCheckedChange", "onRenderNode", "onExpand", "beforeCollapse", "onCollapse", "beforeExpand", "onNodeDetached", "beforeNodeCheckedChange", "onNodeAttached", "beforeDataNodeCreate", "onGetBindingDataType", "onDataNodeCreate", "onGetBindingData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "BindingConfigs",
					"property" : "bindingConfigs",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "DataTreeGrid/Wrapper.BindingConfigs" ]
				}, {
					"name" : "Columns",
					"property" : "columns",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "DataTreeGrid/Wrapper.Columns" ]
				} ]
			},
			"DateDropDown" : {
				"category" : "Trigger",
				"label" : "DateDropDown",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/DateDropDown.png",
				"jsPrototype" : "dorado.widget.DateDropDown",
				"jsShortType" : "DateDropDown",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "assignmentMap", "autoOpen", "buttonVisible", "editable", "height", "icon", "iconClass", "ignored", "maxHeight", "maxWidth", "metaData", "minHeight", "minWidth", "postValueOnSelect", "showTimeSpinner", "tags", "userData", "width" ],
					"data" : {
						"autoOpen" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"postValueOnSelect" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showTimeSpinner" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute", "onOpen", "onValueSelect", "onClose" ],
					"data" : [ ]
				}
			},
			"VerticalTabControl" : {
				"category" : "General",
				"label" : "VerticalTabControl",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/VerticalTabControl.png",
				"jsPrototype" : "dorado.widget.VerticalTabControl",
				"jsShortType" : "VerticalTabControl",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "alwaysShowNavButtons", "className", "currentTab", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tabColumnWidth", "tabPlacement", "tags", "tip", "userData", "verticalText", "visible", "width" ],
					"data" : {
						"alwaysShowNavButtons" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"tabColumnWidth" : {
							"defaultValue" : "200"
						},
						"tabPlacement" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.base.tab.VerticalTabPlacement"
						},
						"userData" : {
							"editorType" : "any"
						},
						"verticalText" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTabContextMenu", "beforeTabChange", "onTabChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "tabs",
					"property" : "tabs",
					"aggregated" : false,
					"memberRuleIDs" : [ "ControlTab", "IFrameTab" ]
				} ]
			},
			"TreeGrid" : {
				"category" : "Collection",
				"label" : "TreeGrid",
				"icon" : "/com/bstek/dorado/view/widget/treegrid/TreeGrid.png",
				"jsPrototype" : "dorado.widget.TreeGrid",
				"jsShortType" : "TreeGrid",
				"positioned" : true,
				"dependsPackage" : "tree-grid",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "cellRenderer", "className", "defaultExpandedIcon", "defaultExpandedIconClass", "defaultIcon", "defaultIconClass", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "dynaRowHeight", "exClassName", "expandingAnimated", "expandingMode", "fixedColumnCount", "footerRenderer", "footerRowHeight", "headerRenderer", "headerRowHeight", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "indent", "layoutConstraint", "metaData", "readOnly", "renderOn", "renderTo", "rowHeight", "rowRenderer", "scrollMode", "selectionMode", "showFooter", "showHeader", "showLines", "stretchColumnsMode", "style", "tags", "tip", "treeColumn", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "onItem",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dynaRowHeight" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"expandingAnimated" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"expandingMode" : {
							"defaultValue" : "async",
							"editorType" : "com.bstek.dorado.view.widget.tree.ExpandingMode"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"showFooter" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHeader" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showLines" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"stretchColumnsMode" : {
							"defaultValue" : "stretchableColumns",
							"editorType" : "com.bstek.dorado.view.widget.grid.StretchColumnsMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onRenderHeaderCell", "onHeaderClick", "beforeCellValueEdit", "onRenderFooterCell", "onRenderRow", "onRenderCell", "onCellValueEdit", "onGetCellEditor", "onNodeCheckedChange", "onRenderNode", "onExpand", "beforeCollapse", "onCollapse", "beforeExpand", "onNodeDetached", "beforeNodeCheckedChange", "onNodeAttached" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "TreeGrid/Wrapper.Columns" ]
				}, {
					"name" : "Nodes",
					"property" : "nodes",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "TreeGrid/Wrapper.Nodes" ]
				} ]
			},
			"DataTree" : {
				"category" : "Collection",
				"label" : "DataTree",
				"icon" : "/com/bstek/dorado/view/widget/tree/DataTree.png",
				"jsPrototype" : "dorado.widget.DataTree",
				"jsShortType" : "DataTree",
				"positioned" : true,
				"dependsPackage" : "tree",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "className", "currentNodeDataPath", "dataPath", "dataSet", "defaultExpandedIcon", "defaultExpandedIconClass", "defaultIcon", "defaultIconClass", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "exClassName", "expandingAnimated", "expandingMode", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "indent", "layoutConstraint", "metaData", "renderOn", "renderTo", "renderer", "rowHeight", "scrollMode", "selectionMode", "showLines", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "onItem",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"expandingAnimated" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"expandingMode" : {
							"defaultValue" : "async",
							"editorType" : "com.bstek.dorado.view.widget.tree.ExpandingMode"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"showLines" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onNodeCheckedChange", "onRenderNode", "beforeCurrentChange", "onExpand", "beforeCollapse", "onCollapse", "beforeExpand", "onNodeDetached", "beforeNodeCheckedChange", "onNodeAttached", "beforeDataNodeCreate", "onGetBindingDataType", "onDataNodeCreate", "onGetBindingData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "BindingConfigs",
					"property" : "bindingConfigs",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "DataTree/Wrapper.BindingConfigs" ]
				} ]
			},
			"TabBar" : {
				"category" : "General",
				"label" : "TabBar",
				"icon" : "/com/bstek/dorado/view/widget/base/tab/TabBar.png",
				"jsPrototype" : "dorado.widget.TabBar",
				"jsShortType" : "TabBar",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "alwaysShowNavButtons", "className", "currentTab", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "showMenuButton", "style", "tabMinWidth", "tabPlacement", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"alwaysShowNavButtons" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"showMenuButton" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"tabPlacement" : {
							"defaultValue" : "top",
							"editorType" : "com.bstek.dorado.view.widget.base.tab.TabPlacement"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onTabContextMenu", "beforeTabChange", "onTabChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "tabs",
					"property" : "tabs",
					"aggregated" : false,
					"memberRuleIDs" : [ "Tab" ]
				} ]
			},
			"Reference" : {
				"label" : "Reference",
				"icon" : "/com/bstek/dorado/data/type/property/Reference.png",
				"jsPrototype" : "dorado.Reference",
				"jsShortType" : "Reference",
				"properties" : {
					"names" : [ "name", "acceptUnknownMapKey", "activeAtClient", "activeOnNewEntity", "cacheMode", "dataProvider", "dataType", "defaultValue", "displayFormat", "ignored", "label", "mapping", "metaData", "pageSize", "parameter", "readOnly", "required", "submittable", "tags", "userData", "visible" ],
					"data" : {
						"acceptUnknownMapKey" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"activeAtClient" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"activeOnNewEntity" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"cacheMode" : {
							"defaultValue" : "bothSides",
							"editorType" : "com.bstek.dorado.data.type.property.CacheMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"mapping" : {
							"properties" : {
								"names" : [ "keyProperty", "mapValues", "valueProperty" ],
								"data" : {
									"mapValues" : {
										"editorType" : "collection[pojo]"
									}
								}
							}
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"parameter" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"required" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"submittable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onGetText", "onGet", "onSet", "onValidate", "onLoadData", "beforeLoadData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Validators",
					"property" : "validators",
					"aggregated" : false,
					"memberRuleIDs" : [ "RequiredValidator", "LengthValidator", "CharLengthValidator", "RangeValidator", "EnumValidator", "RegExpValidator", "AjaxValidator", "CustomValidator" ]
				} ]
			},
			"SimpleButton" : {
				"category" : "General",
				"label" : "SimpleButton",
				"icon" : "/com/bstek/dorado/view/widget/base/SimpleButton.png",
				"jsPrototype" : "dorado.widget.SimpleButton",
				"jsShortType" : "SimpleButton",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "action", "className", "disabled", "disabledClassName", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "hoverClassName", "ignored", "layoutConstraint", "menu", "metaData", "mouseDownClassName", "renderOn", "renderTo", "style", "tags", "tip", "toggleOnShowMenu", "toggleable", "toggled", "toggledClassName", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"menu" : {
							"editorType" : "Menu:id"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"toggleOnShowMenu" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"toggleable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"toggled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"DataPilot" : {
				"category" : "General",
				"label" : "DataPilot",
				"icon" : "/com/bstek/dorado/view/widget/datacontrol/DataPilot.png",
				"jsPrototype" : "dorado.widget.DataPilot",
				"jsShortType" : "DataPilot",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "itemCodes", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"itemCodes" : {
							"editorType" : "_editor_61"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onGetBindingDataType", "onGetBindingData", "onSubControlAction", "onSubControlRefresh" ],
					"data" : [ ]
				}
			},
			"Import" : {
				"category" : "Auxiliary",
				"label" : "Import",
				"icon" : "/com/bstek/dorado/idesupport/icons/Import.png",
				"properties" : {
					"names" : [ "id", "src" ],
					"data" : { }
				}
			},
			"CheckableMenuItem" : {
				"label" : "CheckableMenuItem",
				"icon" : "/com/bstek/dorado/view/widget/base/menu/CheckableMenuItem.png",
				"jsPrototype" : "dorado.widget.menu.CheckableMenuItem",
				"jsShortType" : "Checkable",
				"properties" : {
					"names" : [ "action", "caption", "checked", "className", "disabled", "exClassName", "group", "height", "hideOnClick", "icon", "iconClass", "ignored", "name", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"checked" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideOnClick" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onClick", "onCheckedChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Items",
					"property" : "items",
					"aggregated" : false,
					"memberRuleIDs" : [ "CheckableMenuItem", "ControlMenuItem", "MenuItem", "Separator" ]
				} ]
			},
			"Accordion" : {
				"category" : "General",
				"label" : "Accordion",
				"icon" : "/com/bstek/dorado/view/widget/base/accordion/Accordion.png",
				"jsPrototype" : "dorado.widget.Accordion",
				"jsShortType" : "Accordion",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "animate", "className", "currentSection", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"animate" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforeCurrentSectionChange", "onCurrentSectionChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Sections",
					"property" : "sections",
					"aggregated" : false,
					"memberRuleIDs" : [ "Section" ]
				} ]
			},
			"VboxLayoutConstraint" : {
				"label" : "VBoxLayoutConstraintSupport",
				"properties" : {
					"names" : [ "align", "className", "padding" ],
					"data" : {
						"align" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						}
					}
				}
			},
			"NumberSpinner" : {
				"category" : "Form",
				"label" : "NumberSpinner",
				"icon" : "/com/bstek/dorado/view/widget/form/NumberSpinner.png",
				"jsPrototype" : "dorado.widget.NumberSpinner",
				"jsShortType" : "NumberSpinner",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "max", "metaData", "min", "postValueOnSpin", "property", "readOnly", "renderOn", "renderTo", "selectTextOnFocus", "showSpinTrigger", "step", "style", "supportsDirtyFlag", "tags", "text", "tip", "trigger", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"max" : {
							"defaultValue" : "2147483647"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"min" : {
							"defaultValue" : "-2147483648"
						},
						"postValueOnSpin" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"selectTextOnFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showSpinTrigger" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"step" : {
							"defaultValue" : "1"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onTextEdit", "onValidationStateChange", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"NativeLayout" : {
				"label" : "NativeLayout",
				"jsShortType" : "Native",
				"properties" : {
					"names" : [ "className", "padding", "style" ],
					"data" : { }
				}
			},
			"TextArea" : {
				"category" : "Form",
				"label" : "TextArea",
				"icon" : "/com/bstek/dorado/view/widget/form/TextArea.png",
				"jsPrototype" : "dorado.widget.TextArea",
				"jsShortType" : "TextArea",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "blankText", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "editable", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "maxLength", "metaData", "minLength", "property", "readOnly", "renderOn", "renderTo", "required", "selectTextOnFocus", "style", "supportsDirtyFlag", "tags", "text", "tip", "trigger", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"required" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"selectTextOnFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"text" : {
							"editorType" : "multilines"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onTextEdit", "onValidationStateChange", "onTriggerClick" ],
					"data" : [ ]
				}
			},
			"Separator_1" : {
				"category" : "ToolBar",
				"label" : "Separator",
				"icon" : "/com/bstek/dorado/view/widget/base/toolbar/Separator.png",
				"jsPrototype" : "dorado.widget.toolbar.Separator",
				"jsShortType" : "Separator",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"Slider" : {
				"category" : "General",
				"label" : "Slider",
				"icon" : "/com/bstek/dorado/view/widget/base/Slider.png",
				"jsPrototype" : "dorado.widget.Slider",
				"jsShortType" : "Slider",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "maxValue", "metaData", "minValue", "orientation", "precision", "renderOn", "renderTo", "step", "style", "tags", "tip", "userData", "value", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"maxValue" : {
							"defaultValue" : "100"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"orientation" : {
							"defaultValue" : "horizental",
							"editorType" : "com.bstek.dorado.view.widget.Orientation"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforeValueChange", "onValueChange" ],
					"data" : [ ]
				}
			},
			"FormLayoutConstraint" : {
				"label" : "FormLayoutConstraint",
				"properties" : {
					"names" : [ "align", "className", "colSpan", "padding", "rowSpan", "vAlign" ],
					"data" : {
						"align" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"vAlign" : {
							"defaultValue" : "top",
							"editorType" : "com.bstek.dorado.view.widget.VerticalAlign"
						}
					}
				}
			},
			"Trigger" : {
				"category" : "Trigger",
				"label" : "Trigger",
				"icon" : "/com/bstek/dorado/view/widget/form/trigger/Trigger.png",
				"jsPrototype" : "dorado.widget.Trigger",
				"jsShortType" : "Trigger",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "buttonVisible", "editable", "icon", "iconClass", "ignored", "metaData", "tags", "userData" ],
					"data" : {
						"buttonVisible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"iconClass" : {
							"editorType" : "_editor_7"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "beforeExecute", "onExecute" ],
					"data" : [ ]
				}
			},
			"AjaxAction" : {
				"category" : "Action",
				"label" : "AjaxAction",
				"icon" : "/com/bstek/dorado/view/widget/action/AjaxAction.png",
				"jsPrototype" : "dorado.widget.AjaxAction",
				"jsShortType" : "AjaxAction",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "async", "batchable", "caption", "confirmMessage", "disabled", "executingMessage", "hotkey", "icon", "iconClass", "ignored", "metaData", "modal", "parameter", "service", "successMessage", "supportsEntity", "tags", "timeout", "tip", "userData" ],
					"data" : {
						"async" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"batchable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hotkey" : {
							"editorType" : "_editor_15"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"modal" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"parameter" : {
							"editorType" : "any"
						},
						"supportsEntity" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onFailure", "onSuccess", "beforeExecute", "onExecute" ],
					"data" : [ ]
				}
			},
			"Label_1" : {
				"category" : "ToolBar",
				"label" : "Label",
				"icon" : "/com/bstek/dorado/view/widget/base/toolbar/Label.png",
				"jsPrototype" : "dorado.widget.toolbar.ToolBarLabel",
				"jsShortType" : "ToolBarLabel",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "text", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"CheckBox" : {
				"category" : "Form",
				"label" : "CheckBox",
				"icon" : "/com/bstek/dorado/view/widget/form/CheckBox.png",
				"jsPrototype" : "dorado.widget.CheckBox",
				"jsShortType" : "CheckBox",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "caption", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "mixedValue", "offValue", "onValue", "property", "readOnly", "renderOn", "renderTo", "style", "supportsDirtyFlag", "tags", "tip", "triState", "userData", "value", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"offValue" : {
							"defaultValue" : "false"
						},
						"onValue" : {
							"defaultValue" : "true"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"supportsDirtyFlag" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"triState" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						},
						"value" : {
							"defaultValue" : "false"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "beforePost", "onPost", "onPostFailed", "onGetBindingDataType", "onGetBindingData", "onValueChange" ],
					"data" : [ ]
				}
			},
			"Fill" : {
				"category" : "ToolBar",
				"label" : "Fill",
				"icon" : "/com/bstek/dorado/view/widget/base/toolbar/Fill.png",
				"jsPrototype" : "dorado.widget.toolbar.Fill",
				"jsShortType" : "Fill",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				}
			},
			"DataBlockView" : {
				"category" : "Collection",
				"label" : "DataBlockView",
				"icon" : "/com/bstek/dorado/view/widget/blockview/DataBlockView.png",
				"jsPrototype" : "dorado.widget.DataBlockView",
				"jsShortType" : "DataBlockView",
				"positioned" : true,
				"dependsPackage" : "block-view",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "blockDecoratorSize", "blockHeight", "blockLayout", "blockWidth", "className", "dataPath", "dataSet", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "exClassName", "fillLine", "height", "hideMode", "horiPadding", "horiSpacing", "ignored", "layoutConstraint", "lineSize", "metaData", "renderOn", "renderTo", "renderer", "scrollMode", "selectionMode", "style", "tags", "tip", "userData", "vertPadding", "vertSpacing", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"blockDecoratorSize" : {
							"defaultValue" : "4"
						},
						"blockHeight" : {
							"defaultValue" : "80"
						},
						"blockLayout" : {
							"defaultValue" : "vertical",
							"editorType" : "com.bstek.dorado.view.widget.blockview.BlockLayout"
						},
						"blockWidth" : {
							"defaultValue" : "80"
						},
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "insertItems",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"fillLine" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"horiPadding" : {
							"defaultValue" : "8"
						},
						"horiSpacing" : {
							"defaultValue" : "8"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vertPadding" : {
							"defaultValue" : "8"
						},
						"vertSpacing" : {
							"defaultValue" : "8"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onRenderBlock", "onBlockMouseDown", "onBlockDoubleClick", "onBlockMouseUp", "onBlockClick", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				}
			},
			"BlockView" : {
				"category" : "Collection",
				"label" : "BlockView",
				"icon" : "/com/bstek/dorado/view/widget/blockview/BlockView.png",
				"jsPrototype" : "dorado.widget.BlockView",
				"jsShortType" : "BlockView",
				"positioned" : true,
				"dependsPackage" : "block-view",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "blockDecoratorSize", "blockHeight", "blockLayout", "blockWidth", "className", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "exClassName", "fillLine", "height", "hideMode", "horiPadding", "horiSpacing", "ignored", "items", "layoutConstraint", "lineSize", "metaData", "renderOn", "renderTo", "renderer", "scrollMode", "selectionMode", "style", "tags", "tip", "userData", "vertPadding", "vertSpacing", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"blockDecoratorSize" : {
							"defaultValue" : "4"
						},
						"blockHeight" : {
							"defaultValue" : "80"
						},
						"blockLayout" : {
							"defaultValue" : "vertical",
							"editorType" : "com.bstek.dorado.view.widget.blockview.BlockLayout"
						},
						"blockWidth" : {
							"defaultValue" : "80"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "insertItems",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"fillLine" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"horiPadding" : {
							"defaultValue" : "8"
						},
						"horiSpacing" : {
							"defaultValue" : "8"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"items" : {
							"editorType" : "collection[any]"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vertPadding" : {
							"defaultValue" : "8"
						},
						"vertSpacing" : {
							"defaultValue" : "8"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onRenderBlock", "onBlockMouseDown", "onBlockDoubleClick", "onBlockMouseUp", "onBlockClick" ],
					"data" : [ ]
				}
			},
			"MockDataSet" : {
				"category" : "General",
				"label" : "MockDataSet",
				"icon" : "/com/bstek/dorado/view/widget/data/DataSet.png",
				"jsPrototype" : "dorado.widget.DataSet",
				"jsShortType" : "DataSet",
				"dependsPackage" : "widget",
				"properties" : {
					"names" : [ "id", "listener", "cacheable", "dataProvider", "dataType", "ignored", "loadMode", "metaData", "pageSize", "parameter", "readOnly", "tags", "userData" ],
					"data" : {
						"cacheable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"loadMode" : {
							"defaultValue" : "lazy",
							"editorType" : "com.bstek.dorado.view.widget.data.LoadMode"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"parameter" : {
							"editorType" : "any"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onLoadData", "onDataLoad", "beforeLoadData" ],
					"data" : [ {
						"onLoadData" : {
							"deprecated" : true
						}
					} ]
				}
			},
			"Container" : {
				"category" : "General",
				"label" : "Container",
				"icon" : "/com/bstek/dorado/view/widget/Container.png",
				"jsPrototype" : "dorado.widget.Container",
				"jsShortType" : "Container",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "contentOverflow", "contentOverflowX", "contentOverflowY", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layout", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "Panel", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"YearMonthPicker" : {
				"category" : "General",
				"label" : "YearMonthPicker",
				"icon" : "/com/bstek/dorado/view/widget/base/YearMonthPicker.png",
				"jsPrototype" : "dorado.widget.YearMonthPicker",
				"jsShortType" : "YearMonthPicker",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layoutConstraint", "metaData", "month", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width", "year" ],
					"data" : {
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onPick", "onCancel" ],
					"data" : [ ]
				}
			},
			"DockLayout" : {
				"label" : "DockLayout",
				"jsShortType" : "Dock",
				"properties" : {
					"names" : [ "className", "padding", "regionPadding" ],
					"data" : { }
				}
			},
			"HboxLayoutConstraint" : {
				"label" : "HBoxLayoutConstraintSupport",
				"properties" : {
					"names" : [ "align", "className", "padding" ],
					"data" : {
						"align" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.VerticalAlign"
						}
					}
				}
			},
			"FormProfile" : {
				"category" : "Form",
				"label" : "FormProfile",
				"icon" : "/com/bstek/dorado/view/widget/form/FormProfile.png",
				"jsPrototype" : "dorado.widget.FormProfile",
				"jsShortType" : "FormProfile",
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "editorWidth", "exClassName", "height", "hintPosition", "hintSpacing", "hintWidth", "ignored", "labelAlign", "labelPosition", "labelSeparator", "labelSpacing", "labelWidth", "metaData", "readOnly", "showHint", "showHintMessage", "showLabel", "tags", "trigger", "type", "userData", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"hintPosition" : {
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementHintPosition"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"labelAlign" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"labelPosition" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementLabelPosition"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHint" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showHintMessage" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showLabel" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"type" : {
							"defaultValue" : "text",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementType"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange" ],
					"data" : [ ]
				}
			},
			"RadioButton" : {
				"label" : "RadioButton",
				"icon" : "/com/bstek/dorado/view/widget/form/RadioButton.png",
				"properties" : {
					"names" : [ "readOnly", "text", "value" ],
					"data" : {
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						}
					}
				}
			},
			"Dialog" : {
				"category" : "Floatable",
				"label" : "Dialog",
				"icon" : "/com/bstek/dorado/view/widget/base/Dialog.png",
				"jsPrototype" : "dorado.widget.Dialog",
				"jsShortType" : "Dialog",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "align", "anchorTarget", "animateTarget", "animateType", "autoAdjustPosition", "background", "border", "buttonAlign", "caption", "center", "className", "closeAction", "closeable", "collapseable", "collapsed", "contentOverflow", "contentOverflowX", "contentOverflowY", "continuedFocus", "dragOutside", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "floating", "floatingClassName", "focusAfterShow", "handleOverflow", "height", "hideAnimateType", "hideMode", "icon", "iconClass", "ignored", "layout", "layoutConstraint", "left", "maximizeable", "maximized", "metaData", "minHeight", "minWidth", "minimizeable", "minimized", "modal", "modalType", "offsetLeft", "offsetTop", "renderOn", "renderTo", "resizeable", "shadowMode", "showAnimateType", "showCaptionBar", "style", "tags", "tip", "top", "userData", "vAlign", "visible", "width" ],
					"data" : {
						"align" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAlign",
							"visible" : false
						},
						"anchorTarget" : {
							"visible" : false
						},
						"animateTarget" : {
							"visible" : false
						},
						"animateType" : {
							"defaultValue" : "zoom",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"autoAdjustPosition" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"border" : {
							"defaultValue" : "normal",
							"editorType" : "com.bstek.dorado.view.widget.base.PanelBorder"
						},
						"buttonAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"center" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"closeAction" : {
							"defaultValue" : "hide",
							"editorType" : "com.bstek.dorado.view.widget.base.CloseAction"
						},
						"closeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"collapseable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"collapsed" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"continuedFocus" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"dragOutside" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"draggable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"floating" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"focusAfterShow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"handleOverflow" : {
							"defaultValue" : "true",
							"editorType" : "boolean",
							"visible" : false
						},
						"hideAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"maximizeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"maximized" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"minimizeable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"minimized" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"modal" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"modalType" : {
							"editorType" : "com.bstek.dorado.view.widget.ModalType"
						},
						"resizeable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"shadowMode" : {
							"defaultValue" : "frame",
							"editorType" : "com.bstek.dorado.view.widget.FloatControlShadowMode"
						},
						"showAnimateType" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlAnimateType"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						},
						"vAlign" : {
							"editorType" : "com.bstek.dorado.view.widget.FloatControlVAlign",
							"visible" : false
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onCollapsedChange", "beforeCollapsedChange", "onMaximize", "beforeMaximize", "beforeShow", "beforeHide", "beforeClose", "onShow", "onClose", "onHide", "onMinimize", "beforeMinimize" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "Dialog/Wrapper.Buttons" ]
				}, {
					"name" : "Children",
					"property" : "children",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "Dialog/Wrapper.Children" ]
				}, {
					"name" : "Tools",
					"property" : "tools",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "Dialog/Wrapper.Tools" ]
				} ]
			},
			"FieldSet" : {
				"category" : "General",
				"label" : "FieldSet",
				"icon" : "/com/bstek/dorado/view/widget/base/FieldSet.png",
				"jsPrototype" : "dorado.widget.FieldSet",
				"jsShortType" : "FieldSet",
				"layoutable" : true,
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "buttonAlign", "caption", "className", "collapseable", "collapsed", "contentOverflow", "contentOverflowX", "contentOverflowY", "dragTags", "draggable", "droppable", "droppableTags", "exClassName", "height", "hideMode", "ignored", "layout", "layoutConstraint", "metaData", "renderOn", "renderTo", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"buttonAlign" : {
							"defaultValue" : "center",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"collapseable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"collapsed" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"contentOverflow" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowX" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"contentOverflowY" : {
							"editorType" : "com.bstek.dorado.view.widget.Overflow"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"layout" : {
							"visible" : false
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onCollapsedChange", "beforeCollapsedChange" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "FieldSet/Wrapper.Buttons" ]
				}, {
					"name" : "Children",
					"property" : "children",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberRuleIDs" : [ "FieldSet/Wrapper.Children" ]
				} ]
			},
			"AnchorLayoutConstraint" : {
				"label" : "AnchorLayoutConstraint",
				"properties" : {
					"names" : [ "anchorBottom", "anchorLeft", "anchorRight", "anchorTop", "bottom", "className", "heightOffset", "left", "leftOffset", "padding", "right", "top", "topOffset", "widthOffset" ],
					"data" : {
						"anchorBottom" : {
							"editorType" : "com.bstek.dorado.view.widget.layout.AnchorMode"
						},
						"anchorLeft" : {
							"editorType" : "com.bstek.dorado.view.widget.layout.AnchorMode"
						},
						"anchorRight" : {
							"editorType" : "com.bstek.dorado.view.widget.layout.AnchorMode"
						},
						"anchorTop" : {
							"editorType" : "com.bstek.dorado.view.widget.layout.AnchorMode"
						}
					}
				}
			},
			"RangeValidator" : {
				"label" : "RangeValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.RangeValidator",
				"jsShortType" : "Range",
				"properties" : {
					"names" : [ "type", "defaultResultState", "maxValue", "maxValueValidateMode", "minValue", "minValueValidateMode", "resultMessage", "revalidateOldValue", "runAt" ],
					"data" : {
						"type" : {
							"defaultValue" : "range",
							"visible" : false,
							"fixed" : true
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"maxValueValidateMode" : {
							"editorType" : "com.bstek.dorado.view.type.property.validator.RangeValidateMode"
						},
						"minValueValidateMode" : {
							"editorType" : "com.bstek.dorado.view.type.property.validator.RangeValidateMode"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						}
					}
				}
			},
			"Section" : {
				"label" : "Section",
				"icon" : "/com/bstek/dorado/view/widget/base/accordion/Section.png",
				"jsPrototype" : "dorado.widget.accordion.Section",
				"jsShortType" : "Section",
				"properties" : {
					"names" : [ "caption", "className", "disabled", "exClassName", "icon", "iconClass", "ignored", "name", "style", "tags", "tip", "visible" ],
					"data" : {
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onCaptionClick" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Control",
					"property" : "control",
					"aggregated" : false,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"ListBox" : {
				"category" : "Collection",
				"label" : "ListBox",
				"icon" : "/com/bstek/dorado/view/widget/list/ListBox.png",
				"jsPrototype" : "dorado.widget.ListBox",
				"jsShortType" : "ListBox",
				"positioned" : true,
				"dependsPackage" : "list",
				"properties" : {
					"names" : [ "id", "listener", "allowNoCurrent", "className", "dragMode", "dragTags", "draggable", "dropMode", "droppable", "droppableTags", "exClassName", "height", "hideMode", "highlightCurrentRow", "highlightHoverRow", "highlightSelectedRow", "ignored", "items", "layoutConstraint", "metaData", "property", "renderOn", "renderTo", "renderer", "rowHeight", "scrollMode", "selectionMode", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"allowNoCurrent" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dragMode" : {
							"defaultValue" : "item",
							"editorType" : "com.bstek.dorado.view.widget.list.DragMode"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"dropMode" : {
							"defaultValue" : "insertItems",
							"editorType" : "com.bstek.dorado.view.widget.list.DropMode"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"highlightCurrentRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightHoverRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"highlightSelectedRow" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"items" : {
							"editorType" : "collection[any]"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"scrollMode" : {
							"defaultValue" : "lazyRender",
							"editorType" : "com.bstek.dorado.view.widget.list.ScrollMode"
						},
						"selectionMode" : {
							"defaultValue" : "none",
							"editorType" : "com.bstek.dorado.view.widget.list.SelectionMode"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onSelectionChange", "onCurrentChange", "beforeSelectionChange", "onCompareItems", "onFilterItem", "onDataRowClick", "onDataRowDoubleClick", "onRenderRow" ],
					"data" : [ ]
				}
			},
			"MenuItem" : {
				"label" : "MenuItem",
				"icon" : "/com/bstek/dorado/view/widget/base/menu/MenuItem.png",
				"jsPrototype" : "dorado.widget.menu.MenuItem",
				"jsShortType" : "Default",
				"properties" : {
					"names" : [ "action", "caption", "className", "disabled", "exClassName", "height", "hideOnClick", "icon", "iconClass", "ignored", "name", "style", "tags", "tip", "userData", "visible", "width" ],
					"data" : {
						"action" : {
							"editorType" : "Action:id"
						},
						"disabled" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"hideOnClick" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"visible" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				},
				"events" : {
					"names" : [ "onClick" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Items",
					"property" : "items",
					"aggregated" : false,
					"memberRuleIDs" : [ "CheckableMenuItem", "ControlMenuItem", "MenuItem", "Separator" ]
				} ]
			},
			"RequiredValidator" : {
				"label" : "RequiredValidator",
				"icon" : "/com/bstek/dorado/view/type/property/validator/Validator.png",
				"jsPrototype" : "dorado.validator.RequiredValidator",
				"jsShortType" : "Required",
				"properties" : {
					"names" : [ "type", "acceptZeroOrFalse", "defaultResultState", "resultMessage", "revalidateOldValue", "runAt", "trimBeforeValid" ],
					"data" : {
						"type" : {
							"defaultValue" : "required",
							"visible" : false,
							"fixed" : true
						},
						"acceptZeroOrFalse" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"defaultResultState" : {
							"defaultValue" : "error",
							"editorType" : "com.bstek.dorado.data.type.validator.MessageState"
						},
						"revalidateOldValue" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"runAt" : {
							"defaultValue" : "client",
							"editorType" : "com.bstek.dorado.view.RunAt"
						},
						"trimBeforeValid" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						}
					}
				}
			},
			"Auxiliary" : {
				"label" : "Auxiliary",
				"children" : [ {
					"name" : "Import",
					"property" : "import",
					"aggregated" : false,
					"memberRuleIDs" : [ "Import" ]
				}, {
					"name" : "GroupStart",
					"property" : "groupStart",
					"aggregated" : false,
					"memberRuleIDs" : [ "GroupStart" ]
				}, {
					"name" : "GroupEnd",
					"property" : "groupEnd",
					"aggregated" : false,
					"memberRuleIDs" : [ "GroupEnd" ]
				}, {
					"name" : "PlaceHolder",
					"property" : "placeHolder",
					"aggregated" : false,
					"memberRuleIDs" : [ "PlaceHolder", "PlaceHolderStart" ]
				}, {
					"name" : "PlaceHolderStart",
					"property" : "placeHolderStart",
					"aggregated" : false,
					"memberRuleIDs" : [ "PlaceHolderStart" ]
				}, {
					"name" : "PlaceHolderEnd",
					"property" : "placeHolderEnd",
					"aggregated" : false,
					"memberRuleIDs" : [ "PlaceHolderEnd" ]
				} ]
			},
			"FormElement" : {
				"category" : "Form",
				"label" : "FormElement",
				"icon" : "/com/bstek/dorado/view/widget/form/FormElement.png",
				"jsPrototype" : "dorado.widget.FormElement",
				"jsShortType" : "FormElement",
				"positioned" : true,
				"dependsPackage" : "base-widget",
				"properties" : {
					"names" : [ "id", "listener", "className", "dataPath", "dataSet", "dragTags", "draggable", "droppable", "droppableTags", "editable", "editorType", "editorWidth", "exClassName", "formProfile", "height", "hideMode", "hint", "hintPosition", "hintSpacing", "hintWidth", "ignored", "label", "labelAlign", "labelPosition", "labelSeparator", "labelSpacing", "labelWidth", "layoutConstraint", "metaData", "property", "readOnly", "renderOn", "renderTo", "showHint", "showHintMessage", "showLabel", "style", "tags", "tip", "trigger", "type", "userData", "visible", "width" ],
					"data" : {
						"dataSet" : {
							"editorType" : "DataSet:id"
						},
						"draggable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"droppable" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"editable" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"editorType" : {
							"editorType" : "_editor_55"
						},
						"formProfile" : {
							"editorType" : "FormProfile:id"
						},
						"hideMode" : {
							"defaultValue" : "visibility",
							"editorType" : "com.bstek.dorado.view.widget.HideMode"
						},
						"hintPosition" : {
							"defaultValue" : "right",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementHintPosition"
						},
						"hintSpacing" : {
							"defaultValue" : "3"
						},
						"hintWidth" : {
							"defaultValue" : "22"
						},
						"ignored" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"labelAlign" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.Align"
						},
						"labelPosition" : {
							"defaultValue" : "left",
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementLabelPosition"
						},
						"labelSeparator" : {
							"defaultValue" : ":"
						},
						"labelSpacing" : {
							"defaultValue" : "3"
						},
						"labelWidth" : {
							"defaultValue" : "80"
						},
						"layoutConstraint" : {
							"visible" : false
						},
						"metaData" : {
							"editorType" : "pojo"
						},
						"readOnly" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showHint" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"showHintMessage" : {
							"defaultValue" : "false",
							"editorType" : "boolean"
						},
						"showLabel" : {
							"defaultValue" : "true",
							"editorType" : "boolean"
						},
						"style" : {
							"editorType" : "pojo"
						},
						"trigger" : {
							"editorType" : "Trigger:id"
						},
						"type" : {
							"editorType" : "com.bstek.dorado.view.widget.form.FormElementType",
							"visible" : false
						},
						"userData" : {
							"editorType" : "any"
						}
					}
				},
				"events" : {
					"names" : [ "onCreate", "onReady", "onDestroy", "onAttributeChange", "onBlur", "onClick", "onDraggingSourceOver", "onDraggingSourceOut", "onDraggingSourceMove", "onDraggingSourceDrop", "onGetDraggingIndicator", "onKeyPress", "onDragStart", "onCreateDom", "onDragStop", "beforeRefreshDom", "onDragMove", "onContextMenu", "onDoubleClick", "onMouseUp", "onMouseDown", "onRefreshDom", "onFocus", "beforeDraggingSourceDrop", "onKeyDown", "onGetBindingDataType", "onGetBindingData" ],
					"data" : [ ]
				},
				"children" : [ {
					"name" : "Editor",
					"property" : "editor",
					"fixed" : true,
					"aggregated" : false,
					"wrappered" : true,
					"memberAggregated" : false,
					"memberRuleIDs" : [ "FormElement/Wrapper.Editor" ]
				} ]
			},
			"ViewConfig/Arguments" : {
				"level" : 1,
				"label" : "Arguments",
				"icon" : "/com/bstek/dorado/view/manager/Arguments.png",
				"children" : [ {
					"name" : "Argument",
					"property" : "argument",
					"aggregated" : false,
					"memberRuleIDs" : [ "ViewConfig/Arguments/Argument" ]
				} ]
			},
			"ViewConfig/Arguments/Argument" : {
				"level" : 2,
				"label" : "Argument",
				"icon" : "/com/bstek/dorado/view/manager/Argument.png",
				"properties" : {
					"names" : [ "name", "value" ],
					"data" : { }
				}
			},
			"ViewConfig/Context" : {
				"level" : 1,
				"label" : "Context",
				"icon" : "/com/bstek/dorado/view/manager/ViewContext.png",
				"children" : [ {
					"name" : "Attribute",
					"property" : "attribute",
					"aggregated" : false,
					"memberRuleIDs" : [ "ViewConfig/Context/Attribute" ]
				} ]
			},
			"ViewConfig/Context/Attribute" : {
				"level" : 2,
				"label" : "Attribute",
				"icon" : "/com/bstek/dorado/view/manager/Attribute.png",
				"properties" : {
					"names" : [ "name", "value" ],
					"data" : { }
				}
			},
			"GroupBox/Wrapper.Buttons" : {
				"level" : 1,
				"label" : "Buttons",
				"icon" : "/com/bstek/dorado/view/widget/base/Buttons.png",
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"aggregated" : false,
					"memberRuleIDs" : [ "Button" ]
				} ]
			},
			"GroupBox/Wrapper.Children" : {
				"level" : 1,
				"label" : "Children",
				"icon" : "/com/bstek/dorado/view/widget/base/Children.png",
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"DataColumn/Wrapper.Editor" : {
				"level" : 1,
				"label" : "Editor",
				"icon" : "/com/bstek/dorado/view/widget/grid/Editor.png",
				"children" : [ {
					"name" : "Editor",
					"property" : "editor",
					"aggregated" : false,
					"memberRuleIDs" : [ "Grid", "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"SplitPanel/Wrapper.MainControl" : {
				"level" : 1,
				"label" : "MainControl",
				"icon" : "/com/bstek/dorado/view/widget/base/MainControl.png",
				"children" : [ {
					"name" : "MainControl",
					"property" : "mainControl",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"SplitPanel/Wrapper.SideControl" : {
				"level" : 1,
				"label" : "SideControl",
				"icon" : "/com/bstek/dorado/view/widget/base/SideControl.png",
				"children" : [ {
					"name" : "SideControl",
					"property" : "sideControl",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"Panel/Wrapper.Buttons" : {
				"level" : 1,
				"label" : "Buttons",
				"icon" : "/com/bstek/dorado/view/widget/base/Buttons.png",
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"aggregated" : false,
					"memberRuleIDs" : [ "Button" ]
				} ]
			},
			"Panel/Wrapper.Children" : {
				"level" : 1,
				"label" : "Children",
				"icon" : "/com/bstek/dorado/view/widget/base/Children.png",
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "Panel", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"Panel/Wrapper.Tools" : {
				"level" : 1,
				"label" : "Tools",
				"icon" : "/com/bstek/dorado/view/widget/base/Tools.png",
				"children" : [ {
					"name" : "Tools",
					"property" : "tools",
					"aggregated" : false,
					"memberRuleIDs" : [ "SimpleIconButton" ]
				} ]
			},
			"FloatPanel/Wrapper.Buttons" : {
				"level" : 1,
				"label" : "Buttons",
				"icon" : "/com/bstek/dorado/view/widget/base/Buttons.png",
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"aggregated" : false,
					"memberRuleIDs" : [ "Button" ]
				} ]
			},
			"FloatPanel/Wrapper.Children" : {
				"level" : 1,
				"label" : "Children",
				"icon" : "/com/bstek/dorado/view/widget/base/Children.png",
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"FloatPanel/Wrapper.Tools" : {
				"level" : 1,
				"label" : "Tools",
				"icon" : "/com/bstek/dorado/view/widget/base/Tools.png",
				"children" : [ {
					"name" : "Tools",
					"property" : "tools",
					"aggregated" : false,
					"memberRuleIDs" : [ "SimpleIconButton" ]
				} ]
			},
			"AutoFormElement/Wrapper.Editor" : {
				"level" : 1,
				"label" : "Editor",
				"icon" : "/com/bstek/dorado/view/widget/form/Editor.png",
				"children" : [ {
					"name" : "Editor",
					"property" : "editor",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			},
			"DataTreeGrid/Wrapper.BindingConfigs" : {
				"level" : 1,
				"label" : "BindingConfigs",
				"icon" : "/com/bstek/dorado/view/widget/tree/BindingConfigs.png",
				"children" : [ {
					"name" : "BindingConfigs",
					"property" : "bindingConfigs",
					"aggregated" : false,
					"memberRuleIDs" : [ "BindingConfig" ]
				} ]
			},
			"DataTreeGrid/Wrapper.Columns" : {
				"level" : 1,
				"label" : "Columns",
				"icon" : "/com/bstek/dorado/view/widget/treegrid/Columns.png",
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"TreeGrid/Wrapper.Columns" : {
				"level" : 1,
				"label" : "Columns",
				"icon" : "/com/bstek/dorado/view/widget/treegrid/Columns.png",
				"children" : [ {
					"name" : "Columns",
					"property" : "columns",
					"aggregated" : false,
					"memberRuleIDs" : [ "ColumnGroup", "DataColumn", "IndicatorColumn", "RowNumColumn", "RowSelectorColumn" ]
				} ]
			},
			"TreeGrid/Wrapper.Nodes" : {
				"level" : 1,
				"label" : "Nodes",
				"icon" : "/com/bstek/dorado/view/widget/treegrid/Nodes.png",
				"children" : [ {
					"name" : "Nodes",
					"property" : "nodes",
					"aggregated" : false,
					"memberRuleIDs" : [ "Node" ]
				} ]
			},
			"DataTree/Wrapper.BindingConfigs" : {
				"level" : 1,
				"label" : "BindingConfigs",
				"icon" : "/com/bstek/dorado/view/widget/tree/BindingConfigs.png",
				"children" : [ {
					"name" : "BindingConfigs",
					"property" : "bindingConfigs",
					"aggregated" : false,
					"memberRuleIDs" : [ "BindingConfig" ]
				} ]
			},
			"Dialog/Wrapper.Buttons" : {
				"level" : 1,
				"label" : "Buttons",
				"icon" : "/com/bstek/dorado/view/widget/base/Buttons.png",
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"aggregated" : false,
					"memberRuleIDs" : [ "Button" ]
				} ]
			},
			"Dialog/Wrapper.Children" : {
				"level" : 1,
				"label" : "Children",
				"icon" : "/com/bstek/dorado/view/widget/base/Children.png",
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"Dialog/Wrapper.Tools" : {
				"level" : 1,
				"label" : "Tools",
				"icon" : "/com/bstek/dorado/view/widget/base/Tools.png",
				"children" : [ {
					"name" : "Tools",
					"property" : "tools",
					"aggregated" : false,
					"memberRuleIDs" : [ "SimpleIconButton" ]
				} ]
			},
			"FieldSet/Wrapper.Buttons" : {
				"level" : 1,
				"label" : "Buttons",
				"icon" : "/com/bstek/dorado/view/widget/base/Buttons.png",
				"children" : [ {
					"name" : "Buttons",
					"property" : "buttons",
					"aggregated" : false,
					"memberRuleIDs" : [ "Button" ]
				} ]
			},
			"FieldSet/Wrapper.Children" : {
				"level" : 1,
				"label" : "Children",
				"icon" : "/com/bstek/dorado/view/widget/base/Children.png",
				"children" : [ {
					"name" : "Children",
					"property" : "children",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "DataSet", "Control", "Container", "HtmlContainer", "SubViewHolder", "Action", "AjaxAction", "UpdateAction", "FormSubmitAction", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormProfile", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "Trigger", "ListDropDown", "DataSetDropDown", "AutoMappingDropDown", "DateDropDown", "YearMonthDropDown", "CustomDropDown", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid", "MockDataSet" ]
				} ]
			},
			"FormElement/Wrapper.Editor" : {
				"level" : 1,
				"label" : "Editor",
				"icon" : "/com/bstek/dorado/view/widget/form/Editor.png",
				"children" : [ {
					"name" : "Editor",
					"property" : "editor",
					"aggregated" : false,
					"memberRuleIDs" : [ "Panel", "Control", "Container", "HtmlContainer", "SubViewHolder", "Button", "SimpleButton", "SimpleIconButton", "GroupBox", "FieldSet", "IFrame", "CardBook", "TabControl", "VerticalTabControl", "TabBar", "TabColumn", "ToolBar", "SplitPanel", "Accordion", "Slider", "ProgressBar", "Tip", "FloatContainer", "FloatPanel", "Dialog", "Menu", "DatePicker", "YearMonthPicker", "Label", "DataLabel", "Link", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataMessage", "FormElement", "AutoForm", "NumberSpinner", "DateTimeSpinner", "CustomSpinner", "DataPilot", "ListBox", "DataListBox", "Grid", "DataGrid", "Tree", "DataTree", "BlockView", "DataBlockView", "TreeGrid", "DataTreeGrid" ]
				} ]
			}
		}
	},
	"editorMetas" : {
		"boolean" : {
			"type" : "enum",
			"enumValues" : [ "false", "true" ]
		},
		"pojo" : {
			"type" : "tradition"
		},
		"any" : {
			"type" : "tradition"
		},
		"collection[pojo]" : {
			"type" : "tradition"
		},
		"multilines" : {
			"type" : "tradition"
		},
		"collection[any]" : {
			"type" : "tradition"
		},
		"com.bstek.dorado.data.type.validator.MessageState" : {
			"type" : "enum",
			"enumValues" : [ "info", "ok", "warn", "error" ]
		},
		"_editor_7" : {
			"type" : "enum",
			"enumValues" : [ "d-trigger-icon-drop", "d-trigger-icon-search", "d-trigger-icon-date", "d-trigger-icon-custom" ]
		},
		"com.bstek.dorado.core.bean.Scope" : {
			"type" : "enum",
			"enumValues" : [ "instant", "singleton", "session", "request" ]
		},
		"com.bstek.dorado.view.widget.HideMode" : {
			"type" : "enum",
			"enumValues" : [ "visibility", "display" ]
		},
		"com.bstek.dorado.view.RunAt" : {
			"type" : "enum",
			"enumValues" : [ "server", "client", "both" ]
		},
		"com.bstek.dorado.view.widget.base.tab.VerticalTabPlacement" : {
			"type" : "enum",
			"enumValues" : [ "left", "right" ]
		},
		"com.bstek.dorado.view.widget.Align" : {
			"type" : "enum",
			"enumValues" : [ "left", "center", "right" ]
		},
		"com.bstek.dorado.view.widget.Overflow" : {
			"type" : "enum",
			"enumValues" : [ "visible", "hidden", "scroll", "auto" ]
		},
		"com.bstek.dorado.view.widget.layout.Pack" : {
			"type" : "enum",
			"enumValues" : [ "start", "center", "end" ]
		},
		"_editor_15" : {
			"type" : "enum",
			"enumValues" : [ "f1", "f2", "ctrl+s", "alt+s", "shift+s", "ctrl+alt+shift+s", "return", "space", "backspace", "left", "right", "up", "down" ]
		},
		"com.bstek.dorado.view.widget.action.SubmitMethod" : {
			"type" : "enum",
			"enumValues" : [ "post", "get" ]
		},
		"com.bstek.dorado.view.widget.data.LoadMode" : {
			"type" : "enum",
			"enumValues" : [ "preload", "onReady", "lazy", "manual" ]
		},
		"_editor_18" : {
			"type" : "enum",
			"enumValues" : [ "!DIRTY_TREE", "!CASCADE_DIRTY", "[#dirty]", "[#all]", "[#visible]", "[#current]" ]
		},
		"DataSet:id" : {
			"type" : "reference",
			"rule" : "DataSet",
			"property" : "id"
		},
		"com.bstek.dorado.view.widget.action.RefreshMode" : {
			"type" : "enum",
			"enumValues" : [ "none", "state", "value", "cascade" ]
		},
		"com.bstek.dorado.view.widget.list.DragMode" : {
			"type" : "enum",
			"enumValues" : [ "item", "control", "itemOrControl" ]
		},
		"com.bstek.dorado.view.widget.list.DropMode" : {
			"type" : "enum",
			"enumValues" : [ "onControl", "onItem", "insertItems", "onOrInsertItems", "onAnyWhere" ]
		},
		"com.bstek.dorado.view.widget.list.ScrollMode" : {
			"type" : "enum",
			"enumValues" : [ "simple", "lazyRender", "viewport" ]
		},
		"com.bstek.dorado.view.widget.list.SelectionMode" : {
			"type" : "enum",
			"enumValues" : [ "none", "singleRow", "multiRows" ]
		},
		"Trigger:id" : {
			"type" : "reference",
			"rule" : "Trigger",
			"property" : "id"
		},
		"enumValues" : [ "triggerClear", "autoMappingDropDown1", "autoMappingDropDown2", "autoOpenMappingDropDown1", "autoOpenMappingDropDown2", "defaultDateDropDown", "defaultDateTimeDropDown", "defaultYearMonthDropDown" ],
		"Action:id" : {
			"type" : "reference",
			"rule" : "Action",
			"property" : "id"
		},
		"Menu:id" : {
			"type" : "reference",
			"rule" : "Menu",
			"property" : "id"
		},
		"com.bstek.dorado.view.widget.grid.FilterMode" : {
			"type" : "enum",
			"enumValues" : [ "clientSide", "serverSide" ]
		},
		"com.bstek.dorado.view.widget.grid.SortMode" : {
			"type" : "enum",
			"enumValues" : [ "clientSide", "serverSide" ]
		},
		"com.bstek.dorado.view.widget.grid.StretchColumnsMode" : {
			"type" : "enum",
			"enumValues" : [ "off", "stretchableColumns", "lastColumn", "allColumns", "allResizeableColumns" ]
		},
		"_editor_31" : {
			"type" : "enum",
			"enumValues" : [ "None", "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "NumberSpinner" ]
		},
		"com.bstek.dorado.view.widget.grid.SortState" : {
			"type" : "enum",
			"enumValues" : [ "none", "asc", "desc" ]
		},
		"_editor_33" : {
			"type" : "enum",
			"enumValues" : [ "sum", "average", "count", "max", "min" ]
		},
		"com.bstek.dorado.view.widget.VerticalAlign" : {
			"type" : "enum",
			"enumValues" : [ "top", "center", "bottom" ]
		},
		"com.bstek.dorado.view.type.property.validator.RegExpValidatorMode" : {
			"type" : "enum",
			"enumValues" : [ "whiteBlack", "blackWhite" ]
		},
		"com.bstek.dorado.view.widget.Direction" : {
			"type" : "enum",
			"enumValues" : [ "left", "top", "right", "bottom" ]
		},
		"com.bstek.dorado.view.widget.base.PanelBorder" : {
			"type" : "enum",
			"enumValues" : [ "none", "normal", "curve" ]
		},
		"com.bstek.dorado.view.widget.base.CloseAction" : {
			"type" : "enum",
			"enumValues" : [ "hide", "close" ]
		},
		"com.bstek.dorado.view.widget.tree.ExpandingMode" : {
			"type" : "enum",
			"enumValues" : [ "async", "sync" ]
		},
		"com.bstek.dorado.view.widget.FloatControlAlign" : {
			"type" : "enum",
			"enumValues" : [ "left", "innerleft", "center", "innerright", "top" ]
		},
		"com.bstek.dorado.view.widget.FloatControlAnimateType" : {
			"type" : "enum",
			"enumValues" : [ "zoom", "slide", "safeSlide", "fade", "none" ]
		},
		"com.bstek.dorado.view.widget.ModalType" : {
			"type" : "enum",
			"enumValues" : [ "dark", "transparent" ]
		},
		"com.bstek.dorado.view.widget.FloatControlShadowMode" : {
			"type" : "enum",
			"enumValues" : [ "drop", "sides", "frame", "none" ]
		},
		"com.bstek.dorado.view.widget.FloatControlVAlign" : {
			"type" : "enum",
			"enumValues" : [ "top", "innertop", "center", "innerbottom", "bottom" ]
		},
		"com.bstek.dorado.view.widget.form.DateTimeSpinnerType" : {
			"type" : "enum",
			"enumValues" : [ "date", "time", "dateTime", "hours", "minutes", "dateHours", "dateMinutes" ]
		},
		"com.bstek.dorado.view.widget.base.TipArrowAlign" : {
			"type" : "enum",
			"enumValues" : [ "center", "top", "right", "bottom", "left" ]
		},
		"com.bstek.dorado.view.widget.base.TipArrowDirection" : {
			"type" : "enum",
			"enumValues" : [ "top", "right", "bottom", "left", "none" ]
		},
		"_editor_48" : {
			"type" : "enum",
			"enumValues" : [ "INFO", "WARNING", "ERROR", "QUESTION" ]
		},
		"com.bstek.dorado.view.widget.layout.DockMode" : {
			"type" : "enum",
			"enumValues" : [ "left", "top", "right", "bottom", "center" ]
		},
		"com.bstek.dorado.view.widget.form.trigger.FilterMode" : {
			"type" : "enum",
			"enumValues" : [ "clientSide", "serverSide" ]
		},
		"com.bstek.dorado.view.widget.IconPosition" : {
			"type" : "enum",
			"enumValues" : [ "left", "top" ]
		},
		"com.bstek.dorado.view.widget.base.tab.TabPlacement" : {
			"type" : "enum",
			"enumValues" : [ "top", "bottom" ]
		},
		"com.bstek.dorado.view.widget.form.RadioGroupLayout" : {
			"type" : "enum",
			"enumValues" : [ "vertical", "flow" ]
		},
		"AjaxAction:id" : {
			"type" : "reference",
			"rule" : "AjaxAction",
			"property" : "id"
		},
		"_editor_55" : {
			"type" : "enum",
			"enumValues" : [ "TextEditor", "PasswordEditor", "TextArea", "CheckBox", "RadioGroup", "DataLabel", "NumberSpinner" ]
		},
		"FormProfile:id" : {
			"type" : "reference",
			"rule" : "FormProfile",
			"property" : "id"
		},
		"com.bstek.dorado.view.widget.form.FormElementHintPosition" : {
			"type" : "enum",
			"enumValues" : [ "right", "bottom" ]
		},
		"com.bstek.dorado.view.widget.form.FormElementLabelPosition" : {
			"type" : "enum",
			"enumValues" : [ "left", "top" ]
		},
		"com.bstek.dorado.view.widget.form.FormElementType" : {
			"type" : "enum",
			"enumValues" : [ "text", "password", "textArea", "checkBox", "radioGroup" ]
		},
		"com.bstek.dorado.data.type.property.CacheMode" : {
			"type" : "enum",
			"enumValues" : [ "noCache", "serverSide", "clientSide", "bothSides" ]
		},
		"_editor_61" : {
			"type" : "enum",
			"enumValues" : [ "pages", "|<", "<", ">", ">|", "goto", "pageSize", "info", "+", "-", "x", "|" ]
		},
		"com.bstek.dorado.view.widget.Orientation" : {
			"type" : "enum",
			"enumValues" : [ "horizontal", "horizontal", "vertical" ]
		},
		"com.bstek.dorado.view.widget.blockview.BlockLayout" : {
			"type" : "enum",
			"enumValues" : [ "vertical", "horizontal" ]
		},
		"com.bstek.dorado.view.widget.layout.AnchorMode" : {
			"type" : "enum",
			"enumValues" : [ "auto", "none", "container", "previous" ]
		},
		"com.bstek.dorado.view.type.property.validator.RangeValidateMode" : {
			"type" : "enum",
			"enumValues" : [ "allowEquals", "notAllowEquals", "ignore" ]
		}
	},
	"definitions" : {
		"Rule" : {
			"level" : 0,
			"category" : null,
			"label" : null,
			"labelProperties" : [ "name", "id" ],
			"icon" : null,
			"jsPrototype" : null,
			"jsShortType" : null,
			"layoutable" : false,
			"positioned" : false,
			"deprecated" : false,
			"dependsPackage" : null
		},
		"Property" : {
			"defaultValue" : null,
			"editorType" : null,
			"visible" : true,
			"fixed" : false,
			"deprecated" : false
		},
		"ClientEvent" : {
			"deprecated" : false
		},
		"Child" : {
			"name" : null,
			"property" : null,
			"fixed" : false,
			"aggregated" : true,
			"wrappered" : false,
			"memberAggregated" : true,
			"memberRuleIDs" : null
		}
	}
};