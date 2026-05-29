CREATE DATABASE IF NOT EXISTS instagram_tracker;

USE instagram_tracker;

CREATE TABLE snapshots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ig_username VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE followers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    snapshot_id INT,
    follower_username VARCHAR(100),

    FOREIGN KEY (snapshot_id)
    REFERENCES snapshots(id)
);

CREATE TABLE unfollows (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unfollower_username VARCHAR(100),
    detected_at DATETIME DEFAULT CURRENT_TIMESTAMP
);