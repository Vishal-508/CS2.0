import styled from 'styled-components';

const Logo = () => {
  return (
    <LogoContainer>
      <span>Civic</span>
      <span>Sync</span>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};

  span:first-child {
    color: ${({ theme }) => theme.colors.primary};
  }

  span:last-child {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export default Logo;