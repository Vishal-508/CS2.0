import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createIssue } from '../../features/issues/issuesSlice';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';
import { Button, Input, Select, Textarea, Card, Loading } from '../../components/UI';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import OuterContainer from '../../components/UI/OuterContainer';

const CreateIssue = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, loading } = useSelector((state) => state.issues);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

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

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    dispatch(createIssue(formData))
      .unwrap()
      .then(() => {
        toast.success('Issue created successfully');
        navigate('/issues');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to create issue');
      });
  };

  if (loading && !categories.length) {
    return <Loading />;
  }

  return (
    <OuterContainer>
    <Container>
      <BackButton onClick={() => navigate('/issues')}>
        <FaArrowLeft /> Back to Issues
      </BackButton>

      <FormCard>
        <h2>Report a New Issue</h2>
        
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
              <FaUpload /> Upload Image (Optional)
            </label>
            {imagePreview && (
              <ImagePreview src={imagePreview} alt="Preview" />
            )}
          </ImageUpload>

          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Issue'}
          </Button>
        </Form>
      </FormCard>
    </Container>
    </OuterContainer>
  );
};

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

export default CreateIssue;