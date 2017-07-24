<?php
include_once '../db.php';

$conn = connect();
$conn->set_charset('utf8');

$resultArr = array();
$sql = "SELECT * FROM `voucher`";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArr['voucher'][$row['name']] = array('name' => $row['name'], 'description' => $row['description'], 'requiredPoints' => $row['requiredPoints'], 'img' => base64_encode($row['img']));
    }
    $resultArr['voucher'] = array_values($resultArr['voucher']);
} else {
    echo "failure";
}
echo json_encode($resultArr, JSON_UNESCAPED_UNICODE);

?>