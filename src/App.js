import React from 'react';
import './App.css';
import LovefieldComponent from './LovefieldComponent';

class App extends LovefieldComponent {
  constructor(props) {
    super(props);

    this.state = {
      polls: [],
      newPollName: ""
    };

    this.poll = props.db.getSchema().table('Poll');
    this.queryIntoState('polls', props.db.select().from(this.poll));
  }

  addFromText = (event) => {
    event.preventDefault();

    const newPoll = this.poll.createRow({name: this.state.newPollName});
    this.props.db.insertOrReplace().into(this.poll).values([newPoll]).exec();

    this.setState({newPollName: ""});
  }

  setNewPollName = (event) => {
    this.setState({newPollName: event.target.value });
  }

  render() {
    if (!this.state) { return null; }

    return (
      <div>
        <h1 className="App-title">Polls</h1>

        <ul>
          {this.state.polls.map(
            (poll) =>
              <li key={poll.id}>{poll.name}</li>
          )}
        </ul>

        <form onSubmit={this.addFromText} >
          <input
            id="new-poll-name"
            value={this.state.newPollName}
            onChange={this.setNewPollName} />
          <button onClick={this.addFromText}>
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;
