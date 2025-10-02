CREATE DATABASE IF NOT EXISTS bmi_database;
USE bmi_database;

CREATE TABLE bmi_records (
    uuid CHAR(36) PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    weight INT NOT NULL,
    height INT NOT NULL,
    bmi DECIMAL(4,1) NOT NULL,
    date DATETIME NOT NULL
);