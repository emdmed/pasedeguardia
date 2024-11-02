import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { calculateCreatinineClearance } from "@/lib/controls/renal"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { replaceObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"

const ClearanceForm = ({ patient, patients, setPatients }) => {

    const [weight, setWeight] = useState(patient?.weight || "")
    const [age, setAge] = useState(patient?.age || "")
    const [creatinine, setCreatinine] = useState("")
    const [result, setResult] = useState()

    const saveControl = ({ id }) => {
        const patientControls = patient.controls
        //is there a balance control
        const found = patientControls.find(control => control.id === id)

        if (!found) {
            patient.controls.push({ id, result })
            const patientIndex = patients.findIndex(p => p.patientId === patient.patientId)
            const newPatientArray = replaceObjectAtIndexImmutable(patients, patientIndex, { ...patient })
            setPatients([...newPatientArray])
        } else {
            const controlIndex = patientControls.findIndex(c => c.id === id)
            const newControlArray = replaceObjectAtIndexImmutable(patientControls, controlIndex, { id, result })
            const patientIndex = patients.findIndex(p => p.patientId === patient.patientId)
            const newPatientArray = replaceObjectAtIndexImmutable(patients, patientIndex, { ...patient, controls: newControlArray })
            setPatients([...newPatientArray])
        }
    }


    useEffect(() => {
        if (creatinine && age && weight) {
            setResult(calculateCreatinineClearance(age, weight, creatinine, patient?.sex || "M"))
        }
    }, [creatinine, age, weight, patient])

    useEffect(() => {
        if(result){
            saveControl({id: "clearance"})
        }
    }, [result])


    return <div className="flex flex-col bg-slate-100">
        <div className="flex items-center my-1 bg-slate-200 p-2">
            <span className="w-1/3">Peso (kg)</span>
            <Input className="bg-slate-100" value={weight} onChange={e => setWeight(e.target.value)} />
        </div>
        <div className="flex items-center my-1  bg-slate-200 p-2">
            <span className="w-1/3">Edad</span>
            <Input className="bg-slate-100" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div className="flex items-center my-1  bg-slate-200 p-2">
            <span className="w-1/3">Creatinina plasm.</span>
            <Input className="bg-slate-100" value={creatinine} onChange={e => setCreatinine(e.target.value)} />
        </div>
        {result && <Card className="bg-slate-200">
            <CardHeader>
                <CardTitle className="text-cyan-700">
                    Clearance: {result.toFixed(1)} ml/min
                </CardTitle>
            </CardHeader>
        </Card>}
    </div>
}

export default ClearanceForm