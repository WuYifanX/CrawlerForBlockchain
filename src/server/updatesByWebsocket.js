const expressWs = require("./server");


const updatesByWebsocketTimeGap = require("./../../userConfig").updatesByWebsocketTimeGap;
let updatePool;

const sendMessageToClients = (data) => {
    const aWss = expressWs.getWss("/fetchUpdates");

    if (Array.from(aWss.clients).length) {
        aWss.clients.forEach(function (client) {
            client.send(JSON.stringify(data));
        });
    } else {
        console.log("并没有用户正在接收websocket");
    }
};

// 每30秒检查一次有没有数据在数据池里面，如果有的话就给updates；
// 如果没有数据池没有的话，那就不发信息;
const sendDataToUpdatePool = function (result) {
    const name = result.name;
    const data = result.data;
    const error = result.error || null;

    if (error) {
        if (!updatePool.error[name]) {
            updatePool.error[name] = {};
        }

        updatePool.error[name] = Object.assign({},updatePool.error[name], error);

    } else if (Object.keys(data).length) {
        if(!updatePool.data[name]){
            updatePool.data[name] = {};
        }
        updatePool.data[name] = Object.assign({},updatePool.data[name], data);
    }
};

const resetTheUpdatePool = function () {
    updatePool = Object.create(null);
    updatePool["data"] = {};
    updatePool["error"] = {};
    updatePool["type"] = "update";
};

const initTheUpdateByWebsocket = function () {
    resetTheUpdatePool();

    setInterval(function () {
        if (Object.keys(updatePool.error).length || Object.keys(updatePool.data).length) {
            console.log("有更新的内容");
            sendMessageToClients(updatePool);
            resetTheUpdatePool();
        }
        console.log("没有更新的内容")
    }, updatesByWebsocketTimeGap)
};


module.exports = {
    sendDataToUpdatePool,
    initTheUpdateByWebsocket
};