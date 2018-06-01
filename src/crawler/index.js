/**
 * Created by evanswu on 2018/5/26.
 */

const crawlerForWebsite = require("./crawlerForWebside");
const crawlerForTwitter = require("./crawlerForTwitter");


const init = (mergeConfig) => {

    parseCrawlerTaskRouter(mergeConfig);

};

// Examples
// const mergeConfig = {
//     lino: {
//         website: {
//             ur: "https://lino.network/"
//         },
//         twitter: {
//             url: "https://twitter.com/lino_network"
//         },
//         facebook: null,
//         telegram: null,
//     }
// }
//
const parseCrawlerTaskRouter = (mergeConfig) => {

// Examples
//taskEntry = ["lino", {
//         website: {
//             ur: "https://lino.network/"
//         },
//         twitter: {
//             url: "https://twitter.com/lino_network"
//         },
//         facebook: null,
//         telegram: null,
//     }];

    Object.entries(mergeConfig).forEach((taskEntry) => {
        let keyName = taskEntry[0], valueObject = taskEntry[1];


        Object.entries(valueObject).forEach((typeEntry) => {


            let type = typeEntry[0], typeContent = typeEntry[1];

            if (!typeContent) return null;


            const crawlerConfig = Object.assign({}, {
                keyName
            }, typeContent);

            // exampleCrawlerConfig = {
            //     keyName: "lino",
            //     ur: "https://lino.network/"
            // };
            switch (type) {
                case "website":
                    // crawlerForWebsite(crawlerConfig);
                    break;
                case "twitter":
                    crawlerForTwitter(crawlerConfig);
                    break;
                case "facebook":
                    break;
                case "telegram":
                    break;
                default:
                    break;
            }
        })


    })
};


module.exports = init;

