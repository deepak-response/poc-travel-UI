import React, { Component } from "react";
import { Toaster } from "react-hot-toast";
import { Redirect, Route, Switch } from "react-router";
import CDCPComponent from "./Pages/CDCPComponent";
import COOComponent from "./Pages/COOComponent";
import SummaryComponent from "./Pages/SummaryComponent";

class MainComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <Toaster />
        <Switch>
          <Route path="/summary" component={SummaryComponent} />
          <Route path="/coo" component={COOComponent} />
          <Route path="/cdcp" component={CDCPComponent} />

          <Redirect to="/summary" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainComponent;
