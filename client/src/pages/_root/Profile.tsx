import { Button } from '@/components/ui/button'
import { INITIAL_USER, useUserContext } from '@/context/authContext';
import { ArrowRightEndOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';



const Profile = () => {
  const { user, setUser, setIsAuthenticated, Logout } = useUserContext();
  const navigate = useNavigate();


  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Logout();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <div className='flex flex-col mt-24'>
      <div className='common-container'>
        <div className='max-w-5xl flex-col p-10 justify-between'>
          <div className='flex gap-9  p-2 mt-4'>
         
          <h2 className='h3-bold md:h2-bold text-cyan-900 dark:text-cyan-600 text-4xl font-bold'>Your Profile Data</h2>
          </div>
          <div className='flex p-2 mt-4 gap-9 rounded-md border border-cyan-800 dark:border-slate-900'>
          <p className='shad-form_label'>Username: </p>
          <h1 className='text-cyan-950 dark:text-cyan-600 text-2xl font-bold'>{user?.username}</h1>
          </div>
          <div className='flex p-2 mt-4 gap-9 rounded-md border border-cyan-800 dark:border-slate-900'>
          <p className='shad-form_label'>Email: </p>
          <h1 className='text-blue-950 dark:text-cyan-600 text-2xl font-bold'>{user?.email}</h1>
          </div>
      <div className='flex justify-end p-4 mx-4 mt-8 gap-9'>
      <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
        <p className='shad-for_label'>Logout</p>
      <ArrowRightEndOnRectangleIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
      </Button>
      </div>
      <div className='flex justify-end p-4 mx-4 mt-4 gap-9'>
      <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
        <p className='shad-for_label'>Delete Account</p>
      <TrashIcon className="h-[30px] w-[30px] dark:text-cyan-600 text-cyan-900"/>
      </Button>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Profile