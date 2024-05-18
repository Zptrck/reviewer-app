<?php
if (isset($_POST["login"])) {
    $email = $_POST["email"];
    $pass = $_POST["pass"];

    // connect with database
    include_once "db_connection.php";

    // sanitize email to prevent SQL injection
    $email = mysqli_real_escape_string($conn, $email);

    // check if credentials are okay, and email is verified
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 0) {
        die("<script>alert('Email not found.'); window.location.href = '../index.html';</script>");
    }

    $user = mysqli_fetch_object($result);
    if (!password_verify($pass, $user->password)) {
        die("<script>alert('Pass is incorrect.'); window.location.href = '../index.html';</script>");
    }

    if ($user->email_verified_at == null) {
        die("<script>alert('Email is not verified.'); window.location.href = '../pages/email.php';</script>");
    }

    header("Location: ../pages/home.html");
    exit();
}
?>