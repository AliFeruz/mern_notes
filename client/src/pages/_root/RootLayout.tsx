import Navbar from "@/components/shared/Navbar";
import { Outlet } from "react-router-dom";

type Props = {
    isTopofPage: boolean;
}


const RootLayout = ({isTopofPage} : Props) => {
  return (
    <div className="w-full ">
      <Navbar isTopofPage={isTopofPage}/>
      <section>
        <Outlet/>
      </section>
    </div>
  )
}

export default RootLayout
