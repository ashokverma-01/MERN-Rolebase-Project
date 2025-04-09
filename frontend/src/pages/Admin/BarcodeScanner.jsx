import React, { useState } from "react";
import QRCode from "react-qr-code";
import Navbar from "../../components/Navbar";

const GenerateQRCode = () => {
  const [input, setInput] = useState("");
  const [qrData, setQrData] = useState("");

  const handleGenerate = () => {
    setQrData(input);
  };

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Generate QR Code</h2>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text or URL"
          style={{ padding: "10px", width: "300px" }}
        />

        <br />
        <button
          onClick={handleGenerate}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Generate QR Code
        </button>

        {qrData && (
          <div style={{ marginTop: "30px" }}>
            <QRCode value={qrData} />
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateQRCode;
