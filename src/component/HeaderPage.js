import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../reduxstore/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const HeaderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);

  const handleLogout = () => {
    dispatch(clearToken());
    navigate('/login');
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
      <div>
        <FontAwesomeIcon icon={faHome} onClick={() => navigate('/home')} className="me-2" size="2x" />
      </div>
      <h1 className="m-0 flex-grow-1 text-center">Movies-App</h1>
      {token && (
        <button 
          onClick={handleLogout} 
          className="btn btn-light position-absolute top-0 end-0 m-3"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default HeaderPage;