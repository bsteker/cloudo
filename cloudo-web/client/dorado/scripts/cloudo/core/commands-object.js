/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-4-26
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var $model = cloudo.model;
	/**
	 * AbstractCommand
	 * @type {*}
	 */
	cloudo.AbstractCommand = $extend(cloudo.Command, {
		$className: "cloudo.AbstractCommand",
		constructor: function () {
			$invokeSuper.call(this, Array.prototype.slice.call(arguments));
		}
	});

	/**
	 * AbstractCommand
	 * @type {*}
	 */
	cloudo.PropertyCommand = $extend(cloudo.Command, {
		$className: "cloudo.PropertyCommand",

		constructor: function (node, property, oldProperty, parent, defaultValue) {
			$invokeSuper.call(this, Array.prototype.slice.call(arguments));
			this.node = node;
			this.parent = parent;
			this.property = property;
			this.oldProperty = oldProperty;
			this.defaultValue = defaultValue;
		}
	});

	/**
	 * 设置直接属性command定义
	 * @type {*}
	 */
	cloudo.NodePropertyCommand = $extend(cloudo.PropertyCommand, {
		$className: "cloudo.NodePropertyCommand",
		undo: function () {
			var holder = this.parent ? this.parent : this.node;
			if (this.oldProperty)
				holder.addProperty(this.oldProperty);
			else
				holder.removeProperty(this.property.name);
		},
		execute: function () {
			var holder = this.parent ? this.parent : this.node;
			var property = this.property, defaultValue = this.defaultValue, value = property.getValue();
			if (value && value != defaultValue)
				holder.addProperty(property);
			else
				holder.removeProperty(property.name);
		}
	});
	/**
	 * 设置布局属性Command定义
	 * @type {*}
	 */
	cloudo.LayoutPropertyCommand = $extend(cloudo.PropertyCommand, {
		$className: "cloudo.LayoutPropertyCommand",
		undo: function () {
			var holder = this.parent ? this.parent : this.node.getLayout();
			var name = this.property.name;
			if (name == 'type') {
				holder.removeAllProperty();
			}
			if (this.oldProperty) {
				holder.addProperty(this.oldProperty);
			} else {
				holder.removeProperty(name);
			}

		},
		execute: function () {
			var holder = this.parent ? this.parent : this.node.getLayout();
			var name = this.property.name;
			if (name == 'type') {
				holder.removeAllProperty();
			}


			holder.addProperty(this.property);
		}

	});
	/**
	 * 设置位置属性Command定义
	 * @type {*}
	 */
	cloudo.PositionPropertyCommand = $extend(cloudo.PropertyCommand, {
		$className: "cloudo.PositionPropertyCommand",
		undo: function () {
			var holder = this.parent ? this.parent : this.node.getPosition();
			if (this.oldProperty) {
				holder.addProperty(this.oldProperty);
			} else {
				holder.removeProperty(this.property.name);
			}

		},
		execute: function () {
			var holder = this.parent ? this.parent : this.node.getPosition();
			holder.addProperty(this.property);
		}

	});
	/**
	 * 设置位置属性Command定义
	 * @type {*}
	 */
	cloudo.AnchorPositionCommand = $extend(cloudo.Command, {
		$className: "cloudo.AnchorPositionCommand",
		constructor: function (node, potision, oldPosition) {
			this.node = node;
			this.potision = potision;
			this.oldPosition = oldPosition;
		}, undo: function () {
			this.node.setPosition(this.oldPosition)
		}, execute: function () {
			this.node.setPosition(this.potision)
		}

	});
	/**
	 * 操作节点接口
	 * 注：此类是个空类
	 * @type {*}
	 */
	cloudo.OperateNodeCommand = $extend(cloudo.Command, {
		$className: " cloudo.OperateNodeCommand"
	});

	//生成Id
	function generateID(_n) {
		var it = _n.allNode().iterator();
		while (it.hasNext()) {
			var n = it.next();
			generateID(n);
		}

		var newId = cloudo.Core.newId();

		var parentNode = _n.getParent();
		if (parentNode && parentNode.nodes) {
			var preNode = $nodeHelper.previous(_n);
			parentNode.removeNode(_n);
			_n.id = newId;
			if (preNode) {
				parentNode.addNode(_n, "after", preNode);
			} else {
				parentNode.addNode(_n, "begin", preNode);
			}
		} else {
			_n.id = newId;
		}


		var property = _n.findProperty('id');
		if (property) {
			var value = property.getValue(), i = 0;
			while ($model.findParentNode(value)) {
				value = i == 0 ? value : value.substring(0, value.length - 1);
				value += ++i;
			}
			property.setValue(value);
		}

		if (_n.rule == 'DataType') {
			var prop = _n.findProperty('name');
			if (!prop) {
				prop = new cloudo.model.Property('name', 'dataType');
				_n.addProperty(prop);
			}
			var value = prop.getValue(), i = 0;
			while ($model.findParentNode(value, "DataType")) {
				value = i == 0 ? value : value.substring(0, value.length - 1);
				value += ++i;
			}
			prop.setValue(value);

		}
	}

	/**
	 * 删除节点Command定义
	 * @type {*}
	 */
	cloudo.RemoveNodeCommand = $extend(cloudo.OperateNodeCommand, {
		$className: " cloudo.RemoveNodeCommand",
		constructor: function (node, parentNode) {
			this.node = node;
			this.parentNode = parentNode;
		}, undo: function () {
			//添加到父节点
			this.parentNode.addNode(this.node);
		}, execute: function () {
			this.parentNode.removeNode(this.node);
		}
	});
	/**
	 * 新增节点Command定义
	 * @type {*}
	 */
	cloudo.AddNodeCommand = $extend(cloudo.OperateNodeCommand, {
		$className: " cloudo.AppendNodeCommand",
		constructor: function (node, parentNode, insertMode, refNode) {
			this.node = node;
			this.parentNode = parentNode;
			this.insertMode = insertMode;
			this.refNode = refNode;
		}, undo: function () {
			this.parentNode.removeNode(this.node);
		}, execute: function () {
			this.parentNode.addNode(this.node, this.parentNode, this.insertMode, this.refNode);
		}
	});


	/**
	 * 移动节点Command定义
	 * @type {*}
	 */
	cloudo.MoveNodeCommand = $extend(cloudo.OperateNodeCommand, {
		$className: " cloudo.MoveNodeCommand",
		constructor: function (node, newParent, insertMode, refNode) {
			this.node = node;
			this.newParent = newParent;
			this.oldParent = node.getParent();
			this.newRefNode = refNode;
			this.newInsertMode = insertMode;
			var oldPrevious = $nodeHelper.previous(node);
			this.oldRefNode = oldPrevious;
			this.oldInsertMode = oldPrevious ? 'after' : 'begin';
		}, undo: function () {
			var insertMode = this.oldInsertMode, parent = this.oldParent;
			if (this.oldRefNode) {
				insertMode = insertMode || 'after';
			}
			parent.addNode(this.node, insertMode, this.oldRefNode);
		}, execute: function () {
			var insertMode = this.newInsertMode, parent = this.newParent;
			parent.addNode(this.node, insertMode, this.newRefNode);
		}
	});
	/**
	 * 移动节点Command定义
	 * @type {*}
	 */
	cloudo.ReplaceNodeCommand = $extend(cloudo.OperateNodeCommand, {
		$className: " cloudo.ReplaceNodeCommand",
		constructor: function (node, newNode) {
			this.node = node;
			this.parentNode = node.getParent();
			this.newNode = newNode;
			var previous = $nodeHelper.previous(node);
			this.refNode = previous;
			this.insertMode = previous ? 'after' : 'begin';
		}, undo: function () {
			var insertMode = this.insertMode, parentNode = this.parentNode;
			parentNode.removeNode(this.newNode);
			parentNode.addNode(this.node, insertMode, this.refNode);
		}, execute: function () {
			var insertMode = this.insertMode, parentNode = this.parentNode;
			parentNode.removeNode(this.node);
			parentNode.addNode(this.newNode, insertMode, this.refNode);
		}
	});

	cloudo.EventCommand = $extend(cloudo.Command, {
		$className: " cloudo.EventCommand"
	});
	cloudo.AddEventCommand = $extend(cloudo.EventCommand, {
		$className: "cloudo.AddEventCommand",
		constructor: function (node, newEvent, oldEvent) {
			this.node = node;
			this.newEvent = newEvent;
			this.eventName = newEvent.name;
			this.oldEvent = oldEvent;
		}, undo: function () {
			if (!this.oldEvent)
				this.node.removeEvent(this.newEvent.name);
			else
				this.node.addEvent(this.oldEvent);

		}, execute: function () {
			this.node.addEvent(this.newEvent);
		}
	});
	cloudo.RemoveEventCommand = $extend(cloudo.EventCommand, {
		$className: "cloudo.RemoveEventCommand",
		constructor: function (node, eventName) {
			this.node = node;
			this.eventName = eventName;
			this.event = this.node.findEvent(eventName);
		}, undo: function () {
			this.node.addEvent(this.event);
		}, execute: function () {
			this.node.removeEvent(this.eventName);
		}
	});


}).call(this);
