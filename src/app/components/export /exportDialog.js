'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCodeDisplay from "./qrCodes"

const ExportDialog = ({setToggleShareDialog, encryptedData}) => {
    console.log("ExportDialog encryptedData", encryptedData)
    return <div className="bg-slate-200 h-screen flex flex-col items-center justify-center">
        <Card>
            <CardHeader>
                <CardTitle>
                    Exportar pacientes
                </CardTitle>
            </CardHeader>
            <CardContent>
                <QRCodeDisplay encryptedData={encryptedData}/>
            </CardContent>
        <CardContent>
            <Button onClick={e => setToggleShareDialog(false)}>Cerrar</Button>
        </CardContent>
    </Card>
    </div>
}

export default ExportDialog