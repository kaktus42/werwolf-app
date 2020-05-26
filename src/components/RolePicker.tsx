import React from 'react';
import { List, ListItem, Button } from 'react-onsenui';

import styles from './RolePicker.module.css';

let roles = ['Werwölfe', 'Dorfbewohner', 'Seherin', 'Hexe'];

function RolePicker() {
  return (
    <List
      dataSource={roles}
      renderRow={(roleName, idx) => (
        <ListItem>
          <div className="center">{roleName}</div>
          <div className="right">
            <Button>-</Button>
            <span className={styles.counter}>0</span>
            <Button>+</Button>
          </div>
        </ListItem>
      )}
    />
  );
}

export default RolePicker;
