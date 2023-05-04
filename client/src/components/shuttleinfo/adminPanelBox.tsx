import { $red, $white } from '../../assets/colors';
import React, { useState } from 'react';

interface AdminPanelBoxProps {
  options: { title: string; content: string[] }[];
}

const AdminPanelBox: React.FC<AdminPanelBoxProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = event.target.value;
    const newSelectedOption = options.find((option) => option.title === selectedTitle);
    if (newSelectedOption) {
      setSelectedOption(newSelectedOption);
    }
  };

  const cardStyle = {
    backgroundColor: $white,
    borderColor: $red,
  };

  const textStyle = {
    color: $red,
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card mb-3" style={cardStyle}>
        <div className="card-body">
          <select
            value={selectedOption.title}
            onChange={handleSelectChange}
            className="form-select mb-2"
            style={textStyle}
          >
            {options.map((option, index) => (
              <option key={index} value={option.title}>
                {option.title}
              </option>
            ))}
          </select>
          {selectedOption.content.map((text, index) => (
            <React.Fragment key={index}>
              <span style={textStyle}>
                {index + 1}. {text}
              </span>
              {index < selectedOption.content.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBox;
