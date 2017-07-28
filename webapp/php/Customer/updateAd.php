<?php
	include_once '../db.php';

	$name = $_GET['name'];
	$oldname = $_GET['oldname'];

	$sql = "UPDATE `ad` SET `name` = '$name' WHERE `ad`.`name` = '$oldname'";	
	sql($sql);
	echo "success";
	


?>