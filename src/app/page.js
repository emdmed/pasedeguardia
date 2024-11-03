'use client'

const VERSION = "0.1"
import { Button } from "@/components/ui/button";
import Patients from "./components/patients/patients";
import { PlusSquare, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import AddPatient from "./components/patients/addPatient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { decryptString, encryptString } from "@/lib/encryption/browserEncryption";
import { HardDrive } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ImportDialog from "./components/import/importDialog";
import ExportDialog from "./components/export /exportDialog";

export default function Home() {

  const [toggleAddPatientForm, setToggleAddPatientForm] = useState(false)
  const [secretKey, setSecretKey] = useState("")
  const [validSecretKey, setValidSecretKey] = useState("")
  const [patients, setPatients] = useState([])
  const [encryptedStoredData, setEncryptedStoredData] = useState()
  const [isDecrypted, setIsDecripted] = useState(false)
  const [toggleShareDialog, setToggleShareDialog] = useState(false)
  const [toggleExportDialog, setToggleExportDialog] = useState(false)

  useEffect(() => {
    const storedData = localStorage.getItem("patients")
    if (storedData) setEncryptedStoredData(storedData)

    if (storedData && validSecretKey) {
      const decrypted = decryptString(storedData, validSecretKey)
      console.log("decrypted", decrypted)

      if (decrypted) {
        setIsDecripted(true)
        setPatients(JSON.parse(decrypted))
      }
    }

    if (!storedData && validSecretKey) {
      setIsDecripted(true)
    }
  }, [validSecretKey])

  const reset = () => {
    localStorage.clear()
    setEncryptedStoredData(false)
  }

  useEffect(() => {
    if (encryptedStoredData && encryptedStoredData.length > 0) {
      console.log("stored length", encryptedStoredData.length)
    }
  }, [encryptedStoredData])

  useEffect(() => {
    if (patients.length > 0) {
      const patientString = JSON.stringify(patients)

      localStorage.setItem("patients", encryptString(patientString, validSecretKey))
    }
  }, [patients, validSecretKey])

  if (!isDecrypted && !toggleShareDialog) return <div className="bg-slate-200 h-screen flex flex-col items-center justify-center">
    <span className="font-bold" style={{ fontSize: 40 }}>Pasedeguardia</span>
    <Card className="bg-slate-100 mx-2 my-2">
      <CardHeader>
        <CardTitle>
          Ingrese su clave
        </CardTitle>
        <CardDescription>Si olvidas tu clave, deberás reiniciar y se perderán todos tus datos guardados.</CardDescription>
      </CardHeader>
      <CardContent>
        {encryptedStoredData && <Alert className="bg-slate-100 border-black">
          <HardDrive className="text-pink-700 " />
          <AlertTitle className="ms-2">
            Atencion
          </AlertTitle>
          <AlertDescription className="ms-2 w-full">
            Hay datos guardados en este dispositivo
          </AlertDescription>
        </Alert>}
        {validSecretKey && !isDecrypted && <CardContent className="flex justify-center items-center py-3">
          <span className="font-bold text-pink-700">Clave invalida !</span>
        </CardContent>}
        <Input placeholder="Ingrese su clave..." type="password" className="bg-white my-2" value={secretKey} onChange={e => setSecretKey(e.target.value)} />
        <div className="flex justify-end">
          <Button className="mx-1 bg-teal-700" onClick={e => setValidSecretKey(secretKey)}>Continuar</Button>
          <Button className="mx-1 bg-pink-700" onClick={reset}>Reiniciar</Button>
          <Button onClick={e => setToggleShareDialog(true)}>Importar</Button>
        </div>
      </CardContent>
    </Card>
  </div>


  if (!isDecrypted && toggleShareDialog) return <ImportDialog setToggleShareDialog={setToggleShareDialog} />

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex w-100 h-[40px] items-center border-black justify-between">
        <div className="flex items-center">
          <span className="font-bold mx-2">Pasedeguardia </span>
          <Button className="text-slate-700 hover:bg-slate-200 hover:text-cyan-600" onClick={e => setToggleAddPatientForm(true)} variant="ghost"><UserRound /> <PlusSquare /></Button>
          <Button onClick={e => setToggleExportDialog(true)}>Share</Button>
        </div>
        <small className="text-slate-500 me-3">DEMO v{VERSION}</small>
      </div>
      {!toggleExportDialog && <Patients patients={patients} setPatients={setPatients} />}
      {toggleExportDialog && encryptedStoredData && <ExportDialog encryptedData={encryptedStoredData} setToggleShareDialog={setToggleShareDialog} />}
      <Dialog open={toggleAddPatientForm} onOpenChange={setToggleAddPatientForm}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 rounded-lg shadow-lg p-4 w-full max-w-md"
        >
          <DialogTitle>Agregar paciente</DialogTitle>
          <AddPatient patients={patients} setPatients={setPatients} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
