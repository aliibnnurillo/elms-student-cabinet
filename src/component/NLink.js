import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function NLink({ children, to, ...rest }) {
  return (
    <NavLink
      to={to}
      isActive={(match, location) => match && location.pathname.includes(to)}
      {...rest}
    >
      {children}
    </NavLink>
  );
}

export default withRouter(NLink);