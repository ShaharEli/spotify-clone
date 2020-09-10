-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '99876555';

-- flush privileges;


CREATE DATABASE spotify_clone;
USE spotify_clone;
CREATE TABLE songs(
	id  INT NOT NULL AUTO_INCREMENT,
    yotube_link VARCHAR(400),
    album_id INT,
    artist_id INT,
    title VARCHAR(40) NOT NULL,
    length TIME,
	track_number INT,
    lyrics TEXT,
    created_at DATE,
    upload_at DATE,
    PRIMARY KEY (ID)

    
);

CREATE TABLE albums(
	id  INT NOT NULL AUTO_INCREMENT,
    artist_id INT,
    name VARCHAR(40) NOT NULL,
    cover_img VARCHAR(400),
    created_at DATE,
    upload_at DATE,
    PRIMARY KEY (ID)
);

CREATE TABLE artists(
	id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    cover_img VARCHAR(400),
    uploaded_at DATE,
    PRIMARY KEY (ID)
);

ALTER TABLE songs
ADD FOREIGN KEY (album_id) REFERENCES albums(id),
ADD FOREIGN KEY (artist_id) REFERENCES artists(id);

ALTER TABLE albums
ADD FOREIGN KEY (artist_id) REFERENCES artists(id);

CREATE TABLE playlists(
	id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    cover_img VARCHAR(400),
    uploaded_at DATE,
    PRIMARY KEY (ID)
);

CREATE TABLE list_of_songs(
	id  INT NOT NULL AUTO_INCREMENT,
    playlist_id INT NOT NULL,
	song_id INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (playlist_id) REFERENCES playlists(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

CREATE TABLE users(
	id  INT NOT NULL AUTO_INCREMENT,
    name  VARCHAR(40),
	email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATE,
    password VARCHAR(40) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    prefrences JSON,
    remember_token BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (ID)
);

CREATE TABLE interactions(
	id  INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
	song_id INT NOT NULL,
    is_liked BOOLEAN DEFAULT FALSE,
    play_count INT DEFAULT 0,
    created_at DATE,
    PRIMARY KEY (ID),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (song_id) REFERENCES songs(id)
);



INSERT INTO artists (name,cover_img,uploaded_at) VALUES ("Dekel Vaknin","https://static.timesofisrael.com/www/uploads/2020/05/Untitled-1-e1589139616875-1024x640.png","2019-06-15");




