<?php

if (isset($_POST["verify_email"])) {
    $email = $_POST["email"];
    $verification_code = $_POST["verification_code"];

    // connect with database
    include_once "db_connection.php";

    // mark email as verified using prepared statements
    $sql = "UPDATE users SET email_verified_at = NOW() WHERE email = ? AND verification_code = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("ss", $email, $verification_code);
        $stmt->execute();
        
        if ($stmt->affected_rows == 0) {
            die("Verification code failed.");
        }

        header("Location: ../index.html");
        $stmt->close();
    } else {
        die("Failed to prepare the SQL statement.");
    }
    $conn->close();
    exit();
}

?>
