import { useRef, useEffect, useLayoutEffect } from 'react';
import range from 'lodash.range';

/**
 * Calls `callback` function when any value from the `values` array changed
 * @param callback - callback function
 * @param values - array of observed values
 * @param layoutEffect - use 'layoutEffect' hook instead of 'useEffect'
 */
export default <T extends unknown[]>(callback: (prev: T) => void, values: T, layoutEffect = false) => {
  const prevValues = useRef<T>();
  const effectFn = layoutEffect ? useLayoutEffect : useEffect;

  effectFn(() => {
    if (prevValues.current) {
      if (values.length !== prevValues.current.length) {
        callback(prevValues.current);
      } else {
        for (const index of range(values.length)) {
          if (values[index] !== prevValues.current[index]) {
            callback(prevValues.current);
            break;
          }
        }
      }
    }
    prevValues.current = values;
  });
};
