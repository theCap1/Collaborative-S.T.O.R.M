<?php
	include_once '../db.php';

	$interests = $_GET['interests'];
	$ad_name = $_GET['ad_name'];
	$i = 0;
	
	foreach ($interests as &$value) {
		$i++;
		$sql = "SELECT * FROM `rel_ad_int_cat` WHERE ad_name = '$ad_name' AND int_cat_id = '$i'";
		$response = json_encode(sql($sql), JSON_UNESCAPED_UNICODE);
		if ($value == 1){
			if ($response == "[]"){
				//value 1 resp 0";
				$sql = "INSERT INTO `rel_ad_int_cat` (`ad_name`, `int_cat_id`) VALUES ('$ad_name', '$i');";
			}else{
				//value 1 resp 1 -> done";
			}
		}else{
			if ($response == "[]"){
				//value 0 resp 0 -> done";
			}else{
				//value 0 resp 1";
				$sql = "DELETE FROM `rel_ad_int_cat` WHERE ad_name = '$ad_name' AND int_cat_id = '$i';";
			}
		}
		sql($sql);
	}

	echo "success";

?>