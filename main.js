var Crawler = require("crawler");
 
var c = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            console.log($("#appHubAppName").text());
        }
        done();
    }
});

c.queue('https://store.steampowered.com/app/70');