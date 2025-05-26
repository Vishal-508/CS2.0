import styled from 'styled-components';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>
          <span>Civic</span>
          <span>Sync</span>
        </Logo>
        <p>Empowering citizens to improve their communities</p>
        <SocialLinks>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </SocialLinks>
        <Copyright>
          &copy; {new Date().getFullYear()} CivicSync. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.dark};
  color: white;
  padding: 2rem 0;
 
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  span:first-child {
    color: white;
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;

  a {
    color: white;
    font-size: 1.25rem;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 1rem;
`;

export default Footer;