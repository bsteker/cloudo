/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-7-16
 * Time: 下午1:32
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var CLASS_NAME = "cloudo.widget.IconPicker", IMAGE_URL = ">skin>cloudo/images/icons_dorado.gif";
    cloudo.widget.IconPicker = $extend(cloudo.widget.DefaultPropertyEditor, {
        $className: CLASS_NAME,
        constructor: function (config) {
            var config = config || {};
            cloudo.Toolkits.merge(config, {
                listener: {
                    onAttributeChange: function (self, arg) {
                        var name = arg.attribute;
                        if (name === "value") {
                            self.refreshIcon();
                        }
                    },
                    onReady: function (self) {
                        self.refreshIcon();
                    },
                    onTextEdit: function (self) {
                        self.refreshIcon();
                    }
                },
                trigger: {
                    $type: "CustomDropDown", autoOpen: true, minHeight: 340,
                    control: {
                        $type: "Image", stretchMode: "none", image: IMAGE_URL,
                        onDoubleClick: function (self) {
                            var position = $(self._dom).position(),
                                offsetX = event.offsetX - position.left,
                                offsetY = event.offsetY - position.top;
                            offsetX = offsetX < 20 ? "0px" : ((offsetX - offsetX % 20) * -1) + "px";
                            offsetY = offsetY < 20 ? "0px" : ((offsetY - offsetY % 20) * -1) + "px";
                            var value = "url(" + IMAGE_URL + ") " + offsetX + " " + offsetY;
                            dorado.widget.DropDown.findDropDown(self).close(value);
                        }
                    }
                }
            });

            $invokeSuper.call(this, [config]);
        },
        refreshIcon: function () {
            var dom = this._dom, iconDom = $(dom).find(".c-icon-picker-value-icon");
            $(dom).find("input").css("text-indent", "20px");
            if (iconDom.length === 0) {
                iconDom = $DomUtils.xCreate(
                    {
                        tagName: "SPAN",
                        className: "c-icon-picker-value-icon"
                    }
                );
                $(dom).prepend(iconDom);
            } else {
                iconDom = iconDom[0];
            }
            $DomUtils.setBackgroundImage(iconDom, this.get("value"));
        }
    });
    //cloudo.propertyEditor.register("name[icon]", CLASS_NAME);
})();