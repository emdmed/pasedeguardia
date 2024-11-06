'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { replaceObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"

const EditPatient = ({ patient, patients, setPatients }) => {

    const [patientId, setPatientId] = useState(patient?.patientId || "")
    const [patientWeight, setPatientWeight] = useState(patient?.weight || "")
    const [patientAge, setPatientAge] = useState(patient?.age || "")
    const [patientLocation, setPatientLocation] = useState(patient?.location || "")
    const [error, setError] = useState(false)

    const onSave = () => {
        if (error) return
        const index = patients.findIndex(p => p.patientId === patient.patientId)
        const newPatient = { ...patient, age: patientAge, weight: patientWeight, patientId, location: patientLocation }
        const newArray = replaceObjectAtIndexImmutable(patients, index, newPatient)
        setPatients([...newArray])
    }

    const onDelete = (patientId) => {
        const confirm = window.confirm("¿Querés borrar este paciente?")
        if (!confirm) return
        const newPatients = patients.filter(p => p.patientId !== patientId)
        setPatients([...newPatients])
    }

    const handlePatientIdChange = (e) => {
        const val = e.target.value

        //check colliding patient ids
        const allPatientIds = patients.filter(p => p.patientId !== patient.patientId).map(p => p.patientId)

        if (allPatientIds.includes(val)) {
            setError({ message: "Hay 2 pacientes con la misma identificación", title: "Cuidado!" })
        } else {
            setError(false)
        }

        if (val.length < 5) setPatientId(val)
    }

    return <div className="flex flex-col bg-slate-100">
        {error && <Alert variant="destructive" className="bg-slate-100">
            <TriangleAlert className="text-pink-700 " />
            <AlertTitle className="ms-2">
                {error.title}
            </AlertTitle>
            <AlertDescription className="ms-2 w-full">
                {error.message}
            </AlertDescription>
        </Alert>}
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Id del paciente</span>
            <Input className="bg-slate-100" onChange={handlePatientIdChange} value={patientId} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Edad</span>
            <Input className="bg-slate-100" onChange={e => setPatientAge(e.target.value)} value={patientAge} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Peso (kg)</span>
            <Input className="bg-slate-100" onChange={e => setPatientWeight(e.target.value)} value={patientWeight} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Cama</span>
            <Input className="bg-slate-100" onChange={e => setPatientLocation(e.target.value)} value={patientLocation} />
        </div>
        <div className="flex justify-end my-2 w-full">
            <Button onClick={onSave} variant="ghost">
                <Save />
            </Button>
            <Button variant="ghost" className="text-pink-700" onClick={e => onDelete(patient.patientId)}>
                <Trash2 />
            </Button>
        </div>
    </div>
}

export default EditPatient