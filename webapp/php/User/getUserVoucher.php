<?php
include_once '../db.php';

$email = $_GET['email'];

$conn = connect();
$conn->set_charset('utf8');

$resultArr = array();
$sql = "SELECT name, description, requiredPoints, img, voucher_code FROM `voucher` JOIN rel_user_voucher WHERE `voucher`.`name` = `rel_user_voucher`.`voucher_name` AND user_email = '$email'";
$result = $conn->query($sql);
echo $result;
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArr['voucher'][$row['voucher_code']] = array('name' => $row['name'], 'description' => $row['description'], 'requiredPoints' => $row['requiredPoints'], 'img' => base64_encode($row['img']), 'voucher_code' => $row['voucher_code']);
	}
    $resultArr['voucher'] = array_values($resultArr['voucher']);
} else {
    echo "failure";
}
echo json_encode($resultArr, JSON_UNESCAPED_UNICODE);

?>