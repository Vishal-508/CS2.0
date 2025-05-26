import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchIssues,
  setFilters,
  setPagination,
} from "../../features/issues/issuesSlice";
// import { toast } from 'react-hot-toast';
import styled from "styled-components";
import {
  Button,
  Card,
  Input,
  Select,
  Pagination,
  IssueCard,
  Loading,
} from "../../components/UI/index";
import { FaSearch, FaPlus, FaFilter, FaTimes } from "react-icons/fa";
import OuterContainer from "../../components/UI/OuterContainer";

const IssueList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issues, loading, pagination, filters } = useSelector(
    (state) => state.issues
  );
  const [searchTerm, setSearchTerm] = useState(filters.search);
  console.log("issues", issues);
  useEffect(() => {
    dispatch(
      fetchIssues({
        page: pagination.page,
        limit: pagination.limit,
        search: filters.search,
        category: filters.category,
        status: filters.status,
        sort: filters.sort,
      })
    );
  }, [dispatch, pagination.page, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
  };

  const handleFilterChange = (name, value) => {
    const cleanedValue = value === "" ? undefined : value;
    dispatch(setFilters({ [name]: cleanedValue }));
    dispatch(setPagination({ page: 1 }));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    dispatch(
      setFilters({
        search: "",
        category: "",
        status: "",
        sort: "-1",
      })
    );
    dispatch(setPagination({ page: 1 }));
  };

  const handlePageChange = (page) => {
    dispatch(setPagination({ page }));
  };

  const handleCreateIssue = () => {
    navigate("/issues/create");
  };

  return (
    <Container>
      <Header>
        <h2>Community Issues</h2>
        <HeaderButtons>
          {/* <Button 
              as={Link} 
              to="/myissue" 
              variant="outline"
            >
              My Issues
            </Button> */}
          <Button onClick={handleCreateIssue}>
            <FaPlus /> Report Issue
          </Button>
        </HeaderButtons>
      </Header>

      <Filters>
        <SearchForm onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">
            <FaSearch />
          </Button>
        </SearchForm>

        <FilterGroup>
          <Select
            value={filters.category || ""}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </Select>

          <Select
            value={filters.status || ""}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </Select>

          <Select
            value={filters.sort}
            onChange={(e) => handleFilterChange("sort", e.target.value)}
          >
            <option value="-createdAt">Newest First</option>
            <option value="-votes">Most Voted</option>
          </Select>
        </FilterGroup>

        <FilterActions>
          <Button
            onClick={handleClearFilters}
            variant="outline"
            disabled={!Object.values(filters).some(Boolean)}
          >
            <FaTimes /> Clear Filters
          </Button>
        </FilterActions>
      </Filters>

      {loading ? (
        <Loading />
      ) : !issues || issues.length === 0 ? (
        <EmptyState>
          <p>No issues found. Be the first to report one!</p>
        </EmptyState>
      ) : (
        <>
          <IssueGrid>
            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={{
                  ...issue,
                  votes: issue.voteCount,
                  user: issue.author,
                }}
              />
            ))}
          </IssueGrid>

          <PaginationContainer>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </PaginationContainer>
        </>
      )}
    </Container>
  );
};

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
    @media (max-width: 650) {
      font-size: 0.875rem;
    }
  }
`;

const Filters = styled.div`
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.light};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.md};
`;

const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  //   color:grey;
  select {
    flex: 1;
    min-width: 150px;
  }
`;

const IssueGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

export default IssueList;

{
  /* {loading ? (
        <Loading />
      ) : issues.length === 0 ? (
        <EmptyState>
          <p>No issues found. Be the first to report one!</p>
        </EmptyState>
      ) : (
        <>
          <IssueGrid>
            {issues.map((issue) => (
              <IssueCard key={issue._id} issue={issue} />
            ))}
          </IssueGrid>

          <PaginationContainer>
            <Pagination
              currentPage={pagination.page}
              totalPages={Math.ceil(pagination.total / pagination.limit)}
              onPageChange={handlePageChange}
            />
          </PaginationContainer>
        </>
      )} */
}

{
  /* <FilterGroup>
          <Select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
             <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
            {/* {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))} */
}
{
  /* </Select>

          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </Select>

          <Select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
          >
            <option value="-1">Newest First</option>
            <option value="1">Most Voted</option>
          </Select>
        </FilterGroup> */
}
