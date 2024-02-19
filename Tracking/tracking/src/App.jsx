import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyMenu from "./Nav"; // Import MyMenu component
import TrackingPage from "./component/TrackingPage";
import LoginPage from "./component/Login"; // Import LoginPage component
import ShipmentsList from "./component/ShipmentsList";
import LoginPage_G from "./component/Login_Guest";

const App = () => {
  const serverName = "http://localhost/api/";
  const User = "http://localhost/apiUser_conn/";
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state

  const handleLogout = () => {
    setIsLoggedIn(false); // Update isLoggedIn state when logging out
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage serverName={User} setIsLoggedIn={setIsLoggedIn} />
            } // Pass setIsLoggedIn function
          />
          <Route
            path="/login_G"
            element={
              <LoginPage_G serverName={User} setIsLoggedIn={setIsLoggedIn} />
            } // Pass setIsLoggedIn function
          />
          <Route
            index
            element={<TrackingPage isLoggedIn={isLoggedIn} />} // Pass isLoggedIn state
          />
          <Route
            path="/tracking"
            element={<TrackingPage serverName={serverName} />}
          />
          <Route
            path="/info"
            element={<ShipmentsList serverName={serverName} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
