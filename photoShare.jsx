import React from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import UserComments from "./components/UserComments";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromChild: null,
      source: null,
      advancedFeature: localStorage.getItem('advancedFeature') === 'true',
    };
  }

  parentCallBack = (fromChild, source) => {
    this.setState({ dataFromChild: fromChild });
    this.setState({ source: source });
  };

  topBarCallBack = (fromTopBar) => {
    console.log('topBarCallBack', fromTopBar);
    this.setState({ advancedFeature: fromTopBar });
  };

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar context={this.state.dataFromChild} source={this.state.source} callback={this.topBarCallBack}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList advancedFeature={this.state.advancedFeature}/>
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Typography variant="body1">
                        Welcome to your photosharing app! This{" "}
                        <a href="https://mui.com/components/paper/">Paper</a>{" "}
                        component displays the main content of the application.
                        The {"sm={9}"} prop in the{" "}
                        <a href="https://mui.com/components/grid/">Grid</a> item
                        component makes it responsively display 9/12 of the
                        window. The Switch component enables us to conditionally
                        render different components to this part of the screen.
                        You don&apos;t need to display anything here on the
                        homepage, so you should delete this Route component once
                        you get started.
                      </Typography>
                    )}
                  />
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} callback={this.parentCallBack} />}
                  />
                  <Route 
                    path="/photos/:userId/:photoId"
                    render={(props) => <UserPhotos {...props} callback={this.parentCallBack} advancedFeature={this.state.advancedFeature}/>}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} callback={this.parentCallBack} advancedFeature={this.state.advancedFeature}/>}
                  />
                  <Route
                    path="/userComments/:userId"
                    render={(props) => <UserComments {...props}/>}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

export default withRouter(PhotoShare);

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
