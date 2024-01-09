import { Button } from '@/components/ui/button'
import { INITIAL_USER, useUserContext } from '@/context/authContext';
import { ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid'
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
    <section className='flex flex-col'>
      <div className='p-10 flex items-center justify-center'>
        <h1 className='text-blue-950 dark:text-green-400 text-4xl font-bold'>Username: {user?.username}</h1>
      </div>
      <div className='mt-6 flex items-center justify-center'>
        <h1 className='text-blue-950 dark:text-green-400 text-4xl font-bold'>UserId: {user?._id}</h1>
      </div>
      <div className='mt-6 flex items-center justify-center'>
        <h1 className='text-blue-950 dark:text-green-400 text-4xl font-bold'>User email: {user?.email}</h1>
      </div>
      <div className='mt-6  flex items-center justify-end'>
      <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
        Logout
      <ArrowRightEndOnRectangleIcon className="h-[30px] w-[30px] dark:text-green-300 text-blue-800"/>
      </Button>
      </div>
    </section>
  )
}

export default Profile