'use client'

import { Button } from "@/components/ui/button";
import Patients from "./components/patients/patients";
import { PlusSquare, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import AddPatient from "./components/patients/addPatient";

export default function Home() {

  const [toggleAddPatientForm, setToggleAddPatientForm] = useState(false)

  const [patients, setPatients] = useState([])

  useEffect(() => {
    const storedData = localStorage.getItem("patients")
    if (storedData) {
      setPatients(JSON.parse(storedData))
    }
  }, [])

  useEffect(() => {
    if (patients.length > 0) {
      const patientString = JSON.stringify(patients)
      console.log("patients characters", patientString.length)
      localStorage.setItem("patients", patientString)
    }
  }, [patients])




  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex w-100 h-[40px] items-center border-black">
        <span className="font-bold mx-2">Pasedeguardia</span>
        <Button className="text-slate-700 hover:bg-slate-200 hover:text-cyan-600" onClick={e => setToggleAddPatientForm(true)} variant="ghost"><UserRound /> <PlusSquare /></Button>
      </div>
      <Patients patients={patients} setPatients={setPatients} />
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
