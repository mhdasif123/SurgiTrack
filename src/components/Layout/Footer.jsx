import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white mt-8 py-4 border-t">
      <div className="container mx-auto text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} <a href="https://github.com/chingu-voyages/V56-tier1-team-03" target="_blank">SurgiTrack.</a> For demonstration purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;