import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import MyMenu from "../Nav"; // Import MyMenu component

const TrackingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shipments, setShipments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ตรวจสอบสถานะการล็อกอินจาก Local Storage เมื่อ component ถูกโหลด
    const isLoggedInLocalStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInLocalStorage === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) {
      setErrorMessage("Please enter a search query");
      setShipments([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost/api/");
      const data = response.data;

      const formattedQuery = searchQuery.toLowerCase();

      const filteredData = data.filter((shipment) =>
        shipment.tracking_number.toLowerCase().includes(formattedQuery)
      );

      if (filteredData.length === 0) {
        setShipments([]);
        setErrorMessage("No shipments found");
      } else {
        setShipments(filteredData);
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <MyMenu
        isAdmin={true}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ margin: "1rem" }}>
          Shipment Tracking
        </Typography>
        <TextField
          label="Search Query"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ margin: "1rem" }}
        >
          Search
        </Button>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {shipments.length > 0 && (
          <Paper elevation={3} style={{ padding: "1rem", marginTop: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Searched Shipments
            </Typography>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </div>
    </div>
  );
};

export default TrackingPage;
