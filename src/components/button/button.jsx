/**
 * Created by jonlazarini on 14/02/17.
 */
import React from 'react';
import styled from 'styled-components';


// Style wrapper for default buttons - Composition
const NormButton = (Comp) => styled(Comp)`
    background: palevioletred;
    border-radius: 3px;
    border: none;
    color: white;
    &:hover {
      color: yellow;
    }
    &:after {
      content: 'content'
    }
    &:before {
      content: 'content'
      color: yellow;
    }
    &:nth-child(2) {
      color: black;
    }
`;

export default NormButton;
