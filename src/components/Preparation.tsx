import React from 'react';
import RolePicker from './RolePicker';

//import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';

const pStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.6,
};

function Preparation() {
  return (
    <>
      <p style={pStyle}>
        Dein Dorf hat <span id="total_cnt">0</span> Einwohner
      </p>
      <RolePicker />
    </>
  );
}


export default Preparation;
