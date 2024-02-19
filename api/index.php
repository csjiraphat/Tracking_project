<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

// Include the database connection file
require_once 'connection.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Retrieve the input data
$data = json_decode(file_get_contents("php://input"), true);
switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "SELECT * FROM shipments WHERE id='$id'";
        } else {
            $sql = "SELECT * FROM shipments";
        }

        $result = $conn->query($sql);
        $response = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response = array('status' => 'error', 'message' => 'No records found');
        }

        echo json_encode($response);
        break;


    case 'POST':
        // Handle POST request to insert data into the "shipments" table
        $tracking_number = $data['tracking_number'];
        $status = $data['status'];
        $location = $data['location'];
        $sender_name = $data['sender_name'];
        $receiver_name = $data['receiver_name'];
        $service_type = $data['service_type'];
        $image = $data['image'];

        $sql = "INSERT INTO shipments (tracking_number, status, location, sender_name, receiver_name, service_type,image)
                    VALUES ('$tracking_number', '$status', '$location', '$sender_name', '$receiver_name', '$service_type', '$image')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }



        echo json_encode($response);
        break;

    case 'CREATE':
        // Handle POST request to insert data into the "shipments" table
        $tracking_number = $data['tracking_number'];
        $status = $data['status'];
        $location = $data['location'];
        $sender_name = $data['sender_name'];
        $receiver_name = $data['receiver_name'];
        $service_type = $data['service_type'];
        $image = $data['image'];

        $sql = "INSERT INTO shipments (tracking_number, status, location, sender_name, receiver_name, service_type,image)
                    VALUES ('$tracking_number', '$status', '$location', '$sender_name', '$receiver_name', '$service_type', '$image')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;


    case 'PUT':
        // Handle PUT request to update data in the "shipments" table
        $id = $data['id'];
        $tracking_number = $data['tracking_number'];
        $status = $data['status'];
        $location = $data['location'];
        $sender_name = $data['sender_name'];
        $receiver_name = $data['receiver_name'];
        $service_type = $data['service_type'];
        $image = $data['image'];

        $sql = "UPDATE shipments
                    SET tracking_number='$tracking_number', status='$status', location='$location',
                        sender_name='$sender_name', receiver_name='$receiver_name', service_type='$service_type', image='$image'
                    WHERE id='$id'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $conn->error);
        }

        echo json_encode($response);
        break;


    case 'DELETE':
        // Handle DELETE request to delete data from the "shipments" table
        $id = $data['id'];

        $sql = "DELETE FROM shipments WHERE id='$id'";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record deleted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;

    case 'vote':
        $vote = $data['rating'];
        $shipment_id = $data['shipment_id'];


        $sql = "INSERT INTO vote (id,vote,shipment_id) VALUES ('','$vote','$shipment_id')";

        if ($conn->query($sql) === TRUE) {
            $response = array('status' => 'success', 'message' => 'Record inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting record: ' . $conn->error);
        }

        echo json_encode($response);
        break;
    default:
        // Invalid request method
        $response = array('status' => 'error', 'message' => 'Invalid request method');
        echo json_encode($response);
        break;
}
