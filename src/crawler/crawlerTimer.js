const defaultCrawlerSpeed = require("./../../userConfig").defaultCrawlerSpeed;

//默认是5分钟爬取一次
const crawlerTimerEmitter = (callback, timeGap = defaultCrawlerSpeed) => {

    //第一次运行首先运行一次；
    callback();
    //然后再根据随机种子的时间随机查询
    setInterval(callback, randomTimerGap(timeGap));
};


// randomeSeed是随机种子，现在是一分钟
const randomTimerGap = (timeGap, randomSeed = 6000) => {
    return timeGap + randomSeed * Math.random();
};

module.exports = crawlerTimerEmitter;