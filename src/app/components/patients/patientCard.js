'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import History from "./components/history"
import { Bed, SquarePlus, UserPen, UserRound } from "lucide-react"
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
import ControlList from "../controls/controlList"
import { Scale } from "lucide-react"
import { DialogClose } from "@radix-ui/react-dialog"
import { Badge } from "@/components/ui/badge"
import { Folder, Stethoscope, NotebookPen } from "lucide-react"

const PatientCard = ({ patient, setPatients, patients }) => {

    const [hospitalizationReason, setHospitalizationReason] = useState(patient.hospitalizationReason)
    const [patientHistory, setPatientHistory] = useState(patient.history)
    const [addControlMode, setAddControlMode] = useState()

    const addButtonsClass = "text-slate-600 hover:bg-slate-100 hover:text-cyan-700"

    const [toggleControlsModal, setToggleControlsModal] = useState(false)

    useEffect(() => {
        patient.history = patientHistory
        const index = patients.findIndex(p => p.patientId === patient.history[0]?.patientId)
        const newArray = replaceObjectAtIndexImmutable(patients, index, patient)
        setPatients(newArray)
    }, [patientHistory])


    useEffect(() => {
        patient.history = patientHistory
        const index = patients.findIndex(p => p.patientId === patient.patientId)
        const newArray = replaceObjectAtIndexImmutable(patients, index, { ...patient, hospitalizationReason })
        setPatients(newArray)
    }, [hospitalizationReason])

    const handleHospitalizationReasonChange = (e) => {
        setHospitalizationReason(e.target.value)
    }

    const clearHospitalizationReason = () => {
        setHospitalizationReason("")
    }

    return <Card className="bg-slate-100 my-2">
        <CardHeader className="p-3">
            <div className="flex items-center">

                <Dialog>
                    <DialogTrigger asChild>
                        <Badge
                            style={{ cursor: "pointer" }}
                            className="rounded-full flex items-center bg-cyan-700 p-2 space-x-1 px-3 me-2"
                        >
                            <UserRound size={20} className="mr-1" />
                            <span className="font-bold text-white">{patient.patientId}</span>
                            <span className="text-slate-300">{patient.age}{patient.sex}</span>
                        </Badge>
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
                {patient.location && <div className="flex mx-2 items-center">
                    <Bed size={20} />
                    <span className="mx-1">{patient.location}</span>
                </div>}
            </div>
        </CardHeader>
        <CardContent className="p-3">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="hover:text-cyan-700" style={{ cursor: "pointer" }}>
                        <div className="flex items-center">
                            <Stethoscope />
                            <span className="font-bold mx-2">Motivo de internacion</span>
                        </div>
                        <p>{hospitalizationReason}</p>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Motivo de internacion</DialogTitle>
                    <DialogDescription>
                        <Textarea onChange={handleHospitalizationReasonChange} style={{ height: 150 }} value={hospitalizationReason} />
                        <div className="flex justify-end mt-2">
                            <Button onClick={clearHospitalizationReason} variant="ghost">Clear</Button>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </CardContent>
        <CardContent className="p-3">
            <div className="flex items-center">
                <Folder />
                <span className="font-bold mx-2">Antecedentes  </span>
                <Dialog>
                    <DialogTrigger asChild>
                        <div>
                            <Button variant="ghost" className={addButtonsClass}>
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
        <CardContent className="p-3">
            <div className="flex flex-col">
                <div className="flex items-center">
                    <NotebookPen />
                    <span className="font-bold mx-2">Controles</span>
                    <Dialog onOpenChange={(isOpen) => setToggleControlsModal(isOpen)} open={toggleControlsModal}>
                        <DialogTrigger asChild>
                            <div>
                                <Button onClick={e => setToggleControlsModal(true)} variant="ghost" className={addButtonsClass}>
                                    <SquarePlus />
                                </Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-100">
                            <DialogTitle>Controles</DialogTitle>
                            <DialogDescription>
                                {!addControlMode && <div>
                                    <Button onClick={e => {
                                        setAddControlMode("balance")
                                        setToggleControlsModal(true)
                                    }} className="bg-cyan-600 text-white w-full flex justify-between my-1">Balance <Scale /></Button>
                                    <Button onClick={e => {
                                        setAddControlMode("clearance")
                                        setToggleControlsModal(true)
                                    }} className="bg-cyan-600 text-white w-full flex justify-between my-1">Clearance <Droplets /></Button>
                                </div>}
                                <ControlForms patients={patients} setPatients={setPatients} patient={patient} setAddControlMode={setAddControlMode} addControlMode={addControlMode} />
                            </DialogDescription>
                            <DialogClose onClick={e => setToggleControlsModal(false)}></DialogClose>
                        </DialogContent>
                    </Dialog>

                </div>
                <ControlList setToggleControlsModal={setToggleControlsModal} setAddControlMode={setAddControlMode} controls={patient?.controls} />
            </div>
        </CardContent>
    </Card>
}

export default PatientCard