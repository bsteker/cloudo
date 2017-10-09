/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-26
 * Time: 上午11:06
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var CLASS_NAME = "cloudo.widget.MultipleValueEditor";
    cloudo.widget.MultipleValueEditor = $extend([dorado.widget.TagListEditor], {
        $className: CLASS_NAME,
        ATTRIBUTES: {
            autoPost: {
                defaultValue: true
            },
            propertyType: {
                defaultValue: cloudo.propertyEditor.propertyTypes.DIRECT
            },
            /**
             * 规则ID
             * 可选值：Node.rid,Layout.rid,Position.rid
             */
            rid: {},
            /**
             * 属性名称
             */
            name: {},
            /**
             * parent属性名称
             */
            parentName: {},
            /**
             * 部分属性编辑器需通过node获得初始化数据
             * 如:dataPath的编辑器需要通过node的dataSet或者dataType获得dataPath树
             */
            node: {}
        },
        getEditorMeta: function () {
            var rid = this.get("rid"), name = this.get("name"),
                parentName = this.get("parentName"), propertyMeta;

            propertyMeta = cloudo.Rule.getProperty(rid, name, parentName);
            if (propertyMeta && propertyMeta.editorType) {
                return  cloudo.Rule.getEditorMeta(propertyMeta.editorType);
            }
        },

        commit: function () {
            if (this.get("autoPost")) {
                var value = this.getValue(),
                    propertyType = this.get("propertyType"),
                    propertyName = this.get("name"),
                    parentName = this.get("parentName"),
                    node = this.get("node");
                var property = new cloudo.model.Property(propertyName, value);
                var sendFn = cloudo.viewConfig["set" + propertyType + "Property"];
                sendFn(node, property, parentName);
            }
        },
        constructor: function (config) {
            $invokeSuper.call(this, [config]);
            var meta = this.getEditorMeta(), enumValues = meta.enumValues;
            // Trigger Dorado基础Trigger和用户自定义Trigger的集合
            if (meta.rule === "Trigger") {
                cloudo.model.eachKey(function (nid, node) {
                    var rid = node.rid;
                    if (/.*Trigger|DropDown$/.exec(rid)) {
                        var controlId = node.getPropertyValue('id');
                        controlId && enumValues.push(controlId);
                    }
                });
            }
            this.set("availableTags", enumValues);
        },
        getValue: function () {
            var value = this.get("value");
            return value;
        }
    });
    cloudo.propertyEditor.register("editorType[multiple]", CLASS_NAME);
    cloudo.propertyEditor.register("rid[DataPilot].name[itemCodes]", CLASS_NAME);
    cloudo.propertyEditor.register("name[trigger]", CLASS_NAME);
})();