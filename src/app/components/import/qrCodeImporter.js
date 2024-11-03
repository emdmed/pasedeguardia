import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

function QRCodeImporter({ onDataComplete }) {
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [scanning, setScanning] = useState(false); // State for scanning feedback
  const [scanResult, setScanResult] = useState([]);
  const [currentPart, setCurrentPart] = useState(1);

  useEffect(() => {
    async function checkCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInput = devices.some(device => device.kind === 'videoinput');
        setCameraAvailable(videoInput);
        setScanning(videoInput); // Set scanning to true if camera is available
        if (videoInput) console.log("Camera found and scanning...");
      } catch (error) {
        console.error("Camera not accessible:", error);
      }
    }
    checkCamera();
  }, []);

  const handleScan = (data) => {
    if (data) {
      console.log("QR code detected:", data); // Log the raw data from QR code
      setScanning(false); // Stop scanning once data is detected

    }
  };

  const handleError = (err) => {
    console.error("QR Code Scan Error:", err);
    setScanning(false); // Stop scanning on error
  };

  if (!cameraAvailable) {
    return <p>No camera found.</p>;
  }

  return (
    <div>
      <h3>Scan Part {currentPart}</h3>
      {scanning ? (
        <p style={{ color: "green" }}>Scanning for QR code...</p>
      ) : (
        <p style={{ color: "red" }}>QR code detected, processing...</p>
      )}
      <Scanner
        onScan={handleScan}
        onError={handleError}
        facingMode="environment" // Use back camera if available
        style={{ width: '100%' }}
        useDevices={devices => console.log("devices", devices)}
      />
      <p>Parts scanned: {scanResult.length}</p>
    </div>
  );
}

export default QRCodeImporter;
