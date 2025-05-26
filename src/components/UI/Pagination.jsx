import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ active, theme }) => 
    active ? theme.colors.primary : 'white'};
  color: ${({ active, theme }) => 
    active ? 'white' : theme.colors.text};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.primaryDark : theme.colors.light};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.light};
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Show up to 5 pages around current page
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);
  
  // Adjust if we're at the start or end
  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  }
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(totalPages - 4, 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        &laquo;
      </PageButton>
      
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &lsaquo;
      </PageButton>
      
      {startPage > 1 && <span>...</span>}
      
      {pages.map(page => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          active={currentPage === page}
          aria-label={`Page ${page}`}
        >
          {page}
        </PageButton>
      ))}
      
      {endPage < totalPages && <span>...</span>}
      
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &rsaquo;
      </PageButton>
      
      <PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        &raquo;
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;



// import styled from 'styled-components';

// const PaginationContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 0.5rem;
//   margin-top: 1.5rem;
// `;

// const PageButton = styled.button`
//   padding: 0.5rem 0.75rem;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.radii.sm};
//   background-color: ${({ active, theme }) => 
//     active ? theme.colors.primary : 'white'};
//   color: ${({ active, theme }) => 
//     active ? 'white' : theme.colors.text};
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: ${({ active, theme }) => 
//       active ? theme.colors.primaryDark : theme.colors.light};
//   }

//   &:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pages = [];
  
//   for (let i = 1; i <= totalPages; i++) {
//     pages.push(i);
//   }

//   return (
//     <PaginationContainer>
//       <PageButton
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         &laquo;
//       </PageButton>
      
//       {pages.map(page => (
//         <PageButton
//           key={page}
//           onClick={() => onPageChange(page)}
//           active={currentPage === page}
//         >
//           {page}
//         </PageButton>
//       ))}
      
//       <PageButton
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         &raquo;
//       </PageButton>
//     </PaginationContainer>
//   );
// };

// export default Pagination;