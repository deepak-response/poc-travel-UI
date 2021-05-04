import { Backdrop } from "@material-ui/core";
import React, { Component } from "react";

import LoadingGif from "../assets/loadinggif2.gif";

class LoadingComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <Backdrop open={true}>
          <div>
            <img src={LoadingGif} className="img-fluid" alt="Loading.." />
          </div>
        </Backdrop>
      </React.Fragment>
    );
  }
}

export default LoadingComponent;
