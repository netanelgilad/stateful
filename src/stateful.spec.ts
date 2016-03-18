import chai = require('chai');
import {makeStateful} from "./stateful";
import {createState} from "./stateful";
import {PARAM} from "./stateful";
import {getStateValue} from "./stateful";

describe('stateful', () => {
  describe('makeStateful', () => {
    function add(a,b,c) {
      return a + b * c;
    }
    const SUM = Symbol();

    beforeEach(() => {
      createState(SUM, 20);
    });

    it('should return a stateful function when called with state definition', () => {
      let statefulFunction = makeStateful(add, { params: [SUM, PARAM, PARAM]});
      chai.expect(statefulFunction(5, 6)).to.equal(50);
    });

    it('should return a stateful function when called with non state argument in the middle of the arguments', () => {
      let statefulFunction = makeStateful(add, { params: [PARAM, SUM, PARAM]});
      chai.expect(statefulFunction(4,20)).to.equal(404);
      chai.expect(statefulFunction(20,4)).to.equal(100);
    });

    it('should set the return value of a stateful function on the state when defined so', () => {
      let statefulFunction = makeStateful(add, { returns: SUM });

      statefulFunction(1,2,3);

      chai.expect(getStateValue(SUM)).to.equal(7);
    });
  });
});