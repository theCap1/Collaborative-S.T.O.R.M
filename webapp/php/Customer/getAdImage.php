<?php
include_once '../db.php';

$name = $_GET['name'];

$conn = connect();
$conn->set_charset('utf8');

$sql = "SELECT img FROM `ad` WHERE name = '$name'";
$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$img = $row['img'];
		}
	}

echo base64_encode($img);

?>