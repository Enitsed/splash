show databases;

show tables;
-- MySQL Script generated by MySQL Workbench
-- Tue May 28 21:04:58 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema splash
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `splash` ;

-- -----------------------------------------------------
-- Schema splash
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `splash` DEFAULT CHARACTER SET utf8 ;
USE `splash` ;

-- -----------------------------------------------------
-- Table `splash`.`board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`board` ;

CREATE TABLE IF NOT EXISTS `board` (
  `board_seq` INT NOT NULL AUTO_INCREMENT,
  `category_seq` INT(11) NOT NULL,
  `board_title` VARCHAR(500) NULL,
  `board_content` VARCHAR(2000) NULL,
  `board_div_cd` VARCHAR(2) NULL,
  `reg_id` VARCHAR(255) NULL,
  `reg_ip` VARCHAR(45) NULL,
  `user_seq` INT NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`board_seq`),
  CONSTRAINT `fk_board_category1`
    FOREIGN KEY (`category_seq`)
    REFERENCES `category` (`category_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_board_user1`
    FOREIGN KEY (`user_seq`)
    REFERENCES `user` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_board_category1_idx` ON `splash`.`board` (`category_seq` ASC);

CREATE INDEX `fk_board_user1_idx` ON `splash`.`board` (`user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`board_comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`board_comments` ;

CREATE TABLE IF NOT EXISTS `splash`.`board_comments` (
  `comment_seq` INT NOT NULL AUTO_INCREMENT,
  `comment_text` VARCHAR(1000) NOT NULL,
  `reg_id` VARCHAR(255) NOT NULL,
  `reg_ip` VARCHAR(45) NOT NULL,
  `board_seq` INT NOT NULL,
  `user_seq` INT NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`comment_seq`),
  CONSTRAINT `fk_board_comments_board1`
    FOREIGN KEY (`board_seq`)
    REFERENCES `board` (`board_seq`),
    FOREIGN KEY (`user_seq`)
    REFERENCES `board` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_board_comments_board1_idx` ON `splash`.`board_comments` (`board_seq` ASC, `user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`board_likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`board_likes` ;

CREATE TABLE IF NOT EXISTS `splash`.`board_likes` (
  `like_seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `reg_id` VARCHAR(255) NOT NULL COMMENT '유저 아이디',
  `board_seq` INT NOT NULL,
  `user_seq` INT NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`like_seq`),
  CONSTRAINT `fk_board_likes_board1`
    FOREIGN KEY (`board_seq`)
    REFERENCES `board` (`board_seq`),
    FOREIGN KEY (`user_seq`)
    REFERENCES `board` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_board_likes_board1_idx` ON `splash`.`board_likes` (`board_seq` ASC, `user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`category` ;

CREATE TABLE IF NOT EXISTS `splash`.`category` (
  `category_seq` INT(11) NOT NULL COMMENT '카테고리 번호',
  `category_name` VARCHAR(255) NULL COMMENT '카테고리명',
  `category_lvl` INT NOT NULL COMMENT '카테고리 레벨',
  `parent_category_seq` INT(11) NULL,
  `reg_id` VARCHAR(255) NOT NULL,
  `reg_ip` VARCHAR(45) NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`category_seq`),
  CONSTRAINT `fk_category_category1`
    FOREIGN KEY (`parent_category_seq`)
    REFERENCES `splash`.`category` (`category_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `fk_category_category1_idx` ON `splash`.`category` (`parent_category_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`login_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`login_history` ;

CREATE TABLE IF NOT EXISTS `splash`.`login_history` (
  `seq` INT NOT NULL AUTO_INCREMENT COMMENT '로그인 시퀀스',
  `login_ip` VARCHAR(45) NOT NULL COMMENT '로그인 아이디',
  `login_status` VARCHAR(10) NOT NULL COMMENT '로그인 결과',
  `user_seq` INT NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`seq`),
  CONSTRAINT `fk_login_history_user`
    FOREIGN KEY (`user_seq`)
    REFERENCES `splash`.`user` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE INDEX `fk_login_history_user_idx` ON `splash`.`login_history` (`user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`photo_comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`photo_comments` ;

CREATE TABLE IF NOT EXISTS `splash`.`photo_comments` (
  `comment_seq` INT NOT NULL AUTO_INCREMENT,
  `comment_text` VARCHAR(1000) NOT NULL,
  `reg_id` VARCHAR(255) NOT NULL,
  `reg_ip` VARCHAR(45) NOT NULL,
  `photo_seq` INT NOT NULL,
  `user_seq` INT NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`comment_seq`),
  CONSTRAINT `fk_comments_photos1`
    FOREIGN KEY (`photo_seq`)
    REFERENCES `splash`.`photos` (`photo_seq`),
    FOREIGN KEY (`user_seq`)
    REFERENCES `splash`.`photos` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_comments_photos1_idx` ON `splash`.`photo_comments` (`photo_seq` ASC, `user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`photo_likes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`photo_likes` ;

CREATE TABLE IF NOT EXISTS `splash`.`photo_likes` (
  `like_seq` INT NOT NULL COMMENT '시퀀스',
  `reg_id` VARCHAR(255) NOT NULL COMMENT '유저 아이디',
  `photo_seq` INT NOT NULL,
  `user_seq` INT NOT NULL,
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`like_seq`),
  CONSTRAINT `fk_like_photos1`
    FOREIGN KEY (`photo_seq`)
    REFERENCES `splash`.`photos` (`photo_seq`),
    FOREIGN KEY (`user_seq`)
    REFERENCES `splash`.`photos` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_like_photos1_idx` ON `splash`.`photo_likes` (`photo_seq` ASC, `user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`photos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`photos` ;

CREATE TABLE IF NOT EXISTS `splash`.`photos` (
  `photo_seq` INT NOT NULL AUTO_INCREMENT COMMENT '시퀀스',
  `category_seq` INT(11) NOT NULL COMMENT '카테고리 번호\n',
  `user_seq` INT NOT NULL,
  `photo_url` VARCHAR(500) NULL COMMENT '사진 url',
  `photo_name` VARCHAR(500) NULL COMMENT '사진 찍은 위치',
  `photo_path` VARCHAR(500) NULL COMMENT '사진 실제 경로',
  `reg_id` VARCHAR(255) NOT NULL COMMENT '등록자',
  `reg_ip` VARCHAR(45) NOT NULL COMMENT '등록자 ip',
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`photo_seq`),
  CONSTRAINT `fk_photos_category1`
    FOREIGN KEY (`category_seq`)
    REFERENCES `splash`.`category` (`category_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_photos_user1`
    FOREIGN KEY (`user_seq`)
    REFERENCES `splash`.`user` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_photos_category1_idx` ON `splash`.`photos` (`category_seq` ASC);

CREATE INDEX `fk_photos_user1_idx` ON `splash`.`photos` (`user_seq` ASC);


-- -----------------------------------------------------
-- Table `splash`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `splash`.`user` ;

CREATE TABLE IF NOT EXISTS `splash`.`user` (
  `user_seq` INT NOT NULL AUTO_INCREMENT COMMENT '유저 시퀀스',
  `user_name` VARCHAR(50) NOT NULL COMMENT '유저 이름',
  `user_id` VARCHAR(255) NOT NULL COMMENT '유저 아이디',
  `user_password` VARCHAR(255) NOT NULL COMMENT '유저 비밀번호',
  `gender` VARCHAR(2) NULL COMMENT '성별',
  `address` VARCHAR(255) NULL COMMENT '주소',
  `phone_num` VARCHAR(255) NULL COMMENT '연락처',
  `email` VARCHAR(255) NULL COMMENT '이메일',
  `user_status` VARCHAR(3) NOT NULL DEFAULT '00' COMMENT '회원 상태 값\n',
  `createdAt` DATE NULL COMMENT '생성일',
  `updatedAt` DATE NULL COMMENT '수정일',
  PRIMARY KEY (`user_seq`));

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



SELECT * FROM USER;

INSERT INTO USER(
	user_name,
    user_id,
    user_password,
    gender,
    address,
    phone_num,
    email,
    create_time
)
VALUES(
	'하하gg',
    'test1',
    '1',
    'F',
    '중랑구 묵동',
    '010-2224-5678',
    'test@naver.com',
    now()
)