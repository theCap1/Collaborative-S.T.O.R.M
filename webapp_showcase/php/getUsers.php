<?php
include_once 'db.php';

$sql = "SELECT * FROM `user`";
$result = json_encode(sql($sql), JSON_UNESCAPED_UNICODE);

$str = '{"user": ' . $result . '}';
	
echo $str;

?>