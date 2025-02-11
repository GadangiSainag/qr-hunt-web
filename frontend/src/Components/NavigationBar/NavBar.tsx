import { ReactNode, useState } from "react";
import { GoHomeFill ,GoHome} from "react-icons/go";
import { BsPeople, BsPeopleFill ,BsPlusCircle,BsPlusCircleFill} from "react-icons/bs";
import { MdOutlineLeaderboard ,MdLeaderboard,MdFormatListBulleted,MdFormatListBulletedAdd} from "react-icons/md";
import { NavLink } from 'react-router-dom';
interface MenuItem {
    name: string;           // The name of the menu item
    icon: ReactNode; // The icon can be a React component or a string (for icons)
  activeIcon: ReactNode; 
    to: string;            // The route path
  }
const NavBar = () => {
  const Menus:MenuItem[] = [
    { name: "Home", icon: <GoHome color="#333333" size={24}/>, activeIcon:<GoHomeFill color="#333333" size={26}/>, to:"/admin/dashboard" },
    { name: "Teams", icon: <BsPeople color="#333333" size={24}/>, activeIcon:<BsPeopleFill color="#333333" size={26}/>,to: "/admin/teams" },
    { name: "+", icon: <BsPlusCircle color="#333333" size={24} />,   activeIcon:<BsPlusCircleFill color="#333333" size={26}/>,to:"/admin/register-team" },
    { name: "Challenges", icon: <MdFormatListBulleted color="#333333" size={24} />,  activeIcon:<MdFormatListBulletedAdd color="#333333" size={26}/>,to:"/admin/questions" },
    { name: "Leaderboard", icon: <MdOutlineLeaderboard color="#333333" size={24} />, activeIcon:<MdLeaderboard color="#333333" size={26}/>, to: "/leaderboard/global" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="bg-slate-500 h-[4.8rem] px-6 rounded-t-xl ">
      <div className="flex justify-between">
        
        
        {Menus.map((menu, i) => (
          <div key={i} className="">
            <NavLink to={menu.to} className="flex flex-col text-center pt-6" onClick={() => setActive(i)}>
                <span className="cursor-pointer z-20">{i === active ? menu.activeIcon :menu.icon}</span>
             {/* Label */}
              {/* <div
                className={`text-cyan-50 transition duration-1000`}
              >
                {active === i
                    ? menu.name
                    : ""}
              </div> */}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;