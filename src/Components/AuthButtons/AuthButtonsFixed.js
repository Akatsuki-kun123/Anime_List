import { Link } from "react-router-dom";

import { Button } from "antd";

import "./AuthButtons.css";

function AuthButtonsFixed() {
  return (
    <div className="auth-buttons-fixed">
      <Link to="/login">
        <Button type="primary" className="auth-btn">
          Login
        </Button>
      </Link>

      <Link to="/register">
        <Button type="default" className="auth-btn">
          Register
        </Button>
      </Link>
    </div>
  );
}

export default AuthButtonsFixed;
