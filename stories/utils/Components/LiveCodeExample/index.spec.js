import { createPropsArray } from '.';

describe('LiveCodeExample', () => {
  describe('createPropsArray', () => {
    it('should return an array of string matching the props object', () => {
      expect(
        createPropsArray({
          stringProp: 'I am a string',
          numberProp: 5,
          arrayProp: [1, 'two'],
          objectProp: {
            prop1: 'string',
            prop2: 2,
          },
        }),
      ).toEqual(
        expect.arrayContaining([
          'stringProp="I am a string"',
          'numberProp={5}',
          'arrayProp={[1,"two"]}',
          'objectProp={{"prop1":"string","prop2":2}}',
        ]),
      );
    });
  });
});
