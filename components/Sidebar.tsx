import React from "react";
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.min.css';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside className={className}>
      <div className="mb-6"></div>
      <Image
        src="/images/avatar.jpg"
        alt="Avatar"
        width={120}
        height={120}
        className="rounded-lg"
      />
      <p className="mt-4">hello :3</p>
      <div className="mt-4 flex space-x-4"> 
        <a href="https://github.com/AmorZhao" target="_blank" rel="noopener noreferrer" title="GitHub">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://instagram.com/amor.zh39" target="_blank" rel="noopener noreferrer" title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="mailto:amor_7303@163.com" target="_blank" rel="noopener noreferrer" title="Email">
          <i className="far fa-envelope"></i>
        </a>
      </div>
    </aside>
  );
};


export default Sidebar;