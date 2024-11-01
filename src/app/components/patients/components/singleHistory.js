import { Badge } from "@/components/ui/badge"

const SingleHistory = ({ singleHistory, setSelectedHistory, selectedHistory }) => {

    const handleToggleSelectedHistory = (id) => {
        setSelectedHistory(id)
    }

    const setClass = () => {
        if(selectedHistory === singleHistory._id){
            return ""
        } else {
            return "bg-slate-300 text-black"
        }
    }

    return <Badge className={`me-1 hover:text-white ${setClass()}`} onClick={e => handleToggleSelectedHistory(singleHistory._id)} style={{ cursor: "pointer" }}>{singleHistory.historyTitle}</Badge>
}

export default SingleHistory