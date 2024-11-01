'use client'

import { useState } from "react"
import PatientCard from "./patientCard"

const Patients = () => {

    const [patients, setPatients] = useState([
        {
            patientId: "Pac1",
            hospitalizationReason: "What I want to do is just display it on any one side, so the above link is trying to display it on the bottom. (In other words, it doesn't matter if it's at the top, bottom, or anywhere else. It's just an example.)",
            history: [
                {
                    _id: 12345678,
                    historyTitle: "Hta",
                    historyDescription: "atc1",
                    historyType: "Hipertensión"
                },
                {
                    _id: 46358,
                    historyTitle: "Dbt",
                    historyDescription: "atc2",
                    historyType: "Diabetes"
                }
            ]
        }
    ])

    return (
        <div className="flex flex-col p-2">
            {patients.map(patient => <PatientCard setPatients={setPatients} key={patient.patientId} patient={patient} />)}
        </div>
    )
}


export default Patients