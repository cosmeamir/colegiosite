CREATE TABLE IF NOT EXISTS pre_inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    identity_card VARCHAR(50) NOT NULL,
    student_phone VARCHAR(30) NOT NULL,
    guardian_phone VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
