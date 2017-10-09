/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-1-8
 * Time: 上午9:33
 * To change this template use File | Settings | File Templates.
 */
(function () {
	cloudo.widget.DrawEditor = $extend([dorado.widget.HtmlContainer, cloudo.widget.AbstractNodeEditor], {
		$className: "cloudo.widget.DrawEditor",
		constructor: function (config) {
			var node;
			config = config || {};
			if (config && config.node) {
				node = config.node;
				delete config["node"]
			}

			$invokeSuper.call(this, [config]);
			var iFrame = this._buildIFrame();
			if (cloudo.viewConfig.isTouch()) {
				this.addChild(new dorado.widget.HtmlContainer({
					children: [
						iFrame
					],
					containerExpression: ".content", width: "400",
					content: {
						tagName: "DIV", className: "c-touch-pad",
						content: [
							{tagName: "div", className: "content"},
							{tagName: "div", className: "camera"},
							{tagName: "div", className: "button"}
						]
					}
				}))
			} else {
				this.addChild(iFrame);
			}

			this._iFrame = iFrame;
			node && this.init(node);
		},
		_buildIFrame: function () {
			var drawEditor = this;
			return  new dorado.widget.IFrame({
				$type: "IFrame", droppable: true, droppableTags: cloudo.Constant.NODE_DRAG_TAG,
				exClassName: "c-drawpad-iframe-repeat",
				onDraggingSourceMove: function (self, arg) {
					var draggingInfo = arg.draggingInfo;
					if (draggingInfo.get("tags")[0] !== cloudo.Constant.NODE_DRAG_TAG) {
						draggingInfo.set({
							accept: false
						});
						return;
					}

					var rule = cloudo.Rule.get(draggingInfo.get("object").rid),
						indicator = draggingInfo.get("indicator"),
						iframeOffset = $(self.getDom()).offset(),
						drawPad = drawEditor.getDrawPad();

					var $indicatorOffset = $(indicator.getDom()).offset(),
						mouseX = $indicatorOffset.left + 7 - iframeOffset.left,
						mouseY = $indicatorOffset.top + 8 - iframeOffset.top;

					var addable = drawPad.isValidHoverTarget(mouseX, mouseY);

					draggingInfo.set({accept: addable});
					if (addable) {
						var currentNode = cloudo.selections.first();

						var layout = cloudo.NodeHelper.layoutRuleId(currentNode);
						if (layout || currentNode.rid === "AutoForm") {
							if (layout == "AnchorLayout") {
								if (/.*Buttons/.exec(currentNode.rid) || /.*Tools/.exec(currentNode.rid)) {
									return;
								}
								var $iconDom = $(indicator._iconDom);
								$iconDom.toggleClass("c-indicator-accept", addable);
								draggingInfo._anchorPosition = drawPad.getAnchorPosition(mouseX, mouseY, rule.jsPrototype, currentNode.id);
							} else if (layout == "DockLayout") {
								if (/.*Buttons/.exec(currentNode.rid) || /.*Tools/.exec(currentNode.rid)) {
									return;
								}
								drawPad.drawTargetRegion();
								draggingInfo._dockType = drawPad.getDockType(mouseX, mouseY);
							} else {
								drawPad.drawTargetRegion();
							}
							//TODO 此处添加其它布局
						}
					}
				},
				beforeDraggingSourceDrop: function (self, arg) {
					var draggingInfo = arg.draggingInfo;
					if (draggingInfo.get("tags")[0] !== cloudo.Constant.NODE_DRAG_TAG) {
						draggingInfo.set({
							accept: false
						});
						return;
					}
					if (draggingInfo.get("accept")) {
						var item = draggingInfo.get("object");
						var node = cloudo.Toolkits.createNodeInstance(item.rid),
							parentNode = cloudo.selections.first();
						if (cloudo.selections.size === 1 && $nodeHelper.canPaste(parentNode, node)) {


							if (draggingInfo._anchorPosition) {
								var position = new cloudo.model.Position(), positionMeta = draggingInfo._anchorPosition;
								var pLeft = positionMeta.left,
									pRight = positionMeta.right,
									pTop = positionMeta.top,
									pBottom = positionMeta.bottom;
								position.addProperty(new cloudo.model.Property(pLeft < pRight ? "left" : "right", (pLeft < pRight ? pLeft : pRight)+""));
								position.addProperty(new cloudo.model.Property(pTop < pBottom ? "top" : "bottom", (pTop < pBottom ? pTop : pBottom)+""))
								node.setPosition(position);
							} else if (draggingInfo._dockType) {
								var dockType = draggingInfo._dockType, position = new cloudo.model.Position();
								position.addProperty(new cloudo.model.Property("type", dockType));
								if (!/Button|Label|Bar|Editor|Link|Slider|DataPilot|Spinner|Date/.test(item.rid)) {
									var propName;

									switch (dockType) {
										case "left":
										case "right":
											propName = "width";
											break;
										case "top":
										case "bottom":
											propName = "height";
											break;
									}

									propName && node.addProperty(new cloudo.model.Property(propName, "20%"));
								}
								node.setPosition(position);
							}


							if (cloudo.wizard.find(item.rid)) {
								cloudo.wizard.show(item.rid, {
									node: node,
									parentNode: parentNode
								});
							} else {
								cloudo.viewConfig.addNode(node, parentNode);
							}

						}
					}

					arg.processDefault = false;
				}
			});
		},
		getDrawPad: function () {
			var iFrame = this._iFrame, win = iFrame.get("iFrameWindow");
			if (win) {
				return  win.$DrawPad;
			}
		},

		_draw: function () {
			var iFrame = this._iFrame, node = this._node, nid = node.id,
				editor = this, win = iFrame.get("iFrameWindow");
			if (win) {
				var iDocument = win.document,
					code = cloudo.viewConfig.output(node);
				var scriptElement = iDocument.createElement("script");
				scriptElement.type = "text/javascript";

				scriptElement.text = "(function(){\n" + code + "\n})()";
				console.log("CODE: " + scriptElement.text);
				var head = iDocument.getElementsByTagName("head")[0];
				if (head) {
					try {
						head.appendChild(scriptElement);
					} finally {
						head.removeChild(scriptElement);
					}
				}
			}

			setTimeout(function () {
				editor.refreshSelections(cloudo.selections.pluck("id"));
			}, 400)
		},
		init: function (node) {
			this._node = node;
			var path=cloudo.getDrawPadPath();
			path += "?nodeId=" + node.id;
			this._iFrame.set("path", path);
		},
		refreshNode: function (node) {
			this._draw();
		},
		reload: function () {
			var path = this._iFrame.get("path");

			this._iFrame.reload();
		},
		refreshSelections: function (selections) {
			var drawPad = this.getDrawPad();
			drawPad && drawPad.refreshSelections(selections);
		},
		showPositionEditor: function (node) {
			var drawPad = this.getDrawPad();
			drawPad && drawPad.showPositionEditor(node.id);
		},
		clearTraces: function () {
			var drawPad = this.getDrawPad();
			drawPad && drawPad.clearTraces();
		},
		reposition: function (node) {
			var drawPad = this.getDrawPad();
			drawPad && drawPad.repositionControl(node.id);
		},
		replaceProperty: function (node, name, value) {
			var drawPad = this.getDrawPad();
			drawPad && drawPad.setProperty(node.id, name, value);
		},
		addNode: function () {
			this._draw();
		},
		removeNode: function () {
			this._draw();
		},
		moveNode: function () {
			this._draw();
		},
		drawAll: function () {
			this._draw();
		}
	});


})
();