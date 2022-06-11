import './App.css';

import Preparation from './components/Preparation';

import Deal from './components/Deal';
import { connect, ConnectedProps } from 'react-redux';
import Play from './components/Play';


const mapStateToProps = (state: RootState) => ({ currentPage: state.ui.currentPage })
const connector = connect(mapStateToProps)

const App = ({ currentPage }: ConnectedProps<typeof connector>) => {
  switch (currentPage) {
    case 'prepare':
      return (<Preparation />)
    case 'deal':
      return (<Deal />)
    case 'play':
      return (<Play />)
    default:
      return <p>Not implemented</p>
  }
}

export default connector(App);
