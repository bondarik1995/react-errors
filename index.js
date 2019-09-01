import React, { Component } from 'react';
import { render } from 'react-dom';

import './style.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      result: '',
      error: ''
    };

    this.changeValue = this.changeValue.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  onError = error => {
    this.setState({ error: error.message });
  };

  changeValue(e) {
    this.setState({ value: e.target.value });
  }

  fetch() {
    fetch(this.state.value)
    .then(response => response.json())
    .then(result => this.setState({ result: JSON.stringify(result) }))
    .catch(this.onError);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.changeValue} />
        <button onClick={this.fetch}>Go</button>
        {this.state.result.length > 0 ? this.state.result : this.state.error}
      </div>
    );
  }
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    console.log(this.state);

    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children; 
  }
}

class FallbackWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: this.props.errorMessage 
    }
  }

  componentDidCatch(e) {
    console.log(e);
  }

  render() {
    return (this.props.children);
  }
}

render(
  <ErrorBoundary>
    <FallbackWrapper errorMessage="Unexpected error">
      <h1>Some header</h1>
    </FallbackWrapper>
  </ErrorBoundary>, document.getElementById('root')
);
