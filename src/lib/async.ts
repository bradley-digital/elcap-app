import type { RefObject } from "react";

type Condition = {
  ref: RefObject<string | number | boolean>;
  toEqual: string | number | boolean;
}

export function waitForRef(condition: Condition): Promise<void> {
  return new Promise((res, rej) => {
    const start = Date.now();
    const intervalId = setInterval(function() {
      console.log("waitForRef", condition);
      if (condition.ref.current === condition.toEqual) {
        clearInterval(intervalId);
        res();
      } else if (Date.now() > start + (3 * 1000)) {
        clearInterval(intervalId);
        rej(new Error('waitFor timeout'));
      }
    }, 100);
  });
}
