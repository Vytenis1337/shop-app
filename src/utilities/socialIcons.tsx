import { FaGithub, FaLinkedin, FaEnvelope, FaSkype } from 'react-icons/fa';

export const socialIcons = [
  {
    id: 1,
    child: <FaEnvelope size={80} />,
    color: '#883c82',
    href: 'mailto:vytenis.kondrackis@gmail.com',
  },
  {
    id: 2,
    child: <FaLinkedin size={80} />,
    color: 'blue',
    href: 'https://www.linkedin.com/in/vytenis-kondrackis-2a1720253/',
  },
  {
    id: 3,
    child: <FaSkype size={80} />,
    color: 'green',
    href: 'https://join.skype.com/invite/DYEsy2wWGFKS',
  },
  {
    id: 4,
    child: <FaGithub size={80} />,
    color: 'black',
    href: 'https://github.com/Vytenis1337/vytenis-portfolio',
  },
];
