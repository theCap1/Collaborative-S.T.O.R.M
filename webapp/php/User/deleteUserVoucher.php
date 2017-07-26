<?php
	include_once '../db.php';

	$voucher_code = $_GET['voucher_code'];
	
	$sql = "DELETE FROM `rel_user_voucher` WHERE voucher_code = '$voucher_code'";
	sql($sql);

	echo "success";

?>