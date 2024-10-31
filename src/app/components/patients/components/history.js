import { useState } from "react"
import SingleHistory from "./singleHistory"

const History = ({ history }) => {
    const [selectedHistory, setSelectedHistory] = useState()

    return <div>
        <div className="flex my-1">
            {history.map(singleHistory => <SingleHistory selectedHistory={selectedHistory} setSelectedHistory={setSelectedHistory} key={singleHistory._id} singleHistory={singleHistory} />)}

        </div>
        {selectedHistory && <div className="flex">
            <p>{history.find(singleHistory => singleHistory._id === selectedHistory).historyDescription}</p>
        </div>}
    </div>
}

export default History