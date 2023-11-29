import React from "react";
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from "@mui/material";

import "./styles.css";
import axios from "axios";
/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: "Welcome",
      version: null,
      checked: localStorage.getItem('advancedFeature') === 'true',
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/test/info')
      .then(response => {
        this.setState({ version: response.data.__v });
      })
      .catch(error => {
        console.error('Error fetching version: ', error);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.context !== this.props.context) {
      const newContext = this.props.source === "photo" ? `${this.props.context}'s photo` : this.props.context;
      this.setState({ 
        context:  newContext,
      });
    }
  }

  handleCheckBox = (event) => {
    this.setState({ checked: event.target.checked }, () => {
      localStorage.setItem('advancedFeature', this.state.checked);
      this.props.callback(this.state.checked);
    });
  };

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar className="toolbar">
          <Typography variant="h5" color="inherit">
            Bilguundalaim Version: {this.state.version}
          </Typography>
          <div>
            <Typography variant="h5" color="inherit">
              {this.state.context}
            </Typography>
            <FormControlLabel 
              control={<Checkbox onChange={this.handleCheckBox} color="default" checked={this.state.checked}/>}
              label="Enable Advanced Feature"
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
