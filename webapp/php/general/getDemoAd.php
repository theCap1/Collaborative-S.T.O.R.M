<?php
include_once '../db.php';

$email = $_GET['email'];
$shop = $_GET['shop'];

$conn = connect();
$conn->set_charset('utf8');

$sql = "SELECT * FROM ad INNER JOIN rel_shop_ad ON ad.name = rel_shop_ad.ad_name INNER JOIN shop ON rel_shop_ad.shop_id = shop.id INNER JOIN rel_ad_int_cat ON rel_ad_int_cat.ad_name = ad.name INNER JOIN interest_category ON rel_ad_int_cat.int_cat_id = interest_category.id INNER JOIN rel_user_int_cat ON rel_user_int_cat.int_cat_id = interest_category.id INNER JOIN user ON user.email = rel_user_int_cat.user_email WHERE user.email = '$email' AND shop.id = '$shop'";
$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$img = $row['img'];
		}
	}

echo base64_encode($img);

?>