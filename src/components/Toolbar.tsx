import { Toolbar as OnsenToolbar } from 'react-onsenui';
import { connect, ConnectedProps } from 'react-redux';


const connector = connect((state: RootState) => ({ currentPage: state.ui.currentPage }))

const Toolbar = ({ currentPage }: ConnectedProps<typeof connector>) => (
    <OnsenToolbar>
        <div className="center">{toolbarText(currentPage)}</div>
    </OnsenToolbar>
)

export default connector(Toolbar);


function toolbarText(currentPage: Page): string {
    switch (currentPage) {
        case 'prepare':
            return "Das Dorf zusammenstellen";
        case 'deal':
            return "Rollen austeilen";
        case 'play':
            return "Spiel leiten";
        default:
            return "Not implemented";
    }
}