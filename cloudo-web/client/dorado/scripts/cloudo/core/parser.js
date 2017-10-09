/**
 * Created with JetBrains WebStorm. User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-5-17 Time: 下午2:33 To change this template use File | Settings | File
 * Templates.
 */
(function() {
	var _CONST = cloudo.Constant;

	var parser = {
		parseEntity : function(obj) {
			if (obj) {
				var entity = new cloudo.model.Entity();
				// $.each(obj, function (n) {
				// var v = parser.parseProperty(n, obj[n]);
				// v && entity.addProperty(v);
				// });



				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						var value=obj[key];
						var v = parser.parseProperty(key, value);
						v && entity.addProperty(v);
					}
				}
//				_.each(obj, function(value,key) {
//					var v = parser.parseProperty(key, value);
//					v && entity.addProperty(v);
//				})
				return entity;
			}
		},
		parseCollection : function(arry) {
			var collection = new cloudo.model.Collection();
			for ( var i = 0, len = arry.length; i < len; i++) {
				var obj = arry[i], el;
				if (obj instanceof Object && !(obj instanceof Date)) {
					el = parser.parseEntity(obj);
				} else {
					el = new cloudo.model.Value(obj);
				}
				collection.addElement(el);
			}
			return collection;

		},
		parseProperty : function(name, obj) {
			var prop = new cloudo.model.Property(name), v;
			if (obj && obj instanceof Object && !(obj instanceof Date)) {
				if (obj instanceof Array) {
					v = parser.parseCollection(obj);
				} else {
					v = parser.parseEntity(obj);
				}
			} else {
				v = obj;
			}
			prop.setValue(v);
			return prop;
		},
		parseLayout : function(obj) {
			if (obj) {
				var layout = new cloudo.model.Layout();
				$.each(obj, function(n) {
					var v = parser.parseProperty(n, obj[n]);
					v && layout.addProperty(v);
				});
				return layout;
			}

		},
		parsePositon : function(obj) {
			if (obj) {
				var position = new cloudo.model.Position();
				$.each(obj, function(n) {
					var v = parser.parseProperty(n, obj[n]);
					v && position.addProperty(v);
				});
				return position;
			}
		},
		parseEvent : function(obj) {
			if (obj) {
				var name = obj.name, signature = obj.signature, code = obj.text;
				var evt = new cloudo.model.Event(name, signature
						|| _CONST.DEFAULT_EVENT_PARAMETERS, code);
				return evt;
			}
		},
		parseNode : function(obj) {
			if (!obj)
				return null;
			var node = new cloudo.model.Node(obj.rule || obj.rid), attrs = obj.attrs
					|| obj.properties;
			if (attrs) {
				$.each(attrs, function(n) {
					var value = parser.parseProperty(n, attrs[n]);
					value && node.addProperty(value);
				});
			}

			var layout = obj.layout;
			layout && node.setLayout(parser.parseLayout(layout));

			var position = obj.position;
			position && node.setPosition(parser.parsePositon(position));

			var nodes = obj.nodes;
			if (nodes) {
				for ( var i = 0; i < nodes.length; i++) {
					var subNode = parser.parseNode(nodes[i]);
					subNode && node.addNode(subNode);
				}
			}
			var events = obj.events;
			if (events) {
				for ( var i = 0; i < events.length; i++) {
					var evt = parser.parseEvent(events[i]);
					evt && node.addEvent(evt);
				}
			}

			if (obj.uv_attrs) {
				node.uv_attrs = obj.uv_attrs;
			}

			if (obj.meta) {
				node.meta = obj.meta;
			}
			return node;
		}

	};

	cloudo.Parser = parser;

})();