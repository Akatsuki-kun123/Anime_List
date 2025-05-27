import React from "react";
import { Link } from "react-router-dom";

import { Button } from "antd";

import "./AuthButtons.css";

function AuthButtons() {
  return (
    <div className="auth-buttons">
      <Link to="/login">
        <Button type="primary" size="small" className="auth-btn">
          Login
        </Button>
      </Link>
      
      <Link to="/register">
        <Button type="default" size="small" className="auth-btn">
          Register
        </Button>
      </Link>
    </div>
  );
}

export default AuthButtons;
