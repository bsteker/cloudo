/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-20
 * Time: 下午1:38
 * To change this template use File | Settings | File Templates.
 */
(function () {
	/**
	 * 属性表格
	 * 对Dorado TreeGrid做了一下扩展
	 * 可显示和隐藏通用列表
	 * 可根据节点Label进行搜索
	 *
	 */
	cloudo.widget.DynamicGrid = $extend(dorado.widget.TreeGrid, {
		$className: "cloudo.widget.DynamicGrid",
		ATTRIBUTES: {
			hideGeneralItems: {
				defaultValue: true
			},
			showGeneralProps: {
				defaultValue: false, skipRefresh: true,
				setter: function (value) {
					this._showGeneralProps = value;
					var optionButton = this.optionButton;
					optionButton && optionButton.set({
						visible: true
					});
					value ? this.showGeneralItems() : this.hideGeneralItems();
				}
			}
		},
		constructor: function (config) {
			config = config || {};
			config.onRefreshDom = function (self, arg) {
				var optionButton = self.optionButton, treeGrid = self;
				if (!optionButton) {
					optionButton = new dorado.widget.Label({
						exClassName: "c-property-show-option",
						style: {    color: cloudo.Skin.highlightColor},
						onClick: function () {
							var showGenerals = !treeGrid._showGeneralProps;
							treeGrid.set("showGeneralProps", showGenerals);
						}
					});
					self.optionButton = optionButton;
					var $dom = $(self.getDom());
					optionButton.render($(".data-table", $dom).parent()[0]);
				}

				self.set("showGeneralProps", false);
			};
			$invokeSuper.call(this, [config]);
		},
		removeDataColumns: function () {
			var optionButton = this.optionButton;
			optionButton && optionButton.set("visible", false);

			var treeColumn = this.get("treeColumn"), columns = this._columns, removeItems = [];
			columns.each(function (column) {
				var name = column.get("name");
				if (name != "propertyName") {
					column.destroy && column.destroy();
					removeItems.push(column);
				}
			});
			removeItems.each(function (column) {
				columns.remove(column);
			});
		},
		getItemDomMap: function () {
			return this._innerGrid._itemDomMap;
		},
		refreshScroller: function () {
			this.updateScroller(this._innerGrid._container);
		},
		_hideGeneral: function () {
			var grid = this, itemDomMap = grid.getItemDomMap();
			var result = !(!this._hideGeneralItems || _.keys(itemDomMap).length <= 6);
			this.optionButton.set({ visible: result});
			return result;
		},

		showGeneralItems: function () {
			if (!this._hideGeneral()) {
				return;
			}
			var grid = this, itemDomMap = grid.getItemDomMap();

			for (var k in itemDomMap) {
				if (itemDomMap.hasOwnProperty(k)) {
					var row = itemDomMap[k];
					$fly(row).css("display", "");
				}
			}
			this.optionButton.set({text: "隐藏更多属性...", visible: true});

			grid.refreshScroller();
		},
		hideGeneralItems: function () {
			if (!this._hideGeneral()) {
				return;
			}
			var grid = this,
				entityMap = grid._entityMap, itemDomMap = grid.getItemDomMap();

			_.each(entityMap, function (entity) {
				var group, data, defaultValues;
				data = entity.get("data").toJSON();
				defaultValues = data.defaultValues
				group = data.groupName;
				var display = group ? "none" : "";

				group && defaultValues && $.each(defaultValues, function (nid) {
					var defaultValue = defaultValues[nid];
					var currentValue = data[nid];
					if (currentValue !== defaultValue) {
						display = "";
						return false;
					}
				});
				var row = itemDomMap[entity._uniqueId || entity._id];
				$fly(row).css("display", display);

			})

			this.optionButton.set({text: "显示更多属性...", visible: true});
			grid.refreshScroller();
		},
		filter: function (condition) {
			condition = (condition || "").toLowerCase();
			var grid = this,
				entityMap = grid._entityMap, itemDomMap = grid.getItemDomMap();
			if (condition !== "") {
				_.each(entityMap, function (entity) {
					var label = entity._label;
					if (label) {
						var row = itemDomMap[entity._uniqueId || entity._id];
						$fly(row).css("display", label.toLowerCase().indexOf(condition) >= 0 ? "" : "none");
					}
				})

				grid.refreshScroller();
				this.optionButton.set("visible", false);
			} else {
				this.hideGeneralItems();
			}
		}
	})
	;


})
();