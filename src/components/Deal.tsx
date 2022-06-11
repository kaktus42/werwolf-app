import { connect, ConnectedProps } from 'react-redux'
import { Fab, Icon, Button, Row, Col, Page } from 'react-onsenui';

import { currentRoleToggleVisibility, dealNextRole } from '../reducers/game'
import { navTo } from '../reducers/ui'
import Toolbar from './Toolbar';

import styles from './Deal.module.css';

function mapStateToProps(state: RootState) {
  let { activeRoleIdx, roleIsVisible, roleWasVisible } = state.game.deal
  let availableRoles = state.game.availableRoles
  let players = state.game.players
  let nextButtonDisabled = roleIsVisible || !roleWasVisible || activeRoleIdx >= players.length - 1
  let playButtonDisabled = roleIsVisible || !roleWasVisible || activeRoleIdx < players.length - 1
  return {
    playerNr: activeRoleIdx + 1,
    roleIsVisible,
    nextButtonDisabled,
    playButtonDisabled,
    roleText: availableRoles[players[activeRoleIdx].role],
  }
}

const mapDispatch = { currentRoleToggleVisibility, dealNextRole, navTo }
const connector = connect(mapStateToProps, mapDispatch)


type DealProps = ConnectedProps<typeof connector>

const Deal = ({
  navTo,
  playerNr, roleIsVisible, nextButtonDisabled, playButtonDisabled, roleText,
  currentRoleToggleVisibility, dealNextRole,
}: DealProps) => (
  <Page
    renderToolbar={() => (<Toolbar />)}
    renderFixed={() =>
      <div>
        <Fab position="bottom left" onClick={() => navTo('prepare')}><Icon icon='fa-undo' /></Fab>
        <Fab position="bottom right" onClick={() => navTo('play')} disabled={playButtonDisabled}><Icon icon='fa-play' /></Fab>
      </div>
    }
  >
    <Row>
      <Col width="50%">
        <Button
          onClick={() => currentRoleToggleVisibility()}
          className={styles.fatButton + " " + (roleIsVisible ? styles.red : styles.green)}
        >
          Rolle<br />{roleIsVisible ? 'verstecken' : 'anzeigen'}
        </Button>
      </Col>
      <Col width="50%">
        <Button
          onClick={() => dealNextRole()}
          className={styles.fatButton}
          disabled={nextButtonDisabled}
        >
          Nächste<br />Rolle
        </Button>
      </Col>
    </Row>

    <div className={styles.h20pc}></div>
    <div id="info_area">
      <p hidden={roleIsVisible} className="center">
        Rolle für Spieler #{playerNr} ist versteckt
      </p>
      <p hidden={!roleIsVisible} className="center">
        Du bist<br /><br />
        <span className={styles.roletext}>{roleText}</span>
      </p>
    </div>
  </Page >
)
export default connector(Deal);
