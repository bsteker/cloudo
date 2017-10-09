/**
 * Cloudo 所见即所得编辑器管理器
 * 注：
 * <pre>
 *
 * </pre>
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 13-11-15
 * Time: 下午2:38
 * To change this template use File | Settings | File Templates.
 */
(function () {


    var TAB_META = {
        direct: {
            name: "direct", caption: "属性",
            iconClass: "c-tab-icon fa fa-th-list"
        },
        layout: {
            name: "layout", caption: "布局",
            iconClass: "c-tab-icon fa fa-credit-card"
        },
        position: {
            name: 'position', caption: '位置',
            iconClass: "c-tab-icon fa fa-map-marker"
        },
        eventBox: {
            name: 'eventBox', caption: '事件',
            iconClass: "c-tab-icon fa fa-bolt"
        }
    };


    var manager = {
        init: function () {
            manager.directTabel = new cloudo.widget.DirectPropertyTabel();
            manager.layoutTabel = new cloudo.widget.LayoutPropertyTabel();
            manager.positionTabel = new cloudo.widget.PositionPropertyTabel();
            manager.eventBox = new cloudo.widget.EventTabel();
            var tabControl = new dorado.widget.TabControl({
                listener: {
                    onTabChange: function (self, arg) {
                        var tab = arg.newTab;
                        var editor = tab.get("control");

                        editor && editor.refreshData();
                    }
                }
            });

            manager._tabControl = tabControl;
            $.each(TAB_META, function (name, meta) {
                var tabelName = name;
                if (tabelName !== "eventBox") {
                    tabelName += "Tabel";
                }

                var tabConfig = {control: manager[tabelName]};
                cloudo.Toolkits.merge(tabConfig, meta);
                var tab = new dorado.widget.tab.ControlTab(tabConfig);
                tabControl.addTab(tab);
                manager[name] = tab;
            });


        },
        getCurrent: function () {
            var tabControl = manager.getTabControl();
            var currentTab = tabControl.get("currentTab");
            return  currentTab.get("control");
        },
        setCurrent: function (name) {
            var tab = manager[name + "Tab"];
            var tabControl = manager.getTabControl();
            tabControl.set("currentTab", tab);
        },
        getTabel: function (name) {
            var tabelName = name === "eventBox" ? name : name + "Tabel";
            return  manager[tabelName];
        },
        getTabControl: function () {
            return manager._tabControl;
        },
        refreshCurrentData: function () {
            var currentEditor = manager.getCurrent();
            currentEditor.refreshData();
        }
    }


    cloudo.propertyEditorManager = manager;
    window.$propertyEditorManager = manager;

})
();