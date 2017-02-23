/**
 * Created by jonlazarini on 23/02/17.
 */
import React from 'react';
import styled from 'styled-components';


const BaseInput = ({ id, value, onChange, ...props }) => (
  <input
    {...props}
    id={id}
    value={value}
    onChange={onChange}
  />
);

BaseInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
};

BaseInput.defaultProps = {
  id: 'id',
  value: 'value',
  onChange: null,
};

export const Input = styled(BaseInput)`
    box-sizing: border-box;
    display: inline-block;
    margin-left: .5em;
    padding: .6em .8em;
    width: 40%;
    min-height: 30%;
    border: 1px solid #ccc;
    font-size: 1em;
    font-family: -apple-system,
      ".SFNSText-Regular",
      "San Francisco",
      Roboto,
      "Segoe UI",
      "Helvetica Neue",
      "Lucida Grande",
      sans-serif;
    font-style: normal;
    -webkit-box-shadow: inset 0px 0px 2px 0px rgba(168,168,168,0.76);
    -moz-box-shadow: inset 0px 0px 2px 0px rgba(168,168,168,0.76);
    box-shadow: inset 0px 0px 2px 0px rgba(168,168,168,0.76);      
    inset 0 0 10px #000000;
    &:focus {
      outline: none !important;
      border: 1px solid #e8e8e8;
      box-shadow: inset 0 0 5px #719ECE;
    }
`;

export default Input;
