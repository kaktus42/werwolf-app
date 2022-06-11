import { connect, ConnectedProps } from 'react-redux'
import { List, ListItem, Button, Input } from 'react-onsenui';

import { addRole, removeRole, createRole } from '../reducers/game'

import styles from './RolePicker.module.css';


function mapStateToProps(state: RootState) {
  return { availableRoles: state.game.availableRoles, pickedRoles: state.game.pickedRoles }
}

const mapDispatch = { addRole, removeRole, createRole }
const connector = connect(mapStateToProps, mapDispatch)
export default connector(RolePicker);

type RolePickerProps = ConnectedProps<typeof connector>

function RolePicker({ availableRoles, pickedRoles, addRole, removeRole, createRole }: RolePickerProps) {

  let availableRolesItems = (roleKey: string, idx: number) => (
    <ListItem key={roleKey}>
      <div className="center">{availableRoles[roleKey]}</div>
      <div className="right">
        <Button onClick={() => removeRole(roleKey)} disabled={pickedRoles[roleKey] <= 0}>-</Button>
        <span className={styles.counter}>{pickedRoles[roleKey]}</span>
        <Button onClick={() => addRole(roleKey)}>+</Button>
      </div>
    </ListItem>
  )

  let _createRole = () => {
    let inputField = document.getElementById('new_role')
    let role_name = (inputField as HTMLInputElement).value
    createRole(role_name)
  }

  let footer = <ListItem key={"new_role"}>
    <div className="center">
      <Input
        value={"Jesus"}
        inputId={"new_role"}
        modifier='material'
        placeholder='new role name' float />
    </div>
    <div className="right">
      <Button onClick={_createRole}>+</Button>
    </div>
  </ListItem>

  return (
    <List
      dataSource={Object.keys(availableRoles)}
      renderRow={availableRolesItems}
      // renderHeader={() => <div>Header</div>}
      renderFooter={() => footer}
    />
  );
}
