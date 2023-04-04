import './DrawerDropdown.css';

import React, { useState } from 'react';

import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface DrawerDropdownProps {
  title: string;
  children: React.ReactNode;
}
const DrawerDropdown = ({ title, children }: DrawerDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <Dropdown show={isOpen} onToggle={toggleDrawer}>
      <Dropdown.Toggle variant="none" id="dropdown-custom-components" className="drawer-toggle-btn">
        <FontAwesomeIcon icon={faBars} />
        <span>{title}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </Dropdown>
  );
};

export default DrawerDropdown;
