import React, { Component } from "react";
import PropTypes from "prop-types";
import { Calendar as CalendarDHX } from "dhx-suite";
import "dhx-suite/codebase/suite.min.css";

class Calendar extends Component {
  componentDidMount() {
    this.calendar = new CalendarDHX(this.el, {
      css: "dhx_widget",
      value: new Date(),
    });
  }
  componentWillUnmount() {
    this.calendar && this.calendar.destructor();
  }
  render() {
    return <div ref={(el) => (this.el = el)}></div>;
  }
}

Calendar.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  css: PropTypes.string,
  mark: PropTypes.func,
  disabledDates: PropTypes.func,
  weekStart: PropTypes.oneOf(["sturday", "sunday"]),
  weekNumbers: PropTypes.bool,
  mode: PropTypes.oneOf(["calendar"]),
  timePicker: PropTypes.bool,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.oneOf([12, 12]),
  thisMonthOnly: PropTypes.bool,
  width: PropTypes.string,
  range: PropTypes.bool,
};

export default Calendar;
