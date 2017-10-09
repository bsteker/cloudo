/**
 * Created with JetBrains WebStorm.
 * User: Alex Tong(mailto:alex.tong@bstek.com)
 * Date: 14-4-9
 * Time: 上午9:52
 * To change this template use File | Settings | File Templates.
 */
(function () {
    cloudo.onInit(function () {
        function socketConnect() {
            var socket = io.connect("http://" + "localhost" + ":" + window.location.port);
            socket.on("connect", function () {
                socket.emit("editor register", null, function (token) {
                    socket._token = token;
                });
            });
            socket.on("get view config", function (data) {
                var code = cloudo.viewConfig.output();
                socket.emit("draw all", {
                    token: socket._token,
                    targetToken: data.token,
                    code: code
                });
            });
            cloudo.socket = socket;
        }

        if (cloudo.Settings.socketConnect) {
            socketConnect();
        }
    });
})();