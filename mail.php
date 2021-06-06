<?php

$name = $_POST['name'];
$tel = $_POST['tel'];
$email = $_POST['email'];

$message = $name . ' ' . $tel . ' ' . $email;

$message = wordwrap($message, 70, "\r\n");

mail('kotor79@gmail.com', 'Dmitry Alekseev', $message);

header ('Location: /dmitryAlekseev/');
