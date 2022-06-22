var Crawler = require("crawler");

//Checks if path is a steam game page path like /app/70/
isValidPath = function (path) {
  const regex = /^\/app\/(\d+)\/?/;
  let isValid = regex.test(path);
  return isValid;
};

var c = new Crawler({
  maxConnections: 10,
  headers: {
    Cookie: "birthtime=567986401; lastagecheckage=1-January-2001",
  }, //To avoid steam's age check redirect
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let path = res.request?.uri?.path;

      if (isValidPath(path)) {
        let $ = res.$;
        let date = $(".date").text();

        console.log(date);
      } else {
        console.log("Invalid URL: " + res.request?.uri?.href);
      }
    }
    done();
  },
});

c.queue([
  "https://store.steampowered.com/app/379720/",
  { html: '<div class="date">1 Jan, 1991</div>' },
]);
