import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ added useNavigate
import toast from 'react-hot-toast';
import SearchDialogComponent from './SearchDialogComponent';

const LoginComponent = () => {
    const { login} = useContext(AuthContext);
    const [identityNumber, setidentityNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // ⬅️ init
    const [dialogContent, setDialogContent] = useState(null);

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const results = await login(identityNumber, password)
        if (results){
          toast.success("Login Successfully", { position: "top-right" })
          navigate('/dashboard');
        } else {
          toast.error("Invalid Credentials", { position: "top-right" });
        }
      } catch (error) {
        toast.error("Something went wrong", { position: "top-center" });
        console.log(error);
      };
  }

  const openDialog = (type) => {
    if (type === 'password') {
      setDialogContent({
        title: 'Need Help?',
        message: 'Please contact the Hospital admin for assistance with creating a new password'
      });
    }
  }
    

  const closeDialog = () => setDialogContent(null);

  return (
     <div className="flex justify-center items-center">
       <div className="flex w-[90%] max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">

        {/* Left Side - Login Form */}
        <div className='w-1/2 bg-white flex flex-col justify-center items-center p-16'>
          <div className="w-full max-w-md ">
            <div className='flex flex-col justify-center items-center p-3'>
              <IoShieldCheckmarkSharp className='text-8xl text-blue-600' />
              <h2 className='text-4xl text-gray-800 mb-6 font-bold'>
                <span className="text-teal-500 font-bold">Login</span> Hospital Staff
              </h2>
              <p className='font-medium text-gray-600 text-center text-xl'>Access patient management dashboard</p>
               <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
              <input
                className="w-full font-bold px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                value={identityNumber}
                onChange={(e) => setidentityNumber(e.target.value)}
                type='text'
                placeholder='Enter your staff ID'
              />
              <input
                className="w-full font-bold px-4 py-3 bg-gray-100 rounded-xl focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Enter your password'
              />
              <div className="text-xl font-semibold text-center text-gray-500 hover:underline cursor-pointer"  onClick={() => openDialog('password')}>
                Forgot your password?
              </div>
              <button
                type='submit'
                className="block mx-auto w-1/3 text-lg bg-blue-500 font-medium text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>
            </div>
          </div>
          <SearchDialogComponent isOpen={dialogContent !== null} onClose={closeDialog} title={dialogContent?.title} message={dialogContent?.message} />
        </div>

        {/* Right Side - Has curved blue shape */}
        <div className="w-1/2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex flex-col justify-center items-center p-16 rounded-l-[150px]">
          <div className="w-full max-w-md text-center z-10 space-y-16">
            <h3 className="text-4xl font-semibold ">Family & Friends</h3>
            <p className="text-lg font-bold text-gray-100">Search for a patient?</p>
            <Link to="/search-patient"> {/* Just added a route to the SearchPatientPage */}
              <button className="border-2 font-bold text-lg w-90 py-6 border-white rounded-md hover:bg-white hover:text-blue-600 transition">
                View Patient
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginComponent;