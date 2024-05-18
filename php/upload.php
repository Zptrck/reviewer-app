
<?php
// connect to the database
include_once "db_connection.php";
$conn = new mysqli($servername, $username, $password, $database);

// Uploads files
if (isset($_POST['submit'])) { // if save button on the form is clicked
    // name of the uploaded file
    $filename = $_FILES['files']['name'];

    $categ = $_POST['Categ'];
    // destination of the file on the server
    $destination = 'uploads/' . $filename;

    // get the file extension
    $extension = pathinfo($filename, PATHINFO_EXTENSION);

    // the physical file on a temporary uploads directory on the server
    $file = $_FILES['files']['tmp_name'];
    $size = $_FILES['files']['size'];

    if (!in_array($extension, ['zip', 'pdf', 'docx'])) {
        echo "You file extension must be .zip, .pdf or .docx";
    } elseif ($_FILES['files']['size'] > 1000000) { // file shouldn't be larger than 1Megabyte
        echo "File too large!";
    } else {
        // move the uploaded (temporary) file to the specified destination
        if (move_uploaded_file($file, $destination)) {
            $sql = "INSERT INTO files (name, categ, size, downloads) VALUES ('$filename', '$categ', $size, 0)";
            if (mysqli_query($conn, $sql)) {
                header('Location:../pages/upload.php');
            }
        } else {
            echo "Failed to upload file.";
        }
    }
}
