import { Outlet } from 'react-router';
import NavAppBar from '../components/AppBar';
import { useSelector } from 'react-redux';

const BaseLayout = ({ openDrawer, setOpenDrawer }) => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <NavAppBar userData={user} setOpenDrawer={setOpenDrawer} />
      <Outlet />
    </>
  );
};

export default BaseLayout;
