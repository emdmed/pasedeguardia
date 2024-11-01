import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const AddHistory = ({ setPatientHistory, patientHistory, singleHistory, patient }) => {
    const [historyTitle, setHistoryTitle] = useState(singleHistory?.historyTitle || "")

    const [historyDescription, setHistoryDescription] = useState(singleHistory?.historyDescription || "")

    const handleSave = () => {
        if (historyTitle && historyDescription) {
            setPatientHistory([...patientHistory, { historyTitle, historyDescription, _id: new Date().getTime(), patientId: patient.patientId }])
            setHistoryDescription("")
            setHistoryTitle("")
        }
    }

    return <div className="flex flex-col w-full bg-slate-100">
        <Input onChange={e => setHistoryTitle(e.target.value)} value={historyTitle} className="mb-2" placeholder="Antecedente..." />
        <Textarea onChange={e => setHistoryDescription(e.target.value)} value={historyDescription} placeholder="Descripcion..." />
        <div className="flex justify-end mt-2 bg-slate-100">
            <Button onClick={handleSave} className="bg-teal-600">Guardar</Button>
        </div>
    </div>
}

export default AddHistory