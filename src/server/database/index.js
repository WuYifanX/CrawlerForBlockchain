const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const fs = require("fs");


const adapter = new FileSync('./database.json');
const db = low(adapter);

const initDatabase = () => {
    // Set some defaults (required if your JSON file is empty)
    const isDBExist = fs.existsSync("database.json");
    if (!isDBExist) {
        db.defaults({
            website: {},
            twitter: {},
            facebook: {},
            telegram: {}
        })
            .write()
    }
};

const saveData = (result, callback) => {
    const oldData = db.get(result.type)
        .cloneDeep()
        .value();

    let needStreamForClients = false;
    // 时间戳表示是唯一的key
    const key = new Date(result.time).getTime();

    //新建项目名称；
    if (!oldData[result.name]) {
        oldData[result.name] = {};
    }

    if (!oldData[result.name][key]) {

        needStreamForClients = true;
        oldData[result.name][key] = {
            name: result.name,
            text: result.text,
            time: result.time
        }
    }

    db.set(result.type, oldData)
        .write();

    callback(needStreamForClients);
};

const readData = (type, name) => {
    let result = db.getState();

    if (type) {
        result = result[type];
        if (name) {
            result = result[name];
        }
    }

    return result;
};

module.exports = {
    saveData,
    readData,
    initDatabase
};

