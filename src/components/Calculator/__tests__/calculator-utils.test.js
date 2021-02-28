import { doCalculation, doSimpleCalculation } from '../calculator-utils';

describe('board-utils', () => {
  describe('doCalculation', () => {
    it('should throw an error if argument is not an array', () => {
      expect(() => {
        doCalculation('');
      }).toThrow();

      expect(() => {
        doCalculation(null);
      }).toThrow();

      expect(() => {
        doCalculation(undefined);
      }).toThrow();

      expect(() => {
        doCalculation(0);
      }).toThrow();

      expect(() => {
        doCalculation([]);
      }).not.toThrow();
    });

    it('should throw an error if operation contains elements that are not operators/numbers/parenthesis', () => {
      expect(() => {
        doCalculation([ 'a', '+', 'b' ]);
      }).toThrow();

      expect(() => {
        doCalculation([ '1', '$', '4' ]);
      }).toThrow();

      expect(() => {
        doCalculation([ '1', '$', '4' ]);
      }).toThrow();
    });

    it('should throw an error if parenthesis are not in balance', () => {
      expect(() => {
        expect(doCalculation([ '(', '10', '+', '2' ]));
      }).toThrow();

      expect(() => {
        expect(doCalculation([ '10', '+', '2', ')' ]));
      }).toThrow();

      expect(() => {
        expect(doCalculation([ '(', '10', '+', '2', ')' ]));
      }).not.toThrow();
    });

    it('should calculate an operation', () => {
      expect(doCalculation([])).toBe(0);
      expect(doCalculation([ '1' ])).toBe(1);
      expect(doCalculation([ '1', '+', '1' ])).toBe(1 + 1);
      expect(doCalculation([ '1', '-', '1' ])).toBe(1 - 1);
      expect(doCalculation([ '1', '-', '2' ])).toBe(1 - 2);
      expect(doCalculation([ '2', '*', '2' ])).toBe(2 * 2);
      expect(doCalculation([ '4', '+', '2', '*', '2' ])).toBe(4 + 2 * 2);
      expect(doCalculation([ '2', '/', '4' ])).toBe(2 / 4);
      expect(doCalculation([ '4', '-', '2', '*', '(', '10', '+', '2', ')' ])).toBe(4 - 2 * (10 + 2));
      expect(doCalculation([ '4', '-', '2', '*', '(', '10', '+', '2', ')' ])).toBe(4 - 2 * (10 + 2));
      expect(doCalculation([ '1', '-', '2', '/', '(', '1', '-', '2', ')' ])).toBe(1 - 2 / (1 - 2));
      expect(doCalculation([ '2', '*', '(', '10', '*', '(', '4', '+', '2', ')', '/', '4', ')' ])).toBe(2 * ((10 * (4 + 2)) / 4));
      expect(doCalculation([ '2', '*', '(', '10', '*', '(', '(', '4', '+', '2', ')', '/', '4', ')', ')' ])).toBe(2 * (10 * ((4 + 2) / 4)));
      expect(doCalculation([ '4', '-', '2', '*', '(', '10', '+', '(', '4', '+', '2', ')', '+', '4', ')' ])).toBe(4 - 2 * (10 + (4 + 2) + 4));
      expect(doCalculation([ '4', '-', '2', '*', '(', '10', '+', '4', ')', '+', '(', '2', '+', '4', ')' ])).toBe(4 - 2 * (10 + 4) + (2 + 4));
    });
  });

  describe('doSimpleCalculation', () => {
    it('should calculate an operation without parenthesis', () => {
      expect(doSimpleCalculation([])).toBe(0);
      expect(doSimpleCalculation([ '1' ])).toBe(1);
      expect(doSimpleCalculation([ '1', '+', '1' ])).toBe(1 + 1);
      expect(doSimpleCalculation([ '1', '-', '1' ])).toBe(1 - 1);
      expect(doSimpleCalculation([ '1', '-', '2' ])).toBe(1 - 2);
      expect(doSimpleCalculation([ '2', '*', '2' ])).toBe(2 * 2);
      expect(doSimpleCalculation([ '4', '+', '2', '*', '2' ])).toBe(4 + 2 * 2);
      expect(doSimpleCalculation([ '2', '/', '4' ])).toBe(2 / 4);
      expect(doSimpleCalculation([ '2', '/', '4', '-', '3' ])).toBe(2 / 4 - 3);
      expect(doSimpleCalculation([ '4', '+', '2', '*', '2', '/', '4', '-', '3' ])).toBe(4 + (2 * 2) / 4 - 3);
    });
  });
});
