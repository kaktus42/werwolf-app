import React from 'react';
import { List, ListItem, Button } from 'react-onsenui';

import { availableRoles } from '../config'

import styles from './RolePicker.module.css';

interface RolePickerProps {
  roleCounts: { [key: string]: number }
  addRole(role: string): void
  removeRole(role: string): void
}

function RolePicker(props: RolePickerProps) {
  return (
    <List
      dataSource={Object.keys(availableRoles)}
      renderRow={(roleKey, idx) => (
        <ListItem>
          <div className="center">{availableRoles[roleKey]}</div>
          <div className="right">
            <Button onClick={() => props.removeRole(roleKey)} disabled={props.roleCounts[roleKey] <= 0}>-</Button>
            <span className={styles.counter}>{props.roleCounts[roleKey]}</span>
            <Button onClick={() => props.addRole(roleKey)}>+</Button>
          </div>
        </ListItem>
      )}
    />
  );
}

export default RolePicker;
