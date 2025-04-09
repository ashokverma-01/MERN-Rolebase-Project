import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [remember, setRemember] = useState(false);

  const sendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/send-otp`, {
        email,
      });
      setStep(2);
    } catch (err) {
      alert("OTP भेजने में समस्या आई");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify-otp`,
        {
          email,
          otp,
        }
      );

      if (remember) {
        localStorage.setItem("token", res.data.token);
      } else {
        sessionStorage.setItem("token", res.data.token);
      }

      window.location.href = "/dashboard";
    } catch (err) {
      alert("OTP गलत है या expire हो चुका है");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login with OTP</h2>
      {step === 1 ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <br />
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember Me
          </label>
          <br />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <br />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
