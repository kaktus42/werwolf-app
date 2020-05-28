import React from 'react';
import RolePicker from './RolePicker';
import { Fab, Icon } from 'react-onsenui';

const pStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.6,
};

interface PreparationProps {
  roleCounts: { [key: string]: number }
  addRole(role: string): void
  removeRole(role: string): void
  endPreparation(): void
}

function Preparation(props: PreparationProps) {
  return (
    <>
      <p style={pStyle}>
        Dein Dorf hat <span id="total_cnt">{0}</span> Einwohner
      </p>
      <RolePicker
        roleCounts={props.roleCounts}
        removeRole={props.removeRole}
        addRole={props.addRole}
      />
      <Fab position="bottom right" onClick={props.endPreparation}><Icon icon='fa-play' /></Fab>
    </>
  );
}

export default Preparation;
