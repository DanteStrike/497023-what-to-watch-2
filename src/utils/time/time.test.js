import {formatTimeToHM} from "./time.js";


describe(`Time Utils should work correctly`, () => {
  it(`Util formatTimeToHM`, () => {
    expect(formatTimeToHM(0)).toEqual(``);
    expect(formatTimeToHM(1)).toEqual(`1m`);
    expect(formatTimeToHM(59)).toEqual(`59m`);
    expect(formatTimeToHM(60)).toEqual(`1h`);
    expect(formatTimeToHM(61)).toEqual(`1h 1m`);
    expect(formatTimeToHM(119)).toEqual(`1h 59m`);
    expect(formatTimeToHM(121)).toEqual(`2h 1m`);
  });
});
