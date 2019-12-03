import React, { Component } from "react";
import PropTypes from "prop-types";

export class Sequence extends Component {
  constructor(props) {
    super(props);
    //vars
    this.intervalId = null;
    this.imagesTotal = -1;
    this.imagesLoaded = 0;
    this.direction = "forward";
    //props
    this.frameRate = Math.round(1000 / this.props.fps);
    //state
    this.state = {
      current: 0
    };
  }
  componentDidMount() {
    if (this.imagesTotal === this.imagesLoaded) {
      this.startSequence();
    }
  }
  componentWillUnmount() {
    this.stopSequence();
  }
  updateSequence = () => {
    if (this.state.current + 1 < this.props.children.length) {
      this.setState((prevState, props) => ({
        current: prevState.current + 1
      }));
      this.startSequenceTimer();
    } else {
      this.endSequence();
    }
  };
  updateSequenceYoyo = () => {
    if (this.state.current - 1 > 0) {
      this.setState((prevState, props) => ({
        current: prevState.current - 1
      }));
      clearInterval(this.intervalId);
      this.intervalId = setTimeout(this.updateSequenceYoyo, this.frameRate);
    } else {
      this.endSequence();
    }
  };
  endSequence = () => {
    if (this.props.loop === true) {
      if (this.props.yoyo === true) {
        if (this.direction === "forward") {
          this.direction = "backward";
          this.setState((prevState, props) => ({
            current: this.props.children.length - 1
          }));
          this.startSequenceYoyoTimer();
        } else if (this.direction === "backward") {
          this.direction = "forward";
          this.setState((prevState, props) => ({
            current: 0
          }));
          this.startSequenceTimer();
        }
      } else {
        this.setState((prevState, props) => ({
          current: 0
        }));
        this.startSequenceTimer();
      }
    }
  };
  startSequenceTimer = () => {
    clearInterval(this.intervalId);
    this.intervalId = setTimeout(this.updateSequence, this.frameRate);
  };
  startSequenceYoyoTimer = () => {
    clearInterval(this.intervalId);
    this.intervalId = setTimeout(this.updateSequenceYoyo, this.frameRate);
  };
  startSequence = () => {
    if (
      this.props.autoPlay === true &&
      this.intervalId === null &&
      this.props.children !== null
    ) {
      this.updateSequence();
    }
  };
  stopSequence = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
  };
  getFrame = number => {
    return this.props.children[number];
  };
  handleImageLoaded = e => {
    this.imagesLoaded++;
    if (this.imagesLoaded === this.imagesTotal) {
      this.startSequence();
    }
  };
  renderChildren = () => {
    let arr = this.props.children;
    let newArr = new Array();
    this.imagesTotal = arr.length;
    for (let i = 0; i < this.imagesTotal; i++) {
      if (i === 0) {
        newArr.push(
          <img
            key={i + "_first"}
            style={{
              ...arr[i].props.style,
              position: "relative",
              visibility: "hidden"
            }}
            src={arr[i].props.src}
            alt={arr[i].props.alt}
          />
        );
      }
      if (i === this.state.current) {
        newArr.push(
          <img
            key={i}
            style={{
              ...arr[i].props.style,
              position: "absolute",
              visibility: "visible"
            }}
            onLoad={this.handleImageLoaded.bind(this)}
            src={arr[i].props.src}
            alt={arr[i].props.alt}
          />
        );
      } else {
        newArr.push(
          <img
            key={i}
            style={{
              ...arr[i].props.style,
              position: "absolute",
              visibility: "hidden"
            }}
            onLoad={this.handleImageLoaded.bind(this)}
            src={arr[i].props.src}
            alt={arr[i].props.alt}
          />
        );
      }
    }

    return newArr;
  };
  render() {
    return <div style={this.props.style}>{this.renderChildren()}</div>;
  }
}

Sequence.defaultProps = {
  autoPlay: true,
  loop: true,
  yoyo: true,
  fps: 29
};

Sequence.propTypes = {
  autoPlay: PropTypes.bool,
  loop: PropTypes.bool,
  yoyo: PropTypes.bool,
  fps: PropTypes.bool
};
