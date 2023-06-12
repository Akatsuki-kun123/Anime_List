//Thư viện cần dùng: nodejs, cheerio.
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

var data = [];          //Biến data lưu trữ giá trị của các Object "Anime" 
var interval = 0;       //Biến thời gian trễ để tạo khoảng cách thời gian giữa các request

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

//Tạo header cho request để tránh bị ... denied
var headers = {
    "User-Agent": "Mozilla/5.0 (iPad; CPU OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
};

//Request lấy link các Object Anime để tiến hành lấy thông tin
function searchImages(limit) {
    request(`https://myanimelist.net/topanime.php?limit=${limit}`, {headers: headers}, (error, response, body) => {
        let wait = 0;   //Biến thời gian đợi cho mỗi request

        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);   //Lấy html của trang web
            $('.hoverinfo_trigger').map(function(index, elem) {
                if (index % 2 == 1) {
                    return 0;   //Loại bỏ phần trùng lặp
                }

                let link = $(elem).attr("href");    //Lấy link của cái Object Anime
                //Tạo timeout cho các request để tránh bị timeout khi mạng lag
                let options = {
                    url: link,
                    timeout: 1000000
                }

                //Tiến hành lấy data cho các Object Anime mỗi lần request chờ 10s
                setTimeout(() => {
                    getData(options);
                    console.log("Pass");
                }, wait.toString());

                wait = wait + 10000;
            });
        }
    });
}

//Hàm lấy thông tin cho các Object Anime
function getData(options) {
    let JPname = "",            //Tạo các biến cần thiết để lưu trữ dữ liệu
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
            const $ = cheerio.load(body);   //Lấy html của trang web
            //Lấy data cho phần thông tin "Character"
            $('div[class="detail-characters-list clearfix"]').first().find('table').map(function(index, elem) {
                if (index % 2 == 1) {
                    return 0;
                }

                let charName = "",          //Tạo các biến cần thiết để lưu dữ liệu
                    charImage = "",
                    VA = new VoiceActor();
                
                //Tiến hành lấy dữ liệu cho "Character" từ html
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
            
            //Lấy dữ liệu cho các trường còn lại
            $('div[class="spaceit_pad"]').map(function(index, elem) {
                let stop = false;   //Biến dừng khi đạt đủ thông tin cần thiết
                if (stop == true) {
                    return 0;
                }

                let _data = $(elem).text();     //Lấy phần text của html để đơn giản hóa việc lấy dữ liệu
                //Tiến hành lấy dữ liệu "hơi nhiều if else"
                if (_data.includes("Japanese")) {
                    JPname = _data.split(":")[1];
                } else if (_data.includes("English")) {
                    ENname = _data.split(":")[1];
                } else if (_data.includes("Episodes")) {
                    episodes = parseInt(_data.split(":")[1]);
                } else if (_data.includes("Aired")) {
                    aired = _data.split(":")[1];
                } else if (_data.includes("Producer")) {
                    $(elem).find('a').map(function(index, elem) {
                        producers.push($(elem).attr("title"));
                    });
                } else if (_data.includes("Studio")) {
                    $(elem).find('a').map(function(index, elem) {
                        studios.push($(elem).attr("title"));
                    });
                } else if (_data.includes("Genre")) {
                    $(elem).find('a').map(function(index, elem) {
                        genres.push($(elem).attr("title"));
                    });

                    stop = true;
                }
            });

            image = $('div[class="leftside"]').find('img').attr('data-src');    //Lấy thông tin ảnh của Anime
            description = $('p[itemprop="description"]').text();                //Lấy thông tin mô tả về Anime

            let anime = new Anime(JPname, ENname, image, aired, description, episodes, characters, producers, studios, genres);
            data.push(anime);

            fs.writeFileSync("./src/Constants/data.json", JSON.stringify(data, null, '\t')); 
        }
    });
}

for (let limit = 0; limit < 11; limit++) {
    setTimeout(() => {
        searchImages(limit * 50);
    }, (interval + 500000 * limit).toString());
}
