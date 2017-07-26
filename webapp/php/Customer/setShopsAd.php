<?php
	include_once '../db.php';

	$shops = $_GET['shops'];
	$ad_name = $_GET['ad_name'];
	$sql = "DELETE FROM `rel_shop_ad` WHERE ad_name = '$ad_name'";
	sql($sql);
	
	foreach ($shops as &$value) {
		$sql = "INSERT INTO `rel_shop_ad` (`ad_name`, `shop_id`) VALUES ('$ad_name', '$value');";
		sql($sql);
	}

	echo "success";

?>