-- 講義テーブル一覧
-- 講義ID・ユーザID・講義名・曜日・時限・教室・担当教員
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