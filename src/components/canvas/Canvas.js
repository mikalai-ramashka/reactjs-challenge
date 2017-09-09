import React, { Component } from 'react';
import './Canvas.css';
import {Image, Stage, Layer} from 'react-konva';

class MyImage extends React.Component {
  state = {
    image: null
  }
  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.src;
    image.onload = () => {
      this.setState({
        image: image,
        width: (this.props.height / image.naturalHeight) * image.naturalWidth
      });
    }
  }

  render() {
    var { src, ...other } = this.props;

    return (
      <Image {...other} image={this.state.image} width={this.state.width} />
    );
  }
}

class Canvas extends Component {

  render() {
    let images = this.props.images.map((src, i) => {
      return (
        <MyImage key={src} src={src} x={i * 20} y={i * 20} height={100} />
      );
    });

    return (
      <Stage className="Canvas" width={700} height={700}>
        <Layer>
          {images}
        </Layer>
      </Stage>
    );
  }
}

export default Canvas;
