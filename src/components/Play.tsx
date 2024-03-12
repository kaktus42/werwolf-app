import React from 'react'
import { Fab, Icon, Page, List, ListItem, AlertDialog, Button } from 'react-onsenui';
import { connect, ConnectedProps } from 'react-redux'

import { togglePlayerAlive, fullReset } from '../reducers/game'
import { navTo } from '../reducers/ui'
import Toolbar from './Toolbar';


const mapStateToProps = (state: RootState) => ({ players: state.game.players, availableRoles: state.game.availableRoles })
const mapDispatch = { togglePlayerAlive, fullReset, navTo }
const connector = connect(mapStateToProps, mapDispatch)


const pStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.6,
};

type PlayProps = ConnectedProps<typeof connector>
type PlayState = { endAlertIsOpen: boolean }

class Play extends React.Component<PlayProps, PlayState> {
  constructor(props: PlayProps) {
    super(props)
    this.state = { endAlertIsOpen: false }
  }

  endGameOk() {
    this.setState({ endAlertIsOpen: false });
    this.props.fullReset();
    this.props.navTo('prepare');
  }

  endGameCancel() {
    this.setState({ endAlertIsOpen: false });
  }

  render() {
    let { players, togglePlayerAlive } = this.props
    let { endAlertIsOpen } = this.state
    return (
      <Page
        renderToolbar={() => (<Toolbar />)}
        renderFixed={() =>
          <div>
            <Fab position="bottom left" onClick={() => this.setState({ endAlertIsOpen: true })}><Icon icon='fa-undo' /></Fab>
          </div>
        }
      >

        <p style={pStyle}>
          Dein Dorf hat <span id="total_cnt">{countAlivePlayers(players)} von {players.length}</span> Einwohnern
        </p>
        <div className="scrollable_content">
          <List
            dataSource={players}
            renderRow={(player: Player, playerID: number) => (
              <ListItem key={playerID} className={'player' + (!player.alive ? ' isDead' : '')}>
                <div>
                  {playerID + 1}: {this.props.availableRoles[player.role]}
                </div>
                <div>
                  <button onClick={() => togglePlayerAlive(playerID)} className=" button button--outline">
                    <Icon icon={player.alive ? 'skull-crossbones' : 'medkit'} />
                  </button>
                </div>
              </ListItem>
            )}
          />
        </div>


        <AlertDialog isOpen={endAlertIsOpen} isCancelable={true} onCancel={this.endGameCancel.bind(this)}>
          <div className="alert-dialog-title">Warnung!</div>
          <div className="alert-dialog-content">
            Soll das aktuelle Spiel wirklich beendet werden?
          </div>
          <div className="alert-dialog-footer flex">
            <Button onClick={this.endGameOk.bind(this)} className="alert-dialog-button">
              Ja
            </Button>
            <Button onClick={this.endGameCancel.bind(this)} className="alert-dialog-button">
              Nein
            </Button>
          </div>
        </AlertDialog>
      </Page>
    );
  }
}

const countAlivePlayers = (players: Player[]) => players.reduce((c, p) => c + (p.alive ? 1 : 0), 0)

export default connector(Play);
