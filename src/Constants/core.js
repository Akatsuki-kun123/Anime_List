const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

var data = [];
var interval = 0;

class Anime {
    constructor(JPname, ENname, image, aired, description, episodes, characters, producers, studios, genres) {
        this.JPname = JPname;
        this.ENname = ENname;
        this.image = image;
        this.aired = aired;
        this.description = description;
        this.episodes = episodes;
        this.characters = characters;
        this.producers = producers;
        this.studios = studios;
        this.genres = genres;
    }
}

class Character {
    constructor(name, image, voiceActor) {
        this.name = name;
        this.image = image;
        this.voiceActor = voiceActor;
    }
}

class VoiceActor {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
}

var headers = {
    "User-Agent": "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
};

function searchImages(limit) {
    request(`https://myanimelist.net/topanime.php?limit=${limit}`, {headers: headers}, (error, response, body) => {
        let wait = 0;

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
    let JPname = "",
        ENname = "",
        image = "",
        aired = "",
        description = "",
        episodes = 0,
        characters = [],
        producers = [],
        studios = [],
        genres = [];

    request(options, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            $('div[class="detail-characters-list clearfix"]').first().find('table').map(function(index, elem) {
                if (index % 2 == 1) {
                    return 0;
                }

                let charName = "",
                    charImage = "",
                    VA = new VoiceActor();
                
                $(elem).find('td').map(function(index, elem) {
                    if (index == 0) {
                        charImage = $(elem).find('img').attr('data-src');
                    } else if (index == 1) {
                        charName = $(elem).find('a').text();
                    } else if (index == 2) {
                        VA.name = $(elem).find('a').first().text();
                        VA.image = $(elem).find('img').attr('data-src');
                    }
                });
                
                let char = new Character(charName, charImage, VA);
                characters.push(char);
            });
            
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

            image = $('div[class="leftside"]').find('img').attr('data-src');
            description = $('p[itemprop="description"]').text();

            let anime = new Anime(JPname, ENname, image, aired, description, episodes, characters, producers, studios, genres);
            data.push(anime);

            fs.writeFileSync("data.json", JSON.stringify(data, null, '\t'));
            
        }
    });
}

for (let limit = 0; limit < 7; limit++) {
    setTimeout(() => {
        searchImages(limit * 50);
    }, (interval + 500000 * limit).toString());
}
