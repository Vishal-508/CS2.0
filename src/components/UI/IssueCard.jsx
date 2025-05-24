import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../utils/helpers';
import { FaThumbsUp, FaMapMarkerAlt } from 'react-icons/fa';
import StatusBadge from './StatusBadge';

const IssueCard = ({ issue }) => {
  return (
    <Card to={`/issues/${issue._id}`}>
      <Header>
        <h3>{issue.title}</h3>
        <StatusBadge status={issue.status} />
      </Header>
      <Meta>
        <span><FaMapMarkerAlt /> {issue.location}</span>
        <span>{issue.category?.name}</span>
      </Meta>
      <Footer>
        <Votes>
          <FaThumbsUp /> {issue.votes || 0}
        </Votes>
        <Date>{formatDate(issue.createdAt)}</Date>
      </Footer>
    </Card>
  );
};

const Card = styled(Link)`
  display: block;
  padding: 1rem;
  background: white;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primary};
    flex: 1;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const Votes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Date = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default IssueCard;