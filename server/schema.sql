CREATE DATABASE chat;
USE chat;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

CREATE TABLE users (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50)
);

CREATE TABLE friends (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  base INT,
  friend INT,
  FOREIGN KEY (base) REFERENCES users (id),
  FOREIGN KEY (friend) REFERENCES users (id)
);

CREATE TABLE messages (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user INT,
  message VARCHAR(140),
  room VARCHAR(20),
  createdAt DATE,
  FOREIGN KEY (user) REFERENCES users (id)
);