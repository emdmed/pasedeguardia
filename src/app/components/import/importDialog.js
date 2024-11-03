'use client'

import { Card, CardContent } from "@/components/ui/card"
import QRCodeImporter from "./qrCodeImporter"
import { Button } from "@/components/ui/button"

const { Dialog, DialogHeader, DialogTitle, DialogContent } = require("@/components/ui/dialog")

const ImportDialog = ({setToggleShareDialog}) => {
    return <div className="bg-slate-200 h-screen flex flex-col items-center justify-center"><Card>
        <CardContent>
            <QRCodeImporter />
        </CardContent>
        <CardContent>
            <Button onClick={e => setToggleShareDialog(false)}>Cancelar</Button>
        </CardContent>
    </Card>
    </div>
}

export default ImportDialog