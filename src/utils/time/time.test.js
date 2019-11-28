import {formatTimeToHM, formatDateForReview, formatTimeForPlayer, twoDigitView} from "./time.js";


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

  it(`Util formatDateForReview`, () => {
    expect(formatDateForReview(1574778476298)).toEqual({
      dateTime: `2019-11-26`,
      view: `November 26, 2019`
    });
  });

  it(`Util formatTimeForPlayer`, () => {
    expect(formatTimeForPlayer()).toEqual(`00:00:00`);
    expect(formatTimeForPlayer(0)).toEqual(`00:00:00`);
    expect(formatTimeForPlayer(0.000001)).toEqual(`00:00:00`);
    expect(formatTimeForPlayer(0.999999)).toEqual(`00:00:00`);
    expect(formatTimeForPlayer(1)).toEqual(`00:00:01`);
    expect(formatTimeForPlayer(30)).toEqual(`00:00:30`);
    expect(formatTimeForPlayer(59.000001)).toEqual(`00:00:59`);
    expect(formatTimeForPlayer(59.999999)).toEqual(`00:00:59`);
    expect(formatTimeForPlayer(60)).toEqual(`00:01:00`);
    expect(formatTimeForPlayer(90)).toEqual(`00:01:30`);
    expect(formatTimeForPlayer(3599)).toEqual(`00:59:59`);
    expect(formatTimeForPlayer(3599.999999)).toEqual(`00:59:59`);
    expect(formatTimeForPlayer(3600.000001)).toEqual(`01:00:00`);
    expect(formatTimeForPlayer(3661.000001)).toEqual(`01:01:01`);
    expect(formatTimeForPlayer(3661.000001)).toEqual(`01:01:01`);
    expect(formatTimeForPlayer(359999.999999)).toEqual(`99:59:59`);
  });

  it(`Util twoDigitView`, () => {
    expect(twoDigitView()).toEqual(`00`);
    expect(twoDigitView(1)).toEqual(`01`);
    expect(twoDigitView(10)).toEqual(`10`);
    expect(twoDigitView(11)).toEqual(`11`);
    expect(twoDigitView(99)).toEqual(`99`);
    expect(() => twoDigitView(`any`)).toThrowError(`number is out of range [0, 99] and must be integer`);
    expect(() => twoDigitView(-1)).toThrowError(`number is out of range [0, 99] and must be integer`);
    expect(() => twoDigitView(100)).toThrowError(`number is out of range [0, 99] and must be integer`);
  });
});
