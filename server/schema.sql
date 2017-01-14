CREATE DATABASE chat;

USE chat;

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/



-- DROP TABLE IF EXISTS `Users`;
    
CREATE TABLE users (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE friends (
  `ID` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Base` INTEGER NULL DEFAULT NULL,
  `Friend` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE rooms (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `Name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
    
CREATE TABLE messages (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `User` INTEGER NULL DEFAULT NULL,
  `Room` INTEGER NULL DEFAULT NULL,
  `Text` VARCHAR(140) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
    

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE messages ADD FOREIGN KEY (User) REFERENCES users (`id`);
ALTER TABLE messages ADD FOREIGN KEY (Room) REFERENCES rooms (`id`);
ALTER TABLE friends ADD FOREIGN KEY (Base) REFERENCES users (`id`);
ALTER TABLE friends ADD FOREIGN KEY (Friend) REFERENCES users (`id`);

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