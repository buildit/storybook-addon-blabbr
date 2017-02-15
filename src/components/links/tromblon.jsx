/**
 * Created by jonlazarini on 14/02/17.
 */
import React from 'react';
import styled from 'styled-components';


const Link = ({...props, yo}) => <a {...props} href={yo}>{yo}</a>;

const StyledComp = (Comp) => styled(Comp)`color: red`;

const StyledLink = StyledComp(Link);


export default StyledLink;
