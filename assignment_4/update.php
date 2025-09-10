<?php
include 'db.php';

if (!isset($_POST['id']) || !isset($_POST['name']) || !isset($_POST['email'])) {
    echo json_encode(["status" => "error", "message" => "ID, name, and email are required."]);
    exit;
}

$id = $_POST['id'];
$name = trim($_POST['name']);
$email = trim($_POST['email']);

if ($name === '' || $email === '' || $id === '') {
    echo json_encode(["status" => "error", "message" => "ID, name, and email cannot be empty."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format."]);
    exit;
}

if (!is_numeric($id)) {
    echo json_encode(["status" => "error", "message" => "Invalid ID."]);
    exit;
}

$sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}
$stmt->bind_param("ssi", $name, $email, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
