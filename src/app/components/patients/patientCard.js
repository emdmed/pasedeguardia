'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import History from "./components/history"

const PatientCard = ({ patient }) => {

    const [hospitalizationReason, setHospitalizationReason] = useState(patient.hospitalizationReason)

    return <Card className="bg-slate-100">
        <CardHeader>
            <div className="flex items-center">
                <CardTitle>
                    {patient.patientId}
                </CardTitle>
                <CardDescription className="mx-2">
                    <span>48F</span>
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent>
            <span className="font-bold">Motivo de internacion</span>
            <p>{hospitalizationReason}</p>
        </CardContent>
        <CardContent>
            <span className="font-bold">Antecedentes</span>
            <History history={patient.history} />
        </CardContent>

    </Card>
}

export default PatientCard