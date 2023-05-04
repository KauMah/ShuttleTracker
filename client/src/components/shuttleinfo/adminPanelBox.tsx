import { $msured, $white } from '../../assets/colors';
import React, { useEffect, useState } from 'react';

interface AdminPanelBoxProps {
  options: {
    title: string;
    content: {
      id: string;
      text: string | JSX.Element;
    }[];
  }[];
  showSelect?: boolean;
  children?: React.ReactNode;
}

const AdminPanelBox: React.FC<AdminPanelBoxProps> = ({ options, showSelect = true, children }) => {
  const [selectedOption, setSelectedOption] = useState(options.length > 0 ? options[0] : { title: '', content: [] });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = event.target.value;
    const newSelectedOption = options.find((option) => option.title === selectedTitle);
    if (newSelectedOption) {
      setSelectedOption(newSelectedOption);
    }
  };

  useEffect(() => {
    if (options.length > 0) {
      setSelectedOption(options[0]);
    }
  }, [options]);

  const cardStyle = {
    backgroundColor: $white,
    borderColor: $msured,
  };

  const textStyle = {
    color: $msured,
  };

  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card mb-3" style={cardStyle}>
        <div className="card-body justifyContent: space-between">
          {showSelect ? (
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
          ) : (
            <h5 className="mb-2" style={textStyle}>
              {selectedOption.title}
            </h5>
          )}
          {children}
          <ol>
            {selectedOption.content.length > 0 &&
              selectedOption.content.map((item) => (
                <li key={item.id} style={textStyle}>
                  {item.text}
                </li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBox;
