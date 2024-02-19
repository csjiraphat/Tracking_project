import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import MyMenu from "../Nav"; // Import MyMenu component

const ShipmentsList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [shipments, setShipments] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editShipment, setEditShipment] = useState({});
  const [editedTrackingNumber, setEditedTrackingNumber] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedSender, setEditedSender] = useState("");
  const [editedReceiver, setEditedReceiver] = useState("");
  const [editedType, setEditedType] = useState("");
  const [newShipmentDialogOpen, setNewShipmentDialogOpen] = useState(false);
  const [newTrackingNumber, setNewTrackingNumber] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newSender, setNewSender] = useState("");
  const [newReceiver, setNewReceiver] = useState("");
  const [newType, setNewType] = useState("");
  const [editedImage, setEditedImage] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    fetchShipments();
    checkUserData();
  }, []);

  const handleLogout = () => {
    // ... กระบวนการออกจากระบบ ...
    setIsLoggedIn(false); // ตั้งค่าเมื่อออกจากระบบสำเร็จ
    // เปลี่ยนเส้นทางไปยังหน้าล็อคอิน
    window.location.href = "/login";
  };

  const checkUserData = () => {
    // ตรวจสอบข้อมูล userData ใน Local Storage
    const userDataLocalStorage = localStorage.getItem("userData");
    if (!userDataLocalStorage || !JSON.parse(userDataLocalStorage).isLoggedIn) {
      // หากไม่มีข้อมูลการล็อคอิน หรือ ไม่ได้ล็อคอินให้แสดงข้อความแจ้งเตือน

      // เปลี่ยนเส้นทางไปยังหน้าล็อคอิน
      window.location.href = "/login";
    }
  };

  const fetchShipments = async () => {
    try {
      const response = await axios.get("http://localhost/api/");
      const data = response.data;
      setShipments(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openEditDialog = (shipment) => {
    setEditShipment(shipment);
    setEditedTrackingNumber(shipment.tracking_number);
    setEditedStatus(shipment.status);
    setEditedLocation(shipment.location);
    setEditedSender(shipment.sender_name);
    setEditedReceiver(shipment.receiver_name);
    setEditedType(shipment.service_type);
    setEditedImage(shipment.image);

    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const saveEditedShipment = () => {
    const updatedShipment = {
      ...editShipment,
      tracking_number: editedTrackingNumber,
      status: editedStatus,
      location: editedLocation,
      sender_name: editedSender,
      receiver_name: editedReceiver,
      service_type: editedType,
      image: editedImage,
    };

    fetch(`http://localhost/api/${updatedShipment.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedShipment),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        if (result.status === "ok") {
          fetchShipments(); // เรียกใช้ฟังก์ชันเพื่อรีเฟรชข้อมูลการส่งมอบใหม่
          closeEditDialog();
        }
        fetchShipments();
      });
  };

  const deleteShipment = (id) => {
    const data = {
      id: id,
    };

    fetch("http://localhost/api/", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        fetchShipments();
      });
  };

  const handleDeleteConfirmation = (id) => {
    if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
      deleteShipment(id);
    }
  };

  const openNewShipmentDialog = () => {
    setNewShipmentDialogOpen(true);
  };

  const closeNewShipmentDialog = () => {
    setNewShipmentDialogOpen(false);
  };

  const addNewShipment = () => {
    const newShipment = {
      tracking_number: newTrackingNumber,
      status: newStatus,
      location: newLocation,
      sender_name: newSender,
      receiver_name: newReceiver,
      service_type: newType,
      image: newImage, // ใช้ URL ของรูปภาพที่ผู้ใช้ป้อน
    };

    fetch("http://localhost/api/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShipment),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
        if (result.status === "ok") {
          fetchShipments(); // เรียกใช้ฟังก์ชันเพื่อรีเฟรชข้อมูลการส่งมอบใหม่
          closeNewShipmentDialog();
        }
        fetchShipments();
      });
  };

  return (
    <div>
      <MyMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Container>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            marginTop: "1.2rem",
          }}
        >
          Shipment List
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={openNewShipmentDialog}
          >
            New
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tracking Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Sender Name</TableCell>
                <TableCell>Receiver Name</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Image</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.tracking_number}</TableCell>
                  <TableCell>{shipment.status}</TableCell>
                  <TableCell>{shipment.location}</TableCell>
                  <TableCell>{shipment.sender_name}</TableCell>
                  <TableCell>{shipment.receiver_name}</TableCell>
                  <TableCell>{shipment.service_type}</TableCell>
                  <TableCell>
                    {shipment.image && (
                      <img
                        src={shipment.image} // เปลี่ยนการใช้ shipment.img เป็น shipment.image
                        alt="Shipment"
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteConfirmation(shipment.id)}
                      style={{ marginRight: "1.2rem" }} // เพิ่มระยะห่างด้านขวา
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditDialog(shipment)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
        <Dialog open={editDialogOpen} onClose={closeEditDialog}>
          <DialogTitle>Edit Shipment</DialogTitle>
          <DialogContent>
            <TextField
              label="Tracking Number"
              value={editedTrackingNumber}
              onChange={(e) => setEditedTrackingNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Sender Name"
              value={editedSender}
              onChange={(e) => setEditedSender(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Receiver Name"
              value={editedReceiver}
              onChange={(e) => setEditedReceiver(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Service Type"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="image"
              value={editedImage}
              type="text"
              name="imgage"
              onChange={(e) => setEditedImage(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={saveEditedShipment} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={newShipmentDialogOpen} onClose={closeNewShipmentDialog}>
          <DialogTitle>New Shipment</DialogTitle>
          <DialogContent>
            <TextField
              label="Tracking Number"
              value={newTrackingNumber}
              onChange={(e) => setNewTrackingNumber(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Location"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Sender Name"
              value={newSender}
              onChange={(e) => setNewSender(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Receiver Name"
              value={newReceiver}
              onChange={(e) => setNewReceiver(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Service Type"
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image URL" // ใช้ URL ของรูปภาพ
              type="text"
              name="image"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              fullWidth
              margin="normal"
            />

            {/* Add more fields as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeNewShipmentDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={addNewShipment} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ShipmentsList;
