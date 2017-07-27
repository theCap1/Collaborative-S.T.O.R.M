<?php
	include_once '../db.php';

	$email = $_GET['email'];
	$firstname = $_GET['firstname'];
	$lastname = $_GET['lastname'];
	$password = $_GET['password'];
	$gender = $_GET['gender'];
	$birthday = $_GET['birthday'];
	$address = $_GET['address'];
	
	$tmp = json_encode(sql("SELECT * FROM `user` WHERE email = '$email'"));
	
	if ($tmp == "[]") {
		$sql = "INSERT INTO `user` (`firstname`, `lastname`, `email`, `internalCurrencyCount`, `password`, `gender`, `birthday`, `address`) VALUES ('$firstname', '$lastname', '$email', '0', '$password', '$gender', '$birthday', '$address');";	
		sql($sql);
		echo "success";
	}else {
		echo "email already taken";
	}

?>