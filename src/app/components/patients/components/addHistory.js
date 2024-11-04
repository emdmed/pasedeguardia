import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Save } from "lucide-react"

const AddHistory = ({ setPatientHistory, patientHistory, singleHistory, patient }) => {
    const [historyTitle, setHistoryTitle] = useState(singleHistory?.historyTitle || "")
    const [addFeedback, setAddFeedback] = useState(false)

    const [historyDescription, setHistoryDescription] = useState(singleHistory?.historyDescription || "")

    useEffect(() => {
        if (addFeedback) {
            const timer = setTimeout(() => {
                setAddFeedback(false)
            }, 2000);

            return () => clearTimeout(timer)
        }

    }, [addFeedback])

    const handleSave = () => {
        if (historyTitle && historyDescription) {
            setPatientHistory([...patientHistory, { historyTitle, historyDescription, _id: new Date().getTime(), patientId: patient.patientId }])
            setHistoryDescription("")
            setHistoryTitle("")
            setAddFeedback(true)
        }
    }

    return <div className="flex flex-col w-full bg-slate-100">
        <Input onChange={e => setHistoryTitle(e.target.value)} value={historyTitle} className="mb-2" placeholder="Antecedente..." />
        <Textarea onChange={e => setHistoryDescription(e.target.value)} value={historyDescription} placeholder="Descripcion..." />
        <div className="flex justify-end mt-2 bg-slate-100">
            <Button variant="ghost" onClick={handleSave}>
                {!addFeedback && <Save />}
                {addFeedback && <span className="text-teal-700">Agregado!</span>}
            </Button>
        </div>
    </div>
}

export default AddHistory