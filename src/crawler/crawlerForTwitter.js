const Twitter = require('twitter');
const userConfig = require("./../../userConfig.js");

const eventEmitter = require("./../server/eventEmitter");

const client = new Twitter({
    consumer_key: userConfig.twitterToken.TWITTER_CONSUMER_KEY,
    consumer_secret: userConfig.twitterToken.TWITTER_CONSUMER_SECRET,
    access_token_key: userConfig.twitterToken.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: userConfig.twitterToken.TWITTER_ACCESS_TOKEN_SECRET
});


const crawlerForTwitter = (config) => {

    // screen_name是twitter名称,count是每次爬取多少条
    const params = {screen_name: config.user_id, count: 3};

    client.get('statuses/user_timeline', params)
        .then((tweets) => {
            tweets.map((tweet) => {
                eventEmitter.emit('fetchResult', {
                    type: "twitter",
                    name: config.keyName,
                    text: tweet.text,
                    time: tweet.created_at
                });

            });
        })
        .catch((error) => {
            eventEmitter.emit("fetchResultError", {
                text: null,
                time: null,
                name: config.keyName,
                error:error
            })

        });
};


module.exports = crawlerForTwitter;

