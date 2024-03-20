import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

import { useSelector } from 'react-redux';
import axios from 'axios';
import API_ENDPOINTS from '../Config';

const TopMovies = () => {
    const token = useSelector(state => state.auth.token);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.TOP_MOVIES, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMovies(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMovies();
    }, [token]);

    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 10;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleShowDetails = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClose = () => {
        setSelectedMovie(null);
    };

    const handleAddToFavorites = async (movie) => {
        try {
            const response = await fetch(API_ENDPOINTS.FAVORITE_MOVIES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(movie)
            });

            if (response.status === 409) {
                throw new Error('Movie already added to favorites');
              }

            if (!response.ok) {
                throw new Error('Failed to add movie to favorites');
            }

            alert('Movie added to favorites');
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="mt-4">
            {currentMovies.map(movie => (
                <div key={movie.id} className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-outline-primary" onClick={() => handleShowDetails(movie)}>{movie.title}</button>
                    <button className="btn btn-primary" onClick={() => handleAddToFavorites(movie)}>Add to Favorites</button>
                </div>
            ))}
            <div className="d-flex justify-content-center">
                {[...Array(Math.ceil(movies.length / moviesPerPage)).keys()].map(number => (
                    <button key={number} onClick={() => paginate(number + 1)} className="btn btn-link">
                        {number + 1}
                    </button>
                ))}
            </div>
            {selectedMovie && (
                <Modal show={selectedMovie !== null} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedMovie.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selectedMovie.image} alt={selectedMovie.title} className="img-fluid mb-3" />
                        <p><strong>Rank:</strong> {selectedMovie.rank}</p>
                        <p><strong>Rating:</strong> {selectedMovie.rating}</p>
                        <p><strong>Year:</strong> {selectedMovie.year}</p>
                        <p><strong>Description:</strong> {selectedMovie.description}</p>
                        <p><strong>Genre:</strong> {selectedMovie.genre.join(', ')}</p>
                        <p><strong>IMDB ID:</strong> {selectedMovie.imdbid}</p>
                        <a href={selectedMovie.imdb_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View on IMDB</a>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default TopMovies;

