<?php
	include_once '../db.php';

	$voucher_name = $_GET['voucher_name'];
	
	$sql = "DELETE FROM `rel_user_voucher` WHERE voucher_name = '$voucher_name'";
	sql($sql);

	echo "success";

?>