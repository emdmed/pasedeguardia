'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { replaceObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"

const EditPatient = ({ patient, patients, setPatients }) => {

    const [patientId, setPatientId] = useState(patient?.patientId || "")
    const [patientWeight, setPatientWeight] = useState(patient?.weight || "")
    const [patientAge, setPatientAge] = useState(patient?.age || "")

    const onSave = () => {
        const index = patients.findIndex(p => p.patientId === patient.patientId)
        const newPatient = { ...patient, age: patientAge, weight: patientWeight, patientId }
        const newArray = replaceObjectAtIndexImmutable(patients, index, newPatient)
        setPatients([...newArray])
    }

    return <div className="flex flex-col bg-slate-100">
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Id del paciente</span>
            <Input className="bg-slate-100" onChange={e => setPatientId(e.target.value)} value={patientId} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Edad</span>
            <Input className="bg-slate-100" onChange={e => setPatientAge(e.target.value)} value={patientAge} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Peso (kg)</span>
            <Input className="bg-slate-100" onChange={e => setPatientWeight(e.target.value)} value={patientWeight} />
        </div>
        <div className="flex justify-end my-2 w-full">
            <Button onClick={onSave} variant="ghost">
                <Save />
            </Button>
        </div>
    </div>
}

export default EditPatient