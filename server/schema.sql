CREATE DATABASE chat;

USE chat;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/



-- DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE users (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  name VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE friends (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  base INTEGER NULL DEFAULT NULL,
  friend INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE rooms (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  name VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (id)
);
    
CREATE TABLE messages (
  id INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  user INTEGER NULL DEFAULT NULL,
  room INTEGER NULL DEFAULT NULL,
  message VARCHAR(140) NULL DEFAULT NULL,
  createdAt TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id)
);
    

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE messages ADD FOREIGN KEY (user) REFERENCES users (id);
ALTER TABLE messages ADD FOREIGN KEY (room) REFERENCES rooms (id);
ALTER TABLE friends ADD FOREIGN KEY (base) REFERENCES users (id);
ALTER TABLE friends ADD FOREIGN KEY (friend) REFERENCES users (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`Name`) VALUES
-- ('','');
-- INSERT INTO `Rooms` (`id`,`Name`) VALUES
-- ('','');
-- INSERT INTO `Messages` (`id`,`User`,`Room`,`Text`,`createdAt`) VALUES
-- ('','','','','');
-- INSERT INTO `Friends` (`ID`,`Base`,`Friend`) VALUES
-- ('','','');