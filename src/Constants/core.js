const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

var data = [];
var JPname = "";
var ENname = "";
var episodes = 0;
var aired = "";
var producers = [];
var studios = [];
var genres = [];
var description = "";

class Anime {
    constructor(JPname, ENname, episodes, aired, producers, studios, genres) {
        this.JPname = JPname;
        this.ENname = ENname;
        this.episodes = episodes;
        this.aired = aired;
        this.producers = producers;
        this.studios = studios;
        this.genres = genres;
        this.description = description;
    }
}


var headers = {
    "User-Agent": "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
};

function searchImages(limit) {
    request(`https://myanimelist.net/topanime.php?limit=${limit}`, {headers: headers}, (error, response, body) => {
        let wait = 60000;

        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            $('.hoverinfo_trigger').map(function(index, elem) {
                if (index % 2 == 1) {
                    return 0;
                }

                let link = $(elem).attr("href");
                let options = {
                    url: link,
                    timeout: 1000000
                }

                setTimeout(() => {
                    getData(options);
                    console.log("Pass");
                }, wait.toString());

                wait = wait + 10000;
            });
        }
    });
}

function getData(options) {
    request(options, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            $('div[class="spaceit_pad"]').map(function(index, elem) {
                let stop = false;

                let _data = $(elem).text();
                if (stop == true) {
                    return 0;
                }

                if (_data.includes("Japanese")) {
                    JPname = _data.split(":")[1];
                } else if (_data.includes("English")) {
                    ENname = _data.split(":")[1];
                } else if (_data.includes("Episodes")) {
                    episodes = parseInt(_data.split(":")[1]);
                } else if (_data.includes("Aired")) {
                    aired = _data.split(":")[1];
                } else if (_data.includes("Producers")) {
                    $(elem).find('a').map(function(index, elem) {
                        producers.push($(elem).attr("title"));
                    });
                } else if (_data.includes("Studios")) {
                    $(elem).find('a').map(function(index, elem) {
                        studios.push($(elem).attr("title"));
                    });
                } else if (_data.includes("Genres")) {
                    $(elem).find('a').map(function(index, elem) {
                        genres.push($(elem).attr("title"));
                    });

                    stop = true;
                }
            });

            let anime = new Anime(JPname, ENname, episodes, aired, producers, studios, genres);
            data.push(anime);

            JPname = "";
            ENname = "";
            episodes = "";
            aired = "";
            producers = [];
            studios = [];
            genres = [];

            fs.writeFileSync("data.json", JSON.stringify(data, null, '\t'));
        }
    });
}

for (let limit = 0; limit < 7; limit++) {
    searchImages(limit * 50);
}
