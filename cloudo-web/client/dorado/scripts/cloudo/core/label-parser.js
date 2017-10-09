/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-4-29
 * Time: 下午12:25
 * To change this template use File | Settings | File Templates.
 */

(function () {
    var defaultParser = {
        parse: function (node) {
            var rule = cloudo.Rule.get(node.rid);
            var lps = rule.labelProperties, labelProp, label;

            if (!lps) {
                lps = cloudo.Constant.DEFAULT_RULE_LABEL_PROPERTIES;
            }

            for (var i = 0; i < lps.length; i++) {
                labelProp = node.findProperty(lps[i]);
                if (labelProp) {
                    label = labelProp.value;
                    break;
                }
            }

            return label || rule.label;
        }
    };
    cloudo.labelParser = {
        _ALL: {},

        register: function (rid, fun) {
            this._ALL[rid] = fun;
        },

        unregister: function (rid) {
            delete this._ALL[rid];
        },

        get: function (rid) {
            return this._ALL[rid] || defaultParser;
        }
    }


})();