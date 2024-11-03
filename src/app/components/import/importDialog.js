'use client'

import { Card, CardContent } from "@/components/ui/card"
import QRCodeImporter from "./qrCodeImporter"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const ImportDialog = ({setToggleShareDialog}) => {

    const [scanData, setScanData] = useState()

    return <div className="bg-slate-200 h-screen flex flex-col items-center justify-center"><Card>
        <CardContent>
            <QRCodeImporter setToggleShareDialog={setToggleShareDialog} setScanData={setScanData} />
        </CardContent>
        <CardContent>
            <Button onClick={e => setToggleShareDialog(false)}>Cancelar</Button>
        </CardContent>
    </Card>
    </div>
}

export default ImportDialog