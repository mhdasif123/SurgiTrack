import LoginComponent from '../components/LoginComponent'

const LoginPage = () => {
  return (
    <>
      {/* Desktop: Show tagline */}
      <p className='font-semibold text-gray-600 text-center p-10 text-xl hidden md:block'>
        Stay connected with your loved ones during their medical procedures
      </p>
      
      {/* Mobile: Show tagline only above Find Patient section */}
      <p className='font-semibold text-gray-600 text-center px-4 py-6 text-lg md:hidden'>
        Stay connected with your loved ones during their medical procedures
      </p>
      
      <LoginComponent /> 
    </>
  );
};

export default LoginPage;