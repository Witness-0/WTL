<?php
include 'db.php';

if (!isset($_POST['id'])) {
    echo json_encode(["status" => "error", "message" => "ID is required."]);
    exit;
}

$id = $_POST['id'];
if ($id === '' || !is_numeric($id)) {
    echo json_encode(["status" => "error", "message" => "Invalid ID."]);
    exit;
}

$sql = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
