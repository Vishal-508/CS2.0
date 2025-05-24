import styled from 'styled-components';

const Card = styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;

  ${({ hoverEffect }) => hoverEffect && `
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.md};
      transform: translateY(-2px);
    }
  `}
`;

export default Card;