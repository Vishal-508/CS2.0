import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchIssueDetails,
  clearCurrentIssue,
  deleteIssue,
} from "../../features/issues/issuesSlice";
import {
  castVote,
  deleteVote,
  checkVote,
} from "../../features/votes/votesSlice";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { Button, Card, Loading, StatusBadge } from "../../components/UI";
import {
  FaArrowLeft,
  FaThumbsUp,
  FaEdit,
  FaTrash,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { formatDate } from "../../utils/helpers";
import OuterContainer from "../../components/UI/OuterContainer";

const IssueDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentIssue, loading } = useSelector((state) => state.issues);
  const { votedIssues } = useSelector((state) => state.votes);
  const { user } = useSelector((state) => state.auth);

  const hasVoted = votedIssues.includes(id);

  useEffect(() => {
    dispatch(fetchIssueDetails(id));
    dispatch(checkVote(id));

    return () => {
      dispatch(clearCurrentIssue());
    };
  }, [dispatch, id]);

  const handleVote = () => {
    if (hasVoted) {
      dispatch(deleteVote(id))
        .unwrap()
        .then(() => {
          toast.success("Vote removed successfully");
          dispatch(fetchIssueDetails(id)); // Refresh issue details
        })
        .catch((error) => {
          toast.error(error.message || "Failed to remove vote");
        });
    } else {
      dispatch(castVote(id))
        .unwrap()
        .then(() => {
          toast.success("Vote added successfully");
          dispatch(fetchIssueDetails(id)); // Refresh issue details
        })
        .catch((error) => {
          toast.error(error.message || "Failed to add vote");
        });
    }
  };

  //   const handleVote = () => {
  //     if (hasVoted) {
  //       toast("You have already voted for this issue");
  //       return;
  //     }
  //     dispatch(castVote(id));
  //   };

  const handleEdit = () => {
    navigate(`/issues/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      try {
        await dispatch(deleteIssue(id)).unwrap();
        toast.success("Issue deleted successfully");
        navigate("/issues");
      } catch (error) {
        toast.error(error.message || "Failed to delete issue");
      }
    }
  };

  if (loading || !currentIssue) {
    return <Loading />;
  }

  const isOwner = user?.id === currentIssue.data.author?._id;
  console.log("issues", currentIssue.data.author?._id, "user data ", user?.id);

  const canEdit = isOwner && currentIssue.data.status === "Pending";

  return (
   
      <Container>
        <BackButton to="/issues">
          <FaArrowLeft /> Back to Issues
        </BackButton>

        <DetailCard>
          <Header>
            <h2>{currentIssue.data.title}</h2>
            <StatusBadge status={currentIssue.data.status} />
          </Header>

          <Meta>
            <MetaItem>
              <FaUser /> Reported by: {currentIssue.data.author?.email}
            </MetaItem>
            <MetaItem>
              Category: {currentIssue.data.category}{" "}
              {/* Direct string access */}
            </MetaItem>
            <MetaItem>
              <FaMapMarkerAlt /> Location: {currentIssue.data.location}
            </MetaItem>
            <MetaItem>
              <FaCalendarAlt /> Reported on:{" "}
              {formatDate(currentIssue.data.createdAt)}
            </MetaItem>
            <MetaItem>
              Coordinates: {currentIssue.data.latitude},{" "}
              {currentIssue.data.longitude}
            </MetaItem>
          </Meta>

          {/* <Meta>
          <MetaItem>
            <FaUser /> Reported by: {currentIssue.user?.name}
          </MetaItem>
          <MetaItem>
            Category: {currentIssue.category?.name}
          </MetaItem>
          <MetaItem>
            <FaMapMarkerAlt /> Location: {currentIssue.location}
          </MetaItem>
          <MetaItem>
            <FaCalendarAlt /> Reported on: {formatDate(currentIssue.createdAt)}
          </MetaItem>
        </Meta> */}

          {currentIssue.imageUrl && (
            <ImageContainer>
              <img
                src={currentIssue.data.imageUrl}
                alt={currentIssue.data.title}
              />
            </ImageContainer>
          )}

          <Description>
            <h3>Description</h3>
            <p>{currentIssue.data.description}</p>
          </Description>

          <Actions>
            <VoteButton onClick={handleVote} voted={hasVoted}>
              <FaThumbsUp /> {hasVoted ? "Remove Vote" : "Vote"} (
              {currentIssue.data.voteCount || 0})
            </VoteButton>
            {/* <VoteButton
              onClick={handleVote}
              disabled={hasVoted}
              voted={hasVoted}
            >
              <FaThumbsUp /> {hasVoted ? "Voted" : "Vote"} (
              {currentIssue.data.voteCount || 0})
            </VoteButton> */}

            {canEdit && (
              <>
                <Button onClick={handleEdit}>
                  <FaEdit /> Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  <FaTrash /> Delete
                </Button>
              </>
            )}
          </Actions>
        </DetailCard>
      </Container>

  );
};

const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const DetailCard = styled(Card)`
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    word-break: break-word;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 1.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Description = styled.div`
  margin-bottom: 1.5rem;

  h3 {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    line-height: 1.6;
    white-space: pre-wrap;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;


const VoteButton = styled(Button)`
  background-color: ${({ voted, theme }) => 
    voted ? theme.colors.success : theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${({ voted, theme }) => 
      voted ? theme.colors.successDark : theme.colors.primaryDark};
  }
`;
// const VoteButton = styled(Button)`
//   background-color: ${({ voted, theme }) =>
//     voted ? theme.colors.success : theme.colors.primary};

//   &:hover:not(:disabled) {
//     background-color: ${({ voted, theme }) =>
//       voted ? theme.colors.successDark : theme.colors.primaryDark};
//   }
// `;

export default IssueDetail;
