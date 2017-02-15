// Created by jonlazarini on 15/02/17.
import React, { PropTypes, defaultProps } from 'react';
import styled from 'styled-components';


const TextArea = ({...props}) => {
  return (
    <textarea {...props} />
  )
};

TextArea.propTypes = {
  value: React.PropTypes.string,
  onChange: React.PropTypes.func
};

TextArea.defaultProps = {
  value: 'submit',
  onChange: null
};

const TextWrapper = (Comp) => {
  return styled(Comp)`
    box-sizing: border-box;
    display: block;
    padding: 0;
    margin: .5em 0;
    width: 100%;
    min-height: 100px;
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
    resize: none;
  `
};

const RegularTextArea = TextWrapper(TextArea);


export default RegularTextArea;
