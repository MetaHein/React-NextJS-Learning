/* eslint-disable no-unused-vars */
import React, { Component } from "react";

export default class Mounting extends Component {
  constructor(props) {
    super(props);
    console.log("Constructor");
  }

  componentDidMount() {
    console.log("Component Mounted");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component Updated");
  }
  componentWillUnmount() {
    console.log("Component Unmounted");
  }

  render() {
    return (
      <>
        <h1>Hello React</h1>
        <p>{this.props.name}</p>
        <h2>Goodbye</h2>
      </>
    );
  }
}
