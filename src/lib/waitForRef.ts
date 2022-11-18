import type { RefObject } from "react";

type Condition = {
  ref: RefObject<string | number | boolean>;
  toEqual: string | number | boolean;
}

export default function waitForRef(condition: Condition): Promise<void> {
  return new Promise((res, rej) => {
    const start = Date.now();
    let timer: ReturnType<typeof setTimeout>;
    function checkCondition() {
      if (condition.ref.current === condition.toEqual) {
        if (timer) clearTimeout(timer);
        res();
      } else if (Date.now() > start + (15 * 1000)) {
        if (timer) clearTimeout(timer);
        rej(new Error('waitForRef timeout'));
      } else {
        timer = setTimeout(checkCondition, 500);
      }
    }
    checkCondition();
  });
}
