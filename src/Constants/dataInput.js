const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(
    '${db_name}', //Thay bằng tên database
    '${admin}', //Tên đăng nhập
    '${password}', //Mật khẩu
    {
        host: 'localhost',
        dialect: 'mssql',
        define: {
            timestamps: false
        }
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const Anime = sequelize.define("Anime", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    episodes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aired: {
        type: DataTypes.STRING,
        allowNull: false
    },
    producers_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: "Anime"
    }
);

const Genres = sequelize.define("Genres", {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Gname: {
        type: DataTypes.STRING,
        allowNull: false,
    }}, 
    {
        tableName: "Genres"
    }
);

const Anime_genres = sequelize.define("Anime_genres", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    GID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "Anime_genres"
    }
);

const Studios = sequelize.define("Studios", {
    ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Sname: {
        type: DataTypes.STRING,
        allowNull: false,
    }}, 
    {
        tableName: "Studios"
    }
);

const Anime_studio = sequelize.define("Anime_studio", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    StID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    AID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "Anime_studio"
    }
);

const Producers = sequelize.define("Producers", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    Pname: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: "Producers"
    }
);

const Characters = sequelize.define("Characters", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    Chname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    VaID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "Characters"
    }    
);

const Anime_character = sequelize.define("Anime_character", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    Chname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    VaID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "Anime_character"
    }    
);

const Voice_actors = sequelize.define("Voice_actors", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }, 
    Vaname: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: "Voice_actors"
    }    
);

const Emotions = sequelize.define("Emotions", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Ename: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: "Emotions"
    }    
);

const Anime_emotion = sequelize.define("Anime_emotion", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    AID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    EID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "Anime_emotion"
    }
);

let data = {
    JPname: " はじめの一歩 Rising\n  ",
    ENname: " Hajime No Ippo",
    image: "https://cdn.myanimelist.net/images/anime/6/56147.jpg",
    episodes: 25,
    aired: "\n  Oct 6, 2013 to Mar 30, 2014\n  ",
    producers: "VAP",
    studios: [
        "Madhouse",
        "MAPPA"
    ],
    genres: [
        "Sports"
    ],
    description: "Japanese Featherweight Champion Makunouchi Ippo has defended his title belt once more with the help of his devastating signature move: the Dempsey Roll. However, new challengers are rising up left and right, claiming to have an answer for the move responsible for crushing his opponents. Will Ippo be able to step up to the challenge, or will the weight of his pride destroy him before he finds out just what it means to be strong? Meanwhile, fellow Kamogawa Gym mate Aoki Masaru is just a hop, skip, and a Frog Punch away from claiming his own belt, ready to take on the Japanese Lightweight Champion!\n\nHajime no Ippo: Rising continues Ippo's quest to become stronger, featuring the same cast of loveable dimwits from Kamogawa Gym, as they put their bodies and hearts on the line to make their way in the harsh world of professional boxing. With a will of iron, Ippo steps into the ring once again.\n\n[Written by MAL Rewrite]",
    characters: [
        {
            name: "Makunouchi, Ippo",
            image: "https://cdn.myanimelist.net/r/42x62/images/characters/11/32678.jpg?s=19a666c43dcc72009f671c26e82de682",
            voiceActor: {
                name: "Kiyasu, Kohei",
                image: "https://cdn.myanimelist.net/r/42x62/images/voiceactors/3/12783.jpg?s=3971b1407095dc0bff03ef7b7a79d8b0"
            }
        }
    ]
}

async function InsertElements(data) {
    return new Promise((resolve, rejects) => {
        let newChar = [],
            newGenre = [],
            newStudio = [],
            newProducer;

        data.genres.map(async (index, elem) => {
            if (await Genres.findOne({ where: { Gname: elem } }) === null) {
                await Genres.create(
                    {
                        Gname: elem
                    }
                );
            }

            newGenre.push(await Genres.findOne({ where: { Gname: elem } }))
        });
    
        data.studios.map(async (index, elem) => {
            if (await Studios.findOne({ where: { Sname: elem } }) === null) {
                await Studios.create(
                    {
                        Sname: elem
                    }
                );
            }

            newStudio.push(await Studios.findOne({ where: { Sname: elem } }));
        });
    
        data.producers.map(async (index, elem) => {
            if (await Producers.findOne({ where: { Pname: elem } }) === null) {
                await Producers.create(
                    {
                        Pname: elem
                    }
                );
            }

            newProducer = await Producers.findOne({ where: { Pname: elem } });
        });
    
        data.characters.map(async (index, elem) => {
            if (await Characters.findOne({ where: { Chname: elem.name } }) === null) {
                if (await Voice_actors.findOne({ where: { Vaname: elem.voiceActor.name } }) === null) {
                    var newVA = await Voice_actors.create(
                        {
                            Vaname: elem.voiceActor.name
                        }
                    );
                }
    
                let charVA = await Voice_actors.findOne({ where: { Vaname: newVA.Vaname } });
                let charVAid = charVA.ID
        
                newChar = await Characters.create(
                    {
                        Chname: elem.name,
                        VaID: charVAid
                    }
                );
            }

            newChar.push(await Characters.findOne({ where: { Chname: elem.name } }));
        });

        resolve({
            newChar: newChar,
            newGenre: newGenre,
            newStudio: newStudio,
            newProducer: newProducer
        });

        rejects("Error!");
    });
}

async function InsertAnime(data) {
    let elems;
    InsertElements.then(value => {
        elems = value
    });

    let newAnime = await Anime.create({
        name: data.JPname,
        episodes: data.episodes,
        aired: data.aired,
        producers_id: elems.newProducer.ID,
        rating: 9,
        synopsis: data.description
    });

    newAnime = await Anime.findOne({ where: { name: data.JPname } });

    elems.newGenre.map((index, elem) => {
        Anime_genres.create({
            GID: elem.ID,
            AID: newAnime.ID
        });
    });

    elems.newStudio.map((index, elem) => {
        Anime_studio.create({
            StID: elem.ID,
            AID: newAnime.ID
        });
    });

    elems.newChar.map((index, elem) => {
        Anime_genres.create({
            Chname: elem.ID,
            AID: newAnime.ID
        });
    });
}

sequelize.sync().then(() => {
    InsertAnime(data);
    
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
