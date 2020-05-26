import React from 'react';
import './App.css';

import Preparation from './components/Preparation';

import { Splitter, SplitterSide, SplitterContent, Page, List, ListItem, Toolbar, ToolbarButton, Icon } from 'react-onsenui';

interface AppState {
  openMenu: boolean;
  currentPage: 'prepare' | 'play' | 'about';
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { openMenu: false, currentPage: 'prepare' };
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
                <ListItem tappable={true}>{row}</ListItem>
              )}
            />
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page
            renderToolbar={this.renderToolbar.bind(this)}>
            <Preparation />
          </Page>
        </SplitterContent>
      </Splitter>
    );
  }
}

export default App;
