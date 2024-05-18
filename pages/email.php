<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email verification</title>
    <link rel="stylesheet" href="../css/email.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
</head>
<body>

    <form class="form" action="../php/email.php" method="post"> 
        <div class="title">Verification Code</div> 
        <p class="message">We have sent a verification code to your email account</p> 
        <div class="input-field">
            <input type="hidden" name="email" value="<?php echo $_GET['email']; ?>" required>
            <input required="" name="verification_code" type="text" maxlength="6" />
            <label>Enter your code</label>
          </div> 
        <button class="action" name="verify_email">Verify</button> 
    </form>
    
</body>
</html>
