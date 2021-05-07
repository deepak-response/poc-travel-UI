import React, { Component } from "react";
import { Toaster } from "react-hot-toast";
import { Redirect, Route, Switch } from "react-router";
import AdminComponent from "./Pages/AdminComponent";
import CDCPComponent from "./Pages/CDCPComponent";
import COOComponent from "./Pages/COOComponent";
import SummaryComponent from "./Pages/SummaryComponent";
import { get, set } from "idb-keyval";

class MainComponent extends Component {
  componentDidMount() {
    get("adminValues").then((val) => {
      if (val === undefined) {
        var values = {
          status: {
            "Email sent to Employee": "Email sent to Employee",
            "Email Response Received": "Email Response Received",
            "Response Received from COO": "Response Received from COO",
            "Response Not Received": "Response Not Received",
            "Response Recorded": "Response Recorded",
          },
          coo: {
            travelRequestId: {
              name: "Travel Req Id",
              active: true,
            },
            employeePID: {
              name: "Employee PID",
              active: true,
            },
            employeeName: {
              name: "Employee Name",
              active: true,
            },
            aging: {
              name: "Aging (Travel Days)",
              active: true,
            },
            empDeptCode: {
              name: "Employee Dept Code",
              active: true,
            },
            empDeptName: {
              name: "Employee Dept Name",
              active: true,
            },
            workPlaceCountry: {
              name: "Work Place Country",
              active: true,
            },
            rowOrder: {
              name: "Row Order",
              active: true,
            },
            destinationId: {
              name: "Destination Id",
              active: true,
            },
            division: {
              name: "Division",
              active: true,
            },
            employeePhnNbr: {
              name: "Employee Phone No",
              active: true,
            },
            employeeType: {
              name: "Employee Type",
              active: true,
            },
            queue: {
              name: "Queue",
              active: true,
            },
            status: {
              name: "Status",
              active: true,
            },

            purpose: {
              name: "Purpose",
              active: false,
            },

            initiator: {
              name: "Initiator",
              active: false,
            },

            nextTaskOutcome: {
              name: "Next Task Outcome",
              active: false,
            },
          },
          cdcp: {
            travelRequestId: {
              name: "Travel Req Id",
              active: true,
            },
            employeePID: {
              name: "Employee PID",
              active: true,
            },
            employeeName: {
              name: "Employee Name",
              active: true,
            },
            aging: {
              name: "Aging (Travel Days)",
              active: true,
            },
            empDeptCode: {
              name: "Employee Dept Code",
              active: true,
            },
            empDeptName: {
              name: "Employee Dept Name",
              active: true,
            },
            workPlaceCountry: {
              name: "Work Place Country",
              active: true,
            },
            rowOrder: {
              name: "Row Order",
              active: true,
            },
            destinationId: {
              name: "Destination Id",
              active: true,
            },
            division: {
              name: "Division",
              active: true,
            },
            employeePhnNbr: {
              name: "Employee Phone No",
              active: true,
            },
            employeeType: {
              name: "Employee Type",
              active: true,
            },
            queue: {
              name: "Queue",
              active: true,
            },
            status: {
              name: "Status",
              active: true,
            },

            purpose: {
              name: "Purpose",
              active: false,
            },

            initiator: {
              name: "Initiator",
              active: false,
            },

            nextTaskOutcome: {
              name: "Next Task Outcome",
              active: false,
            },
          },
        };
        set("adminValues", values);
      } else {
        console.log(val.coo);
      }
    });
  }
  render() {
    return (
      <React.Fragment>
        <Toaster />
        <Switch>
          <Route path="/summary" component={SummaryComponent} />
          <Route path="/coo" component={COOComponent} />
          <Route path="/cdcp" component={CDCPComponent} />
          <Route path="/admin" component={AdminComponent} />

          <Redirect to="/summary" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default MainComponent;
