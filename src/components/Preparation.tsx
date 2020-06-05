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
  resetRoles(): void
}

function Preparation(props: PreparationProps) {
  return (
    <>
      <p style={pStyle}>
        Dein Dorf hat <span id="total_cnt">{totalNumberOfRolesInGame(props.roleCounts)}</span> Einwohner
      </p>
      <RolePicker
        roleCounts={props.roleCounts}
        removeRole={props.removeRole}
        addRole={props.addRole}
      />
      <Fab position="bottom left" onClick={props.resetRoles}><Icon icon='fa-undo' /></Fab>
      <Fab position="bottom right" onClick={props.endPreparation} disabled={totalNumberOfRolesInGame(props.roleCounts) === 0}><Icon icon='fa-play' /></Fab>
    </>
  );
}

const totalNumberOfRolesInGame = (roleCounts: { [key: string]: number }) => Object.values(roleCounts).reduce((a,c) => a + c)

export default Preparation;
