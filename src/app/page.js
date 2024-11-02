'use client'

import { Button } from "@/components/ui/button";
import Patients from "./components/patients/patients";
import { PlusSquare, UserRound } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import AddPatient from "./components/patients/addPatient";

export default function Home() {

  const [toggleAddPatientForm, setToggleAddPatientForm] = useState(false)

  const [patients, setPatients] = useState([
    {
      patientId: "Pac1",
      sex: "F",
      weight: 88,
      age: 45,
      hospitalizationReason: "Ingresa en sala general por deshidratación secundaria a vómitos persistentes y diarrea en las últimas 48 horas",
      history: [
        {
          patientId: "Pac1",
          _id: 12345678,
          historyTitle: "Hta",
          historyDescription: "atc1",
          historyType: "Hipertensión"
        },
        {
          patientId: "Pac1",
          _id: 46358,
          historyTitle: "Dbt",
          historyDescription: "atc2",
          historyType: "Diabetes"
        }
      ],
      controls: []
    }
  ])


  console.log("patients", patients)



  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex w-100 h-[40px] items-center border-black">
        <span className="font-bold mx-2">Pasedeguardia</span>
        <Button onClick={e => setToggleAddPatientForm(true)} variant="ghost"><UserRound /> <PlusSquare /></Button>
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
