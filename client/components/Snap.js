import React from 'react';

export default class Snap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.up = this.up.bind(this);
  }

  up() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h1>Snap {this.state.count}</h1>
        <button onClick={this.up}>Up</button>
      </div>
    );
  }
}
