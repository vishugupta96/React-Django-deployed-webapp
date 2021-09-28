import React, { Component } from "react";
import { render } from "react-dom";
// import './App.css';
import HomePage from './HomePage'
import GetUser from './User'



export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (<p>
        <GetUser/>
      <div class="center">

        <HomePage/>
      </div></p>

    );
  }
}

const container = document.getElementById("app");
render(<App />, container);






















// import React, { Component } from "react";
// import { render } from "react-dom";





// export default class App extends Component {
//   constructor(props) {
//     super(props);

//   }


//   render() {
//     return <div></div>
//   }}

// const container = document.getElementById("app");
// render(<App />, container);