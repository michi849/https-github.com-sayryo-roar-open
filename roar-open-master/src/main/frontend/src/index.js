import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

class Foo extends React.Component {
  render() {
    return (
      <>
        <App />
      </>
    );
  }
}

const root = document.getElementById("root");

ReactDOM.render(<Foo />, root);
