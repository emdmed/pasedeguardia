import Patients from "./components/patients/patients";


export default function Home() {
  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex w-100 border-b h-[40px] items-center border-black">
        <span className="font-bold mx-2">Pasedeguardia</span>
      </div>
      <Patients/>
    </div>
  );
}
