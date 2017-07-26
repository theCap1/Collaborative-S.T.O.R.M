<?php
include_once 'db.php';

$sql = "SELECT address, name, id FROM `shop`";
$result = json_encode(sql($sql), JSON_UNESCAPED_UNICODE);

$str = '{"shop": ' . $result . '}';
	
echo $str;

?>