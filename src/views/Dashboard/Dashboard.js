import React, { Component } from "react";
import { useHistory } from "react-router-dom";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Link from '@material-ui/core/Link';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Config from "../../config";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userRequestsAction from '../../store/userRequests/actions';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      approved: 0,
      rejected: 0,
      pending: 0,
    }

    // load user requests from the server
    fetch(Config.SERVER_URL + '/api/users/requests', {
      method: 'GET', // or 'PUT'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      //this.props.userRequestsAction.updateUserRequests(data);

      // get approved, rejected, pending count
      var approved = 0;
      var rejected = 0;
      var pending = 0;

      data.forEach(request => {
        if (request.state == "approved") {
          approved ++;
        } else if (request.state == "rejected") {
          rejected ++;
        } else {
          pending ++;
        }
      });

      this.setState({
        approved: approved,
        rejected: rejected,
        pending: pending
      });
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
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Approved</p>
                <h3 className={classes.cardTitle}>{this.state.approved}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <Link href="/admin/requests/approved">
                    See approved requests
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Rejected</p>
                <h3 className={classes.cardTitle}>{this.state.rejected}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  <Link href="/admin/requests/rejected">
                    See rejected requests
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
  
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Pending</p>
                <h3 className={classes.cardTitle}>{this.state.pending}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  <Link href="/admin/requests/pending">
                    See pending requests
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
  
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
)(withStyles(styles)(Dashboard));