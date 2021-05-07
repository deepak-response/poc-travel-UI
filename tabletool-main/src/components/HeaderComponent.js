import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected === null ? "summary" : this.props.selected,
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="HeaderMainDiv">
          <Container>
            <Row>
            
              <Col
                sm
                className="HeaderItemDiv"
                id={this.state.selected === "summary" ? "SelectedItemDiv" : ""}
              >
                <Link to="/summary" id="NoHoverLink">
                  <div>
                    <h4>
                      <b>SUMMARY</b>
                    </h4>
                  </div>
                </Link>
              </Col>
              <Col
                sm
                className="HeaderItemDiv"
                id={this.state.selected === "COO" ? "SelectedItemDiv" : ""}
              >
                <Link to="/coo" id="NoHoverLink">
                  <div>
                    <h4>
                      <b>COO</b>
                    </h4>
                  </div>
                </Link>
              </Col>
              <Col
                sm
                className="HeaderItemDiv"
                id={this.state.selected === "CDCP" ? "SelectedItemDiv" : ""}
              >
                <Link to="/cdcp" id="NoHoverLink">
                  <div>
                    <h4>
                      <b>CDCP</b>
                    </h4>
                  </div>
                </Link>
              </Col>
              <Col
                sm
                className="HeaderItemDiv"
                id={this.state.selected === "admin" ? "SelectedItemDiv" : ""}
              >
                <Link to="/admin" id="NoHoverLink">
                  <div>
                    <h4>
                      <b>ADMIN</b>
                    </h4>
                  </div>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default HeaderComponent;
