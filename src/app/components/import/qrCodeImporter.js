import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

function QRCodeImporter({ setToggleShareDialog }) {
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [scanning, setScanning] = useState(false); // New state for scanning feedback
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

  const handleFinish = () => {
    const completeData = scanResult.join("")
    localStorage.setItem("patients", completeData)
    setToggleShareDialog(false)
  }

  const handleScan = (data) => {
    if (data && scanning) {
      console.log("QR code detected:", data); // Log the raw data from QR code
      setScanning(false); // Stop scanning once data is detected
      setScanResult([...scanResult, data.text])
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
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        constraints={{ facingMode: "environment" }} 
      />
      <p>Parts scanned: {scanResult.length}</p>
      <Button disabled={scanning} onClick={e => setScanning(true)}>Proximo</Button>
      <Button onClick={handleFinish}>Finalizar</Button>
    </div>
  );
}

export default QRCodeImporter;
