-- Active: 1726175830131@@127.0.0.1@3306@db_central015
drop database if exists `db_central015`;

create database `db_central015`
default character set utf8
default collate utf8_general_ci;

use `db_central015`;

create table `users`(
    id int not null auto_increment,
    `user` text not null,
    `passw` text  not null,
    `saldo` int not null,
    primary key (id)
)default charset = utf8;

insert into users (saldo) values (0);