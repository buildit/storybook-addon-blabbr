import chai, { should, expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

global.chai = chai;
chai.use(chaiAsPromised);
chai.use(sinonChai);

global.should = should();
global.expect = expect;
global.sinon = sinon;
