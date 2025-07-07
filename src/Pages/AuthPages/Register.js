import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import styles from "./Register.module.css";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/register", {
        params: {
          email,
          username,
          password,
        },
      });

      if (res.data.success) {
        toast.success("Account created successfully!");
        toast.success("Redirecting to login in 2s...");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const isFormValid =
    email && username.length >= 2 && username.length <= 16 && password;

  return (
    <div className={styles["register-container"]}>
      <ToastContainer />

      <h2>Start Using AnimeList</h2>
      <p className={styles["subtext"]}>
        Join AnimeList to catalog your anime and manga, compare with your
        friends, create your own profile, and plenty more. It’s Free.
      </p>

      <div className={styles["social-buttons"]}>
        <button className={styles["google-btn"]}>G Google</button>
      </div>

      <div className={styles["divider"]}>
        <span></span>
        <p>Or</p>
        <span></span>
      </div>

      <form onSubmit={handleRegister} className={styles["form"]}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles["input-field"]}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles["input-field"]}
        />
        <p className={styles["hint"]}>(Between 2 and 16 characters)</p>

        <div className={styles["password-wrapper"]}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["input-field"]}
          />
          <label className={styles["show-label"]}>
            <input
              type="checkbox"
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
            />{" "}
            Show Password
          </label>
        </div>

        <button
          type="submit"
          className={styles["submit-btn"]}
          disabled={!isFormValid}
        >
          Create Account
        </button>

        <p className={styles["terms-text"]}>
          By clicking Create Account, you agree to our <span>Terms</span> and{" "}
          <span>Privacy Policy</span>.
        </p>

        <p className={styles["login-link"]}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={styles["login-btn"]}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
