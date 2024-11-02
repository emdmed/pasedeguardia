'use client'

import BalanceForm from "./balanceForm"
import { ArrowBigLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ClearanceForm from "./clearanceForm"

const ControlForms = ({ addControlMode, setAddControlMode, patient, patients, setPatients }) => {
    return <div className="flex flex-col bg-slate-100">
        {addControlMode && <div className="flex w-full justify-start items-center">
            <Button onClick={e => setAddControlMode(false)} variant="ghost" className="border-0">
                <ArrowBigLeft />
            </Button>
            <span className="font-bold text-lg ">{addControlMode}</span>
        </div>}
        {addControlMode === "balance" && <BalanceForm control={patient?.controls.find(control => control.id === "balance")} patients={patients} setPatients={setPatients} patient={patient}/>}
        {addControlMode === "clearance" && <ClearanceForm patients={patients} setPatients={setPatients} patient={patient}/>}
    </div>
}

export default ControlForms