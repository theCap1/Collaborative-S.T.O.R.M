<?php
	include_once '../db.php';



	$name = $_POST['name'];

	$sql = "DELETE FROM `ad` WHERE `ad`.`name` = '$name'";	
	
	sql($sql);

	echo "success";


?>