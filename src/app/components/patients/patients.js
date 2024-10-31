'use client'

import { useState } from "react"
import PatientCard from "./patientCard"

const Patients = () => {

    const [patients, setPatients] = useState([
        {
            patientId: "Enda",
            hospitalizationReason: "What I want to do is just display it on any one side, so the above link is trying to display it on the bottom. (In other words, it doesn't matter if it's at the top, bottom, or anywhere else. It's just an example.)",
            history: [
                {
                    _id: 12345678,
                    historyTitle: "Hta",
                    historyDescription: "This way, I can also adjust the width (not the width in the border, it is for display: block).",
                    historyType: "Hipertensión"
                },
                {
                    _id: 46358,
                    historyTitle: "Dbt",
                    historyDescription: "The error made was there is no utility class called border-t-1 in tailwind-CSS. Also applying border .",
                    historyType: "Diabetes"
                }
            ]
        }
    ])

    return (
        <div className="flex flex-col p-2">
            {patients.map(patient => <PatientCard key={patient.patientId} patient={patient} />)}
        </div>
    )
}


export default Patients