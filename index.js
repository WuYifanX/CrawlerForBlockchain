const mergeConfig = require("./crawlerConfig");
const crawlerInit = require("./src/crawler/index");
const crawlerTimer = require("./src/crawler/crawlerTimer");

const initDatabase = require("./src/server/database/index").initDatabase;
const initTheUpdateByWebsocket = require("./src/server/updatesByWebsocket").initTheUpdateByWebsocket;

const init = () => {

    initDatabase();
    initTheUpdateByWebsocket();

    //随机开始爬取
    crawlerTimer(() => {
        crawlerInit(mergeConfig);
    });

};

module.exports = init;