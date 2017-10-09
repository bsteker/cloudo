/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-6-14
 * Time: 下午4:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var silkNames = [
		'silk-accept', 'silk-add', 'silk-anchor', 'silk-application-add',
		'silk-application-cascade', 'silk-application-delete', 'silk-application-double',
		'silk-application-edit', 'silk-application-error', 'silk-application-form-add',
		'silk-application-form-delete', 'silk-application-form-edit', 'silk-application-form-magnify',
		'silk-application-form',
		'silk-application-get',
		'silk-application-go',
		'silk-application-home',
		'silk-application-key',
		'silk-application-lightning',
		'silk-application-link',
		'silk-application-put',
		'silk-application-side-boxes',
		'silk-application-side-contract',
		'silk-application-side-expand',
		'silk-application-side-list',
		'silk-application-side-tree',
		'silk-application-split',
		'silk-application-tile-horizontal',
		'silk-application-tile-vertical',
		'silk-application-view-columns',
		'silk-application-view-detail',
		'silk-application-view-gallery',
		'silk-application-view-icons',
		'silk-application-view-list',
		'silk-application-view-tile',
		'silk-application',
		'silk-arrow-branch',
		'silk-arrow-divide',
		'silk-arrow-down',
		'silk-arrow-in',
		'silk-arrow-inout',
		'silk-arrow-join',
		'silk-arrow-left',
		'silk-arrow-merge',
		'silk-arrow-out',
		'silk-arrow-redo',
		'silk-arrow-refresh',
		'silk-arrow-right',
		'silk-arrow-rotate-anticlockwise',
		'silk-arrow-rotate-clockwise',
		'silk-arrow-switch',
		'silk-arrow-turn-left',
		'silk-arrow-turn-right',
		'silk-arrow-undo',
		'silk-arrow-up',
		'silk-asterisk',
		'silk-attach',
		'silk-award-star',
		'silk-big-error',
		'silk-big-exclamation',
		'silk-big-help',
		'silk-big-information',
		'silk-blue-down',
		'silk-blue-left',
		'silk-blue-right',
		'silk-blue-up',
		'silk-brick',
		'silk-bricks',
		'silk-bug',
		'silk-bullet-add',
		'silk-bullet-arrow-bottom',
		'silk-bullet-arrow-down',
		'silk-bullet-arrow-top',
		'silk-bullet-arrow-up',
		'silk-bullet-delete',
		'silk-bullet-disk',
		'silk-bullet-error',
		'silk-bullet-feed',
		'silk-bullet-go',
		'silk-bullet-key',
		'silk-bullet-picture',
		'silk-bullet-star',
		'silk-bullet-toggle-minus',
		'silk-bullet-toggle-plus',
		'silk-bullet-warn',
		'silk-bullet-wrench',
		'silk-bullet',
		'silk-bullet_go',
		'silk-calendar',
		'silk-camera',
		'silk-cancel',
		'silk-cart',
		'silk-chart-bar',
		'silk-chart-curve',
		'silk-chart-organisation',
		'silk-chart-pie',
		'silk-clock',
		'silk-cog',
		'silk-color-swatch',
		'silk-color-wheel',
		'silk-comment',
		'silk-comments',
		'silk-compress',
		'silk-connect',
		'silk-control-end',
		'silk-control-fastforward',
		'silk-control-pause',
		'silk-control-play-reverse',
		'silk-control-play',
		'silk-control-rewind',
		'silk-control-start',
		'silk-control-stop',
		'silk-copy',
		'silk-css',
		'silk-cursor',
		'silk-cut',
		'silk-database',
		'silk-date',
		'silk-delete',
		'silk-denied',
		'silk-disconnect',
		'silk-disk-multiple',
		'silk-disk',
		'silk-email',
		'silk-error',
		'silk-exclamation',
		'silk-eye',
		'silk-feed',
		'silk-female',
		'silk-film',
		'silk-filter',
		'silk-flag',
		'silk-folder-explore',
		'silk-folder',
		'silk-help',
		'silk-hourglass',
		'silk-house',
		'silk-html',
		'silk-information',
		'silk-key',
		'silk-layers',
		'silk-lightbulb',
		'silk-link-break',
		'silk-link',
		'silk-lock-delete',
		'silk-lock-open',
		'silk-lock',
		'silk-male',
		'silk-map',
		'silk-money-dollar',
		'silk-money-euro',
		'silk-money-pound',
		'silk-money-yen',
		'silk-monitor',
		'silk-music',
		'silk-note',
		'silk-package',
		'silk-page-white',
		'silk-page',
		'silk-paintbrush',
		'silk-paintcan',
		'silk-palette',
		'silk-paste',
		'silk-pencil',
		'silk-picture',
		'silk-pictures',
		'silk-pilcrow',
		'silk-pill',
		'silk-plugin',
		'silk-printer',
		'silk-report',
		'silk-resultset-first',
		'silk-resultset-last',
		'silk-resultset-next-page',
		'silk-resultset-next',
		'silk-resultset-previous-page',
		'silk-resultset-previous',
		'silk-rss',
		'silk-rubber',
		'silk-ruby',
		'silk-script',
		'silk-search',
		'silk-shape-flip-horizontal',
		'silk-shape-flip-vertical',
		'silk-shape-rotate-anticlockwise',
		'silk-shape-rotate-clockwise',
		'silk-shield',
		'silk-sitemap',
		'silk-sort-asc',
		'silk-sort-desc',
		'silk-star',
		'silk-stop',
		'silk-sum',
		'silk-table-edit',
		'silk-table-relationship',
		'silk-table',
		'silk-tag-add',
		'silk-tag-delete',
		'silk-tag',
		'silk-text-align-center',
		'silk-text-align-justify',
		'silk-text-align-left',
		'silk-text-align-right',
		'silk-text-columns',
		'silk-text-list-bullets',
		'silk-text-list-numbers',
		'silk-text-padding-bottom',
		'silk-text-padding-top',
		'silk-tick',
		'silk-time',
		'silk-timeline-marker',
		'silk-user-comment',
		'silk-user',
		'silk-vcard',
		'silk-wand',
		'silk-world',
		'silk-wrench',
		'silk-xml-tag',
		'silk-zoom-in',
		'silk-zoom-out',
		'silk-zoom' ];
	var fontCategories = {
		'Web Application Icons': [ 'glass',
			'music',
			'search',
			'envelope-o',
			'heart',
			'star',
			'star-o',
			'user',
			'film',
			'check',
			'times',
			'search-plus',
			'search-minus',
			'power-off',
			'signal',
			'cog',
			'trash-o',
			'home',
			'clock-o',
			'road',
			'download',
			'inbox',
			'refresh',
			'lock',
			'flag',
			'headphones',
			'volume-off',
			'volume-down',
			'volume-up',
			'qrcode',
			'barcode',
			'tag',
			'tags',
			'book',
			'bookmark',
			'print',
			'camera',
			'video-camera',
			'picture-o',
			'pencil',
			'map-marker',
			'adjust',
			'tint',
			'pencil-square-o',
			'share-square-o',
			'check-square-o',
			'arrows',
			'plus-circle',
			'minus-circle',
			'times-circle',
			'check-circle',
			'question-circle',
			'info-circle',
			'crosshairs',
			'times-circle-o',
			'check-circle-o',
			'ban',
			'share',
			'plus',
			'minus',
			'asterisk',
			'exclamation-circle',
			'gift',
			'leaf',
			'fire',
			'eye',
			'eye-slash',
			'exclamation-triangle',
			'plane',
			'calendar',
			'random',
			'comment',
			'magnet',
			'retweet',
			'shopping-cart',
			'folder',
			'folder-open',
			'arrows-v',
			'arrows-h',
			'bar-chart-o',
			'camera-retro',
			'key',
			'cogs',
			'comments',
			'thumbs-o-up',
			'thumbs-o-down',
			'star-half',
			'heart-o',
			'sign-out',
			'thumb-tack',
			'external-link',
			'sign-in',
			'trophy',
			'upload',
			'lemon-o',
			'phone',
			'square-o',
			'bookmark-o',
			'phone-square',
			'unlock',
			'credit-card',
			'rss',
			'hdd-o',
			'bullhorn',
			'bell',
			'certificate',
			'globe',
			'wrench',
			'tasks',
			'filter',
			'briefcase',
			'users',
			'cloud',
			'flask',
			'square',
			'bars',
			'magic',
			'truck',
			'money',
			'sort',
			'sort-desc',
			'sort-asc',
			'envelope',
			'gavel',
			'tachometer',
			'comment-o',
			'comments-o',
			'bolt',
			'sitemap',
			'umbrella',
			'lightbulb-o',
			'exchange',
			'cloud-download',
			'cloud-upload',
			'suitcase',
			'bell-o',
			'coffee',
			'cutlery',
			'building-o',
			'fighter-jet',
			'beer',
			'plus-square',
			'desktop',
			'laptop',
			'tablet',
			'mobile',
			'circle-o',
			'quote-left',
			'quote-right',
			'spinner',
			'circle',
			'reply',
			'folder-o',
			'folder-open-o',
			'smile-o',
			'frown-o',
			'meh-o',
			'gamepad',
			'keyboard-o',
			'flag-o',
			'flag-checkered',
			'terminal',
			'code',
			'reply-all',
			'star-half-o',
			'location-arrow',
			'crop',
			'code-fork',
			'question',
			'info',
			'exclamation',
			'eraser',
			'puzzle-piece',
			'microphone',
			'microphone-slash',
			'shield',
			'calendar-o',
			'fire-extinguisher',
			'rocket',
			'anchor',
			'unlock-alt',
			'bullseye',
			'ellipsis-h',
			'ellipsis-v',
			'rss-square',
			'ticket',
			'minus-square',
			'minus-square-o',
			'level-up',
			'level-down',
			'check-square',
			'pencil-square',
			'external-link-square',
			'share-square',
			'compass',
			'caret-square-o-down',
			'caret-square-o-up',
			'caret-square-o-right',
			'sort-alpha-asc',
			'sort-alpha-desc',
			'sort-amount-asc',
			'sort-amount-desc',
			'sort-numeric-asc',
			'sort-numeric-desc',
			'thumbs-up',
			'thumbs-down',
			'female',
			'male',
			'sun-o',
			'moon-o',
			'archive',
			'bug',
			'caret-square-o-left',
			'dot-circle-o',
			'wheelchair',
			'plus-square-o',
			'space-shuttle',
			'envelope-square',
			'university',
			'graduation-cap',
			'language',
			'fax',
			'building',
			'child',
			'paw',
			'spoon',
			'cube',
			'cubes',
			'recycle',
			'car',
			'taxi',
			'tree',
			'database',
			'file-pdf-o',
			'file-word-o',
			'file-excel-o',
			'file-powerpoint-o',
			'file-image-o',
			'file-archive-o',
			'file-audio-o',
			'file-video-o',
			'file-code-o',
			'life-ring',
			'circle-o-notch',
			'paper-plane',
			'paper-plane-o',
			'history',
			'circle-thin',
			'sliders',
			'share-alt',
			'share-alt-square',
			'bomb' ],
		'Text Editor Icons': [ 'th-large',
			'th',
			'th-list',
			'file-o',
			'repeat',
			'list-alt',
			'font',
			'bold',
			'italic',
			'text-height',
			'text-width',
			'align-left',
			'align-center',
			'align-right',
			'align-justify',
			'list',
			'outdent',
			'indent',
			'link',
			'scissors',
			'files-o',
			'paperclip',
			'floppy-o',
			'list-ul',
			'list-ol',
			'strikethrough',
			'underline',
			'table',
			'columns',
			'undo',
			'clipboard',
			'file-text-o',
			'chain-broken',
			'superscript',
			'subscript',
			'eraser',
			'file',
			'file-text',
			'header',
			'paragraph' ],
		'Spinner Icons': [ 'cog', 'refresh', 'spinner', 'circle-o-notch' ],
		'File Type Icons': [ 'file-o',
			'file-text-o',
			'file',
			'file-text',
			'file-pdf-o',
			'file-word-o',
			'file-excel-o',
			'file-powerpoint-o',
			'file-image-o',
			'file-archive-o',
			'file-audio-o',
			'file-video-o',
			'file-code-o' ],
		'Directional Icons': [ 'arrow-circle-o-down',
			'arrow-circle-o-up',
			'arrows',
			'chevron-left',
			'chevron-right',
			'arrow-left',
			'arrow-right',
			'arrow-up',
			'arrow-down',
			'chevron-up',
			'chevron-down',
			'arrows-v',
			'arrows-h',
			'hand-o-right',
			'hand-o-left',
			'hand-o-up',
			'hand-o-down',
			'arrow-circle-left',
			'arrow-circle-right',
			'arrow-circle-up',
			'arrow-circle-down',
			'arrows-alt',
			'caret-down',
			'caret-up',
			'caret-left',
			'caret-right',
			'angle-double-left',
			'angle-double-right',
			'angle-double-up',
			'angle-double-down',
			'angle-left',
			'angle-right',
			'angle-up',
			'angle-down',
			'chevron-circle-left',
			'chevron-circle-right',
			'chevron-circle-up',
			'chevron-circle-down',
			'caret-square-o-down',
			'caret-square-o-up',
			'caret-square-o-right',
			'long-arrow-down',
			'long-arrow-up',
			'long-arrow-left',
			'long-arrow-right',
			'arrow-circle-o-right',
			'arrow-circle-o-left',
			'caret-square-o-left' ],
		'Video Player Icons': [ 'play-circle-o',
			'step-backward',
			'fast-backward',
			'backward',
			'play',
			'pause',
			'stop',
			'forward',
			'fast-forward',
			'step-forward',
			'eject',
			'expand',
			'compress',
			'arrows-alt',
			'play-circle',
			'youtube-play' ],
		'Form Control Icons': [ 'check-square-o',
			'square-o',
			'square',
			'plus-square',
			'circle-o',
			'circle',
			'minus-square',
			'minus-square-o',
			'check-square',
			'dot-circle-o',
			'plus-square-o' ],
		'Brand Icons': [ 'twitter-square',
			'facebook-square',
			'linkedin-square',
			'github-square',
			'twitter',
			'facebook',
			'github',
			'pinterest',
			'pinterest-square',
			'google-plus-square',
			'google-plus',
			'linkedin',
			'github-alt',
			'maxcdn',
			'html5',
			'css3',
			'btc',
			'youtube-square',
			'youtube',
			'xing',
			'xing-square',
			'youtube-play',
			'dropbox',
			'stack-overflow',
			'instagram',
			'flickr',
			'adn',
			'bitbucket',
			'bitbucket-square',
			'tumblr',
			'tumblr-square',
			'apple',
			'windows',
			'android',
			'linux',
			'dribbble',
			'skype',
			'foursquare',
			'trello',
			'gittip',
			'vk',
			'weibo',
			'renren',
			'pagelines',
			'stack-exchange',
			'vimeo-square',
			'slack',
			'wordpress',
			'openid',
			'yahoo',
			'google',
			'reddit',
			'reddit-square',
			'stumbleupon-circle',
			'stumbleupon',
			'delicious',
			'digg',
			'pied-piper',
			'pied-piper-alt',
			'drupal',
			'joomla',
			'behance',
			'behance-square',
			'steam',
			'steam-square',
			'spotify',
			'deviantart',
			'soundcloud',
			'vine',
			'codepen',
			'jsfiddle',
			'rebel',
			'empire',
			'git-square',
			'git',
			'hacker-news',
			'tencent-weibo',
			'qq',
			'weixin',
			'share-alt',
			'share-alt-square' ],
		'Currency Icons': [ 'money',
			'eur',
			'gbp',
			'usd',
			'inr',
			'jpy',
			'rub',
			'krw',
			'btc',
			'try' ],
		'Medical Icons': [ 'user-md',
			'stethoscope',
			'hospital-o',
			'ambulance',
			'medkit',
			'h-square',
			'plus-square',
			'wheelchair' ] };
	var CLASS_NAME = "cloudo.widget.IconClassPicker";
	var IconBlockRenderer = $extend(dorado.widget.blockview.DefaultBlockRenderer, {
		padding: 2,
		constructor: function (options) {
			dorado.Object.apply(this, options);
		},
		getIconDom: function (dom) {
			var icon = dom.firstChild;
			if (icon == null) {
				icon = $DomUtils.xCreate({
					tagName: "DIV",
					className: "d-icon",
					style: {
						position: "absolute"
					}
				});
				dom.appendChild(icon);
			}
			return icon;
		},
		render: function (dom, arg) {
			var iconDom = this.getIconDom(dom), entity = arg.data;
			var className = entity["clazzName"];
			var maxWidth = dom.clientWidth - this.padding * 2;
			var maxHeight = dom.clientHeight - this.padding * 2;

			$fly(iconDom).css({
				left: this.padding,
				top: this.padding,
				width: maxWidth,
				height: maxHeight
			});

			$fly(dom).css({
				"border-width": "0px",
				margin: "0px"
			});
			$fly(iconDom).addClass(className)
		}
	});
	var silkItems = [];

	function buildItemTabConfig(caption, items, scrollMode) {
		return  {
			$type: "Control", caption: caption.replace(/Icons/, ""),
			control: {
				$type: "BlockView", items: items, scrollMode: scrollMode,
				blockHeight: 24, blockWidth: 24, fillLine: true,
				renderer: new IconBlockRenderer({padding: 2}),
				onBlockClick: selectIcon
			}
		}
	};

	var tabConfigs = [], tabIndex = 0;


	_.each(fontCategories, function (value, key) {
		var items = [];
		$.each(value, function (index) {
			var name = value[index];
			items.push({
				clazzName: "fa fa-" + name
			});
		});
		//
		tabConfigs.push(buildItemTabConfig(key, items, tabIndex++ == 0 ? "simple" : "lazyRender"));
	});

	$.each(silkNames, function (index) {
		var name = silkNames[index];
		silkItems.push({
			clazzName: name
		});
	});


	function selectIcon(self, arg) {
		var clazzName = arg.data.clazzName;
		dorado.widget.DropDown.findDropDown(self).close(clazzName);
	}

	var tabControl = new dorado.widget.TabControl(
		{
			$type: "TabControl",
			tabPlacement: "bottom",
			tabs: [
				{
					$type: "Control", caption: "Font Awesome",
					control: {
						$type: "VerticalTabControl", tabs: tabConfigs,
						tabColumnWidth: 120
					}
				},
				{
					$type: "Control", caption: "Silk",
					control: {
						$type: "BlockView", items: silkItems,
						blockHeight: 24, blockWidth: 24, fillLine: true,
						renderer: new IconBlockRenderer({padding: 2}),
						onBlockClick: selectIcon
					}
				},
				{
					$type: "Control",
					caption: "Project",
					control: {
						$type: "BlockView", scrollMode: "simple",
						blockHeight: 20, blockWidth: 20, fillLine: true,
						renderer: new IconBlockRenderer({
						}),
						onBlockClick: selectIcon,
						items: []
					}
				}

			]
		});


	var IconClassDropDown = $extend(dorado.widget.CustomDropDown, {
		$className: "IconClassDropDown",
		constructor: function (config) {
			var config = config || {};
			cloudo.Toolkits.merge(config, {
				control: {$type: "Container"},
				listener: {
					onOpen: function (self, arg) {
						var editor = arg.editor, container = self.get("control");
						if (container.get("children").length == 0) {
							container.addChild(tabControl);
						}
						if (editor instanceof dorado.widget.AbstractTextBox) {
							var dropDown = self;

							function filterFn() {
								if (dropDown.get("opened")) {
									dorado.Toolkits.setDelayedAction(dropDown, "$filterTimeId", function () {
										var value = editor.doGetText();
									}, 20);
								}
							}

							editor.addListener("onTextEdit", filterFn);
						}
						self._oldValue = editor.get("value");

						tabControl.refresh();
					}
				}
			});


			$invokeSuper.call(this, [config]);
			this._context = {
				tabControl: tabControl
			};
		}


	});

	var dropDown = new IconClassDropDown({
		height: 320, minWidth: 400, autoOpen: true
	});

	cloudo.widget.IconClassPicker = $extend(cloudo.widget.DefaultPropertyEditor, {
		$className: CLASS_NAME,
		constructor: function (config) {
			var config = config || {};
			config.trigger = dropDown;
			$invokeSuper.call(this, [config]);
		}
	});

	cloudo.propertyEditor.register("name[iconClass]", CLASS_NAME);

})();