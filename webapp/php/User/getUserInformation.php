<?php
include_once '../db.php';

$email = $_GET['email'];

$conn = connect();
$conn->set_charset('utf8');

$resultArr = array();
$sql = "SELECT * FROM `user` WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $resultArr['user'][$row['email']] = array('firstname' => $row['firstname'], 'lastname' => $row['lastname'], 'email' => $row['email'], 'internalCurrencyCount' => $row['internalCurrencyCount'], 'gender' => $row['gender'], 'birthday' => $row['birthday'], 'address' => $row['address']);

        //Anwser table results
        $sql2 = "SELECT name FROM interest_category INNER JOIN rel_user_int_cat WHERE user_email='".$row['email']."' AND rel_user_int_cat.int_cat_id = interest_category.id";
        $result2 = $conn->query($sql2);
        while($row2 = $result2->fetch_assoc()) {
            $resultArr['user'][$row['email']]['interest categories'][] = $row2;
        }
    }
    $resultArr['user'] = array_values($resultArr['user']);
} else {
    echo "failure";
}
echo json_encode($resultArr, JSON_UNESCAPED_UNICODE);

?>