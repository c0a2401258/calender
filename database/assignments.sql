USE calendar_db;

create table assignments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lecture_id INT,
    title VARCHAR(100),
    deadline DATETIME,
    status ENUM('not started', 'in progress', 'completed') DEFAULT 'not started'
);