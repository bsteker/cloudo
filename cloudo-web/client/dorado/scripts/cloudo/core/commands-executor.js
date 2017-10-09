/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-4-26
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */
(function () {

	var CommandExecutor = $class({
		$className: "CommandExecutor",
		constructor: function () {
			this._commandStack = new cloudo.CommandStack();
		},
		/**
		 *
		 * @returns {Boolean}
		 */
		canRedo: function () {
			return this._commandStack.canRedo();
		},
		getIndex: function () {
			return this._commandStack._data_.index;
		},
		/**
		 *
		 * @returns {Boolean}
		 */
		canUndo: function () {
			return this._commandStack.canUndo();
		},
		add: function (command) {
			this._commandStack.add(command);
			var args = {
				event: 'add',
				command: command
			}
			this.fireOnExecute(args);
		},
		/**
		 * 执行redo
		 */
		redo: function () {
			if (this.canRedo()) {
				var command = this._commandStack.redo();
				var args = {
					event: 'redo',
					command: command
				}
				this.fireOnExecute(args);
			}
		},
		/**
		 * 执行undo
		 */
		undo: function () {
			if (this.canUndo()) {
				var command = this._commandStack.undo();
				var args = {
					event: 'undo',
					command: command
				}
				this.fireOnExecute(args);
			}
		},
		/**
		 * 内部方法
		 * 触发
		 * 当执行redo undo之后触发此方法
		 * @param args                                                                                                                                                                                  h
		 */
		fireOnExecute: function (args) {
			var executor = this;
			if (this.onExecuteListeners && !this._disableListeners) {
				this.onExecuteListeners.each(function (listener) {
					return listener.call(executor, args);
				});
			}
		},
		/**
		 * 注册一个在Command执行之后触发的监听器。
		 * @param {Function} listener 监听器。
		 */
		onExecute: function (listener) {
			if (!this.onExecuteListeners) {
				this.onExecuteListeners = [];
			}
			this.onExecuteListeners.push(listener);
		},
		/**
		 * 禁用所有事件的监听器。
		 */
		disableListeners: function () {
			this._disableListeners = true;
		},

		/**
		 * 启用所有事件的监听器。
		 */
		enableListeners: function () {
			this._disableListeners = false;
		}
	});

	cloudo.commandExecutor = new CommandExecutor();


	window.$commandExecutor = cloudo.commandExecutor;

})();



