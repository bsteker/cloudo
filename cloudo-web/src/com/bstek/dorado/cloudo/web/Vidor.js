/** @Controller */

window.editor = {
	saveListeners: [],
	isClean: function () {
		return cloudo.viewConfig.isClean();
	},
	markClean: function () {
		return cloudo.viewConfig.markClean();
	},
	save: function () {
		cloudo.portal.save();
		var listeners = editor.saveListeners;
		for (var i = 0; i < listeners.length; i++) {
			var listener = listeners[i];
			listener();
		}
	},
	undo: function () {
		$commandExecutor.undo();
	},
	redo: function () {
		$commandExecutor.redo();
	},
	canUndo: function () {
		return $commandExecutor.canUndo();
	},
	canRedo: function () {
		return $commandExecutor.canRedo();
	},
	onChange: function (fn) {
		cloudo.viewConfig.onClean(fn);
		$commandExecutor.onExecute(fn);
	},
	onSave: function (fn) {
		editor.saveListeners.push(fn);
	},
	getStatus: function () {
		return {
			isClean: this.isClean(),
			canUndo: this.canUndo(),
			canRedo: this.canRedo()
		};
	}

};
// @Bind view.onCreate
!function(self, arg) {
	var userData = self.get('userData'),initData;
	initData = userData.initData;
	cloudo.run(self,initData);
}