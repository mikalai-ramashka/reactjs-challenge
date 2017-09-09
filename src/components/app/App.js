import React, { Component } from 'react';
import './App.css';
import { Toolbar, Canvas } from '../index';
import LazyLoad from 'react-lazy-load';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
    this.selectItem = this.selectItem.bind(this);
    this.onToolbarToggle = this.onToolbarToggle.bind(this);
  }

  onToolbarToggle() {
    this.setState({
      toolbarCollapsed: !this.state.toolbarCollapsed
    })
  }

  selectItem(e) {
    e.preventDefault();

    this.setState({
      images: this.state.images.concat(e.target.dataset.url)
    });
    this.onToolbarToggle();
  }

  componentDidMount() {
    fetch('countries.json').then((r) => r.json()).then(json => {
      this.setState({ countries: Object.keys(json).map(k => {
        return { 
          id: k,
          name: json[k],
          icon: `svg/${k}.svg`,
          image: `png1000px/${k}.png`,
        };
      }).sort((x, y) => {
        return x.name > y.name ? 1 : -1;
      })});
    });
  }

  render() {
    let items;

    if (this.state.countries) {
      items = this.state.countries.map((c, i) => (
        <LazyLoad height={18} offsetVertical={300} key={c.id}>
          <li className="Toolbar-item">
            <a href="#toolbar-item" data-url={c.image} onClick={this.selectItem}>
              <img src={c.icon} className="Toolbar-item-icon" alt={c.name} />
              {c.name}
            </a>
          </li>
        </LazyLoad>
      ));
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>ReactJS, canvas challenge</h2>
        </div>
        <div className="App-main">
          <Toolbar title="Item list" collapsed={this.state.toolbarCollapsed} onToggle={this.onToolbarToggle}>
            <ul>
            {items}
            </ul>
          </Toolbar>
          <Canvas images={this.state.images} />
        </div>
      </div>
    );
  }
}

export default App;
