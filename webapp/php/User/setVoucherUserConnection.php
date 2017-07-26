<?php
	
	include_once '../db.php';



	$conn = connect();
	$conn->set_charset('utf8');

	$voucher_name = $_POST['voucher_name'];
	$user_email = $_POST['user_email'];
	$voucher_code = bin2hex(openssl_random_pseudo_bytes(10));
	$echo = "failure";

	$sql = "SELECT internalCurrencyCount FROM user WHERE email = '$user_email'";

	$result = $conn->query($sql);
	$CurrencyCount = 0;

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$CurrencyCount = $row['internalCurrencyCount'];
		}
	}

	$sql2 = "SELECT requiredPoints FROM voucher WHERE name = '$voucher_name'";

	$result2 = $conn->query($sql2);
	$requiredPoints = 999999;

	if ($result2->num_rows > 0) {
		while($row2 = $result2->fetch_assoc()) {
			$requiredPoints = $row2['requiredPoints'];
		}
	}

	if ($CurrencyCount > $requiredPoints){
		$sql3 = "INSERT INTO `rel_user_voucher` (`voucher_name`, `user_email`, `voucher_code`) VALUES ('$voucher_name', '$user_email', '$voucher_code')";
		$newCurrencyCount = $CurrencyCount - $requiredPoints;
		$sql4 = "UPDATE `user` SET `internalCurrencyCount` = '$newCurrencyCount' WHERE `user`.`email` = '$user_email'";
		sql($sql3);
		sql($sql4);
		$echo = "success";
	}
	
	echo $echo;


?>