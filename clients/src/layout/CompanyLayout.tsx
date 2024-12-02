import NavBar from '../components/common/navBar/NavBar';
import React, { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavigation from '@/components/common/sidebar/SideBar';
import { CompanySideBarItems, CompanySettingsItems } from '../constants/SidebarItems'
import CreateJobModal from '@/components/job/CreateJobModal';
import Header from '@/components/company/Header/CompanyHeader';

const CompanyLayout: React.FC = () => {
    const [sideBar, setSidebar] = useState(false)
    const [isOpen, setClose] = useState(false)

    const jobModalToggle = useCallback(() => {
        setClose((prev) => !prev);
    }, [])
  return (
    <>
      <div className='md:flex px-1'>
    { isOpen &&  <CreateJobModal isOpen={isOpen} onClose={setClose} /> }
  <div className={`fixed z-50 h-screen bg-gray-100 md:relative md:h-auto md:translate-x-0 transition-transform duration-300 ease-in-out ${sideBar ? 'translate-x-0' : '-translate-x-full'}`}>
    <SidebarNavigation userImage='/company.png' settingsNavItems={CompanySettingsItems()} userType='company' userName='Brototype' mainNavItems={CompanySideBarItems()} />
  </div>
  <div className='flex-1 bg-white h-screen overflow-y-auto'>
    <Header onClose={jobModalToggle}/>
    <div className='p-4 mt-16'>
      <Outlet />
    </div>
  </div>
</div>
    </>
  )
}

export default CompanyLayout
