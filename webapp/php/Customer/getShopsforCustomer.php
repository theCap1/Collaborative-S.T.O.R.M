<?php
include_once '../db.php';

$email = $_GET['email'];

$sql = "SELECT address, name, id FROM `shop` INNER JOIN `rel_shop_customer` WHERE shop.id = rel_shop_customer.shop_id AND rel_shop_customer.customer_email = '$email'";
$result = json_encode(sql($sql), JSON_UNESCAPED_UNICODE);

$str = '{"shop": ' . $result . '}';
	
echo $str;

?>