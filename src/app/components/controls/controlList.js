import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"


const ControlList = ({ controls, setToggleControlsModal, setAddControlMode }) => {
    return <div>
        {controls.map((control, index) => {
            if (control.id === "balance" && control.result) {
                return <Card style={{ cursor: "pointer" }} key={index} className="bg-slate-100 mt-3" onClick={e => {
                    setToggleControlsModal(true)
                    setAddControlMode("balance")
                }}>
                    <CardHeader>
                        <CardTitle className={Number(control?.result?.balance) < 0 ? "text-pink-700" : "text-teal-700"}>
                            Balance {control?.result?.balance || "error"} ml
                        </CardTitle>
                        <CardDescription>
                            Ingresos totales: {control?.result?.totalIngress} ml, Egresos totales: {control?.result?.totalEgress} ml
                        </CardDescription>
                        <div className="text-slate-500 flex flex-col">
                            <small>Agua endogena: {control?.result?.details?.endogenousWater} ml</small>
                            <small>Perdidas insensibles: {control?.result?.details?.perspiration} ml</small>
                        </div>
                    </CardHeader>
                </Card>
            } else if (control.id === "clearance") {
                return <Card
                    onClick={e => {
                        setToggleControlsModal(true)
                        setAddControlMode("clearance")
                    }}
                    style={{ cursor: "pointer" }}
                    key={index}
                    className="bg-slate-100">
                    <CardHeader>
                        <CardTitle className="text-cyan-700">
                            Clearance {control?.result.toFixed(1)} ml/min
                        </CardTitle>
                    </CardHeader>
                </Card>
            } else {
                return null
            }
        })}
    </div>
}

export default ControlList