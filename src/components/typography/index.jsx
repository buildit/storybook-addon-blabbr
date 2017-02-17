/**
 * Created by jonlazarini on 15/02/17.
 */
import styled from 'styled-components';

// TODO Add style composition for later - HOC/Wrapper
export const H1 = styled.h1`
  box-sizing: border-box;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 1.7em;
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  font-weight: bold;
  text-align: left;
  color: #444;
  background: transparent;
`;

export const H2 = styled.h2`
  box-sizing: border-box;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 1.2em;
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  font-weight: 400;
  text-align: center;
  text-transform: uppercase;
  color: rgb(190, 190, 190);
  background: transparent;
`;

export const H3 = styled.h3`
  box-sizing: border-box;
  display: block;
  padding: 10px;
  width: 100%;
  font-size: 1.1em;
  font-family: -apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif;
  font-weight: bold;
  text-align: center;
  color: #444;
  background: transparent;
`;

export const HyperLink = styled.a`
  font-size: 1em;
  font-weight: 400;
  text-align: center;
  text-transform: lowercase;
  color: ${props => props.secondary ? '#BEBEBE' : '#777'};
  &:hover {
    font-weight: 500;
    color: #444;
    text-decoration: underline;
    cursor: pointer;
  }
  transition: color .2s ease
`;
