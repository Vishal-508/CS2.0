import styled from 'styled-components';
import OuterContainer from './OuterContainer';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.colors.border};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform:rotate(360deg); }
}
`;

const Loading = () => {
return (
    <OuterContainer>
<LoadingContainer>
<Spinner />
</LoadingContainer>
</OuterContainer>
);
};

export default Loading;

