import React from 'react';
import ons from 'onsenui';
import { Fab, Icon, Button, Modal } from 'react-onsenui';

import { availableRoles } from '../config'

import styles from './Deal.module.css';

interface DealProps {
  roleCounts: { [key: string]: number }
  addRole(role: string): void
  removeRole(role: string): void
  navBack(): void
}

interface DealState {
  roleViewIsOpen: boolean
  leftRoles: string[]
  currentRole: string
  playerNr: number
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

    let {chosen: currentRole, leftRoles} = chooseRandom(allRoles)
    
    let state: DealState = {
      roleViewIsOpen: false,
      leftRoles,
      currentRole,
      playerNr: 1,
    };

    this.state = state;
  }

  toggleRoleView() {
    this.setState(state => ({ roleViewIsOpen: !state.roleViewIsOpen }))
  }

  pickNext() {
    this.setState(state => {
      let {chosen: currentRole, leftRoles} = chooseRandom(this.state.leftRoles)

      return {
        leftRoles,
        currentRole,
        playerNr: this.state.playerNr + 1,
      }
    });
    ons.notification.alert('Gerät jetzt bitte weitergeben!');
  }

  render() {
    return (
      <>
        <p className="center"><b>Spieler #{this.state.playerNr}</b></p>

        <Button modifier="large" onClick={this.toggleRoleView.bind(this)}>Rolle anzeigen</Button>
        <Modal isOpen={this.state.roleViewIsOpen}>
          <p>Deine Rolle ist: {this.state.currentRole}</p>
          <p><Button onClick={this.toggleRoleView.bind(this)}>Close</Button></p>
        </Modal>

        <p className={styles.space}></p>
        <Button modifier="large" onClick={this.pickNext.bind(this)} disabled={this.state.leftRoles.length === 0}>Ok. Nächster Bitte</Button>

        <p className={this.state.leftRoles.length > 0 ? "hidden center" : "center"}>Keine Rollen mehr übrig</p>

        <Fab position="bottom left" onClick={this.props.navBack}><Icon icon='fa-undo' /></Fab>
      </>
    )
  }
}

const chooseRandom = (allRoles: string[]) => {
  let index = Math.floor(Math.random() * allRoles.length)
  let chosen = allRoles[index];

  let leftRoles = [...allRoles];
  leftRoles.splice(index, 1);

  return {chosen, leftRoles};
}

export default Deal;
