import AdminPanelBox from './adminPanelBox';
import Navbar from '../navBar';
import SendAlertButton from './sendAlertButton';

const ShuttleInfo = () => {
  const handleSendAlert = () => {
    console.log('Alert sent');
    // We still need to implement our alert sending logic here
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <SendAlertButton onClick={handleSendAlert} />
          </div>
        </div>
        <div className="row">
          <AdminPanelBox title="Box 1" content="Content for Box 1." />
          <AdminPanelBox title="Box 2" content="Content for Box 2." />
          <AdminPanelBox title="Box 3" content="Content for Box 3." />
        </div>
      </div>
    </>
  );
};
export default ShuttleInfo;
