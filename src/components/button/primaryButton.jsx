/**
 * Created by jonlazarini on 14/02/17.
 */
import React from 'react';
import Button from './index.jsx';
import styled from 'styled-components';


// Style wrapper for default buttons - Composition
const PrimaryWrapper = (Comp) => styled(Comp)`
    box-sizing: border-box;
    display: inline-block;
    padding: 0.8em 1.8em;
    margin-top: 0.5em;
    margin-right: 0.5em;
    background: palevioletred;
    border-radius: 3px;
    border: 3px solid palevioletred;
    font-size: 0.8em;
    text-transform: uppercase;
    color: white;
    &:hover {
      background: white;
      color: palevioletred;
      cursor: pointer;
    }
    transition: background .2s linear;
  `;

const PrimaryButton = PrimaryWrapper(Button);


export default PrimaryButton;
