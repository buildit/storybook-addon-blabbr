/**
 * Created by jonlazarini on 14/02/17.
 */
import styled from 'styled-components';
// import Button from './index.jsx';
import PrimaryButton from './primaryButton';


// Style wrapper for default buttons - Composition
const SecondaryWrapper = Comp => styled(Comp)`
  margin-top: 0.2em;
  padding: 0.6em 1.6em;
  border: 2px solid black;
  font-size: 0.8em;
  font-weight: 600;
  text-transform: lowercase;
  background: black;
  color: white;
  &:hover {
    background: white;
    color: black;
    cursor: pointer;
    }
  `;

const SecondaryButton = SecondaryWrapper(PrimaryButton);


export default SecondaryButton;
