import { $msured, $white } from '../../assets/colors';

import { NavLink } from 'react-router-dom';
import React from 'react';

interface SendAlertButtonProps {
  onClick: () => void;
}

const SendAlertButton: React.FC<SendAlertButtonProps> = ({ onClick }) => {
  const buttonStyle = {
    backgroundColor: $white,
    color: $msured,
    borderColor: $msured,
    marginBottom: '0.5rem',
  };

  const buttonHoverStyle = {
    backgroundColor: $msured,
    color: $white,
  };

  const [style, setStyle] = React.useState(buttonStyle);

  const handleMouseOver = () => {
    setStyle({ ...buttonStyle, ...buttonHoverStyle });
  };

  const handleMouseOut = () => {
    setStyle(buttonStyle);
  };

  return (
    <NavLink
      to="/create"
      className="btn"
      style={style}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      Create/Delete Alert
    </NavLink>
  );
};

export default SendAlertButton;
