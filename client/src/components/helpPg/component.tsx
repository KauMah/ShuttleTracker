import './DrawerDropdown.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { $black, $grey, $lightGrey, $white } from '../../assets/colors';

import DrawerDropdown from './DrawerDropdown';
import MsuNav from '../navBar';
import { css } from '@emotion/react';

const styles = {
  colLeft: {
    backgroundColor: $lightGrey,
    height: '100vh',
    marginTop: '98px',
  },
  colRight: {
    backgroundColor: $white,
    height: '100vh',
    marginTop: '98px',
  },
  header: css({
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  }),
  //title: css({}),
  dropdownMenu: css({
    //display: 'none',
    //position: 'absolute',
    backgroundColor: $white,
    boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
    padding: '12px 16px',
    zIndex: 1,
    //top: '100%',
    //left: '0',
    width: '100%',
  }),
};

const HelpPg = () => {
  return (
    <div>
      <MsuNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3" style={styles.colLeft}>
            <div css={styles.header}>
              <h1>Contacts</h1>
            </div>
            <h4>Shuttle Services</h4>
            <p>Location: 145 Clove Rd.</p>
            <p>Phone: 973-655-3326</p>
            <p>Fax: 973-655-4494</p>
            <p>Email: shuttle@montlcair.edu</p>
            <h4>Executive Director, Facilities Technology</h4>
            <p>John Bonin</p>
            <p>Location: 150 Clove Road</p>
            <p>Phone: 973-655-7868</p>
            <p>E-mail: boninj@montclair.edu</p>
            <h4>Supervisor, Shuttle Services</h4>
            <p>Cheryl Ofoha</p>
            <p>Location: 35 Clove Road</p>
            <p>Phone: 973-655-3326</p>
            <p>E-mail: lebertc@montclair.edu</p>
            <h4>Coordinator, Commuter Life</h4>
            <p>Antonio Talamo</p>
            <p>Phone: 973-655-3377</p>
            <p>E-mail: talamoa@montclair.edu</p>
          </div>
          <div className="col-9" style={styles.colRight}>
            <div css={styles.header}>
              <h1>FAQ</h1>
            </div>
            <div className="drawerContiner">
              <DrawerDropdown title="Q. How often do the buses run?">
                <p>A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.</p>
              </DrawerDropdown>
            </div>
            <div>
              <DrawerDropdown title="Q. How can I track the bus in real-time?">
                <p>A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.</p>
              </DrawerDropdown>
            </div>
            <div>
              <DrawerDropdown title="Q. Are there any restrictions on items or pets that can be brought onto the shuttle buses?">
                <p>
                  A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed the usual
                  6:00AM-1:00AM on weekdays.
                </p>
              </DrawerDropdown>
            </div>
            <div className="drawerContiner">
              <DrawerDropdown title="Q. How  accessible are the shuttle buses for individuals with disabilities?">
                <p>A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.</p>
              </DrawerDropdown>
            </div>
            <div>
              <DrawerDropdown title="Q. Can non-students or non-faculty members use the shuttle system?">
                <p>A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.</p>
              </DrawerDropdown>
            </div>
            <div>
              <DrawerDropdown title="Q. Can a student or faculty member bring a visitor?">
                <p>
                  A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed the usual
                  6:00AM-1:00AM on weekdays.
                </p>
              </DrawerDropdown>
            </div>
            <div className="drawerContiner">
              <DrawerDropdown title="Q. What should I do if I left something on the shuttle?">
                <p>A. Every 8-15 mintues during peak ours, and every 20-30 mintues during off peak hours.</p>
              </DrawerDropdown>
            </div>
            <div>
              <DrawerDropdown title="Q. How can I provide feedback or report an issue with the shuttle service?">
                <p>A. Navigate to the shuttle info page, find your shuttle, and you will see the information there.</p>
              </DrawerDropdown>
            </div>
            <div>
              <DrawerDropdown title="Q. Does the shuttle operate on weekends?">
                <p>
                  A. Yes! On weekends however, the shuttle operates from 8:00AM-1:00AM as opposed the usual
                  6:00AM-1:00AM on weekdays.
                </p>
              </DrawerDropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HelpPg;

// import { IoIosArrowDown } from 'react-icons/io';
// import { RiArrowDropDownLine } from 'react-icons/ri';
// import { css } from '@emotion/react';
// import { dropdownStyles } from './DrawerStyles';
// import { useState } from 'react';

// interface DrawerDropdownProps {
//   items: string[];
// }

// export const DrawerDropdown: React.FC<DrawerDropdownProps> = ({ items }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={dropdownStyles.container}>
//       <button className={dropdownStyles.button} onClick={toggleDropdown}>
//         Dropdown
//         {isOpen ? <IoIosArrowDown /> : <RiArrowDropDownLine />}
//       </button>
//       {isOpen && (
//         <ul className={dropdownStyles.dropdown}>
//           {items.map((item) => (
//             <li key={item} className={dropdownStyles.item}>
//               {item}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
