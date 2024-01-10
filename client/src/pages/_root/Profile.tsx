import { Button } from '@/components/ui/button'
import { INITIAL_USER, useUserContext } from '@/context/authContext';
import { ArrowRightEndOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid';
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
        <div className='max-w-5xl flex-col gap-3 justify-between'>
          <div className='flex gap-9 p-2 mt-4'>
         
          <h2 className='h3-bold md:h2-bold text-blue-950 dark:text-green-400 text-4xl font-bold'>Your Data</h2>
          </div>
          <div className='flex p-2 mt-4 gap-9'>
          <UserIcon className='w-[30px] h-[30px] items-center dark:text-green-300 text-blue-800'/>
          <h1 className='text-blue-950 dark:text-green-400 text-2xl font-bold'>{user?.username}</h1>
          </div>
          <div className='mt-4 flex gap-9'>
          <h1 className='text-blue-950 dark:text-green-400 text-2xl font-bold'>{user?.email}</h1>
          </div>
      <div className='mt-6  flex items-center justify-end'>
      <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
        Logout
      <ArrowRightEndOnRectangleIcon className="h-[30px] w-[30px] dark:text-green-300 text-blue-800"/>
      </Button>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Profile