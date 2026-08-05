USE calendar_db;

create table lectures(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    subject VARCHAR(100),
    day_of_week TINYINT,
    period TINYINT,
    room VARCHAR(50),
    teacher VARCHAR(100)
);