import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 1.5rem;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: ${({ gap }) => gap || '0.5rem'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  flex-direction: ${({ direction }) => direction || 'row'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({ gap }) => gap || '1rem'};
  grid-template-columns: ${({ columns }) => columns || 'repeat(auto-fit, minmax(250px, 1fr))'};
`;