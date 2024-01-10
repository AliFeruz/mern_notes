import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, PencilSquareIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { INITIAL_USER, useUserContext } from "@/context/authContext";
import ThemeBtn from "./ThemeBtn";
import { UserIcon } from '@heroicons/react/24/solid';
import { Button } from "../ui/button";



type Props = {
    isTopofPage: boolean;
}

const Navbar = ({isTopofPage}: Props) => {
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
    const navbarbg = isTopofPage ? "" : "bg-cyan-900 drop-shadow";
    const { setUser, setIsAuthenticated, Logout } = useUserContext();
    const navigate = useNavigate();


    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    Logout();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };



  return (
    <nav>
        <div className={`${navbarbg} flex-between
        fixed top-0 bg-gradient-to-l from-cyan-300 via-cyan-600 to-cyan-300 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 z-30 w-full py-6`}>
            <div className="flex-between mx-auto w-5/6">
                <div className="flex-between w-full gap-16">
                    <Link to="/">
                    <h1 className="text-5xl bg-gradient-to-l from-cyan-900 via-cyan-500 to-pink-700 bg-clip-text text-transparent p-2 font-bold tracking-wide text-shadow-md transition duration-300 ease-in-out hover:text-zinc-500">CRUD</h1>
                    </Link>
                { isAboveMediumScreens ?(<div className="flex-between w-3/5">
                    <ThemeBtn/>
                    <Link to="/createnote" className="flex items-center gap-3">
                    <PencilSquareIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
                    <p className="text-zinc-800 dark:text-cyan-600 text-xl">Create a Note</p></Link>
                    <Link to='/profile' className="flex items-center gap-3">
                    <UserIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
                    <p className="text-zinc-800 dark:text-cyan-600 text-xl">Profile</p>
                    </Link>
                </div>)
                : (
                <button className="rounded-full dark:bg-cyan-600 p-2"
                        onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <Bars3Icon className="h-[30px] w-[30px] text-cyan-900"/>
                </button>)}
                </div>
            </div>
        </div>
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40
                 h-full w-[300px] bg-cyan-300 dark:bg-slate-500 drop-shadow-xl">
            <div className="flex justify-end p-12">
                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <XMarkIcon className="h-8 w-8 text-cyan-900 dark:text-cyan-500"/>
                </button>
            </div>
            <div >
            <div className="ml-[20%] flex justify-between mt-10 flex-col gap-10 w-3/5">
                    <Link to="/createnote" className="flex items-center gap-3"
                    onClick={() => setIsMenuToggled(false)}>
                    <PencilSquareIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
                    <p className="text-zinc-800 dark:text-cyan-500 text-xl">Create a Note</p></Link>
                    <Link to='/profile' className="flex items-center gap-3"
                    onClick={() => setIsMenuToggled(false)} >
                    <UserIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
                    <p className="text-zinc-800 dark:text-cyan-500 text-xl">Profile</p>
                    </Link>
                    <ThemeBtn/>
                    <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
                    <ArrowRightEndOnRectangleIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
                    <p className="text-zinc-800 dark:text-cyan-500 text-xl">Logout</p>
                     </Button>
                </div>
            </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar