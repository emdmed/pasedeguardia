'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import History from "./components/history"
import { SquarePlus } from "lucide-react"
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

const PatientCard = ({ patient, setPatients }) => {

    const [hospitalizationReason, setHospitalizationReason] = useState(patient.hospitalizationReason)
    const [patientHistory, setPatientHistory] = useState(patient.history)

    const handleHospitalizationReasonChange = (e) => {
        setHospitalizationReason(e.target.value)
    }

    return <Card className="bg-slate-100">
        <CardHeader>
            <div className="flex items-center">

                <span className="font-bold me-2">{patient.patientId}</span>


                <span className="text-slate-500">48F</span>

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
                        <Button variant="ghost" className="text-slate-700 hover:bg-slate-700 hover:text-white">
                            <SquarePlus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-100">
                        <DialogTitle>Antecedentes</DialogTitle>
                        <DialogDescription>
                            <AddHistory patientHistory={patientHistory} setPatientHistory={setPatientHistory} />
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
                        <Button variant="ghost" className="text-slate-700 hover:bg-slate-700 hover:text-white">
                            <SquarePlus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-100">
                        <DialogTitle>Antecedentes</DialogTitle>
                        <DialogDescription>
                            <AddHistory patientHistory={patientHistory} setPatientHistory={setPatientHistory} />
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </CardContent>
    </Card>
}

export default PatientCard