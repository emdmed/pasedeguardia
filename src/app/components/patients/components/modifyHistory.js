import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { replaceObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"
import { Save, X } from "lucide-react"


const ModifyHistory = ({ selectedHistory, setPatientHistory, singleHistory, patientHistory, setEditMode }) => {
    const [historyTitle, setHistoryTitle] = useState(singleHistory?.historyTitle || "")

    const [historyDescription, setHistoryDescription] = useState(singleHistory?.historyDescription || "")

    const handleSave = () => {
        if (!historyDescription || !historyTitle) return
        const index = patientHistory.findIndex(h => h._id === selectedHistory)
        if (index < 0) return
        const newArray = replaceObjectAtIndexImmutable(patientHistory, index, { historyTitle, historyDescription, _id: selectedHistory })
        setPatientHistory(newArray)
        setEditMode(false)
    }

    return <div className="flex flex-col w-full bg-slate-100 p-2">
        <Input onChange={e => setHistoryTitle(e.target.value)} value={historyTitle} className="mb-2" placeholder="Antecedente..." />
        <Textarea onChange={e => setHistoryDescription(e.target.value)} value={historyDescription} placeholder="Descripcion..." />
        <div className="flex justify-end mt-2">
            <Button variant="ghost" className="text-teal-700 hover:bg-teal-700 hover:text-white"><Save /></Button>
            <Button variant="ghost" onClick={e => setEditMode(false)} className="text-slate-700 hover:bg-slate-700 hover:text-white ms-1"><X size={20} /></Button>
        </div>
    </div>
}

export default ModifyHistory