import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

const EditShipment = () => {
  const { trackingNumber } = useParams();
  const [shipmentData, setShipmentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost/api/${trackingNumber}`)
      .then((response) => {
        setShipmentData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลการส่ง:", error);
        setIsLoading(false);
      });
  }, [trackingNumber]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("status", shipmentData.status);
    formData.append("location", shipmentData.location);
    formData.append("sender_name", shipmentData.sender_name);
    formData.append("receiver_name", shipmentData.receiver_name);
    formData.append("service_type", shipmentData.service_type);
    formData.append("image", shipmentData.image);

    axios
      .put(`http://localhost/api/${trackingNumber}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // จัดการเมื่อสำเร็จ เช่นแสดงข้อความสำเร็จ
        console.log("การอัปเดตสำเร็จ:", response);

        // รีเฟรชหน้าจอ
        window.location.reload();
      })
      .catch((error) => {
        // จัดการเมื่อเกิดข้อผิดพลาด เช่นแสดงข้อความผิดพลาด
        console.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล:", error);
      });
  };

  const handleImageChange = (e) => {
    setShipmentData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  if (isLoading) {
    return <p>กำลังโหลด...</p>;
  }
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Shipment: {trackingNumber}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <TextField
          label="Status"
          fullWidth
          value={shipmentData.status}
          onChange={(e) =>
            setShipmentData((prevData) => ({
              ...prevData,
              status: e.target.value,
            }))
          }
        />
        <TextField
          label="Location"
          fullWidth
          value={shipmentData.location}
          onChange={(e) =>
            setShipmentData((prevData) => ({
              ...prevData,
              location: e.target.value,
            }))
          }
        />
        <TextField
          label="Sender Name"
          fullWidth
          value={shipmentData.sender_name}
          onChange={(e) =>
            setShipmentData((prevData) => ({
              ...prevData,
              sender_name: e.target.value,
            }))
          }
        />
        <TextField
          label="Receiver Name"
          fullWidth
          value={shipmentData.receiver_name}
          onChange={(e) =>
            setShipmentData((prevData) => ({
              ...prevData,
              receiver_name: e.target.value,
            }))
          }
        />
        <TextField
          label="Service Type"
          fullWidth
          value={shipmentData.service_type}
          onChange={(e) =>
            setShipmentData((prevData) => ({
              ...prevData,
              service_type: e.target.value,
            }))
          }
        />
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ marginTop: 2 }}
        >
          Update
        </Button>
      </Paper>
    </Container>
  );
};

export default EditShipment;
