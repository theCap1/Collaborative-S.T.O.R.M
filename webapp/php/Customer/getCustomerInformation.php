<?php
include_once '../db.php';

$email = $_GET['email'];

$conn = connect();
$conn->set_charset('utf8');

$resultArr = array();
$sql = "SELECT * FROM `customer` WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArr['customer'][$row['email']] = array('email' => $row['email'], 'address' => $row['address']);

        $sql2 = "SELECT id, name, address FROM shop INNER JOIN rel_shop_customer WHERE customer_email='".$row['email']."' AND rel_shop_customer.shop_id = shop.id";
        $result2 = $conn->query($sql2);
        while($row2 = $result2->fetch_assoc()) {
            $resultArr['customer'][$row['email']]['shops'][] = $row2;
        }

	$sql3 = "SELECT name FROM ad INNER JOIN rel_customer_ad WHERE customer_email='".$row['email']."' AND rel_customer_ad.ad_name = ad.name";
        $result3 = $conn->query($sql3);
        while($row3 = $result3->fetch_assoc()) {
            $resultArr['customer'][$row['email']]['ads'][] = $row3;
        }
    }
    $resultArr['customer'] = array_values($resultArr['customer']);
} else {
    echo "failure";
}
echo json_encode($resultArr, JSON_UNESCAPED_UNICODE);

mysql_error();
?>