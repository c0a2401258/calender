-- 課題テーブル
-- 課題ID・ユーザーID・講義ID・課題名・締切・未提出/提出済
USE calendar_db;

create table assignments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lecture_id INT,
    title VARCHAR(100),
    deadline DATETIME,
    status ENUM('not started', 'in progress', 'completed') DEFAULT 'not started'
);