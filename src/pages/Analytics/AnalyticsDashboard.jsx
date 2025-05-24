import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchCategoryAnalytics,
  fetchSubmissionAnalytics,
  fetchMostVotedAnalytics
} from '../../features/analytics/analyticsSlice';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement 
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { Card, Loading } from '../../components/UI';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const { 
    categoryData, 
    submissionData, 
    mostVotedData, 
    loading 
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchCategoryAnalytics());
    dispatch(fetchSubmissionAnalytics());
    dispatch(fetchMostVotedAnalytics());
  }, [dispatch]);

  if (loading && (!categoryData.length || !submissionData.length || !mostVotedData.length)) {
    return <Loading />;
  }

  // Prepare data for charts
  const categoryChartData = {
    labels: categoryData.map(item => item._id),
    datasets: [
      {
        data: categoryData.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const submissionChartData = {
    labels: submissionData.map(item => new Date(item._id).toLocaleDateString()),
    datasets: [
      {
        label: 'Issues Reported',
        data: submissionData.map(item => item.count),
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.1,
      },
    ],
  };

  const mostVotedChartData = {
    labels: mostVotedData.map(item => item._id),
    datasets: [
      {
        label: 'Most Voted Issues',
        data: mostVotedData.map(item => item.maxVotes),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <h2>Analytics Dashboard</h2>
      
      <ChartsGrid>
        <ChartCard>
          <h3>Issues by Category</h3>
          <ChartContainer>
            <Pie data={categoryChartData} />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <h3>Daily Submissions (Last 7 Days)</h3>
          <ChartContainer>
            <Line data={submissionChartData} />
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <h3>Most Voted Issues by Category</h3>
          <ChartContainer>
            <Bar 
              data={mostVotedChartData} 
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </ChartContainer>
        </ChartCard>
      </ChartsGrid>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;

  h2 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ChartCard = styled(Card)`
  padding: 1rem;

  h3 {
    margin-top: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1rem;
    text-align: center;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
`;

export default AnalyticsDashboard;