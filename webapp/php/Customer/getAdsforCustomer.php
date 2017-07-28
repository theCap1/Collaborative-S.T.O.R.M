<?php
include_once '../db.php';

$email = $_GET['email'];

$conn = connect();
$conn->set_charset('utf8');

$resultArr = array();
$sql = "SELECT * FROM `ad` INNER JOIN rel_customer_ad WHERE rel_customer_ad.ad_name = ad.name AND rel_customer_ad.customer_email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArr['ad'][$row['name']] = array('name' => $row['name'], 'img' => base64_encode($row['img']));

        $sql2 = "SELECT id, name FROM interest_category INNER JOIN rel_ad_int_cat WHERE ad_name='".$row['name']."' AND rel_ad_int_cat.int_cat_id = interest_category.id";
        $result2 = $conn->query($sql2);
        while($row2 = $result2->fetch_assoc()) {
            $resultArr['ad'][$row['name']]['interest categories'][] = $row2;
        }
    }
    $resultArr['ad'] = array_values($resultArr['ad']);
}
echo json_encode($resultArr, JSON_UNESCAPED_UNICODE);

?>