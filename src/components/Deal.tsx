import React from 'react';

import { Fab, Icon, Button, Row, Col, Page } from 'react-onsenui';

import { availableRoles } from '../config'

import styles from './Deal.module.css';

interface DealProps {
  roleCounts: { [key: string]: number }
  addRole(role: string): void
  removeRole(role: string): void
  navBack(): void
  renderToolbar(): void
}



interface DealState {
  leftRoles: string[]
  currentRole: string
  playerNr: number

  roleWasShown: boolean
  roleVisible: boolean
}

class Deal extends React.Component<DealProps, DealState> {
  constructor(props: any) {
    super(props);

    let counts = this.props.roleCounts
    let allRoles: string[] = []
    for (let role in counts) {
      for (let i = 0; i < counts[role]; i++) {
        allRoles.push(availableRoles[role])
      }
    }

    let { chosen: currentRole, leftRoles } = chooseRandom(allRoles)

    let state: DealState = {
      leftRoles,
      currentRole,
      playerNr: 1,

      roleWasShown: false,
      roleVisible: false,
    };

    this.state = state;
  }

  toggleRoleView() {
    this.setState(state => ({ roleVisible: !state.roleVisible, roleWasShown: true }))
  }

  pickNext() {
    this.setState(state => {
      let { chosen: currentRole, leftRoles } = chooseRandom(this.state.leftRoles)

      return {
        leftRoles,
        currentRole,
        playerNr: this.state.playerNr + 1,
        roleWasShown: false,
      }
    });
  }

  render() {
    return (
      <Page
        renderToolbar={this.props.renderToolbar}
      >
        <Row>
          <Col width="50%">
            <Button
              onClick={this.toggleRoleView.bind(this)}
              className={styles.fatButton + " " + (this.state.roleVisible ? styles.red : styles.green)}
            >
              Rolle<br />anzeigen
            </Button>
          </Col>
          <Col width="50%">
            <Button
              onClick={this.pickNext.bind(this)}
              className={styles.fatButton}
              disabled={!this.state.roleWasShown || this.state.leftRoles.length === 0 || this.state.roleVisible}
            >
              Nächste<br />Rolle
            </Button>
          </Col>
        </Row>

        <div className={styles.h20pc}></div>
        <div id="info_area">
          <p hidden={this.state.roleVisible} className="center">
            Rolle für Spieler #{this.state.playerNr} ist versteckt
            </p>
          <p hidden={!this.state.roleVisible} className="center">
            Du bist<br /><br />
            <span className={styles.roletext}>{this.state.currentRole}</span>
          </p>
        </div>

        <Fab position="bottom left" onClick={this.props.navBack}><Icon icon='fa-undo' /></Fab>

      </Page>
    )
  }
}

const chooseRandom = (allRoles: string[]) => {
  let index = Math.floor(Math.random() * allRoles.length)
  let chosen = allRoles[index];

  let leftRoles = [...allRoles];
  leftRoles.splice(index, 1);

  return { chosen, leftRoles };
}

export default Deal;
