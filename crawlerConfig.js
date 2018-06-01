/**
 * 这个config是用来配置如何爬取数据
 * @type {{website: null, twitter: null, facebook: null, telegram: null}}
 */

const crawerDefaultConfigForEveryProject = {
    // needHeadlessBrowser:false,
    website: null,
    twitter: null,
    facebook: null,
    telegram: null,
};

const crawlerConfig = {
    // evanswu5: {
    //     website: {
    //         ur: "https://twitter.com/evanswu5"
    //     },
    //     twitter: {
    //         url: "https://twitter.com/evanswu5",
    //         user_id: "evanswu5"
    //     }
    // }
    lino: {
        website: {
            ur: "https://lino.network/"
        },
        twitter: {
            url: "https://twitter.com/lino_network",
            user_id: "Lino_Network"
        }
    },
    ton: {
        website: {
            url: "https://ico-telegram.org/"
        }

    },
    libra: {
        website: {url: "https://www.libra.tech/"},
        twitter: {
            url: "https://twitter.com/librat3ch",
            user_id: "LibraT3ch"
        }
    },
    mobileCoin: {
        website: {url: "https://www.mobilecoin.com/"},
        twitter: {
            url: "https://twitter.com/mobilecoinone",
            user_id: "mobilecoinone"
        },
        facebook: {url: "https://www.facebook.com/MobileCoin-161656367781693/"}
    },
    mithrill: {
        website: {url: "https://mith.io/"},
        twitter: {
            url: "https://twitter.com/MithrilToken",
            user_id: "MithrilToken"
        }
    },
    origo: {
        website: {url: "https://terracoin.io/"},
        twitter: {
            url: "https://twitter.com/OrigoNetwork",
            user_id: "OrigoNetwork"
        }
    },
    terra: {
        website: {url: "https://terracoin.io/"},
        twitter: {
            url: "https://twitter.com/terracoin_trc",
            user_id: "Terracoin_TRC"
        }
    },
    republicProtocol: {
        website: {url: "https://republicprotocol.com/"},
        twitter: {
            url: "https://twitter.com/republicorg",
            user_id: "republicorg"
        }
    },
    cortex: {
        website:{url:"http://www.cortexlabs.ai/"},
        twitter:{
            url:"https://twitter.com/CTXCBlockchain",
            user_id:"CTXCBlockchain"
        }
    },
    data: {
        website:{url:"https://data.eco/"},
        twitter:{
            url:"https://twitter.com/@Blockchain_Data",
            user_id:"Blockchain_Data"
        }
    },
    zilliqa: {
        website:{url:"https://www.zilliqa.com/"},
        twitter:{
            url:"https://twitter.com/zilliqa",
            user_id:"zilliqa"
        }
    },
    eximChain: {
        website:{url:"https://www.eximchain.com/"},
        twitter:{
            url:"https://twitter.com/EximchainEXC",
            user_id:"EximchainEXC"
        }
    },
    timeQuanTum: {
        website:{url:"https://www.quantumproject.org/"},
        twitter:{
            url:"https://twitter.com/qauProject",
            user_id:"QAUProject"
        }
    },
    // perlin: {
    // },
    pchian: {
        website:{url:"https://pchain.org/"},
        twitter:{
            url:"https://twitter.com/pchain_org",
            user_id:"pchain_org"
        }
    },
    // oasis: {
    // },
    // SEC: {},
    // CFTC: {},
    // CME: {},
    // coinDesk: {},
    // jinSe: {},
    // eightBit: {}
};

const mergeConfig = {};

Object.entries(crawlerConfig).map((entry) => {
    mergeConfig[entry[0]] = Object.assign({}, crawerDefaultConfigForEveryProject, entry[1])
});


module.exports = mergeConfig;





