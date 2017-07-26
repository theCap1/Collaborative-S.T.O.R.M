<?php
	include_once '../db.php';

	$email = $_POST['email'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$password = $_POST['password'];
	$gender = $_POST['gender'];
	$birthday = $_POST['birthday'];
	$address = $_POST['address'];
	
	$tmp = json_encode(sql("SELECT * FROM `user` WHERE email = '$email'"));
	
	if ($tmp == "[]") {
		$sql = "INSERT INTO `user` (`firstname`, `lastname`, `email`, `internalCurrencyCount`, `password`, `gender`, `birthday`, `address`) VALUES ('$firstname', '$lastname', '$email', '0', '$password', '$gender', '$birthday', '$address');";	
		sql($sql);
		echo "success";
	}else {
		echo "email already taken";
	}

?>