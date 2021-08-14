import React from "react";
import PropTypes from "prop-types";

import moment from "moment-timezone";
import "./index.css";

// import { css, jsx } from '@emotion/react'

import FiberManualRecordIcon from "./svg/fiberManualRecord";

import Tooltip from "./tooltip";

import { Manager, Reference } from 'react-popper';

export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {      
      startTime: moment(this.props.startTime),
      endTime: moment(this.props.endTime),

      showTooltip: false,
    }

    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.closeTooltip = this.closeTooltip.bind(this);
  }

  closeTooltip() {
    this.setState({showTooltip: false});
  }

  toggleTooltip() {
    this.setState({showTooltip: !this.state.showTooltip});
  }

  render() {
    return (
      <Manager>
        <div 
          className="event"
          tabIndex="0"
          onBlur={this.closeTooltip}>
          <Reference>
            {({ref}) => (
              <div className="ref"
                onClick={this.toggleTooltip}
                ref={ref}
              >
                <div 
                  className="event-text" 
                >
                  <span className="text">
                    <FiberManualRecordIcon fill="currentColor" fontSize="inherit" width="100%" />
                  </span>
                  <span className="mq">
                    { this.state.startTime.format("h:mma ") }
                  </span>
                  <span style={{fontWeight: "500"}}>
                    {this.props.name}
                  </span>
                </div>
              </div>
            )}
          </Reference>
          <Tooltip
            name={this.props.name}
            startTime={moment(this.props.startTime)}
            endTime={moment(this.props.endTime)}
            description={this.props.description}
            location={this.props.location}
            tooltipStyles={this.props.tooltipStyles}
            showTooltip={this.state.showTooltip}
            closeTooltip={this.closeTooltip}
            calendarName={this.props.calendarName}
          />
        </div>
      </Manager>
    )
  }
}
