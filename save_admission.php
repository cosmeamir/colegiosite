<?php
header('Content-Type: application/json; charset=utf-8');

$host = 'localhost';
$dbname = 'u914400496_sistema';
$username = 'u914400496_sistema_gestao';
$password = 'InstitutoMYJ2@26';

$requiredFields = ['full_name', 'birth_date', 'gender', 'identity_card', 'student_phone', 'guardian_phone'];

foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        echo json_encode(['success' => false, 'message' => 'Preencha todos os campos obrigatórios.']);
        exit;
    }
}

$fullName = trim($_POST['full_name']);
$birthDate = $_POST['birth_date'];
$gender = trim($_POST['gender']);
$identityCard = trim($_POST['identity_card']);
$studentPhone = trim($_POST['student_phone']);
$guardianPhone = trim($_POST['guardian_phone']);

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);

    $sql = 'INSERT INTO pre_inscricoes (full_name, birth_date, gender, identity_card, student_phone, guardian_phone)
            VALUES (:full_name, :birth_date, :gender, :identity_card, :student_phone, :guardian_phone)';

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':full_name' => $fullName,
        ':birth_date' => $birthDate,
        ':gender' => $gender,
        ':identity_card' => $identityCard,
        ':student_phone' => $studentPhone,
        ':guardian_phone' => $guardianPhone,
    ]);

    echo json_encode(['success' => true, 'message' => 'Pré-inscrição salva com sucesso.']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao salvar na base de dados: ' . $e->getMessage()]);
}
