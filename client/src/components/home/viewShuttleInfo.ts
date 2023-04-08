import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';

import React, { useState } from 'react';

import GridLayout from 'react-grid-layout';

const Home = ({ }) => {
  const [tiles, setTiles] = useState([
    { i: 'a', x: 0, y: 0, w: 1, h: 1, content: 'Tile A' },
    { i: 'b', x: 1, y: 0, w: 1, h: 1, content: 'Tile B' },
    { i: 'c', x: 2, y: 0, w: 1, h: 1, content: 'Tile C' },
  ]);

  const handleTileChange = (newLayout: React.SetStateAction<{ i: string; x: number; y: number; w: number; h: number; content: string; }[]>) => {
    setTiles(newLayout);
  };

  return (
    //<>
      //<div>My Dashboard</div>
      // <GridLayout
      //   className="layout"
      //   layout={tiles}
      //   cols={3}
      //   rowHeight={100}
      //   width={1200}
      //   onLayoutChange={handleTileChange}
      // >
      //   {tiles.map((tile) => (
      //     <div key={tile.i} className="tile">
      //       {tile.content}
      //     </div>
      //   ))}
      // </GridLayout>
    //</>
  );
};
export default Home;
