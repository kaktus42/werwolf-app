import React from 'react'
import { Fab, Icon, Page } from 'react-onsenui';
import { connect, ConnectedProps } from 'react-redux'

import RolePicker from './RolePicker';
import { resetRoles, dealRoles } from '../reducers/game'
import { navTo } from '../reducers/ui'
import Toolbar from './Toolbar';


function mapStateToProps(state: RootState) {
  return {
    roleCount: totalNumberOfRolesInGame(state.game.pickedRoles),
  }
}

const mapDispatch = { resetRoles, dealRoles, navTo }
const connector = connect(mapStateToProps, mapDispatch)


const pStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.6,
};

type PreparationProps = ConnectedProps<typeof connector>

const Preparation = ({ roleCount, resetRoles, dealRoles, navTo }: PreparationProps) => (
  <Page
    renderToolbar={() => (<Toolbar />)}
    renderFixed={() =>
      <div>
        <Fab position="bottom left" onClick={() => resetRoles()}><Icon icon='fa-undo' /></Fab>
        <Fab position="bottom right" onClick={() => { dealRoles(); navTo('deal') }} disabled={roleCount === 0}><Icon icon='fa-play' /></Fab>
      </div>
    }
  >
    <p style={pStyle}>
      Dein Dorf hat <span id="total_cnt">{roleCount}</span> Einwohner
    </p>
    <div className="scrollable_content"><RolePicker /></div>
  </Page>
);
export default connector(Preparation);

const totalNumberOfRolesInGame = (pickedRoles: GameState["pickedRoles"]) => Object.values(pickedRoles).reduce((a, c) => a + c)
