import {getIsValidFormatEmail} from "./validation";

it(`Util getIsValidEmail should work`, () => {
  expect(getIsValidFormatEmail(`test.test.com`)).toEqual(false);
  expect(getIsValidFormatEmail(`test@.test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`@test.test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`test@test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`test@.test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`.test@test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`test()*@test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`test..1234@test.test`)).toEqual(false);
  expect(getIsValidFormatEmail(`true@true`)).toEqual(false);
  expect(getIsValidFormatEmail(`true@true.test`)).toEqual(false);
  expect(getIsValidFormatEmail(``)).toEqual(false);
  expect(getIsValidFormatEmail()).toEqual(false);

  expect(getIsValidFormatEmail(`true@true.123`)).toEqual(true);
  expect(getIsValidFormatEmail(`true@true.12`)).toEqual(true);
  expect(getIsValidFormatEmail(`true___111@true.12`)).toEqual(true);
});
