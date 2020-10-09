import React, { Component } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userRequestsAction from '../../store/userRequests/actions';

const styles = {    
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

//const useStyles = makeStyles(styles);

class Requests extends Component {

    constructor(props) {
      super(props);
      
      this.state = {
        requestState: this.props.match.params.state,
        userRequests: [],
      };
      
      // load user requests from the server
      fetch('http://localhost:3003/api/users/requests', {
        method: 'GET', // or 'PUT'
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        
        var userRequests = [];
        var tableData = [];

        data.forEach(request => {
          if (request.state == this.state.requestState) {
            userRequests.push(request);
          }
        });

        this.setState({
          userRequests: userRequests,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }

    render() {
        const { classes } = this.props;

        return (
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>
                      {
                        this.state.requestState == "approved"? "Approved":
                        (this.state.requestState == "rejected"? "Rejected": "Pending")
                      } Requests
                    </h4>
                    <p className={classes.cardCategoryWhite}>
                    List of {this.state.requestState} user requests
                    </p>
                </CardHeader>
                <CardBody>
                    <Table
                    tableHeaderColor="primary"
                    tableHead={["Name", "Email", "Phone Number", "Address"]}
                    tableData={this.state.userRequests}
                    />
                </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
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
  )(withStyles(styles)(Requests));