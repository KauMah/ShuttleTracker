import React from 'react';
import { css } from '@emotion/react';

const styles = {
  header: css({
    transition: 'background-color 0.5s',
    '&:hover': {
      backgroundColor: '#389723',
    },
  }),
};

function App() {
  return (
    <div className="App">
      <h1 css={styles.header}>Hello World</h1>
    </div>
  );
}

export default App;
