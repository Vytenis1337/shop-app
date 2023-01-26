import './Home.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='home-bg'>
      {' '}
      <div className='home-content'>
        <h1 className='home-title'>E-Shop</h1>
        <p>This is a Ecommerce Shop simulation.</p>
        <Link className='home-button' to='/store'>
          Go to Store
        </Link>
      </div>
    </div>
  );
};
