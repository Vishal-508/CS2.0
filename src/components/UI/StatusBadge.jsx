import styled from 'styled-components';

const StatusBadge = ({ status }) => {
  let color;
  switch (status) {
    case 'Pending':
      color = 'warning';
      break;
    case 'In Progress':
      color = 'info';
      break;
    case 'Resolved':
      color = 'success';
      break;
    default:
      color = 'secondary';
  }

  return <Badge color={color}>{status}</Badge>;
};

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  background-color: ${({ theme, color }) => theme.colors[`${color}Light`]};
  color: ${({ theme, color }) => theme.colors[color]};
`;

export default StatusBadge;