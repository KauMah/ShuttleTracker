import { $grey, $red, $white } from '../../assets/colors';

import React from 'react';

//import { css } from '@emotion/react';

const styles = {
  background: {
    backgroundColor: $grey,
    height: '50vh',
    width: '100vw',
  },
  background2: {
    backgroundColor: $red,
    height: '50vh',
    width: '100vw',
  },
};
// const HelpPg = () => {
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-6">jaja</div>
//         <div className="col-6">lalalal</div>
//       </div>
//     </div>
//   );
// };
const HelpPg = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div style={styles.background}></div>
        </div>
        <div className="col">
          <div style={styles.background2}></div>
        </div>
      </div>
    </div>
  );
};
// const HelpPg = () => {
//   return (
//     <div style={styles.background}>
//       <h1 css={styles.title}>MSU</h1>
//       <div style={styles.container} className="container-"></div>
//     </div>
//   );
// };
export default HelpPg;
