import * as _ from "lodash";
const _state = {};

export const PARAM = Symbol();
export const RETURN = Symbol();

interface StateDefinition {
  params?: Array<any>;
  returns?: Array<any> | any;
}

export function createState(symbol: any, initialValue: any): void {
  setStateValue(symbol, initialValue);
}

export function makeStateful(func: Function, stateDefinition: StateDefinition): Function {
  return (...args) => {
    let currentArg = 0;
    let toBeArgs = [];

    if (stateDefinition.params) {
      toBeArgs = stateDefinition.params.map((stateForArg) => {
        if (stateForArg === PARAM) {
          return args[currentArg++];
        }
        else {
          return getStateValue(stateForArg);
        }
      });
    }

    const returnValue = func.apply(undefined, toBeArgs.concat(args.slice(currentArg)));

    if (!stateDefinition.returns) {
      return returnValue;
    }
    else if (!_.isArray(stateDefinition.returns)) {
      setStateValue(stateDefinition.returns, returnValue);
    }
    else {
      let result;
      let currentReturn = 0;

      stateDefinition.returns.forEach((stateForReturn) => {
        if (stateForReturn === RETURN) {
          result = returnValue[currentReturn];
        }
        else {
          setStateValue(stateForReturn, returnValue[currentReturn]);
        }

        currentReturn++;
      });

      return result;
    }
  };
}

export function getStateValue(symbol: any): any {
  return _state[symbol];
}

export function setStateValue(symbol: any, value: any) {
  _state[symbol] = value;
}