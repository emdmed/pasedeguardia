import { useState, useEffect } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from '@/components/ui/button';

function QRCodeImporter({ setToggleShareDialog }) {
  const [cameraAvailable, setCameraAvailable] = useState(false);
  const [scanning, setScanning] = useState(false); // State for scanning feedback
  const [scanResult, setScanResult] = useState([]);
  const [currentPart, setCurrentPart] = useState(1);
  const [scannedCode, setScannedCode] = useState()
  const [error, setError] = useState('')


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("")
      }, 1000);

      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    if (!scannedCode) return

    if (scanResult.includes(scannedCode)) {
      setError("Proximo qr por favor....")
    } else {
      setScanResult(prev => [...prev, scannedCode])
      setCurrentPart(prev => ++prev)
    }
  }, [scannedCode])


  useEffect(() => {
    async function checkCamera() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInput = devices.some(device => device.kind === 'videoinput');
        setCameraAvailable(videoInput);
        setScanning(videoInput);
        if (videoInput) console.log("Camera found and scanning...");
      } catch (error) {
        console.error("Camera not accessible:", error);
      }
    }
    checkCamera();
  }, []);

  console.log("scanResult", scanResult)

  const handleScan = (data) => {
    console.log("data", data[0].rawValue)

    if (data[0].rawValue) {
      setScannedCode(data[0].rawValue)
    }
  };

  const handleError = (err) => {
    console.error("QR Code Scan Error:", err);
    setScanning(false); // Stop scanning on error
  };

  const saveData = () => {
    const completeData = scanResult.join("")
    localStorage.setItem("patients", completeData)
    setToggleShareDialog(false)
  }

  if (!cameraAvailable) {
    return <p>No camera found.</p>;
  }

  return (
    <div>
      <span className='font-bold text-lg text-cyan-700 my-3'>Escanea el Qr nro {currentPart}</span>
      {scanResult.length === currentPart && <span>Listo! Por favor escanea el proximo Qr</span>}
      <Scanner
        formats={["qr_code"]}
        onScan={handleScan}
        onError={handleError}
        facingMode="environment" // Use back camera if available
        style={{ width: '100%' }}
        useDevices={devices => console.log("devices", devices)}
      />
      <div className='flex justify-end items-center mt-2'>
        <Button className="bg-teal-700 me-2" onClick={saveData}>Finalizar</Button>
        <Button className="bg-pink-700" onClick={e => setToggleShareDialog(false)}>Cancelar</Button>
      </div>
    </div>
  );
}

export default QRCodeImporter;
