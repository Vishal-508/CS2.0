import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  // min-width:120px;
  box-sizing: boder-box;
  text-wrap: nowrap;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme, variant }) => 
    variant === 'danger' ? theme.colors.danger : theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;

  &:hover {
    background-color: ${({ theme, variant }) => 
      variant === 'danger' ? theme.colors.dangerDark : theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }

  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  ${({ small }) => small && `
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  `}

    @media (max-width: 650px) {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  }
`;

export default Button;