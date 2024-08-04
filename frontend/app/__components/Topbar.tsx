
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../__store/store";
import { setView } from "../__store/viewSlice";
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { FaGit } from "react-icons/fa";

const TopBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessJwt"]);
  const dispatch = useDispatch();
  const router = useRouter();

  const currentView = useSelector((state: RootState) => state.view.currentView);

  const handleViewChange = (newView: 'project' | 'feature' | 'user') => {
    dispatch(setView(newView));
  };

  return (
    <div className="bg-black text-white flex justify-between items-center p-4 border-b border-white">
      <FaGit size={30}/>

      {currentView == null &&
  
        <button className='"bg-black rounded-xl
         text-white border border-white
         py-2 px-4 ml-2 transition duration-300 
         hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600 active:text-gray-500 active:border-gray-700"'
         onClick={() => { 
          removeCookie("accessJwt");
          router.push("/");
          }}>
            Logout
        </button>
      }
      { currentView != null &&
      <span>
      <button className="bg-black text-white border border-white py-2 px-4 ml-2 
      transition duration-300 hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600
       active:text-gray-500 active:border-gray-700 rounded-xl"
      onClick={()=> handleViewChange('project')}>
        Project
      </button>
      <button className="bg-black text-white border
       border-white py-2 px-4 ml-2 transition duration-300
        hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600 
        active:text-gray-500 active:border-gray-700 rounded-xl"
      onClick={()=> handleViewChange('feature')}>
        Feature
      </button>
      <button className="bg-black text-white border
       border-white py-2 px-4 ml-2 transition duration-300
        hover:bg-gray-800 hover:text-gray-400 active:bg-gray-600
         active:text-gray-500 active:border-gray-700 rounded-xl"
      onClick={()=> handleViewChange('user')}>
        User
      </button>
      </span>
      } 
    </div>
  );
};

export default TopBar;
