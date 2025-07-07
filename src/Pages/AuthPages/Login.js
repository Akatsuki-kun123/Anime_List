import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import styles from "./Login.module.css";

import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const curUser = localStorage.getItem("user");
    const curUser1 = sessionStorage.getItem("user");
    if (curUser || curUser1) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/login", {
        params: { username, password },
      });

      if (res.data.success) {
        login(res.data.data, stayLoggedIn);
        toast.success("Logged in successfully!");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Login failed: Invalid credentials");
        toast.error("Login failed: Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles["authWrapper"]}>
      <ToastContainer />

      <div className={styles["title"]}>Login</div>

      <div className={styles["authCard"]}>
        <h3 className={styles["socialHeader"]}>Login with</h3>

        <div className={styles["socialButtons"]}>
          <button className={styles["googleBtn"]}>Google</button>
          <button className={styles["appleBtn"]}>Apple</button>
          <button className={styles["facebookBtn"]}>Facebook</button>
          <button className={styles["twitterBtn"]}>Twitter</button>
        </div>

        <div className={styles["divider"]}>
          <span>Or</span>
        </div>

        <form onSubmit={handleLogin} className={styles["authForm"]}>
          <label className={styles["formLabel"]}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className={styles["formInput"]}
          />

          <label className={styles["formLabel"]}>
            Password
            <input
              type="checkbox"
              checked={showPass}
              onChange={() => setShowPass(!showPass)}
              className={styles["showPassCheckbox"]}
            />
            <span className={styles["showPassLabel"]}>Show Password</span>
          </label>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles["formInput"]}
          />

          <label className={styles["stayLogged"]}>
            <input
              type="checkbox"
              checked={stayLoggedIn}
              onChange={() => setStayLoggedIn(!stayLoggedIn)}
            />
            Stay logged in?
          </label>

          <p className={styles["warningText"]}>
            Beware of phishing sites pretending to be MAL. Always check the
            domain is myanimelist.net before entering your password.
          </p>

          <button type="submit" className={styles["loginBtn"]}>
            Login
          </button>

          <p className={styles["bottomLinks"]}>
            <a href="#">Forgot username?</a> | <a href="#">Forgot password?</a>
          </p>
        </form>

        <button onClick={() => navigate("/register")} className={styles["signUpBtn"]}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
