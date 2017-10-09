/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-29
 * Time: 下午2:34
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var SECTION_ICON = "fa fa-folder-o";
	cloudo.widget.BlockView = $extend(dorado.widget.BlockView, {
		$className: "cloudo.widget.BlockView",
		/**
		 * 返回当系统将此对象初始化为可拖拽对象时将要传递给{@link jQuery.draggable}方法的options参数。
		 * @param {HTMLElement} dom 将要初始化的HTMLElement。
		 * @protected
		 * return {Object} options参数。
		 */
		getDraggableOptions: function (dom) {
			var options = $invokeSuper.call(this, [dom]);
			var step = cloudo.Settings.dragStep;
			options.grid = [ step, step];
			return options;
		}
	});

	var localCacheData = {};


	var ImageBlockRenderer = $extend(dorado.widget.blockview.ImageBlockRenderer, {
		getImageDom: function (dom) {
			var img = dom.firstChild;
			if (img == null) {
				img = $DomUtils.xCreate({
					tagName: "IMG", className: "cloudo-widget-img",
					style: {
						position: "absolute",
						left: 42,
						top: 8,
						width: 16,
						height: 16

					}
				});
				dom.appendChild(img);
			}
			return img;
		}
	});

	cloudo.widget.ComponentSelector = $extend(dorado.widget.Container, {
		$className: "cloudo.ComponentSelector",
		constructor: function (config) {
			config = config || {};

			var selector = this,
				accordion = new dorado.widget.Accordion({
					layoutConstraint: "center"
				}),
				filterBar = new dorado.widget.TextEditor({
					trigger: {
						$type: "Trigger", iconClass: "d-trigger-icon-search",
						onExecute: function () {
							var value = filterBar.get("value");
							selector.filter(value);
						}
					},
					onTextEdit: function (self) {
						var value = self.get("text");
						selector.filter(value);
					},
					layoutConstraint: "top"
				});

			this._filterBar = filterBar;
			this._accordion = accordion;

			cloudo.Toolkits.merge(config, {
				layout: "Dock",
				children: [ filterBar, accordion ]
			});

			$invokeSuper.call(this, [config]);
		},
		_createBlockView: function (rids) {
			var items = [], iconPrefix = cloudo.Constant.ICON_URL_PREFIX;
			_.each(rids, function (rid) {
				var item = localCacheData[rid];
				if (!item) {
					item = {
						caption: cloudo.Rule.getLabel(rid),
						icon: iconPrefix + cloudo.Rule.getIcon(rid),
						rid: rid
					};

					localCacheData[rid] = item;
				}

				items.push(
					item
				);
			});


			return  new cloudo.widget.BlockView({
				items: items, padding: 1, blockWidth: 100, blockHeight: 50,
				draggable: true, dragTags: cloudo.Constant.NODE_DRAG_TAG,
				onCreate: function (self) {
					self.set("renderer", new ImageBlockRenderer({
						captionProperty: "caption", imageProperty: "icon"
					}));
				},
				onDragStop: function () {
					$nodeEditorManager.clearTraces();
				},
				onBlockDoubleClick: function (self, arg) {
					var data = arg.data, rid = data.rid,
						selections = cloudo.selections;
					if (selections.size === 1) {
						var node = cloudo.Toolkits.createNodeInstance(rid),
							parentNode = selections.first();
						if ($nodeHelper.canPaste(parentNode, node)) {
							if (cloudo.wizard.find(rid)) {
								cloudo.wizard.show(rid, {
									node: node,
									parentNode: parentNode
								});
							} else {
								cloudo.viewConfig.addNode(node, parentNode);
							}
						}
					}
				}
			});

		},
		_createSection: function (name, control, itemSize) {
			return new dorado.widget.Section({
				caption: name + "(" + itemSize + ")",
				name: name, expandable: true, control: control,
				iconClass: SECTION_ICON
			});
		},
		/**
		 * 设置组件数据
		 * @param data
		 */
		setData: function (data) {
			if (this._data && data.rid === this._data.rid) {
				return;
			}
			var accordion = this._accordion, filterBar = this._filterBar,
				children = data.children;

			accordion.clearSections();


			for (var i = 0; i < children.length; i++) {
				var category = children[i], rids = category.rids, categoryName = category.name;
				if (rids.length > 0) {
					if (categoryName == "other" && children.length > 2) {
						continue;
					}
					var blockView = this._createBlockView(rids);
					var section = this._createSection(categoryName, blockView, rids.length);
					accordion.addSection(section);
				}
			}
			filterBar.set("value", null);
			this._data = data;

		},
		/**
		 * 过滤组件
		 * @param {string} condition
		 */
		filter: function (condition) {
			var data = this._data, regExp ,
				children = data.children,
				accordion = this._accordion, selector = this;
			if (condition) {
				regExp = new RegExp(condition, "i");
			}
			accordion.clearSections();
			_.each(children, function (category) {
				var rids = category.rids, categoryName = category.name, blockViewItems = [];
				if (regExp) {
					_.each(rids, function (rid) {
						if (regExp.exec(rid)) {
							blockViewItems.push(rid);
						}
					});
				} else {
					blockViewItems = rids;
				}

				if (blockViewItems.length > 0) {
					var blockView = selector._createBlockView(blockViewItems);
					var section = selector._createSection(categoryName, blockView, blockViewItems.length);
					accordion.addSection(section);
				}
			});
		}
	});

})();