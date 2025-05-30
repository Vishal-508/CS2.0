import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserIssues } from '../../features/issues/issuesSlice';
// import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { Button, Card, IssueCard, Loading, StatusBadge } from '../../components/UI';
import { FaPlus, FaThumbsUp } from 'react-icons/fa'; // Changed from FaSearch to FaThumbsUp for votes
import { formatDate } from '../../utils/helpers';
import OuterContainer from '../../components/UI/OuterContainer';

const MyIssues = () => {
  const dispatch = useDispatch();
  const { userIssues, loading } = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(fetchUserIssues());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  // Extract issues from the nested response structure
  const issues = userIssues?.data?.issues || [];

  return (
   
      <Container>
        <Header>
          <h2>My Reported Issues</h2>
          <Button as={Link} to="/issues/create">
            <FaPlus /> Report New Issue
          </Button>
        </Header>

        {issues.length === 0 ? (
          <EmptyState>
            <p>You haven't reported any issues yet.</p>
            <Button as={Link} to="/issues/create">
              <FaPlus /> Report Your First Issue
            </Button>
          </EmptyState>
        ) : (
          <IssueGrid>
                        {issues.map((issue) => (
                          <IssueCard
                            key={issue._id} 
                            issue={{
                              ...issue,
                              votes: issue.voteCount,
                              user: issue.author
                            }} 
                          />
                        ))}
                      </IssueGrid>
          // <IssuesList>
          //   {issues.map((issue) => (
          //     <IssueItem key={issue._id} to={`/issues/${issue._id}`}>
          //       <IssueContent>
          //         <h3>{issue.title}</h3>
          //         {issue.imageUrl && (
          //           <ImagePreview src={issue.imageUrl} alt={issue.title} />
          //         )}
          //         <Meta>
          //           <StatusBadge status={issue.status} />
          //           <span>{issue.category}</span> {/* Directly using category as it's a string */}
          //           <span>{formatDate(issue.createdAt)}</span>
          //         </Meta>
          //         <Votes>
          //           <FaThumbsUp /> {issue.voteCount || 0} votes {/* Using voteCount from API */}
          //         </Votes>
          //       </IssueContent>
          //     </IssueItem>
          //   ))}
          // </IssuesList>
        )}
      </Container>
 
  );
};

// Add this new styled component
const ImagePreview = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: 0.5rem;
`;

// Rest of your styled components remain the same...
const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.radii.md};

  p {
    margin-bottom: 1rem;
  }
`;

const IssuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const IssueItem = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

const IssueContent = styled.div`
  h3 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1rem;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Votes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const IssueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export default MyIssues;



// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { fetchUserIssues } from '../../features/issues/issuesSlice';
// import { toast } from 'react-hot-toast';
// import styled from 'styled-components';
// import { Button, Card, Loading, StatusBadge } from '../../components/UI';
// import { FaPlus, FaSearch } from 'react-icons/fa';
// import { formatDate } from '../../utils/helpers';
// import OuterContainer from '../../components/UI/OuterContainer';

// const MyIssues = () => {
//   const dispatch = useDispatch();
//   const { userIssues, loading } = useSelector((state) => state.issues);
// console.log("userIssues",userIssues)
//   useEffect(() => {
//     dispatch(fetchUserIssues());
//   }, [dispatch]);

//   if (loading ) {
//     return <Loading />;
//   }

//   return (
//     <OuterContainer>
//     <Container>
//       <Header>
//         <h2>My Reported Issues</h2>
//         <Button as={Link} to="/issues/create">
//           <FaPlus /> Report New Issue
//         </Button>
//       </Header>

//       {userIssues.length === 0 ? (
//         <EmptyState>
//           <p>You haven't reported any issues yet.</p>
//           <Button as={Link} to="/issues/create">
//             <FaPlus /> Report Your First Issue
//           </Button>
//         </EmptyState>
//       ) : (
//         <IssuesList>
//           {userIssues.map((issue) => (
//             <IssueItem key={issue._id} to={`/issues/${issue._id}`}>
//               <IssueContent>
//                 <h3>{issue.title}</h3>
//                 <Meta>
//                   <StatusBadge status={issue.status} />
//                   <span>{issue.category?.name}</span>
//                   <span>{formatDate(issue.createdAt)}</span>
//                 </Meta>
//                 <Votes>
//                   <FaSearch /> {issue.votes || 0} votes
//                 </Votes>
//               </IssueContent>
//             </IssueItem>
//           ))}
//         </IssuesList>
//       )}
//     </Container>
//     </OuterContainer>
//   );
// };

// const Container = styled.div`
//   padding: 1rem;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;

//   h2 {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const EmptyState = styled.div`
//   text-align: center;
//   padding: 2rem;
//   background: ${({ theme }) => theme.colors.light};
//   border-radius: ${({ theme }) => theme.radii.md};

//   p {
//     margin-bottom: 1rem;
//   }
// `;

// const IssuesList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 1rem;
// `;

// const IssueItem = styled(Link)`
//   display: block;
//   background: ${({ theme }) => theme.colors.light};
//   border-radius: ${({ theme }) => theme.radii.md};
//   padding: 1rem;
//   text-decoration: none;
//   color: inherit;
//   transition: transform 0.2s, box-shadow 0.2s;

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: ${({ theme }) => theme.shadows.sm};
//   }
// `;

// const IssueContent = styled.div`
//   h3 {
//     margin: 0 0 0.5rem 0;
//     color: ${({ theme }) => theme.colors.primary};
//     font-size: 1.1rem;
//   }
// `;

// const Meta = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
//   align-items: center;
//   margin-bottom: 0.5rem;
//   font-size: 0.9rem;
//   color: ${({ theme }) => theme.colors.textSecondary};
// `;

// const Votes = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.9rem;
//   color: ${({ theme }) => theme.colors.textSecondary};
// `;

// export default MyIssues;