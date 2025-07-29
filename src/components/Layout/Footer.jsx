import { VscGithubInverted } from "react-icons/vsc";

const Footer = () => {
  return (
      <footer className="p-4 w-full">
      <a 
        className="flex items-center justify-start gap-4 hover:underline" 
        href="https://github.com/chingu-voyages/V56-tier1-team-03" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <VscGithubInverted className="text-5xl text-black" />
        <span className="text-xl text-black font-bold">
          team <span className="text-teal-500">JAMBA</span> github repo
        </span>
      </a>
    </footer>
  );
};

export default Footer;