<?php
include 'db.php';

if (!isset($_POST['name']) || !isset($_POST['email'])) {
    echo json_encode(["status" => "error", "message" => "Name and email are required."]);
    exit;
}

$name = trim($_POST['name']);
$email = trim($_POST['email']);

if ($name === '' || $email === '') {
    echo json_encode(["status" => "error", "message" => "Name and email cannot be empty."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

$sql = "INSERT INTO users (name, email) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}
$stmt->bind_param("ss", $name, $email);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
