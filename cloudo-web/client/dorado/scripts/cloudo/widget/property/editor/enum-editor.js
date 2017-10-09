/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-9
 * Time: 上午11:32
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var CLASS_NAME = "cloudo.widget.EnumValueEditor";
    cloudo.widget.EnumValueEditor = $extend(cloudo.widget.DefaultPropertyEditor, {
        $className: CLASS_NAME,
        constructor: function (config) {
            var config = config || {};
            config.trigger = {
                $type: "ListDropDown", autoOpen: true,
                beforeExecute: function (self, arg) {
                    var editor = arg.editor,
                        editorMeta = editor.getEditorMeta();
                    self.set("items", editorMeta.enumValues);
                }
            };
            $invokeSuper.call(this, [config]);
        }
    });
    cloudo.propertyEditor.register("editorType[enum]", CLASS_NAME);

})();