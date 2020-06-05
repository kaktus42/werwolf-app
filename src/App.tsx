import React from 'react';
import './App.css';

import { availableRoles } from './config'
import Preparation from './components/Preparation';

import { Page, Toolbar } from 'react-onsenui';
import Deal from './components/Deal';

interface AppState {
  menuIsOpen: boolean
  currentPage: 'prepare' | 'deal' | 'about'
  game: {
    roles: { [key: string]: number }
  }
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    let state: AppState = {
      menuIsOpen: false,
      currentPage: 'prepare',
      game: {
        roles: {},
      },
    };

    Object.keys(availableRoles).forEach(roleKey => state.game.roles[roleKey] = 0);

    this.state = state;
  }

  navToPreparation() {
    this.setState(state => ({ currentPage: 'prepare' }))
  }

  navToDeal() {
    this.setState(state => ({ currentPage: 'deal' }))
  }

  resetRoles() {
    this.setState(state => {
      let newRoles: { [key: string]: number } = {}
      Object.keys(availableRoles).forEach(roleKey => newRoles[roleKey] = 0);
      return { game: { roles: newRoles } }
    });
  }

  addRole(roleKey: string) {
    this.setState(state => {
      let count = this.state.game.roles[roleKey]
      let newRoles = { ...this.state.game.roles }
      newRoles[roleKey] = count + 1
      return { game: { roles: newRoles } }
    });
  }

  removeRole(roleKey: string) {
    this.setState(state => {
      let count = this.state.game.roles[roleKey]
      if (count <= 0) {
        return null
      }
      let newRoles = { ...this.state.game.roles }
      newRoles[roleKey] = count - 1
      return { game: { roles: newRoles } }
    });
  }

  openMenu() {
    this.setState({ menuIsOpen: true });
  }

  closeMenu() {
    this.setState({ menuIsOpen: false });
  }


  renderToolbar() {
    return (
      <Toolbar>
        <div className="center">
          {(() => {
            switch (this.state.currentPage) {
              case 'prepare':
                return "Das Dorf zusammenstellen";
              case 'deal':
                return "Rollen austeilen";
              default:
                return "Not implemented";
            }
          })()
          }
        </div>
      </Toolbar>
    )
  }

  renderPage() {
    switch (this.state.currentPage) {
      case 'prepare':
        return <Preparation
          roleCounts={this.state.game.roles}
          removeRole={this.removeRole.bind(this)}
          addRole={this.addRole.bind(this)}
          endPreparation={this.navToDeal.bind(this)}
          resetRoles={this.resetRoles.bind(this)}
        />
      case 'deal':
        return <Deal
          roleCounts={this.state.game.roles}
          removeRole={this.removeRole.bind(this)}
          addRole={this.addRole.bind(this)}
          navBack={this.navToPreparation.bind(this)}
        />
      default:
        return <p>Not implemented</p>
    }
  }

  render() {
    return (
      <Page
        renderToolbar={this.renderToolbar.bind(this)}>
        {this.renderPage.bind(this)()}
      </Page>
    );
  }
}

export default App;
