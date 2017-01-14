CREATE DATABASE chat;
USE chat;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

CREATE TABLE users (
  name VARCHAR(50) NOT NULL PRIMARY KEY
);

CREATE TABLE friends (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  base VARCHAR(50),
  friend VARCHAR(50),
  FOREIGN KEY (base) REFERENCES users (name),
  FOREIGN KEY (friend) REFERENCES users (name)
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(50),
  message VARCHAR(140),
  room VARCHAR(20),
  createdAt DATETIME,
  FOREIGN KEY (user) REFERENCES users (name)
);