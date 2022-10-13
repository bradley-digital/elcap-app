import { test as base } from '@playwright/test';
import { user } from './utils';
export type Options = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
};

// Extend basic test by providing a "defaultItem" option and a "todoPage" fixture.
export const test = base.extend<Options>({
  user: user,
});
