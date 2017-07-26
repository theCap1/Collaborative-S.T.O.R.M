<?php
include_once '../db.php';

$email = $_GET['email'];
$password = $_GET['password'];

$conn = connect();
$conn->set_charset('utf8');

$sql = "SELECT password FROM `user` WHERE email = '$email'";
$result = $conn->query($sql);

$data = mysqli_fetch_array($result, MYSQL_ASSOC);

if ($data["password"] != $password || $password == null) {
    echo "failure";
} else {
    echo "success";
}

?>