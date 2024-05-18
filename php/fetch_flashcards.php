<?php
// Establish database connection
include_once "db_connection.php";
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, question, answer FROM flashcards";
$result = $conn->query($sql);

$flashcards = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $flashcards[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($flashcards);

$conn->close();
?>
