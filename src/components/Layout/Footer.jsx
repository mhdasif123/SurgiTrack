import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white mt-8 py-4 border-t">
      <div className="container mx-auto text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} SurgiTrack. For demonstration purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;