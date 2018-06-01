/**
 * Created by evanswu on 2018/5/26.
 */
// const HCCrawler = require('headless-chrome-crawler');

const PATH = './screenshot';


const crawlerForWebsite = (config) => {
    // (async () => {
    //     const crawler = await HCCrawler.launch({
    //         // Function to be evaluated in browsers
    //         evaluatePage: (() => ({
    //             title: $('title').text(),
    //         })),
    //         // Function to be called with evaluated results from browsers
    //         onSuccess: (result => {
    //             console.log(`Screenshot is saved as ${PATH}${result.options.saveAs} for ${result.options.url}.`);
    //             console.log(result);
    //         }),
    //         preRequest: (options => {
    //             if (!options.saveAs) return false; // Skip the request by returning false
    //             options.screenshot = { path: `${PATH}${options.saveAs}` };
    //             return true;
    //         }),
    //     });
    //     // Queue a request
    //     await crawler.queue({
    //         url: "https://twitter.com/Forbes",
    //         obeyRobotsTxt: false,
    //         // Emulate a tablet device
    //         saveAs: 'example-net.png'
    //     });
    //     // // Queue multiple requests
    //     // await crawler.queue(['https://example.net/', 'https://example.org/']);
    //     // // Queue a request with custom options
    //     // await crawler.queue({
    //     //     url: 'https://example.com/',
    //     //     // Emulate a tablet device
    //     //     device: 'Nexus 7',
    //     //     // Enable screenshot by passing options
    //     //     screenshot: {
    //     //         path: './../../screenshot/'
    //     //     },
    //     // });
    //     await crawler.onIdle(); // Resolved when no queue is left
    //     await crawler.close(); // Close the crawler
    // })();
};


module.exports = crawlerForWebsite;