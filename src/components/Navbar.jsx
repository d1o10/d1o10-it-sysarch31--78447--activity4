import { Link } from "react-router-dom";
function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <nav className="navbar">
      <div className="container">
        <label className="logo font-poppins">Api + React</label>
        <ul className="nav-links">
          <li>
            <Link to="/products" className="font-poppins">
              Products
            </Link>
          </li>
          <li>
            <Link to="/orders" className="font-poppins">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/" onClick={handleLogout} className="font-poppins">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
