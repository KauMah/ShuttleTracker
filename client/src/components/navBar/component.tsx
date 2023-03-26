import { $black, $grey, $red } from '../../assets/colors';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';

const styles = {
  background: {
    backgroundColor: $red,
    height: '25vh',

    padding: '30px',
  },
  title: {},
  links: {
    // color: $black,
    fontSize: 20,
    padding: '10px',
  },
};

const Navbar = () => {
  return (
    <nav className="container">
      <div className="row">
        <div className="col w-100" style={styles.background}>
          <div className="d-flex justify-content-end">
            <NavLink to="/home" style={styles.links}>
              Home
            </NavLink>
            <NavLink to="/shuttle info" style={styles.links}>
              View Shuttle Info
            </NavLink>
            <NavLink to="/help" style={styles.links}>
              Help
            </NavLink>
            <NavLink to="/account" style={styles.links}>
              Account
            </NavLink>
            <NavLink to="/logout" style={styles.links}>
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

// const HelpPg = () => {
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-4" style={styles.colLeft}></div>
//         <div className="col-8" style={styles.colRight}></div>
//       </div>
//     </div>
