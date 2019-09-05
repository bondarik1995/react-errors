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

class FallbackWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.props.errorMessage}</h1>;
    }

    return this.props.children;
  }
}

// 1. Напишите компонент c input'ом и кнопкой. 
// Компонент по нажатию на кнопку отправляет запрос на урл, 
// который ввел пользователь в input. Если сервер по этому url'у отдает json, 
// отданные данные должны вывестись под input'ом. 
// Если случается ошибка (нет сети, не json, под input'ом показывается сообщение об ошибке).
// render(<App />, document.getElementById('root'));

// 2. Напишите компонент <FallbackWrapper />, который показывает своих детей. 
// Если в отдном из дочерних компонентов случается ошибка, вместо него показывается разметка, переданная в свойстве errorMessage.
render(
  <FallbackWrapper errorMessage="Unexpected error">
    <h1>Some header</h1>
  </FallbackWrapper>, document.getElementById('root')
);
