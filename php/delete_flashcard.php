<?php
include_once "db_connection.php";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$id = isset($data["id"]) ? intval($data["id"]) : 0;

if ($id > 0) {
    $sql = "DELETE FROM flashcards WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Flashcard deleted successfully";
    } else {
        echo "Error deleting flashcard: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Invalid ID received";
}

$conn->close();
?>
