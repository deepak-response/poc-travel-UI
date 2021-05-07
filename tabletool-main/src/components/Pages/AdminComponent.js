import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
} from "@material-ui/core";
import { Delete, Done, ExpandMore } from "@material-ui/icons";
import React, { Component } from "react";
import { Col, Container, Row, Table } from "reactstrap";
import HeaderComponent from "../HeaderComponent";
import { get, set, update } from "idb-keyval";
import toast from "react-hot-toast";

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,

      values: {},
      //
      newStatus: "",

      //
      COODeleteDialogOpen: false,
      COOAddDialogOpen: false,
      COOSelected: "",

      CDCPDeleteDialogOpen: false,
      CDCPAddDialogOpen: false,
      CDCPSelected: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // COO
  handleCOOAddDialogOpen = (item) => {
    this.setState({
      COOAddDialogOpen: true,
      COOSelected: item,
    });
  };

  handleCOOAddDialogClose = () => {
    this.setState({
      COOAddDialogOpen: false,
      COOSelected: "",
    });
  };

  // CDCP
  handleCDCPAddDialogOpen = (item) => {
    this.setState({
      CDCPAddDialogOpen: true,
      CDCPSelected: item,
    });
  };

  handleCDCPAddDialogClose = () => {
    this.setState({
      CDCPAddDialogOpen: false,
      CDCPSelected: "",
    });
  };

  handleCOODeleteDialogOpen = (item) => {
    this.setState({
      COODeleteDialogOpen: true,
      COOSelected: item,
    });
  };

  handleCOODeleteDialogClose = () => {
    this.setState({
      COODeleteDialogOpen: false,
      COOSelected: "",
    });
  };

  // CDCP Dialog
  handleCDCPDeleteDialogOpen = (item) => {
    this.setState({
      CDCPDeleteDialogOpen: true,
      CDCPSelected: item,
    });
  };

  handleCDCPDeleteDialogClose = (item) => {
    this.setState({
      CDCPDeleteDialogOpen: false,
      CDCPSelected: "",
    });
  };

  handleCOOAdd = (item) => {
    get("adminValues").then((val) => {
      var oldVal = val;

      oldVal.coo[item].active = true;
      set("adminValues", oldVal);

      get("adminValues").then((val) => {
        this.setState({
          values: val,
        });
        console.log(val);
      });
      toast.success("COO Column Updated");
      this.handleCOOAddDialogClose();
    });
  };

  handleCOODelete = (item) => {
    get("adminValues").then((val) => {
      var oldVal = val;

      oldVal.coo[item].active = false;
      set("adminValues", oldVal);

      get("adminValues").then((val) => {
        this.setState({
          values: val,
        });
        console.log(val);
      });
      toast.success("COO Column Updated");
      this.handleCOODeleteDialogClose();
    });
  };

  //   CDCP
  handleCDCPAdd = (item) => {
    get("adminValues").then((val) => {
      var oldVal = val;

      oldVal.cdcp[item].active = true;
      set("adminValues", oldVal);

      get("adminValues").then((val) => {
        this.setState({
          values: val,
        });
        console.log(val);
      });
      toast.success("CDCP Column Updated");
      this.handleCDCPAddDialogClose();
    });
  };

  handleCDCPDelete = (item) => {
    get("adminValues").then((val) => {
      var oldVal = val;

      oldVal.cdcp[item].active = false;
      set("adminValues", oldVal);

      get("adminValues").then((val) => {
        this.setState({
          values: val,
        });
        console.log(val);
      });
      toast.success("CDCP Column Updated");
      this.handleCDCPDeleteDialogClose();
    });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  deleteStatus = (item) => {
    get("adminValues").then((val) => {
      var oldVal = val;

      delete oldVal.status[item];
      set("adminValues", oldVal);

      get("adminValues").then((val) => {
        this.setState({
          values: val,
        });
        console.log(val);
      });
      toast.success("Status item deleted");
    });
  };

  addNewStatus = () => {
    if (this.state.newStatus.trim().length === 0) {
      toast.error("Please Enter Status value");
    } else {
      get("adminValues").then((val) => {
        var oldVal = val;
        if (oldVal.status[this.state.newStatus] !== undefined) {
          toast.error("Given Status is already present");
        } else {
          oldVal.status[this.state.newStatus] = this.state.newStatus;
          set("adminValues", oldVal);

          get("adminValues").then((val) => {
            this.setState({
              values: val,
            });
            console.log(val);
          });
          toast.success("Status Values Updated");
        }
      });
    }
  };
  handleAccord = (panel) => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false,
    });
  };
  componentDidMount() {
    get("adminValues").then((val) => {
      this.setState({
        values: val,
      });
      console.log(val);
    });
  }
  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.COOAddDialogOpen}
          onClose={this.handleCOOAddDialogClose}
        >
          <DialogTitle>Add COO Column</DialogTitle>
          <DialogContent>
            <div>
              <p>
                Are you sure want to add column{" "}
                <span style={{ color: "blue" }}>
                  {this.state.COOSelected} ?
                </span>
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color=""
              onClick={this.handleCOOAddDialogClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleCOOAdd(this.state.COOSelected)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.COODeleteDialogOpen}
          onClose={this.handleCOODeleteDialogClose}
        >
          <DialogTitle>Remove COO Column</DialogTitle>
          <DialogContent>
            <div>
              <p>
                Are you sure want to remove column{" "}
                <span style={{ color: "red" }}>{this.state.COOSelected} ?</span>
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color=""
              onClick={this.handleCOODeleteDialogClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleCOODelete(this.state.COOSelected)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* CDCP Dialogs */}
        <Dialog
          open={this.state.CDCPAddDialogOpen}
          onClose={this.handleCDCPAddDialogClose}
        >
          <DialogTitle>Add CDCP Column</DialogTitle>
          <DialogContent>
            <div>
              <p>
                Are you sure want to add column{" "}
                <span style={{ color: "blue" }}>
                  {this.state.CDCPSelected} ?
                </span>
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color=""
              onClick={this.handleCDCPAddDialogClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleCDCPAdd(this.state.CDCPSelected)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.CDCPDeleteDialogOpen}
          onClose={this.handleCDCPDeleteDialogClose}
        >
          <DialogTitle>Remove CDCP Column</DialogTitle>
          <DialogContent>
            <div>
              <p>
                Are you sure want to remove column{" "}
                <span style={{ color: "red" }}>
                  {this.state.CDCPSelected} ?
                </span>
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color=""
              onClick={this.handleCDCPDeleteDialogClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleCDCPDelete(this.state.CDCPSelected)}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <HeaderComponent selected="admin" />
        </div>

        <div className="AdminMainDiv">
          <div className="AdminAccordMainDiv">
            <Container>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className="display-6">STATUS</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <Row>
                      <Col sm>
                        <div>
                          <h5>Add New Status</h5>
                          <TextField
                            variant="standard"
                            label="New Status Value"
                            name="newStatus"
                            value={this.state.newStatus}
                            onChange={this.handleInputChange}
                          />
                          <br />
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.addNewStatus}
                          >
                            Add Status
                          </Button>
                        </div>
                      </Col>

                      <Col sm>
                        <h5>
                          <b>Current Status Values</b>
                        </h5>
                        <Table bordered hover>
                          {this.state.values.status !== undefined &&
                            Object.keys(this.state.values.status)
                              .reverse()
                              .map((item) => (
                                <tr>
                                  <th>
                                    <h6>{item}</h6>
                                  </th>
                                  <td>
                                    <Delete
                                      fontSize="large"
                                      onClick={() => this.deleteStatus(item)}
                                    />
                                  </td>
                                </tr>
                              ))}
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className="display-6">COO</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <h5>Update Columns of COO</h5>
                    <div>
                      <h6 style={{ color: "#1B5E20" }}>Active Columns:</h6>
                      <div>
                        {this.state.values.coo !== undefined &&
                          Object.keys(this.state.values.coo).map(
                            (key) =>
                              this.state.values.coo[key].active && (
                                <Chip
                                  color="primary"
                                  label={this.state.values.coo[key].name}
                                  onDelete={() =>
                                    this.handleCOODeleteDialogOpen(key)
                                  }
                                  style={{ margin: "10px" }}
                                />
                              )
                          )}
                      </div>
                    </div>
                    <div>
                      <h6 style={{ color: "#b71c1c" }}>Inactive Columns:</h6>
                      <div>
                        {this.state.values.coo !== undefined &&
                          Object.keys(this.state.values.coo).map(
                            (key) =>
                              !this.state.values.coo[key].active && (
                                <Chip
                                  color="secondary"
                                  label={this.state.values.coo[key].name}
                                  deleteIcon={<Done />}
                                  onDelete={() =>
                                    this.handleCOOAddDialogOpen(key)
                                  }
                                  style={{ margin: "10px" }}
                                />
                              )
                          )}
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <h3 className="display-6">CDCP</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                    <h5>Update Columns of CDCP</h5>
                    <div>
                      <h6 style={{ color: "#1B5E20" }}>Active Columns:</h6>
                      <div>
                        {this.state.values.cdcp !== undefined &&
                          Object.keys(this.state.values.cdcp).map(
                            (key) =>
                              this.state.values.cdcp[key].active && (
                                <Chip
                                  color="primary"
                                  label={this.state.values.cdcp[key].name}
                                  onDelete={() =>
                                    this.handleCDCPDeleteDialogOpen(key)
                                  }
                                  style={{ margin: "10px" }}
                                />
                              )
                          )}
                      </div>
                    </div>
                    <div>
                      <h6 style={{ color: "#b71c1c" }}>Inactive Columns:</h6>
                      <div>
                        {this.state.values.cdcp !== undefined &&
                          Object.keys(this.state.values.cdcp).map(
                            (key) =>
                              !this.state.values.cdcp[key].active && (
                                <Chip
                                  color="secondary"
                                  label={this.state.values.cdcp[key].name}
                                  deleteIcon={<Done />}
                                  onDelete={() =>
                                    this.handleCDCPAddDialogOpen(key)
                                  }
                                  style={{ margin: "10px" }}
                                />
                              )
                          )}
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminComponent;
