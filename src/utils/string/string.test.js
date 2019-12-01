import {formatServerErrorMsg} from "./string.js";

it(`Util formatServerErrorMsg`, () => {
  expect(formatServerErrorMsg(`child "email" fails because ["email" must be a valid email]`))
    .toEqual({
      type: `email`,
      msg: `"email" must be a valid email`
    });
  expect(formatServerErrorMsg(`any`))
    .toEqual({
      type: ``,
      msg: `any`
    });
});
