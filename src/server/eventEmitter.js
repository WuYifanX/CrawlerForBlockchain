/**
 * Created by evanswu on 2018/5/27.
 */
// get the reference of EventEmitter class of events module
const events = require('events');
//create an object of EventEmitter class by using above reference.
const eventEmitter = new events.EventEmitter();
//綁定事件函式
const sendDataToUpdatePool = require("./updatesByWebsocket").sendDataToUpdatePool;

const saveDataInDatabase = require("./database/index").saveData;
const readDataFromDatabase = require("./database/index").readData;

const dataCountFilter = function (data, displayCount = 5) {

    return data;

};

eventEmitter.on("fetchResult", function (result) {
    saveDataInDatabase(result, function (needStreamForClients) {
        if (needStreamForClients) {
            const data = dataCountFilter(readDataFromDatabase(result.type, result.name));
            sendDataToUpdatePool({
                name: result.name,
                data
            });
        }
    });
});

eventEmitter.on("fetchResultError", function (errorMessage) {
    console.log(errorMessage);
    sendDataToUpdatePool(errorMessage);
});

module.exports = eventEmitter;