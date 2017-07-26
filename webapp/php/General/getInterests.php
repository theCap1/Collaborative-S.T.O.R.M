<?php
include_once '../db.php';

$sql = "SELECT * FROM `interest_category`";
$result = json_encode(sql($sql), JSON_UNESCAPED_UNICODE);

$str = '{"interest_category": ' . $result . '}';
	
echo $str;

?>