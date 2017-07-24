<?php
	include_once '../db.php';



	$email = $_POST['email'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$password = $_POST['password'];
	$internalCurrencyCount = $_POST['internalCurrencyCount'];
	$gender = $_POST['gender'];
	$birthday = $_POST['birthday'];
	$address = $_POST['address'];

	$sql = "UPDATE `user` SET `firstname` = '$firstname', `lastname` = '$lastname', `email` = '$email', `internalCurrencyCount` = '$internalCurrencyCount', `password` = '$password', `gender` = '$gender', `birthday` = '$birthday', `address` = '$address') WHERE `user`.`email` = '$email'";	
	
	sql($sql);

	echo "success";


?>