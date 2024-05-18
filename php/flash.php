<?php
include_once "db_connection.php";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $question = isset($_POST["question"]) ? $_POST["question"] : '';
    $answer = isset($_POST["answer"]) ? $_POST["answer"] : '';
    $id = isset($_POST["id"]) ? intval($_POST["id"]) : 0;

    if (!empty($question) && !empty($answer)) {
        if ($id > 0) {
            // Update existing flashcard
            $sql = "UPDATE flashcards SET question=?, answer=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssi", $question, $answer, $id);
        } else {
            // Insert new flashcard
            $sql = "INSERT INTO flashcards (question, answer) VALUES (?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $question, $answer);
        }

        if ($stmt->execute()) {
            echo "Flashcard saved successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Question and answer cannot be empty!";
    }
}

$conn->close();
?>
