import { TestScheduler } from "rxjs/testing";

export type RunCallback = Parameters<typeof TestScheduler.prototype.run>[0];
export type RunHelpers = Parameters<RunCallback>[0];

export const runSheduler = (callback: (helpers: RunHelpers) => any) => {
    new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    }).run(callback);
}