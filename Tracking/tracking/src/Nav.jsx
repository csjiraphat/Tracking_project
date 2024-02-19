import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import logoUrl from "./assets/logo.png";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { color } from "@mui/system";

const MyMenu = ({ onLogout }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ตรวจสอบข้อมูล userData จาก Local Storage เมื่อ component ถูกโหลด
    const userDataLocalStorage = localStorage.getItem("userData");
    if (userDataLocalStorage) {
      const userData = JSON.parse(userDataLocalStorage);
      setIsLoggedIn(userData.isLoggedIn);
    }
  }, []);

  const handleLogout = () => {
    // ลบข้อมูล userData ออกจาก Local Storage
    localStorage.removeItem("userData");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={logoUrl} style={{ width: "80px" }} alt="Logo" />
          เช็คพัสดุ
        </Typography>
        <Button color="inherit" href="/tracking">
          หน้าหลัก
        </Button>
        {isLoggedIn ? (
          <>
            <Button color="inherit" href="/info">
              การจัดการพัสดุ
            </Button>
            {/* เปลี่ยน <Button> เป็น <Link> */}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit" onClick={handleLogout}>
                LOGOUT
              </Button>
            </Link>
          </>
        ) : (
          <Link
            to="/login_G"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">LOGIN</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyMenu;
