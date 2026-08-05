-- 予定テーブル
-- 予定ID・ユーザーID・予定名・詳細・開始日時・終了日時・作成日時・カテゴリー・
USE calendar_db;

create table schedule(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100),
    description TEXT,
    start_time DATETIME,
    end_time DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50)
);