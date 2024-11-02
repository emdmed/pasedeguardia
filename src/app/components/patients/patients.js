'use client'

import { useState } from "react"
import PatientCard from "./patientCard"

const Patients = ({patients, setPatients}) => {

    return (
        <div className="flex flex-col p-2">
            {patients.map(patient => <PatientCard patients={patients} setPatients={setPatients} key={patient.patientId} patient={patient} />)}
        </div>
    )
}


export default Patients