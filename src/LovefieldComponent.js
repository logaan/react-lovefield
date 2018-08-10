import { Component } from 'react';

class LovefieldComponent extends Component {
  queryIntoState(name, query) {
    const handler = (rows) => {
      const obj = {};
      obj[name] = rows;
      this.setState(obj);
    };

    query.exec().then(handler);

    this.props.db.observe(query, (changes) => {
      query.exec().then(handler);
    });
  }
}

export default LovefieldComponent;
