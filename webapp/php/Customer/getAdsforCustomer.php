<?php
include_once '../db.php';

$email = $_GET['email'];

$sql = "SELECT name FROM `ad` INNER JOIN rel_customer_ad WHERE rel_customer_ad.ad_name = ad.name AND rel_customer_ad.customer_email = '$email'";
$result = json_encode(sql($sql), JSON_UNESCAPED_UNICODE);

$str = '{"ad": ' . $result . '}';
	
echo $str;

?>