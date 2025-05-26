import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navbar from './Common/Navbar';
import Footer from './Common/Footer';

const Layout = () => {
  return (
    <Container>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width:100svw;
  flex-direction: column;
  min-height: 100vh;

  overflow: visible; /* important */
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
   &::-webkit-scrollbar {
    width: 0px;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
`;

export default Layout;