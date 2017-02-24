/**
 * Created by jonlazarini on 23/02/17.
 */
import React from 'react';
import styled from 'styled-components';

const BaseLabel = ({ htmlFor, children, ...props }) => (
  <label
    {...props}
    htmlFor={htmlFor}
  >
    { children }
  </label>
);

BaseLabel.propTypes = {
  htmlFor: React.PropTypes.string,
  children: React.PropTypes.string.isRequired,
};

BaseLabel.defaultProps = {
  htmlFor: 'html-for',
  children: 'text label',
};

export const Label = styled(BaseLabel)`
  box-sizing: border-box;
  display: inline-block;
  margin-right: .5em;
  padding: 2em .8em;
  width: 30%;
  min-width: 20%;
  font-family: -apple-system,
    ".SFNSText-Regular",
    "San Francisco",
    Roboto,
    "Segoe UI",
    "Helvetica Neue",
     "Lucida Grande",
     sans-serif;
  font-size: 1em;
  font-style: normal;
  text-align: right;
  color: #444;
`;

export default Label;
