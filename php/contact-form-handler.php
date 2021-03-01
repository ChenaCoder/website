<?php
if (isset($_POST['submit'])) {
     require_once('PHPMailer/PHPMailerAutoload.php');

     $name = $_POST['name'];
     $email = $_POST['email'];
     $subject = $_POST['subject'];
     $message = $_POST['message'];

     $mail = new PHPMailer();
     $mail->isSMTP();
     $mail->SMTPAuth = true;
     $mail->Host = 'smtp.gmail.com';
     $mail->Port = '465';
     $mail->SMTPSecure = "ssl";
     $mail->isHTML();
     $mail->Username = 'contactformhandler@gmail.com';
     $mail->Password = 'password';
     $mail->setFrom("contactformhandler@gmail.com");
     $mail -> addReplyTo($email,$name);
     $mail->Subject = $subject;
     $mail->Body = "<h3>Name : $name <br>Email : $email <br>Subject : $subject <br>Message : $message</h3>";
     $mail->addAddress('aandmzayd@yahoo.com');
     $mail->send();
     
     header("Location: ../contactme/success.html");
} else {
     echo "failed";
}
?>
