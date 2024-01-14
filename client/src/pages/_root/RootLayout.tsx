import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";


const RootLayout = () => {
  return (
    <div className="w-full ">
      <Navbar/>
      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default RootLayout
