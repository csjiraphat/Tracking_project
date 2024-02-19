import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import MyMenu from "../Nav";
import { Link } from "react-router-dom"; // เพิ่ม import

const LoginPage = () => {
  const username = useRef();
  const password = useRef();
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // เพิ่ม state สำหรับตรวจสอบว่าเป็นแอดมินหรือไม่

  // ตรวจสอบข้อมูลผู้ใช้ใน Local Storage เมื่อ component ถูกโหลด
  useEffect(() => {
    const userDataLocalStorage = localStorage.getItem("user_g");
    if (userDataLocalStorage) {
      const user_g = JSON.parse(userDataLocalStorage);
      if (user_g.isLoggedIn) {
        setIsLoggedIn(true);
        // เช็คว่าผู้ใช้เป็นแอดมินหรือไม่
        if (user_g.isAdmin) {
          setIsAdmin(true);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    // ... กระบวนการออกจากระบบ ...
    setIsLoggedIn(false); // ตั้งค่าเมื่อออกจากระบบสำเร็จ

    // ล้างข้อมูลการล็อกอินออกจาก Local Storage
    localStorage.removeItem("user_g");
  };

  const handleLogin = async () => {
    // ... กระบวนการเข้าสู่ระบบ ...
    setIsLoggedIn(true); // ตั้งค่าเมื่อเข้าสู่ระบบสำเร็จ
    try {
      const response = await axios.get("http://localhost/apiUser_conn/");
      const users = response.data;

      const foundUser = users.find(
        (user) =>
          user.username === username.current.value &&
          user.password_hash === password.current.value
      );

      if (foundUser) {
        setLoginError(false);
        setIsLoggedIn(true); // ตั้งค่าสถานะการล็อกอินเป็น true
        // เช็คว่าผู้ใช้เป็นแอดมินหรือไม่
        if (foundUser.isAdmin) {
          setIsAdmin(true);
        }

        window.location.href = "/";

        // ตั้งค่าข้อมูลผู้ใช้
        const user_g = {
          username: username.current.value,
          password: password.current.value,
          isLoggedIn: true,
          // เพิ่มค่า isAdmin เมื่อเข้าสู่ระบบเป็นแอดมิน
          isAdmin: foundUser.isAdmin,
        };

        // เก็บข้อมูลผู้ใช้ใน Local Storage
        localStorage.setItem("user_g", JSON.stringify(user_g));
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <MyMenu isAdmin={isAdmin} setIsLoggedIn={setIsLoggedIn} />

      {/* Show the menu */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom style={{ margin: "1rem" }}>
          Login for User
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          inputRef={username}
          style={{ margin: "0.5rem" }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          inputRef={password}
          style={{ margin: "0.5rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          style={{ margin: "1rem" }}
        >
          Login
        </Button>
        {loginError && (
          <Typography color="error">Invalid username or password</Typography>
        )}

        {/* เพิ่มปุ่มสำหรับสลับหน้าล็อคอิน */}
        {isAdmin ? (
          <Link
            to="/login_G"
            style={{
              textDecoration: "none",
              color: "blue",
              paddingTop: "2.5rem",
            }}
          >
            <Button>Login as User</Button>
          </Link>
        ) : (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "blue",
              paddingTop: "2.5rem",
            }}
          >
            <Button>Login as Admin</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
