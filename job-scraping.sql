CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    passwd VARCHAR(255) NOT NULL
); CREATE TABLE infos_users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME,
    user_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id)
); CREATE TABLE sites(
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL UNIQUE,
    last_scrapped_at DATETIME
); CREATE TABLE jobs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(150) NOT NULL,
    address VARCHAR(150) NOT NULL,
    publication_date DATE NOT NULL,
    description TEXT,
    requirements TEXT,
    contract_type VARCHAR(50),
    salary VARCHAR(50),
    url VARCHAR(255) NOT NULL UNIQUE,
    scrapped_at DATETIME,
    site_id INT,
    FOREIGN KEY(site_id) REFERENCES sites(id)
); CREATE TABLE user_preferences(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    keywords VARCHAR(255),
    address VARCHAR(255),
    contract_type VARCHAR(50),
    FOREIGN KEY(user_id) REFERENCES users(id)
); CREATE TABLE saved_jobs(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    saved_at DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(job_id) REFERENCES jobs(id)
);