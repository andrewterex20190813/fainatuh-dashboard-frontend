import React, { useState, Component } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import CardMedia from "@material-ui/core/CardMedia";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";
import Config from "../../config";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userRequestsAction from '../../store/userRequests/actions';

import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  requestModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 3px 3px #9E9E9E",
    padding: 20,
    borderRadius: 5,
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)"
  },
  imageModal: {
    position: 'absolute',
    width: '100%',
    backgroundColor: "#FFFFFF",
    boxShadow: "1px 3px 3px #9E9E9E",
    padding: 20,
    borderRadius: 5,
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: "translate(-50%, -50%)"
  }
};

const useStyles = makeStyles(styles);

class UserProfile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      requestState: '',
      imageModalOpen: false,
      approveModalOpen: false,
      rejectModalOpen: false
    }

    // load user requests from the server
    fetch(Config.SERVER_URL + '/api/users/requests/' + this.props.match.params.requestId, {
      method: 'GET', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);

      this.setState({
        name: data.name,
        email: data.email,
        phoneNumber: data.phone,
        address: data.address,
        requestState: data.state,
        approveModalOpen: false,
        rejectModalOpen: false
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  handleShowDialog = () => {
    this.setState({ imageModalOpen: true });
  };

  onApprove = () => {
    console.log("onApprove");
    this.setState({ approveModalOpen: true });
  }

  onReject = () => {
    console.log("onReject");
    this.setState({ rejectModalOpen: true });
  }

  onApproveYes = () => {
    this.setState({ 
      approveModalOpen: false,
      requestState: "approved" 
    });

    fetch(Config.SERVER_URL + '/api/users/requests/' + this.props.match.params.requestId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: "approved" })
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  onRejectYes = () => {
    this.setState({ 
      rejectModalOpen: false,
      requestState: "rejected" 
    });

    fetch(Config.SERVER_URL + '/api/users/requests/' + this.props.match.params.requestId, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ state: "rejected" })
    })
    .then(response => response.json())
    .then(result => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    const { classes } = this.props;

    return (     
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>
                  { 
                    this.state.requestState == "pending"? "Pending Request":
                    (this.state.requestState == "approved"? "Approved": "Rejected")
                    + " Request"
                  }
                </h4>
                <p className={classes.cardCategoryWhite}>
                  { 
                    this.state.requestState == "pending"? "Pending user request":
                    (this.state.requestState == "approved"? "Approved": "Rejected")
                    + " user request"
                  }
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.name 
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.email 
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ paddingTop: 20 }}>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Phone Number"
                      id="phone-number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.phoneNumber 
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Address"
                      id="address"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.address 
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ paddingTop: 20 }}>
                  <GridItem xs={12} sm={12} md={12}>
                    <img
                      className="small"
                      src={require("../../assets/img/cover.jpeg")}
                      onClick={this.handleShowDialog}
                      alt="no image"
                      width="30%"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              {
                this.state.requestState == "pending"?
                <CardFooter>
                  <Button color="success" onClick={this.onApprove}>Approve</Button>
                  <Button color="danger" onClick={this.onReject}>Reject</Button>
                </CardFooter>:
                (this.state.requestState == "approved"?
                <CardFooter>                  
                  <text style={{ fontSize: 20, color: 'green', fontWeight: "bold" }}>
                    Approved
                  </text>
                </CardFooter>:
                <CardFooter>   
                  <text style={{ fontSize: 20, color: 'red', fontWeight: "bold" }}>
                    Rejected
                  </text>
                </CardFooter>)
              }
            </Card>
          </GridItem>
        </GridContainer>
        <Modal
          open={this.state.approveModalOpen}
          onClose={() => this.setState({ approveModalOpen: false })}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.requestModal}>
            <div style={{ marginBottom: 20, marginLeft: 50 }}>
              Do you really want to approve this request?
            </div>
            <div style={{ marginLeft: 100 }}>
              <Button color="success" onClick={this.onApproveYes} style={{ marginRight: 20 }}>Yes</Button>
              <Button color="danger" onClick={() => this.setState({ approveModalOpen: false })}>No</Button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.rejectModalOpen}
          onClose={() => this.setState({ rejectModalOpen: false })}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.requestModal}>
            <div style={{ marginBottom: 20, marginLeft: 50 }}>
              Do you really want to reject this request?
            </div>
            <div style={{ marginBottom: 20, width: '100%' }}>
              <TextField label="Comment" fullWidth />
            </div>
            <div style={{ marginLeft: 100 }}>
              <Button color="success" onClick={this.onRejectYes} style={{ marginRight: 20 }}>Yes</Button>
              <Button color="danger" onClick={() => this.setState({ rejectModalOpen: false })}>No</Button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.imageModalOpen}
          onClose={() => this.setState({ imageModalOpen: false })}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div>                    
            <img
              className="small"
              src={require("../../assets/img/cover.jpeg")}
              alt="no image"
              width="100%"
              height="100%"
              onClick={() => this.setState({ imageModalOpen: false })}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    userRequests: state.userRequests.userRequests,
  }),
  dispatch => ({
    userRequestsAction: bindActionCreators(userRequestsAction, dispatch),
  }),
)(withStyles(styles)(UserProfile));