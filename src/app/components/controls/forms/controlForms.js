'use client'

import BalanceForm from "./balanceForm"
import { ArrowBigLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const ControlForms = ({ addControlMode, setAddControlMode, patient }) => {
    return <div className="flex flex-col ">
        {addControlMode && <div className="flex w-full justify-start items-center">
            <Button onClick={e => setAddControlMode(false)} variant="ghost">
                <ArrowBigLeft />
            </Button>
            <span className="font-bold text-lg ">{addControlMode}</span>
        </div>}
        {addControlMode === "balance" && <BalanceForm patient={patient}/>}
    </div>
}

export default ControlForms