
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../__store/store";
import { setView } from "../__store/viewSlice";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { FaGit } from "react-icons/fa";

interface TopBarProps {
  users: string[];
  setUser: (user: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ users, setUser }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessJwt"]);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentView = useSelector((state: RootState) => state.view.currentView);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleViewChange = (newView: 'project' | 'feature') => {
    dispatch(setView(newView));
  };

  const handleLogout = async () => {
    window.location.href = "/";
    await removeCookie("accessJwt");
  };

  return (
    <div className="bg-black text-white flex justify-between items-center p-4 border-b border-white">
      <FaGit size={30} />

      {currentView == null &&
        <button className="bg-black rounded-xl text-white border border-white py-2 px-4 ml-2 transition duration-300 hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600 active:text-gray-500 active:border-gray-700"
          onClick={handleLogout}>
          Logout
        </button>
      }

      {currentView != null &&
        <span className="flex items-center">
          <button className="bg-black text-white border border-white py-2 px-4 ml-2 transition duration-300 hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600 active:text-gray-500 active:border-gray-700 rounded-xl"
            onClick={() => handleViewChange('project')}>
            Project
          </button>
          <button className="bg-black text-white border border-white py-2 px-4 ml-2 transition duration-300 hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600 active:text-gray-500 active:border-gray-700 rounded-xl"
            onClick={() => handleViewChange('feature')}>
            Feature
          </button>
          <div className="relative">
            <button className="bg-black text-white border border-white py-2 px-4 ml-2 transition duration-300 hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600 active:text-gray-500 active:border-gray-700 rounded-xl"
              onClick={() => setDropdownOpen(!dropdownOpen)}>
              User
            </button>
            {dropdownOpen &&
              <div className="absolute right-0 mt-2 w-48 bg-black border border-white rounded-xl z-10">
                {users.length > 0 ? (
                    <>
                      {users.map((user) => (
                        <button key={user} className="block w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-gray-400"
                          onClick={() => { setUser(user); setDropdownOpen(false); }}>
                          {user}
                        </button>
                      ))}
                      <button key={'All'} className="block w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-gray-400"
                        onClick={() => { setUser(""); setDropdownOpen(false); }}>
                        All
                      </button>
                    </>
                  ) : (
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-gray-400"
                    onClick={() => setDropdownOpen(false)}>
                    Select a repository
                  </button>
                )}
              </div>
            }
          </div>
        </span>
      }
    </div>
  );
};

export default TopBar;