'use client'

const VERSION = "0.2"

import { Button } from "@/components/ui/button";
import Patients from "./components/patients/patients";
import { PlusSquare, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import AddPatient from "./components/patients/addPatient";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { decryptString, encryptString } from "@/lib/encryption/browserEncryption";
import { HardDrive } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import ImportDialog from "./components/import/importDialog";
import ExportDialog from "./components/export /exportDialog";
import Image from "next/image";
import { Share2, ArrowDownUp } from "lucide-react";

export default function Home() {

  const [toggleAddPatientForm, setToggleAddPatientForm] = useState(false)
  const [secretKey, setSecretKey] = useState("")
  const [validSecretKey, setValidSecretKey] = useState("")
  const [patients, setPatients] = useState([])
  const [encryptedStoredData, setEncryptedStoredData] = useState()
  const [isDecrypted, setIsDecripted] = useState(false)
  const [toggleShareDialog, setToggleShareDialog] = useState(false)
  const [toggleExportDialog, setToggleExportDialog] = useState(false)
  const [toggleHelp, setToggleHelp] = useState(false)
  const [sortState, setSortState] = useState()

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
  }, [validSecretKey, toggleShareDialog])

  const reset = () => {
    localStorage.clear()
    setEncryptedStoredData(false)
  }

  useEffect(() => {
    if (patients.length > 0) {
      const patientString = JSON.stringify(patients)

      localStorage.setItem("patients", encryptString(patientString, validSecretKey))
    }
  }, [patients, validSecretKey])

  useEffect(() => {
    if (sortState === "priority") setPatients([...patients].sort((a, b) => a.priority - b.priority))
  }, [sortState])

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setValidSecretKey(secretKey)
    }
  }

  const handleSorting = () => {
    if (!sortState) {
      setSortState("priority")
    } else {
      setSortState()
    }
  }

  const loginMessage = () => {
    if (encryptedStoredData) return "Si olvidaste tu clave, deberás reiniciar y se perderán todos tus datos guardados."
    return "Establece una palabra secreta para cifrar los datos de tus pacientes, no te la olvides!"
  }

  if (!isDecrypted && !toggleShareDialog) return <div className="bg-slate-200 h-screen flex flex-col items-center justify-center">
    <span className="font-bold" style={{ fontSize: 40 }}>Pasedeguardia</span>
    <Image className="flex" width={350} height={50} alt="Description of the icon" src="/images/mainlogo.svg" />
    {!toggleHelp && <Card className="bg-slate-100 mx-2 my-2">
      <CardHeader>
        <CardTitle>
          Ingrese su clave
        </CardTitle>
        <CardDescription>{loginMessage()}</CardDescription>
      </CardHeader>
      <CardContent>
        {encryptedStoredData && <Alert className="bg-slate-100 border-black mb-3">
          <HardDrive className="text-pink-700 " />
          <AlertTitle className="ms-2">
            Atención
          </AlertTitle>
          <AlertDescription className="ms-2 w-full">
            Hay datos guardados en este dispositivo
          </AlertDescription>
        </Alert>}
        {validSecretKey && !isDecrypted && <CardContent className="flex justify-center items-center py-3">
          <span className="font-bold text-pink-700">Clave invalida !</span>
        </CardContent>}
        <Input placeholder="Ingrese su clave..." type="password" className="bg-white my-2" value={secretKey} onKeyDown={onKeyDown} onChange={e => setSecretKey(e.target.value)} />
        <div className="flex justify-end pt-3">
          <Button className="mx-1 bg-teal-700" onClick={e => setValidSecretKey(secretKey)}>Continuar</Button>
          <Button className="mx-1 bg-pink-700" onClick={reset}>Reiniciar</Button>
          <Button className="mx-1" onClick={e => setToggleShareDialog(true)}>Importar</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" onClick={e => setToggleHelp(true)}>Ayuda</Button>
      </CardFooter>
    </Card>}
    {toggleHelp && <Card className="bg-slate-100 mx-2 my-2">
      <CardHeader>
        <CardTitle>
          ¿Cómo se usa?
        </CardTitle>
        <CardDescription>
          Todos los datos son encriptados y guardados  en el dispositivo, esta webapp no envía los datos a ningun otro lugar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal ml-4">
          <li>Primero ingresa una palabra secreta para que podamos guardar de forma segura los datos ingresados a la app. Si la olvidaste, tendrás que pulsar reiniciar y todos tus pacientes se borrarán.</li>
          <li>Ingresa pacientes desde el boton <div className="text-slate-700 flex"><UserRound size={20} /><PlusSquare size={20} /></div></li>
          <li>Para ingresar registros de antecedentes o controles pulsa < PlusSquare size={20} className="text-slate-700" />  </li>
          <li>Por el momento la unica forma de compartir tus pacientes con otro Médico es escaneand una serie de códigos QR desde el botón <Share2 size={20} className="text-slate-700" /></li>
          <li>Los QR deberán ser escaneados en orden, cuando el QR actual haya sido escaneado exitosamente te aparecerá un mensaje por encima de la cámara </li>
          <li>Cualquier duda o pregunta escribime a <strong>enrique.darderes@gmail.com</strong></li>
        </ol>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" onClick={e => setToggleHelp(false)}>Volver</Button>
      </CardFooter>
    </Card>}
  </div>


  if (!isDecrypted && toggleShareDialog) return <ImportDialog setEncryptedStoredData={setEncryptedStoredData} setToggleShareDialog={setToggleShareDialog} />

  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex w-100 h-[40px] items-center border-black justify-between">
        <div className="flex items-center">
          <span className="font-bold mx-2">Pasedeguardia </span>
          <small className="text-slate-500 me-3 text-xs">v{VERSION}</small>
          <Button style={{ position: "fixed", bottom: 0, right: 0, opacity: 0.7 }} className="text-slate-100 bg-slate-500 hover:bg-slate-200 hover:text-cyan-600 m-3 rounded-full drop-shadow-md" onClick={e => setToggleAddPatientForm(true)} variant="ghost"><UserRound /> <PlusSquare /></Button>
        </div>
        <div>
          <Button variant="ghost" className="text-slate-700 hover:bg-slate-200 hover:text-cyan-600 mx-1" onClick={handleSorting} ><ArrowDownUp /></Button>
          <Button variant="ghost" className="text-slate-700 hover:bg-slate-200 hover:text-cyan-600 mx-1" onClick={e => setToggleExportDialog(true)}><UserRound /><Share2 /></Button>
        </div>
      </div>
      {!toggleExportDialog && <Patients patients={patients} setPatients={setPatients} />}
      {toggleExportDialog && encryptedStoredData && <ExportDialog encryptedData={encryptedStoredData} setToggleExportDialog={setToggleExportDialog} />}
      <Dialog open={toggleAddPatientForm} onOpenChange={setToggleAddPatientForm}>
        <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogContent
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-100 rounded-lg shadow-lg p-4 w-full max-w-md"
        >
          <DialogTitle className="font-bold">Agregar paciente</DialogTitle>
          <AddPatient patients={patients} setPatients={setPatients} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
