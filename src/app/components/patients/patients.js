'use client'

import { useState } from "react"
import PatientCard from "./patientCard"

const Patients = () => {

    const [patients, setPatients] = useState([
        {
            patientId: "Pac1",
            sex: "F",
            weight: 88,
            age: 45,
            hospitalizationReason: "Ingresa en sala general por deshidratación secundaria a vómitos persistentes y diarrea en las últimas 48 horas",
            history: [
                {
                    patientId: "Pac1",
                    _id: 12345678,
                    historyTitle: "Hta",
                    historyDescription: "atc1",
                    historyType: "Hipertensión"
                },
                {
                    patientId: "Pac1",
                    _id: 46358,
                    historyTitle: "Dbt",
                    historyDescription: "atc2",
                    historyType: "Diabetes"
                }
            ],
            controls: []
        }
    ])

    console.log("patients", patients)

    return (
        <div className="flex flex-col p-2">
            {patients.map(patient => <PatientCard patients={patients} setPatients={setPatients} key={patient.patientId} patient={patient} />)}
        </div>
    )
}


export default Patients