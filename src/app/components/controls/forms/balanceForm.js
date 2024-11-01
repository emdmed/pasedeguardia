import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { calculateWaterBalance } from "@/lib/controls/balance"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { replaceObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"



const Balance = ({ patient, patients, setPatients, control }) => {
    const [ingressValue, setIngressValue] = useState()
    const [egressValue, setEgressValue] = useState()
    const [ingress, setIngress] = useState(control?.result?.ingress || [])
    const [egress, setEgress] = useState(control?.result?.egress || [])
    const [weight, setWeight] = useState(patient?.weight || "")
    const [result, setResult] = useState()

    const saveControl = ({ id }) => {
        const patientControls = patient.controls
        //is there a balance control
        const found = patientControls.find(control => control.id === id)

        if (!found) {
            patient.controls.push({ id, result })
            const patientIndex = patients.findIndex(p => p._id === patient._id)
            const newPatientArray = replaceObjectAtIndexImmutable(patients, patientIndex, { ...patient })
            setPatients([...newPatientArray])
        } else {
            const controlIndex = patientControls.findIndex(c => c.id === id)
            const newControlArray = replaceObjectAtIndexImmutable(patientControls, controlIndex, { id, result })
            const patientIndex = patients.findIndex(p => p._id === patient._id)
            const newPatientArray = replaceObjectAtIndexImmutable(patients, patientIndex, { ...patient, controls: newControlArray })
            setPatients([...newPatientArray])
        }
    }

    const handleAddIngress = () => {
        if (ingressValue && !isNaN(ingressValue)) {
            setIngress([...ingress, Number(ingressValue)])
            setIngressValue("")
        }
    }

    const handleAddEgress = () => {
        if (egressValue && !isNaN(egressValue)) {
            setEgress([...egress, Number(egressValue)])
            setEgressValue("")
        }
    }

    useEffect(() => {
        if (egress.length === 0) return
        if (ingress.length === 0) return
        if (!weight) return
        if (isNaN(weight)) return

        const result = calculateWaterBalance(ingress, egress, Number(weight))
        setResult(result)
    }, [egress, weight, ingress])

    useEffect(() => {
        if (result) {
            saveControl({ id: "balance" })
        }
    }, [result])


    return <div className="flex flex-col px-2 py-3">
        <div className="flex my-1 items-center border-t border-b p-2 bg-slate-200">
            <span className="font-bold me-2 w-1/4">Peso (kg)</span>
            <div className="flex justify-between">
                <Input value={weight} onChange={e => setWeight(e.target.value)} className="my-1 bg-slate-100 w-full" placeholder="Peso en kg..." />
            </div>
        </div>

        <div className="flex my-1 items-center border-t border-b p-2 bg-slate-200">
            <span className="font-bold me-2 w-1/3">Ingresos</span>
            <div className="flex justify-between w-full">
                <Input onChange={e => setIngressValue(e.target.value)} value={ingressValue} className="me-2 bg-slate-100" placeholder="Mililitros..." />
                <Button onClick={handleAddIngress} variant="ghost"><PlusSquare /></Button>
            </div>
        </div>

        <div className="flex flex-col">
            {ingress.map((element, index) => <div className="flex justify-center my-1" key={`ingress${index}_${new Date().getTime()}`}><Badge className="text-center bg-teal-500" >{element.toLocaleString()} ml</Badge></div>)}
        </div>
        <div className="flex my-1 items-center  border-t border-b p-2 bg-slate-200">
            <span className="font-bold me-2 w-1/3">Egresos</span>
            <div className="flex justify-between w-full">
                <Input value={egressValue} onChange={e => setEgressValue(e.target.value)} className="me-2 bg-slate-100" placeholder="Mililitros..." />
                <Button onClick={handleAddEgress} variant="ghost"><PlusSquare /></Button>
            </div>
        </div>
        <div className="flex flex-col">
            {egress.map((element, index) => <div className="flex justify-center my-1" key={`egress${index}_${new Date().getTime()}`}><Badge className="text-center bg-pink-500" >{element.toLocaleString()} ml</Badge></div>)}
        </div>
        {result && <Card className="bg-slate-200 mt-3">
            <CardHeader>
                <CardTitle className="text-slate-700">
                    Balance {result?.balance || "error"} ml
                </CardTitle>
                <CardDescription>
                    Ingresos totales: {result?.totalIngress} ml, Egresos totales: {result?.totalEgress} ml
                </CardDescription>
                <div className="text-slate-500 flex flex-col">
                    <small>Agua endogena: {result?.details?.endogenousWater} ml</small>
                    <small>Perdidas insensibles: {result?.details?.perspiration} ml</small>
                </div>
            </CardHeader>
        </Card>}
    </div>
}

export default Balance