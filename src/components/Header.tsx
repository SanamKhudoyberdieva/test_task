import { FaStar } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="ss-header">
      <div className="container">
        <h1>
          <FaStar className="ss-header-icon" />
            Star Wars Heroes
          <FaStar className="ss-header-icon" />
        </h1>
      </div>
    </header>
  );
};

export default Header;