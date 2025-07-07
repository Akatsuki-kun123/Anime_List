import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

import AuthButtons from "../AuthButtons/AuthButtons";

import { AuthContext } from "../../Context/AuthContext";

function HeaderCompo() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleProfile = () => {
    navigate(`/profile/${user.id}`);
  };

  if (!user) {
    return (
      <div className={styles["auth-button"]}>
        <AuthButtons></AuthButtons>
      </div>
    );
  }

  return (
    <div className={styles["user-container"]}>
      <div
        className={styles["user-info"]}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className={styles["username"]}>{user.username}</span>
        <span className={styles["arrow"]}>▼</span>
        <img
          src={user.image || "https://i.pravatar.cc/46"}
          alt="avatar"
          className={styles["user-avatar"]}
        />
      </div>

      {dropdownOpen && (
        <div className={styles["dropdown"]}>
          <button onClick={handleProfile}>Profile</button>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default HeaderCompo;
