import React from 'react';

interface AdminPanelBoxProps {
  title: string;
  content: string;
}

const AdminPanelBox: React.FC<AdminPanelBoxProps> = ({ title, content }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelBox;
