/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-14
 * Time: 下午4:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var CLASS_NAME = "cloudo.widget.DataTypeSelector", _SCOPE = cloudo.dataType.scope;

	function getDataTypeIconClass(scope) {
		var iconClass;
		switch (scope) {
			case cloudo.dataType.scope.GLOBAL:
				iconClass = "d-icon silk cloudo-icon-model";
				break;
			case cloudo.dataType.scope.VIEW:
				iconClass = "d-icon silk cloudo-icon-view";
				break;
			case cloudo.dataType.scope.BASE:
				iconClass = "d-icon silk cloudo-icon-view";
				break;
		}
		return iconClass;
	};
	var DataTypeDropDown = $extend(dorado.widget.CustomDropDown, {
		$className: "DataTypeDropDown",
		constructor: function (config) {
			var config = config || {},
				tabControl = this._buildTabControl(),
				toolBar = this._buildToolBar();
			cloudo.Toolkits.merge(config, {
				control: {
					$type: "Container",
					children: [tabControl, toolBar]
				},
				listener: {
					onOpen: function (self, arg) {
						var editor = arg.editor;
						if (editor instanceof dorado.widget.AbstractTextBox) {
							var dropDown = self;

							function filterFn() {
								if (dropDown.get("opened")) {
									dorado.Toolkits.setDelayedAction(dropDown, "$filterTimeId", function () {
										var value = editor.doGetText();
										var currentTab = tabControl.get('currentTab');
										var grid = currentTab.getControl();
										self._onFilterItems(grid, value);
									}, 20);
								}
							}

							editor.addListener("onTextEdit", filterFn);
						}

						self.refreshData(editor.doGetText());
						self._oldValue = editor.get("value");
					}
				}
			});


			$invokeSuper.call(this, [config]);

			var projectGrid = tabControl.getTab("project").get("control"),
				baseGrid = tabControl.getTab("base").get("control");
			this._context = {
				tabControl: tabControl, toolBar: toolBar,
				projectGrid: projectGrid, baseGrid: baseGrid
			};

		},
		_onFilterItems: function (grid, filterValue) {
			var value = filterValue, context = this._context;
			if (/^\[.*\]$/.exec(value)) {
				value = value.substring(1, value.length - 1);
				context.toolBar.checkBox.set("value", true);
			} else if (/^\[.*/.exec(value)) {
				value = value.substring(1, value.length);
			}

			this.get("opened") && grid.filter([
				{
					operator: "like",
					property: "name",
					value: value
				}
			]);

		},
		_buildToolBar: function () {
			var dropDown = this,
				checkBoxItem = new dorado.widget.CheckBox({caption: "集合类型"}),
				toolBar = new dorado.widget.ToolBar({
					items: [
						{
							$type: "ToolBarLabel", width: 5
						},
						checkBoxItem,
						{
							$type: "Fill"
						},
						{
							$type: "ToolBarButton", caption: "确定",
							listener: {
								onClick: function () {
									dropDown.post();
								}
							}
						},
						{
							$type: "ToolBarButton", caption: "关闭",
							listener: {
								onClick: function () {
									dropDown.close(dropDown._oldValue);
								}
							}
						},
						{
							$type: "ToolBarLabel", width: 5
						}
					],
					layoutConstraint: {
						type: "bottom"
					}
				});

			toolBar.checkBox = checkBoxItem;
			return toolBar;
		},
		_buildTabControl: function () {
			var dropDown = this;

			function buildTabConfig(name, caption) {
				return {
					$type: "Control", name: name, caption: caption,
					control: {
						$type: "Grid", readOnly: true, showHeader: false,
						columns: [
							{
								name: "scope", width: 22,
								onRenderCell: function (self, arg) {
									var data = arg.data, scope = data.scope;

									$(arg.dom).empty().xCreate({
										tagName: "IMG", className: getDataTypeIconClass(scope),
										style: "margin: 1px"
									});
								}
							},
							{
								name: "name"
							}
						],
						onDataRowDoubleClick: function () {
							dropDown.post();
						}
					}
				};
			}

			var tabControl = new dorado.widget.TabControl(
				{
					tabPlacement: "bottom",
					layoutConstraint: {
						type: "center"
					},
					onTabChange: function (self, arg) {
						if (arg.oldTab) {
							var grid = arg.oldTab.getControl();
							dropDown._onFilterItems(grid, '');
						}
					},
					tabs: [
						buildTabConfig("project", "工程"),
						buildTabConfig("base", "基础")
					]
				}
			);
			tabControl.baseTab = tabControl.getTab("base");
			tabControl.projectTab = tabControl.getTab("project");
			return tabControl;
		},
		post: function () {
			var context = this._context,
				tab = context.tabControl.get("currentTab"),
				grid = tab.getControl(),
				currentEntity = grid.get("currentEntity"),
				checkBox = context.toolBar.checkBox;

			var objectType = checkBox.get("value"),
				value = currentEntity ? currentEntity.name : null;
			if (value && objectType) {
				value = "[" + value + "]";
			}

			this.close(value);
		},
		refreshData: function (value) {
			var scopeName = cloudo.Toolkits.parseDataTypeScope(value),
				dataTypes = cloudo.Toolkits.getDataTypeNames(),
				context = this._context;

			function createGridData(names, scope) {
				var data = [];
				names.each(function (name) {
					data.push({
						name: name, scope: scope
					});
				});
				return data;
			}

			var baseData = createGridData(dataTypes[_SCOPE.BASE], _SCOPE.BASE),
				viewData = createGridData(dataTypes[_SCOPE.VIEW], _SCOPE.VIEW),
				globalData = createGridData(dataTypes[_SCOPE.GLOBAL], _SCOPE.GLOBAL),
				selfItem = {
					name: "SELF",
					scope: "view"
				};

			var projectGridData = viewData.concat(globalData);
			projectGridData.push(selfItem);
			//TODO 修复Dorado Grid直接set items时 如果filterParams.length>0设定无效。
			context.projectGrid.filter([]);
			context.projectGrid.set("items", projectGridData);
			context.baseGrid.set("items", baseData);
			context.tabControl.set("currentTab", scopeName === _SCOPE.BASE ? context.tabControl.baseTab : context.tabControl.projectTab);
			context.toolBar.checkBox.set("value", /^\[.*\]$/.exec(value) || !value);

		}
	});

	var dropDown = new DataTypeDropDown({
		height: 300, minWidth: 250
	});

	cloudo.widget.DataTypeSelector = $extend(cloudo.widget.DefaultPropertyEditor, {
		$className: CLASS_NAME,
		constructor: function (config) {
			var config = config || {};
			config.trigger = dropDown;
			$invokeSuper.call(this, [config]);
		}
	});

	cloudo.propertyEditor.register("name[dataType]", CLASS_NAME);

})();