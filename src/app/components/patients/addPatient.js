'use client'

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const AddPatient = ({ patients, setPatients }) => {

    const [patientId, setPatientId] = useState("")
    const [patientWeight, setPatientWeight] = useState("")
    const [patientAge, setPatientAge] = useState("")
    const [location, setLocation] = useState("")
    const [sex, setSex] = useState("F")

    const onSave = () => {
        if (!patientId) return
        
        setPatients([...patients, {
            patientId: patientId,
            sex: sex,
            weight: patientWeight,
            age: patientAge,
            hospitalizationReason: "",
            history: [],
            controls: []
        }])
    }

    const onSwitchChange = (checked) => {
        if (checked) {
            setSex("M")
        } else {
            setSex("F")
        }
    }

    const handlePatientIdChange = (e) => {
        const val = e.target.value
        if (val.length < 5) setPatientId(val)
    }

    return <div className="flex flex-col bg-slate-100">
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Id del paciente</span>
            <Input className="bg-slate-100" onChange={handlePatientIdChange} value={patientId} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="font-bold w-1/2">Cama</span>
            <Input className="bg-slate-100" onChange={e => setLocation(e.target.value)} value={location} />
        </div>
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <Switch onCheckedChange={onSwitchChange} id="sex" />
            <Label className="ms-2" htmlFor="sex">{sex === "F" ? "Femenino" : "Masculino"}</Label>
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

export default AddPatient