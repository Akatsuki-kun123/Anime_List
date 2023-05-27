CREATE DATABASE animelist
GO

USE animelist 
GO 

CREATE TABLE Producers
(
    PID int not null IDENTITY(1,1) PRIMARY KEY,
    Pname varchar(100)
) 

CREATE TABLE Studio 
(
    S_ID int not null IDENTITY(1,1) PRIMARY KEY,
    Sname varchar(100)
)

CREATE TABLE Studio_colection
(
    SC_ID int not null IDENTITY(1,1) PRIMARY KEY,
    S_ID int,
    AID int
)

CREATE TABLE Genres 
(
    GID int not null IDENTITY(1,1) PRIMARY KEY,
    Gname varchar(100)
)

CREATE TABLE Anime_genres
(
    AG_ID int not null IDENTITY(1,1) PRIMARY KEY,
    GID int,
    AID int 
)

CREATE TABLE Charactes
(
    ChID int not null IDENTITY(1,1) PRIMARY KEY,
    Chname varchar(50),
)

CREATE TABLE Anime_Character
(
    AC_ID int not null IDENTITY(1,1) PRIMARY KEY,
    ChID int,
    AID int
)

CREATE TABLE Emotion
(
    EID int not null IDENTITY(1,1) PRIMARY KEY,
    Ename varchar(10)
)

CREATE TABLE Anime_Emotion
(
    AE_ID int not null IDENTITY(1,1) PRIMARY KEY,
    AID int,
    EID int
)




CREATE TABLE Anime 
(
    AID int not null IDENTITY(1,1) PRIMARY KEY,
    namee VARCHAR(100),
    episodes INT,
    aired DATE,
    producers_id int FOREIGN KEY (producers_id) REFERENCES Producers(PID),
    studios_id int,
    genres VARCHAR(100),
    rating INT,
    synopsis varchar(100),
    characters_id int,
    emotion_id int,
)

ALTER TABLE Studio_colection ADD FOREIGN KEY (AID) REFERENCES Anime(AID)
ALTER TABLE Studio_colection ADD FOREIGN KEY (S_ID) REFERENCES Studio(S_ID)
ALTER TABLE Anime_genres ADD FOREIGN KEY (AID) REFERENCES Anime(AID)
ALTER TABLE Anime_genres ADD FOREIGN KEY (GID) REFERENCES Genres(GID)
ALTER TABLE Anime_Character ADD FOREIGN KEY (ChID) REFERENCES Charactes(ChID)
ALTER TABLE Anime_Character ADD FOREIGN KEY (AID) REFERENCES Anime(AID)
ALTER TABLE Anime_Emotion ADD FOREIGN KEY (AID) REFERENCES Anime(AID)
ALTER TABLE Anime_Emotion ADD FOREIGN KEY (EID) REFERENCES Emotion(EID)


CREATE TABLE Voice_Actors 
(
    VA_ID int not null IDENTITY(1,1) PRIMARY KEY,
    VAname varchar(50),
    ChID int FOREIGN KEY (ChID) REFERENCES Charactes(ChID)
)


ALTER TABLE Anime DROP COLUMN genres 
ALTER TABLE Anime DROP COLUMN studios_id
ALTER TABLE Anime DROP COLUMN characters_id
ALTER TABLE Anime DROP COLUMN emotion_id


