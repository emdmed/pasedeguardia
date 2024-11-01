'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import History from "./components/history"
import { SquarePlus, UserPen } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import AddHistory from "./components/addHistory"
import { replaceObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"
import { Droplets } from "lucide-react"
import ControlForms from "../controls/forms/controlForms"
import EditPatient from "./editPatient"

const PatientCard = ({ patient, setPatients, patients }) => {

    const [hospitalizationReason, setHospitalizationReason] = useState(patient.hospitalizationReason)
    const [patientHistory, setPatientHistory] = useState(patient.history)
    const [addControlMode, setAddControlMode] = useState()

    useEffect(() => {
        patient.history = patientHistory
        const index = patients.findIndex(p => patient.patientId === patient.history[0].patientId)
        const newArray = replaceObjectAtIndexImmutable(patients, index, patient)
        setPatients(newArray)
    }, [patientHistory, patient])

    const handleHospitalizationReasonChange = (e) => {
        setHospitalizationReason(e.target.value)
    }

    return <Card className="bg-slate-100">
        <CardHeader>
            <div className="flex items-center">
                <span className="font-bold me-2">{patient.patientId}</span>
                <span className="text-slate-500">{patient.age}{patient.sex}</span>
                <Dialog>
                    <DialogTrigger asChild>
                        <div>
                            <Button variant="ghost">
                                <UserPen />
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-100">
                        <DialogTitle>
                            Paciente
                        </DialogTitle>
                        <DialogDescription>
                            <EditPatient patients={patients} setPatients={setPatients} patient={patient} />
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
        <CardContent>
            <span className="font-bold">Motivo de internacion</span>
            <Dialog>
                <DialogTrigger asChild>
                    <p>{hospitalizationReason}</p>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Motivo de internacion</DialogTitle>
                    <DialogDescription>
                        <Textarea onChange={handleHospitalizationReasonChange} style={{ height: 150 }} value={hospitalizationReason} />
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </CardContent>
        <CardContent>
            <div className="flex items-center">
                <span className="font-bold me-2">Agregar antecedente</span>
                <Dialog>
                    <DialogTrigger asChild>
                        <div>
                            <Button variant="ghost" className="text-slate-700 hover:bg-slate-700 hover:text-white">
                                <SquarePlus />
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-100">
                        <DialogTitle>Antecedentes</DialogTitle>
                        <DialogDescription>
                            <AddHistory patient={patient} AddHistory={AddHistory} patientHistory={patientHistory} setPatientHistory={setPatientHistory} />
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
            <History setPatientHistory={setPatientHistory} patientHistory={patientHistory} />
        </CardContent>
        <CardContent>
            <div className="flex items-center">
                <span className="font-bold me-2">Controles</span>
                <Dialog>
                    <DialogTrigger asChild>
                        <div>
                            <Button variant="ghost" className="text-slate-700 hover:bg-slate-700 hover:text-white">
                                <SquarePlus />
                            </Button>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-100">
                        <DialogTitle>Controles</DialogTitle>
                        <DialogDescription>
                            {!addControlMode && <div>
                                <Button onClick={e => setAddControlMode("balance")} className="bg-slate-500 text-white w-full flex justify-between">Balance <Droplets /></Button>
                            </div>}
                            <ControlForms patient={patient} setAddControlMode={setAddControlMode} addControlMode={addControlMode} />
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </CardContent>
    </Card>
}

export default PatientCard