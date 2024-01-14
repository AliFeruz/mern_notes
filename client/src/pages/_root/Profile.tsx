import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import { INITIAL_USER, useUserContext } from '@/context/authContext';
import { ArrowRightEndOnRectangleIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';



const Profile = () => {
  const { user, setUser, setIsAuthenticated, Logout, token, setToken } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const _id = user?._id;


  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    Logout();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        navigate('/sign-up');
      } else {
        toast({ title: "Account deletion failed. Please try again." })
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className='flex flex-col mt-24'>
      <div className='common-container'>
        <div className='max-w-5xl flex-col p-10 justify-between'>
          <div className='flex gap-9  p-2 mt-4'>
         
          <h2 className='h3-bold md:h2-bold text text-4xl font-bold'>Profile Data</h2>
          </div>
          <div className='flex p-4 mt-4 gap-9 rounded-md shadow-md'>
          <p className='shad-form_label'>Username: </p>
          <h1 className='text text-2xl font-bold'>{user?.username}</h1>
          </div>
          <div className='flex p-2 mt-4 gap-9 rounded-md shadow-md'>
          <p className='shad-form_label'>Email: </p>
          <h1 className='text text-2xl font-bold'>{user?.email}</h1>
          </div>
      <div className='flex justify-end p-4 mx-4 mt-8 gap-9'>
      <Button variant="ghost" className="shad-button_ghost" onClick={(e) => handleSignOut(e)}>
        <p className='shad-for_label text'>Logout</p>
      <ArrowRightEndOnRectangleIcon className="h-[30px] w-[30px] icon"/>
      </Button>
      </div>
      <div className='flex justify-end p-4 mx-4 mt-4 gap-9'>
      <Button variant="ghost" className="shad-button_ghost" onClick={handleDeleteAccount}>
        <p className='shad-for_label ml-4 text'>Delete Account</p>
      <TrashIcon className="h-[30px] w-[30px] icon"/>
      </Button>
      </div>
        </div>
      </div>
    </div>
  )
}

export default Profile