/**
 * Created by jonlazarini on 14/02/17.
 */
import React, { PropTypes, defaultProps } from 'react';
import styled from 'styled-components';


const Link = ({...props, href, children}) => <a {...props} href={href}>{children}</a>;

Link.propTypes = {
  href: React.PropTypes.string,
  children: React.PropTypes.string
};

Link.defaultProps = {
  href: '#',
  children: 'text link'
};

const StyledComp = (Comp) => styled(Comp)`color: red`;

const StyledLink = StyledComp(Link);


export default StyledLink;
