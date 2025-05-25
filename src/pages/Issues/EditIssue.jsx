import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchIssueDetails, 
  updateIssue,
  clearCurrentIssue
} from '../../features/issues/issuesSlice';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { Button, Input, Select, Textarea, Card, Loading } from '../../components/UI';
import { FaArrowLeft, FaUpload, FaTrash } from 'react-icons/fa';
import OuterContainer from '../../components/UI/OuterContainer';

const EditIssue = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentIssue, categories, loading } = useSelector((state) => state.issues);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    dispatch(fetchIssueDetails(id));

    return () => {
      dispatch(clearCurrentIssue());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentIssue) {
      setFormData({
        title: currentIssue.data.title,
        description: currentIssue.data.description,
        category: currentIssue.data.category?._id || '',
        location: currentIssue.data.location,
        imageUrl: null,
      });
      if (currentIssue.data.imageUrl) {
        setImagePreview(`${currentIssue.data.imageUrl}`);
      }
    }
  }, [currentIssue]);
console.log("current iseeu ",currentIssue)
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      setRemoveImage(false);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
    setImagePreview(null);
    setRemoveImage(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedData = { ...formData };
    if (removeImage) {
      updatedData.removeImage = true;
    }

    dispatch(updateIssue({ id, issueData: updatedData }))
      .unwrap()
      .then(() => {
        toast.success('Issue updated successfully');
        navigate(`/issues/${id}`);
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to update issue');
      });
  };

  if (loading || !currentIssue) {
    return <Loading />;
  }



  return (
    <OuterContainer>
    <Container>
      <BackButton onClick={() => navigate(`/issues/${id}`)}>
        <FaArrowLeft /> Back to Issue
      </BackButton>

      <FormCard>
        <h2>Edit Issue</h2>
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            placeholder="Detailed description of the issue..."
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Select>

          <Input
            type="text"
            name="location"
            placeholder="Location (e.g., Sector 15, Chandigarh)"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <ImageUpload>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <FaUpload /> {imagePreview ? 'Change Image' : 'Upload Image'}
            </label>
            
            {imagePreview && (
              <>
                <ImagePreview src={imagePreview} alt="Preview" />
                <RemoveImageButton type="button" onClick={handleRemoveImage}>
                  <FaTrash /> Remove Image
                </RemoveImageButton>
              </>
            )}
          </ImageUpload>

          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Issue'}
          </Button>
        </Form>
      </FormCard>
    </Container>
    </OuterContainer>
  );
};

// Reuse styled components from CreateIssue with some additions
const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const FormCard = styled(Card)`
  padding: 1.5rem;

  h2 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.colors.light};
    border-radius: ${({ theme }) => theme.radii.sm};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.border};
    }
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const RemoveImageButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.light};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerLight};
  }
`;

export default EditIssue;