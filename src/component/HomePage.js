import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleTopMoviesClick = () => {
    console.log('Top Movies clicked');
    navigate('/top-movies');
  };

  const handleFavoriteMoviesClick = () => {
    navigate('/favorite-movies');
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <h1>Welcome to Movie App</h1>
      <Button variant="primary" className="mt-3" onClick={handleTopMoviesClick}>
        Top 100 Movies
      </Button>
      <Button variant="secondary" className="mt-3" onClick={handleFavoriteMoviesClick}>
        My Favorite Movies
      </Button>
    </Container>
  );
}

export default HomePage;