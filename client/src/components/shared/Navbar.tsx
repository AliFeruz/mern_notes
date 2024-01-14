import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import { Bars3Icon, XMarkIcon, PencilSquareIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { INITIAL_USER, useUserContext } from "@/context/authContext";
import ThemeBtn from "./ThemeBtn";
import { UserIcon } from '@heroicons/react/24/solid';
import { Button } from "../ui/button";



const Navbar = () => {
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
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
        <div className="flex-between
        fixed top-0 bg-gradient-to-l from-cyan-100 via-cyan-300 to-cyan-100 dark:bg-gradient-to-r dark:from-fuchsia-900 dark:to-[#180c49] dark:border-b border-fuchsia-400 z-30 w-full py-6">
            <div className="flex-between mx-auto w-5/6">
                <div className="flex-between w-full gap-16">
                    <Link to="/">
                    <h1 className="logo">CRUD</h1>
                    </Link>
                { isAboveMediumScreens ?(<div className="flex-between w-3/5">
                    <ThemeBtn/>
                    <Link to="/createnote" className="flex items-center gap-3">
                    <PencilSquareIcon className="h-[30px] w-[30px] icon"/>
                    <p className="icon text-xl">Create a Note</p></Link>
                    <Link to='/profile' className="flex items-center gap-3">
                    <UserIcon className="h-[30px] w-[30px] icon"/>
                    <p className="icon text-xl">Profile</p>
                    </Link>
                </div>)
                : (
                <button className="dark:bg-icon p-2"
                        onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <Bars3Icon className="h-[30px] w-[30px] icon"/>
                </button>)}
                </div>
            </div>
        </div>
        {!isAboveMediumScreens && isMenuToggled && (
            <div className="fixed right-0 bottom-0 z-40
                 h-full w-[300px] bg-gradient-to-b from-cyan-50 to-cyan-200 dark:bg-gradient-to-b dark:from-fuchsia-900 dark:to-[#220794] drop-shadow-xl">
            <div className="flex justify-end p-12">
                <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <XMarkIcon className="h-8 w-8 icon"/>
                </button>
            </div>
            <div >
            <div className="ml-[20%] flex justify-between mt-10 flex-col gap-10 w-3/5">
                    <Link to="/createnote" className="flex items-center gap-3"
                    onClick={() => setIsMenuToggled(false)}>
                    <PencilSquareIcon className="h-[30px] w-[30px] icon"/>
                    <p className="icon text-xl">Create a Note</p></Link>
                    <Link to='/profile' className="flex items-center gap-3"
                    onClick={() => setIsMenuToggled(false)} >
                    <UserIcon className="h-[30px] w-[30px] icon"/>
                    <p className="icon text-xl">Profile</p>
                    </Link>
                    <ThemeBtn/>
                    <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
                    <ArrowRightEndOnRectangleIcon className="h-[30px] w-[30px] icon"/>
                    <p className="icon text-xl">Logout</p>
                     </Button>
                </div>
            </div>
            </div>
        )}
    </nav>
  )
}

export default Navbar