<?php
	include_once '../db.php';

	$oldemail = $_GET['oldemail'];
	$email = $_GET['email'];
	$firstname = $_GET['firstname'];
	$lastname = $_GET['lastname'];
	$password = $_GET['password'];
	$internalCurrencyCount = $_GET['internalCurrencyCount'];
	$gender = $_GET['gender'];
	$birthday = $_GET['birthday'];
	$address = $_GET['address'];
	
	$tmp = json_encode(sql("SELECT * FROM `user` WHERE email = '$email'"));
	
	if ($tmp == "[]") {
		$sql = "UPDATE `user` SET `firstname` = '$firstname', `lastname` = '$lastname', `email` = '$email', `internalCurrencyCount` = '$internalCurrencyCount', `password` = '$password', `gender` = '$gender', `birthday` = '$birthday', `address` = '$address') WHERE `user`.`email` = '$oldemail'";	
		sql($sql);
		echo "success";
	}else {
		echo "new email already taken";
	}
	


?>