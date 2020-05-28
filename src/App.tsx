import React from 'react';
import './App.css';

import { availableRoles } from './config'
import Preparation from './components/Preparation';

import { Splitter, SplitterSide, SplitterContent, Page, List, ListItem, Toolbar, ToolbarButton, Icon } from 'react-onsenui';

interface AppState {
  openMenu: boolean
  currentPage: 'prepare' | 'play' | 'about'
  game: {
    roles: { [key: string]: number }
  }
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    let state: AppState = {
      openMenu: false,
      currentPage: 'prepare',
      game: {
        roles: {},
      },
    };

    Object.keys(availableRoles).forEach(roleKey => state.game.roles[roleKey] = 0);

    this.state = state;
  }

  endPreparation() {
    console.log("endPreparation")
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
    this.setState({ openMenu: true });
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left">
          <ToolbarButton onClick={this.openMenu.bind(this)}><Icon icon='md-menu'></Icon></ToolbarButton>
        </div>
        <div className="center">
          Das Dorf zusammenstellen
              </div>
      </Toolbar>
    )
  }

  render() {
    return (
      <Splitter>
        <SplitterSide
          side="left"
          width={200}
          swipeable={true}
          collapse={true}
          isOpen={this.state.openMenu}>
          <Page>
            <List
              dataSource={['Das Dorf zusammenstellen', 'Rollen', 'About']}
              renderRow={(row, idx) => (
                <ListItem key={row} tappable={true}>{row}</ListItem>
              )}
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page
            renderToolbar={this.renderToolbar.bind(this)}>
            <Preparation
              roleCounts={this.state.game.roles}
              removeRole={this.removeRole.bind(this)}
              addRole={this.addRole.bind(this)}
              endPreparation={this.endPreparation.bind(this)}
            />
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}

export default App;
