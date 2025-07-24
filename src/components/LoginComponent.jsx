import  { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const LoginComponent = () => {
    const {login, error} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center min-h-screen bg-gray-100 flex-col'>
        <input className="p-3 mb-4 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter your ID...'/>
        <input className="p-3 mb-4 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' /> 
        <button type='submit' className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
        {error && <p className='text-red-500 mt-4'>{error}</p>} 
    </form>
  )
}

export default LoginComponent