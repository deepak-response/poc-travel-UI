import { Button, Dialog, DialogContent, TextField } from "@material-ui/core";
import { Cancel, Done, Refresh } from "@material-ui/icons";
import React, { Component } from "react";
import toast from "react-hot-toast";
import { Table } from "reactstrap";
import { APIURL } from "../../constants/APIURL";
import {
  summaryData,
} from "../../constants/Task_Details_COO&CDCP";
import HeaderComponent from "../HeaderComponent";
import LoadingComponent from "../LoadingComponent";

class SummaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      comment: "",

      pendingTasks: summaryData,
      tasks: [],
      selectedRow: {},
      isLoading: true,
      data: {},
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleReject = () => {
    toast("Reject Action Performed");
    this.handleDialogClose();
  };

  handleAccept = () => {
    toast.success("Accept Action Performed");
    this.handleDialogClose();
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleDialogOpen = (selectedRow) => {
    this.setState({
      dialogOpen: true,
      selectedRow: selectedRow,
    });
    console.log(selectedRow);
  };
  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      selectedRow: {},
      comment: "",
    });
  };

  getTasks = () => {
    this.setState({
      isLoading: true,
    })
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // var urlencoded = new URLSearchParams();

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(APIURL + "travel-poc/getPendingTasks", requestOptions)
      .then(response => response.json())
      .then(result => {
        var tasks = [];
        tasks = result;
        var data= {};
        tasks.forEach((item) => {
          if(data[item.taskData.status] !== undefined)
          data[item.taskData.status] = data[item.taskData.status] + 1
          else 
          data[item.taskData.status] = 1
        })
        console.log(data)

        this.setState({
          tasks: tasks,
          isLoading: false,
          data: data,
        });
      })
      .catch(error => {
        console.log('error', error);
        this.setState({
          isLoading: false,
        })
        toast.error("Server Error");

      });

  };

  componentDidMount() {
    this.getTasks();

    
  }
  render() {
    if (this.state.isLoading) {
      return (
        <React.Fragment>
          <LoadingComponent />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
        >
          <DialogContent>
            <div style={{ textAlign: "center" }}>
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Value 1</td>
                    <td>Value 2</td>
                  </tr>
                  <tr>
                    <td>Value 1</td>
                    <td>Value 2</td>
                  </tr>
                  <tr>
                    <td>Value 1</td>
                    <td>Value 2</td>
                  </tr>
                </tbody>
              </Table>
              <br />
              <TextField
                variant="filled"
                name="comment"
                value={this.state.comment}
                onChange={this.handleInputChange}
                label="Comment"
                fullWidth
                multiline
                rows={2}
              />
              <br />
              <br />
              <Button
                startIcon={<Cancel />}
                style={{
                  backgroundColor: "#c62828",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={this.handleReject}
              >
                Reject
              </Button>

              <Button
                startIcon={<Done />}
                style={{
                  backgroundColor: "#2E7D32",
                  color: "white",
                  marginRight: "10px",
                }}
                onClick={this.handleAccept}
              >
                Accept
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <div className="SummaryMainDiv">
          <HeaderComponent selected="summary" />

          <div className="SummaryContentDiv">
            <div style={{ textAlign: "right" }}>
              <Button startIcon={<Refresh />} variant="contained" onClick={this.getTasks}>
                Refresh
              </Button>
            </div>
            <div className="SummaryTableDiv">
              <Table id="SummTable" bordered>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.length <= 0
                    ? "No Data to display"
                    : Object.keys(this.state.data).map((item) => (
                        <tr id="tRow">
                          <td>{item}</td>
                          <td>{this.state.data[item]}</td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SummaryComponent;
