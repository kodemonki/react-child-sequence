import React, { Component } from "react";

export class Sequence extends Component {
  constructor(props) {
    super(props);
    this.intervalId = null;
    this.frameRate =
      this.props.frameRate != null ? Number(this.props.frameRate) : 40;
    this.imagesTotal = -1;
    this.imagesLoaded = 0;
    this.direction = "forward";
    this.state = {
      current: 0
    };
    this.updateSequenceBind = this.updateSequence.bind(this);
    this.updateSequenceYoyoBind = this.updateSequenceYoyo.bind(this);
  }
  updateSequence() {
    if (
      this.props.children &&
      this.state.current + 1 < this.props.children.length
    ) {
      this.setState((prevState, props) => ({
        current: prevState.current + 1
      }));
      this.intervalId = setTimeout(this.updateSequenceBind, this.frameRate);
    } else {
      this.endSequence();
    }
  }
  updateSequenceYoyo() {
    if (this.state.current - 1 > 0) {
      this.setState((prevState, props) => ({
        current: prevState.current - 1
      }));
      this.intervalId = setTimeout(this.updateSequenceYoyoBind, this.frameRate);
    } else {
      this.endSequence();
    }
  }
  endSequence() {
    if (this.props.loop == true) {
      if (this.props.yoyo == true) {
        if (this.direction == "forward") {
          this.direction = "backward";
          this.setState((prevState, props) => ({
            current: this.props.children.length - 1
          }));
          this.intervalId = setTimeout(
            this.updateSequenceYoyoBind,
            this.frameRate
          );
        } else if (this.direction == "backward") {
          this.direction = "forward";
          this.setState((prevState, props) => ({
            current: 0
          }));
          this.intervalId = setTimeout(this.updateSequenceBind, this.frameRate);
        }
      } else {
        this.setState((prevState, props) => ({
          current: 0
        }));
        this.intervalId = setTimeout(this.updateSequenceBind, this.frameRate);
      }
    }
  }
  componentWillMount() {
    if (this.imagesTotal == this.imagesLoaded) {
      this.startSequence();
    }
  }
  componentWillUnmount() {
    this.stopSequence();
  }
  startSequence() {
    if (this.intervalId == null) {
      this.updateSequence();
    }
  }
  stopSequence() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  getFrame(number) {
    return this.props.children[number];
  }
  handleImageLoaded(e) {
    this.imagesLoaded++;
    if (this.imagesLoaded == this.imagesTotal) {
      this.startSequence();
    }
  }
  renderChildren() {
    let arr = this.props.children;
    let newArr = new Array();
    this.imagesTotal = arr.length;
    for (let i = 0; i < this.imagesTotal; i++) {
      if (i == 0) {
        newArr.push(
          <img
            key={i + "_first"}
            style={{ position: "relative", visibility: "hidden" }}
            src={arr[i].props.src}
          />
        );
      }
      if (i == this.state.current) {
        newArr.push(
          <img
            key={i}
            style={{ position: "absolute", visibility: "visible" }}
            onLoad={this.handleImageLoaded.bind(this)}
            src={arr[i].props.src}
          />
        );
      } else {
        newArr.push(
          <img
            key={i}
            style={{ position: "absolute", visibility: "hidden" }}
            onLoad={this.handleImageLoaded.bind(this)}
            src={arr[i].props.src}
          />
        );
      }
    }

    return newArr;
  }
  render() {
    return <div>{this.renderChildren()}</div>;
  }
}
