// import { Link } from "react-router-dom"
// import { useLogout } from "../hooks/useLogout"
// import { useAuthContext } from "../hooks/useAuthContext"
// import '../index.css';

// const Navbar = () => {

//     const { logout } = useLogout()
//     const { user } = useAuthContext()

//     const handleclick = () => {
//         logout()
//     }

//     return (
//         <header>
//             <div className="container">
//                 <Link to = "/">
//                 <button className="custom-button">
//   <h2>  MY COURSES </h2>
// </button>

//                 </Link>

//                 <nav>
//                     {user && (
//                     <div>
//                         <div>
//                             <span>{user.email.split('@')[[0]]}</span>
//                             <button onClick={handleclick}>Log out</button>
//                         </div>
//                     </div>
//                     )}

//                     {!user && (
//                     <div>
//                         <div>
//                             <Link to = "/login"><button class="border-magic-button">
//   <span class="border-magic-gradient"></span>
//   <span class="border-magic-text">
//     Login
//   </span>
// </button></Link>
//                             <Link to = "/signup"><button class="border-magic-button">
//   <span class="border-magic-gradient"></span>
//   <span class="border-magic-text">
//     Sign Up
//   </span>
// </button></Link>
//                         </div>
//                     </div>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     )
// }

// export default Navbar
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "../index.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleclick = () => {
    logout();
  };

  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/">
          <button className="logo-button">
            <h2>MY COURSES</h2>
          </button>
        </Link>

        <nav className="navbar-links">
          {user ? (
            <div className="navbar-user">
              <span className="user-email">{user.email.split("@")[0]}</span>
              <button className="logout-button" onClick={handleclick}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <button className="border-magic-button">
                  <span className="border-magic-gradient"></span>
                  <span className="border-magic-text">Login</span>
                </button>
              </Link>
              <Link to="/signup">
                <button className="border-magic-button">
                  <span className="border-magic-gradient"></span>
                  <span className="border-magic-text">Sign Up</span>
                </button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
