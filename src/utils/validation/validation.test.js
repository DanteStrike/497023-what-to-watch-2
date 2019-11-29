import {getIsValidEmail} from "./validation";

it(`Util getIsValidEmail should work`, () => {
  expect(getIsValidEmail(`test.test.com`)).toEqual(false);
  expect(getIsValidEmail(`test@.test.test`)).toEqual(false);
  expect(getIsValidEmail(`@test.test.test`)).toEqual(false);
  expect(getIsValidEmail(`test@test.test`)).toEqual(false);
  expect(getIsValidEmail(`test@.test.test`)).toEqual(false);
  expect(getIsValidEmail(`.test@test.test`)).toEqual(false);
  expect(getIsValidEmail(`test()*@test.test`)).toEqual(false);
  expect(getIsValidEmail(`test..1234@test.test`)).toEqual(false);
  expect(getIsValidEmail(`true@true`)).toEqual(false);
  expect(getIsValidEmail(`true@true.test`)).toEqual(false);
  expect(getIsValidEmail(``)).toEqual(false);
  expect(getIsValidEmail()).toEqual(false);

  expect(getIsValidEmail(`true@true.123`)).toEqual(true);
  expect(getIsValidEmail(`true@true.12`)).toEqual(true);
  expect(getIsValidEmail(`true___111@true.12`)).toEqual(true);
});
