import { $red } from '../../assets/colors';
import AdminPanelBox from './adminPanelBox';
import MsuNav from '../navBar';
import SendAlertButton from './sendAlertButton';

const ShuttleInfo = () => {
  const handleSendAlert = () => {
    console.log('Alert sent');
    // We still need to implement our alert sending logic here !!
  };

  const box1Options = [
    {
      title: 'Current Routes',
      content: ['A-C, E, F-I', 'A-F', 'F-I', 'A-I'],
    },
  ];

  const box2Options = [
    {
      title: 'Current Buses',
      content: ['Bus 235326 (Route 1)', 'Bus 133766 (Route 2)', 'Bus 424242 (Route 3)', 'Bus 444222 (Route 4)'],
    },
    {
      title: 'Available Stops',
      content: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    },
  ];

  const box3Options = [
    {
      title: 'Bus Operators',
      content: ['Lucian (Bus 235326)', 'Varus (Bus 133766)', 'Ashe (Bus 424242)', 'Lulu (Bus 444222)'],
    },
    {
      title: 'Admins',
      content: ['Bryson', 'Nazia', 'Kaushik', 'Dennis', 'Nick'],
    },
  ];

  const currentViewTextStyle = {
    fontSize: '1.25rem',
    color: $red,
  };

  const mainContainerStyle = {
    marginTop: '6.5rem',
  };

  return (
    <>
      <MsuNav />
      <div className="container" style={mainContainerStyle}>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <p style={currentViewTextStyle}>Current View: Admin</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <SendAlertButton onClick={handleSendAlert} />
          </div>
        </div>
        <div className="row">
          <AdminPanelBox options={box1Options} />
          <AdminPanelBox options={box2Options} />
          <AdminPanelBox options={box3Options} />
        </div>
      </div>
    </>
  );
};
export default ShuttleInfo;
