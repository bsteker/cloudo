/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-3-4
 * Time: 下午1:53
 * To change this template use File | Settings | File Templates.
 */
(function () {
    var selections = {
        items: [], size: 0, _keyMap: {},
        _insert: function (node) {
            this.items.push(node);
            this.size++;
            this._keyMap[node.id] = node;
        },
        /**
         * 插入元素
         *
         * @param nodes 此参数存在多态性
         * @param options 次参数目前可设定 merge
         */
        add: function (nodes, options) {
            if (!nodes) {
                return
            }
            ;

            var options = options || {merge: true}, itemList = [];
            if ($.isArray(nodes)) {
                itemList = nodes;
            } else {
                itemList.push(nodes);
            }
            if (!options.merge) {
                this.clear();
            }
            for (var i = 0; i < itemList.length; i++) {
                var node = itemList[i];
                if (typeof node === "string") {
                    node = cloudo.model.findNode(node);
                }
                if (node && !this.find(node.id)) {
                    this._insert(node);
                }
            }
            itemList.length > 0 && this.fireListener();
        },
        pluck: function (attr) {
            var array = this.items, attrs = [];
            for (var i = 0; i < array.length; i++) {
                var v = array[i][attr];
                v && attrs.push(v);
            }
            return attrs;
        },
        remove: function (node) {
            var i = this.items.remove(node);
            if (i >= 0) {
                this.size--;
                delete this._keyMap[node.id];
            }
            return i;
        },
        removeAt: function (i) {
            if (i >= 0 && i < this.size) {
                var node = this.items[i];
                this.remove(node);
                return node;
            }
            return null;
        },
        indexOf: function (node) {
            return this.items.indexOf(node);
        },
        at: function (index) {
            return  this.items[index];
        },
        find: function (nid) {
            return this._keyMap[nid];
        },
        first: function () {
            return this.at(0);
        },
        last: function () {
            return this.at(this.items.length - 1);
        },
        clear: function () {
            this.items = [], this.size = 0, this._keyMap = {};
        },
        iterator: function (from) {
            var start = this.items.indexOf(from);
            if (start < 0) start = 0;
            return new dorado.util.ArrayIterator(this.items, start);
        },
        each: function (fn, scope) {
            var array = this.items;
            for (var i = 0; i < array.length; i++) {
                if (fn.call(scope || array[i], array[i], i) === false) {
                    return i;
                }
            }
        },
        toArray: function () {
            return this.items.slice(0);
        },
        addListener: function (listener) {
            if (!this._listeners) {
                this._listeners = [];
            }
            this._listeners.push(listener);
        },
        fireListener: function (arg) {
            var map = this;

            function doFire() {
                if (map._listeners) {
                    map._listeners.each(function (listener) {
                        return listener.call(map, arg);
                    });
                }
            }

            this._CHANGE_TIMER && clearTimeout(this._CHANGE_TIMER);
            this._CHANGE_TIMER = setTimeout(function () {
                doFire();
            }, 50);
        },
        getPasteNodes: function () {
            var ids = this.pluck("id"), operateNodes = [];
            this.each(function (node) {
                var url = node.url(), len = ids.length,
                    addable = true, parentIds = url.split("/").slice(1);
                while (len--) {
                    if (ids[len] !== node.id && parentIds.indexOf(ids[len]) >= 0) {
                        addable = false;
                        break;
                    }
                }

                if (addable) {
                    operateNodes.push(node);
                }
            });

            return operateNodes;
        }


    };

    cloudo.selections = selections;
    window.$selections = selections;

})();