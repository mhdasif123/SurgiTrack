import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { PatientContext } from '../contexts/PatientContext';
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import SearchDialogComponent from './SearchDialogComponent';

const LoginComponent = () => {
    const { login, user } = useContext(AuthContext);
    const { patients } = useContext(PatientContext);
    const [identityNumber, setIdentityNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Guest search functionality
    const [patientId, setPatientId] = useState('');
    const [dialogContent, setDialogContent] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const results = await login(identityNumber, password);
            if (results) {
                toast.success("Login Successfully", { position: "top-right" });
                // The useEffect will handle navigation
            } else {
                toast.error("Invalid Credentials", { position: "top-right" });
            }
        } catch (error) {
            toast.error("Something went wrong", { position: "top-center" });
            console.log(error);
        }
    };

    const handleGuestSearch = (e) => {
        e.preventDefault();
        if (!patientId) {
            toast.error('Please enter a Patient ID.');
            return;
        }

        const foundPatient = patients.find(
            (patient) => patient.id.toLowerCase() === patientId.toLowerCase()
        );

        if (foundPatient) {
            toast.success("Patient Found");
            navigate(`/status/${foundPatient.id}`, { state: { patient: foundPatient } });
        } else {
            toast.error('Patient not found. Please check your ID and try again.');
        }
    };

    const openDialog = (type) => {
        if (type === 'password') {
            setDialogContent({
                title: 'Need Help?',
                message: 'Please contact the Hospital admin for assistance with creating a new password.'
            });
        } else if (type === 'help') {
            setDialogContent({
                title: 'Need Help?',
                message: 'The Patient ID is a unique, 6-character code assigned to each individual.'
            });
        } else if (type === 'patientId') {
            setDialogContent({
                title: 'Get Your Patient ID',
                message: "To get a Patient ID, please contact the clinic's reception. Only close relatives or designated escorts are authorized to request this information."
            });
        }
    };

    const closeDialog = () => setDialogContent(null);

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    return (
        <>
            {/* Mobile Layout: Only Guest Search */}
            <div className="md:hidden flex justify-center items-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                    <div className="flex justify-center items-center mb-6">
                        <FaUsers className="text-blue-600 w-[60px] h-[60px]" />
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        <span className="text-teal-500">Find </span>Your Patient
                    </h2>

                    <form onSubmit={handleGuestSearch} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Patient ID (e.g., A312F2)"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            className="w-full font-bold px-4 py-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            className="w-full text-lg bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition font-semibold"
                        >
                            Find Patient
                        </button>
                    </form>

                    <div className="mt-6 space-y-3 text-center">
                        <div
                            className="text-sm font-medium text-gray-500 hover:underline cursor-pointer"
                            onClick={() => openDialog('help')}
                        >
                            Need Help?
                        </div>
                        <div
                            className="text-sm font-medium text-gray-500 hover:underline cursor-pointer"
                            onClick={() => openDialog('patientId')}
                        >
                            How to get Patient ID
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout: Original Two-Panel Design */}
            <div className="hidden md:flex justify-center items-center">
                <div className="flex w-[90%] max-w-6xl rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200">
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
                                    <div
                                        className="text-xl font-semibold text-center text-gray-500 hover:underline cursor-pointer"
                                        onClick={() => openDialog('password')}
                                    >
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
                    </div>

                    <div className="w-1/2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex flex-col justify-center items-center p-16 rounded-l-[150px]">
                        <div className="w-full max-w-md text-center z-10 space-y-16">
                            <h3 className="text-4xl font-semibold ">Family & Friends</h3>
                            <p className="text-lg font-bold text-gray-100">Search for a patient?</p>
                            <Link to="/search-patient">
                                <button className="border-2 font-bold text-lg w-90 py-6 border-white rounded-md hover:bg-white hover:text-blue-600 transition">
                                    View Patient
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <SearchDialogComponent
                isOpen={dialogContent !== null}
                onClose={closeDialog}
                title={dialogContent?.title}
                message={dialogContent?.message}
            />
        </>
    )
}

export default LoginComponent;