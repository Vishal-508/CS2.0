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
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 1rem 0;
`;

export default Layout;