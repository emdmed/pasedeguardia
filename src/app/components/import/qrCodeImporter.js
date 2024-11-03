import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

function QRCodeImporter({ onDataComplete }) {
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [scanResult, setScanResult] = useState([]);
  const [currentPart, setCurrentPart] = useState(1);

  useEffect(() => {
    async function checkCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInput = devices.some(device => device.kind === 'videoinput');
        setCameraAvailable(videoInput);
      } catch (error) {
        console.error("Camera not accessible:", error);
      }
    }
    checkCamera();
  }, []);

  const handleScan = (data) => {
    if (data) {
      const [header, content] = data.text.split(':');
      const [_, part, total] = header.match(/part (\d+)\/(\d+)/) || [];
      const parsedPart = parseInt(part, 10);
      const parsedTotal = parseInt(total, 10);

      if (parsedPart === currentPart && content) {
        setScanResult(prev => [...prev, content]);
        setCurrentPart(currentPart + 1);

        if (scanResult.length + 1 === parsedTotal) {
          const fullData = scanResult.join('') + content;
          onDataComplete(fullData);
        }
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Code Scan Error:", err);
  };

  if (!cameraAvailable) {
    return <p>No se encontró la cámara</p>;
  }

  return (
    <div>
      <h3>Escanear parte {currentPart}</h3>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        facingMode="environment" // Use back camera
      />
      <p>Partes escaneadas: {scanResult.length}</p>
    </div>
  );
}

export default QRCodeImporter;
