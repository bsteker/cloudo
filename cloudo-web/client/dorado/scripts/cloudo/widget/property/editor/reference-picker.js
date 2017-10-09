/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-9
 * Time: 上午11:57
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var CLASS_NAME = "cloudo.widget.ReferencePicker";
	cloudo.widget.ReferencePicker = $extend(cloudo.widget.DefaultPropertyEditor, {
		$className: CLASS_NAME,
		constructor: function (config) {
			var config = config || {};
			config.trigger = {
				$type: "ListDropDown", dynaFilter: true, autoOpen: true,
				beforeExecute: function (self, arg) {
					var editor = arg.editor, editorMeta = editor.getEditorMeta(), items = [];
					cloudo.model.eachKey(function (nid, n) {
						var rid = n.rid, isAction = editorMeta.rule == "Action";
						if ((!isAction && rid == editorMeta.rule) || (isAction && /.*Action$/.exec(rid))) {
							var value = n.getPropertyValue(editorMeta.property);
							value && items.push(value);
						}
					});
					self.set("items", items);
				}
			}
			$invokeSuper.call(this, [config]);
		}
	});
	cloudo.propertyEditor.register("editorType[reference]", CLASS_NAME);
})();