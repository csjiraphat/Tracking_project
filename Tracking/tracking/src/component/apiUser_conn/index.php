<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "user_conn";

$connection = new mysqli($host, $username, $password, $database);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

$query = "SELECT * FROM users";
$result = $connection->query($query);

$users = array();
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

$connection->close();

header('Content-Type: application/json');
echo json_encode($users);
