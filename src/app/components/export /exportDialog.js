'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import QRCodeDisplay from "./qrCodes"

const ExportDialog = ({setToggleExportDialog, encryptedData}) => {
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
        <CardContent className="flex justify-end">
            <Button className="bg-pink-700" onClick={e => setToggleExportDialog(false)}>Cerrar</Button>
        </CardContent>
    </Card>
    </div>
}

export default ExportDialog