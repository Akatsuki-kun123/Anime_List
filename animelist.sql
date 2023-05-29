CREATE DATABASE anime_list
GO

USE anime_list 
GO 

CREATE TABLE Producers
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    Pname varchar(100)
) 

CREATE TABLE Studio 
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    Sname varchar(100)
)

CREATE TABLE Studio_colection
(
    id int not null IDENTITY(1,1) PRIMARY KEY,
    S_ID int,
    AID int
)

CREATE TABLE Genres 
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    Gname varchar(100)
)

CREATE TABLE Anime_genres
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    GID int,
    AID int 
)

CREATE TABLE Charactes
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    Chname varchar(50),
)

CREATE TABLE Anime_Character
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    ChID int,
    AID int
)

CREATE TABLE Emotion
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    Ename varchar(10)
)

CREATE TABLE Anime_Emotion
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    AID int,
    EID int
)




CREATE TABLE Anime 
(
    ID int not null IDENTITY(1,1) PRIMARY KEY,
    namee VARCHAR(100),
    episodes INT,
    aired DATE,
    producers_id int FOREIGN KEY (producers_id) REFERENCES Producers(ID),
    rating INT,
    synopsis varchar(100),
)

ALTER TABLE Studio_colection ADD FOREIGN KEY (AID) REFERENCES Anime(ID)
ALTER TABLE Studio_colection ADD FOREIGN KEY (S_ID) REFERENCES Studio(ID)
ALTER TABLE Anime_genres ADD FOREIGN KEY (AID) REFERENCES Anime(ID)
ALTER TABLE Anime_genres ADD FOREIGN KEY (GID) REFERENCES Genres(ID)
ALTER TABLE Anime_Character ADD FOREIGN KEY (ChID) REFERENCES Charactes(ID)
ALTER TABLE Anime_Character ADD FOREIGN KEY (AID) REFERENCES Anime(ID)
ALTER TABLE Anime_Emotion ADD FOREIGN KEY (AID) REFERENCES Anime(ID)
ALTER TABLE Anime_Emotion ADD FOREIGN KEY (EID) REFERENCES Emotion(ID)


CREATE TABLE Voice_Actors 
(
    VA_ID int not null IDENTITY(1,1) PRIMARY KEY,
    VAname varchar(50),
    ChID int FOREIGN KEY (ChID) REFERENCES Charactes(ID)
)



