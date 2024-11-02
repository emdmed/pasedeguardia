import { useState } from "react"
import SingleHistory from "./singleHistory"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import AddHistory from "./addHistory"
import ModifyHistory from "./modifyHistory"
import { removeObjectAtIndexImmutable } from "@/lib/helpers/arrayManipulation"

const History = ({ patientHistory, setPatientHistory }) => {
    const [selectedHistory, setSelectedHistory] = useState()
    const [editMode, setEditMode] = useState(false)
    
    const handleDelete = () => {
        const index = patientHistory.findIndex(h => h._id === selectedHistory)
        const newArray = removeObjectAtIndexImmutable(patientHistory, index)
        setPatientHistory(newArray)
        setSelectedHistory(false)
    }

    return <>
        <div className="flex my-1">
            {patientHistory.map(singleHistory => <SingleHistory selectedHistory={selectedHistory} setSelectedHistory={setSelectedHistory} key={singleHistory._id} singleHistory={singleHistory} />)}
        </div>
        {selectedHistory && <div className="flex w-100 justify-between p-2 items-center border-b my-2">
            {editMode && <ModifyHistory setEditMode={setEditMode} patientHistory={patientHistory} singleHistory={patientHistory.find(singleHistory => singleHistory._id === selectedHistory)} selectedHistory={selectedHistory} setPatientHistory={setPatientHistory} />}
            {!editMode && <>
                <p onClick={e => setEditMode(prev => !prev)}>{patientHistory.find(singleHistory => singleHistory._id === selectedHistory)?.historyDescription}</p>
                <Button variant="ghost" className="text-pink-700 hover:bg-pink-700 hover:text-white" onClick={handleDelete} ><Trash2 size={20}></Trash2></Button>
            </>}
        </div>}
    </>
}

export default History