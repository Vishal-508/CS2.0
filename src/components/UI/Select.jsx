import styled from 'styled-components';

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  color: ${({ theme }) => theme.colors.text}; // Add text color

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }

  option {
    color: ${({ theme }) => theme.colors.text}; // Style for options
    background: white;
  }

  ${({ error }) => error && `
    border-color: ${({ theme }) => theme.colors.danger};
  `}
`;

export default Select;


// import styled from 'styled-components';

// const Select = styled.select`
//   width: 100%;
//   padding: 0.5rem 1rem;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radii.sm};
//   font-size: 1rem;
//   background-color: white;
//   transition: border-color 0.2s, box-shadow 0.2s;

//   &:focus {
//     outline: none;
//     border-color: ${({ theme }) => theme.colors.primary};
//     box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
//   }

//   ${({ error }) => error && `
//     border-color: ${({ theme }) => theme.colors.danger};
//   `}
// `;

// export default Select;  // Make sure this default export exists