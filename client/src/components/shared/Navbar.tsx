import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useUserContext } from "@/context/authContext";
import ThemeBtn from "./ThemeBtn";



type Props = {
    isTopofPage: boolean;
}

const Navbar = ({isTopofPage}: Props) => {
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const navbarbg = isTopofPage ? "" : "bg-green-700 drop-shadow";

    
  const { user } = useUserContext();


  return (
    <nav>
        <div className={`${navbarbg} flex-between
        fixed top-0 bg-green-400 dark:bg-blue-700 z-30 w-full py-6`}>
            <div className="flex-between mx-auto w-5/6">
                <div className="flex-between w-full gap-16">
                    <Link to="/">
                    <h1 className="text-5xl text-orange-500 p-2">Note<span className="text-blue-800 dark:text-green-100">.</span>S</h1>
                    </Link>
                { isAboveMediumScreens ?(<div className="flex-between w-full">
                    <div className="flex-between mx-10 gap-16">
                    <ThemeBtn/>
                    <Link to="/createnote" className="text-2xl dark:text-green-300 text-blue-800 transition duration-500 hover:text-orange-400">
                    <PencilSquareIcon className="h-[30px] w-[30px] dark:text-green-300 text-blue-800"/></Link>
                    <Link to='/profile' ><h1 className="text-2xl dark:text-green-300 text-blue-800 transition duration-500 hover:text-orange-400">{user?.username}</h1></Link>
                    
                    </div>
                </div>)
                : (
                <button className="rounded-full dark:bg-green-400 p-2"
                        onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <Bars3Icon className="h-6 w-6 text-white"/>
                </button>)}
                </div>
            </div>
        </div>
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40
                 h-full w-[300px] bg-green-500 dark:bg-blue-400 drop-shadow-xl">
            <div className="flex justify-end p-12">
                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <XMarkIcon className="h-6 w-6 text-blue-800 dark:text-green-300"/>
                </button>
            </div>
            <div className="ml-[33%] flex flex-col gap-10 text-2xl">
            <Link to='/profile' ><h1 className="text-2xl underline-offset-8 dark:text-green-300 text-blue-800 transition duration-500 hover:text-orange-400">{user?.username}</h1></Link>
            <Link to="/createnote" className="text-2xl dark:text-green-300 text-blue-800 transition duration-500 hover:text-orange-400">
            <PencilSquareIcon className="h-[30px] w-[30px] dark:text-green-300 text-blue-800"/></Link>
            <ThemeBtn/>
            </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar