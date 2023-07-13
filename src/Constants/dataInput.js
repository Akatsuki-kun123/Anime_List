const fs = require("fs");
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize('anime_list', 'admin', 'Tb15092003!', {
    host: 'localhost',
    dialect: 'mssql',
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const Anime = sequelize.define("animes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    episodes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    aired: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stid: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    synopsis: {
        type: DataTypes.STRING,
        allowNull: true
    }},
    {
        tableName: "animes",
        timestamps: false
    }
);

const Genres = sequelize.define("genres", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }}, 
    {
        tableName: "genres",
        timestamps: false
    }
);

const Anime_genres = sequelize.define("anime_genre", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    gid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "anime_genre",
        timestamps: false
    }
);

const Studios = sequelize.define("studios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }}, 
    {
        tableName: "studios",
        timestamps: false
    }
);

const Producers = sequelize.define("producers", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: "producers",
        timestamps: false
    }
);

const Anime_producers = sequelize.define("anime_producer", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "anime_producer",
        timestamps: false
    }
);

const Characters = sequelize.define("characters", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    vaid: {
        type: DataTypes.INTEGER,
        allowNull: true
    }},
    {
        tableName: "characters",
        timestamps: false
    }    
);

const Anime_characters = sequelize.define("anime_character", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    chid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    aid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "anime_character",
        timestamps: false
    }    
);

const Voice_actors = sequelize.define("voice_actors", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    }},
    {
        tableName: "voice_actors",
        timestamps: false
    }    
);

const Emotions = sequelize.define("emotions", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }},
    {
        tableName: "Emotions",
        timestamps: false
    }    
);

const Anime_emotion = sequelize.define("anime_emotion", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    aid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eid: {
        type: DataTypes.INTEGER,
        allowNull: false
    }},
    {
        tableName: "Anime_emotion",
        timestamps: false
    }
);

let data = JSON.parse(fs.readFileSync("./src/Constants/data.json"));

function convertDate(data) {
    let args = data.split(" ");
    let normalizedDate = "";
    let counter = 0;

    for (index in args) {
        if (counter == 3) {
            break;
        }
    
        if (args[index] == "Jan") {
            normalizedDate += "January ";
            counter += 1;
        } else if (args[index] == "Feb") {
            normalizedDate += "February ";
            counter += 1;
        } else if (args[index] == "Mar") {
            normalizedDate += "March ";
            counter += 1;
        } else if (args[index] == "Apr") {
            normalizedDate += "April ";
            counter += 1;
        } else if (args[index] == "May") {
            normalizedDate += "May ";
            counter += 1;
        } else if (args[index] == "Jun") {
            normalizedDate += "June ";
            counter += 1;
        } else if (args[index] == "Jul") {
            normalizedDate += "July ";
            counter += 1;
        } else if (args[index] == "Aug") {
            normalizedDate += "August ";
            counter += 1;
        } else if (args[index] == "Sep") {
            normalizedDate += "September ";
            counter += 1;
        } else if (args[index] == "Oct") {
            normalizedDate += "October ";
            counter += 1;
        } else if (args[index] == "Nov") {
            normalizedDate += "November ";
            counter += 1;
        } else if (args[index] == "Dec") {
            normalizedDate += "December ";
            counter += 1;
        } else {
            if (counter == 0) {
                continue;
            }
            else {
                if (args[index] != " ") {
                    normalizedDate = normalizedDate + args[index] + " ";
                    counter += 1;
                }
            }
        }
    }

    return(new Date(normalizedDate).toISOString());
}

async function InsertElements(data) {
    let newChars = [],
        newGenres = [],
        newProducers = [],
        newStudio;

    for (index in data.genres) {
        if (data.genres[index] == null) {
            let genre = await Genres.findOne({ where: { name: "null" } });
            if (genre == null) {
                genre = await Genres.create(
                    {
                        name: "null"
                    }
                );
            }
    
            newGenres.push(genre);
            break;
        }
    
        let genre = await Genres.findOne({ where: { name: data.genres[index] } });
        if (genre == null) {
            genre = await Genres.create(
                {
                    name: data.genres[index]
                }
            );
        }
    
        newGenres.push(genre);
    }
    
    for (index in data.producers) {
        if (data.producers[index] == null) {
            let producer = await Producers.findOne({ where: { name: "null" } });
            if (producer == null) {
                producer = await Producers.create(
                    {
                        name: "null"
                    }
                );
            }
    
            newProducers.push(producer);
            break;
        }
    
        let producer = await Producers.findOne({ where: { name: data.producers[index] } });
        if (producer == null) {
            producer = await Producers.create(
                {
                    name: data.producers[index]
                }
            );
        }
    
        newProducers.push(producer);
    }
    
    for (index in data.studios) {
        if (data.studios[index] == null) {
            let studio = await Studios.findOne({ where: { name: "null" } });
            if (studio == null) {
                studio = await Studios.create(
                    {
                        name: "null"
                    }
                );
            }
    
            newStudio = studio;
            break;
        }
    
        if (index == 1) {
            break;
        }
    
        let studio = await Studios.findOne({ where: { name: data.studios[index] } });
        if (studio == null) {
            studio = await Studios.create(
                {
                    name: data.studios[index]
                }
            );
        }
    
        newStudio = studio;
    }

    for (index in data.characters) {
        if (data.characters[index] == null) {
            let character = await Characters.findOne({ where: { name: "null" } });
            if (character == null) {
                character = await Characters.create(
                    {
                        name: "null",
                        image: "null"
                    }
                );
            }
    
            newChars.push(character);
            break;
        }

        let character = await Characters.findOne({ where: { name: data.characters[index].name } });
        if (character == null) {
            if (data.characters[index].voiceActor.name == undefined) {
                newChars.push(null);
                break;
            }

            let newVA = await Voice_actors.findOne({ where: { name: data.characters[index].voiceActor.name } });
            if (newVA == null) {
                newVA = await Voice_actors.create(
                    {
                        name: data.characters[index].voiceActor.name,
                        image: data.characters[index].voiceActor.image
                    }
                );
            }
        
            character = await Characters.create(
                {
                    name: data.characters[index].name,
                    image: data.characters[index].image,
                    vaid: newVA.id
                }
            );
        }

        newChars.push(character);
    }

    let result = {
        newChars: newChars,
        newGenres: newGenres,
        newProducers: newProducers,
        newStudio: newStudio
    };

    return(result);
}

async function InsertAnime(data) {
    let anime = await Anime.findOne({ where: { name: data.JPname } });
    if (anime != null) {
        return 0;
    }

    let elems = await InsertElements(data);

    let newAnime = await Anime.create({
        name: data.JPname,
        title: (data.ENname ? data.ENname : null),
        image: (data.image ? data.image : null),
        episodes: (data.episodes ? data.episodes : null),
        aired: convertDate(data.aired),
        stid: elems.newStudio.id,
        rating: Math.floor(Math.random() * 10),
        synopsis: data.description
    });

    elems.newGenres.map(async (elem) => {
        await Anime_genres.create({
            gid: elem.id,
            aid: newAnime.id
        });
    });

    elems.newProducers.map(async (elem) => {
        await Anime_producers.create({
            pid: elem.id,
            aid: newAnime.id
        });
    });

    if (elems.newChars != [null]) {
        elems.newChars.map(async (elem) => {
            await Anime_characters.create({
                chid: elem.id,
                aid: newAnime.id
            });
        });
    }
}

sequelize.sync().then(async () => {
    for (index in data) {
        let check = await InsertAnime(data[index]);
        console.log(check);
    } 
}).catch((error) => {
    console.error('Unable to create table : ', error);
});
