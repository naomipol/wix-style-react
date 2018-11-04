import React from 'react';
import calendarDriverFactory from './Calendar.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import Calendar from './Calendar';

const createDriver = createDriverFactory(calendarDriverFactory);

describe('Calendar', () => {
  describe('rendering the Calendar', () => {
    const monthNames = 'January February March April May June July August September October November December'.split(
      ' ',
    );
    const OCTOBER = 9,
      NOVEMBER = 10;

    it('should display the month of the {from} Date if the provided value is {from, to}', () => {
      const driver = createDriver(
        <Calendar
          value={{
            from: new Date(2018, OCTOBER, 5),
            to: new Date(2018, NOVEMBER, 7),
          }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {from} Date if the provided value is {from, to} with date strings', () => {
      const driver = createDriver(
        <Calendar
          value={{ from: '2018/10/05', to: '2018/11/07' }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {from} Date if the provided value is {from}', () => {
      const driver = createDriver(
        <Calendar
          value={{ from: new Date(2018, OCTOBER, 5) }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {from} Date if the provided value is {from} with a date string', () => {
      const driver = createDriver(
        <Calendar value={{ from: '2018/10/05' }} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[OCTOBER]);
    });

    it('should display the month of the {to} Date if the provided value is {to}', () => {
      const driver = createDriver(
        <Calendar
          value={{ to: new Date(2018, NOVEMBER, 7) }}
          onChange={() => {}}
        />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the month of the {to} Date if the provided value is {to} with a date string', () => {
      const driver = createDriver(
        <Calendar value={{ to: '2018/11/07' }} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the month of the Date if the provided value is a single Date', () => {
      const driver = createDriver(
        <Calendar value={new Date(2018, NOVEMBER, 7)} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the month of the Date if the provided value is a single date string', () => {
      const driver = createDriver(
        <Calendar value={'2018/11/07'} onChange={() => {}} />,
      );

      expect(driver.getMonthCaption()).toEqual(monthNames[NOVEMBER]);
    });

    it('should display the current month if the provided value is undefined', () => {
      const driver = createDriver(<Calendar onChange={() => {}} />);

      expect(driver.getMonthCaption()).toEqual(
        monthNames[new Date().getMonth()],
      );
    });

    it('should display the current month if the provided value is an empty object', () => {
      const driver = createDriver(<Calendar value={{}} onChange={() => {}} />);

      expect(driver.getMonthCaption()).toEqual(
        monthNames[new Date().getMonth()],
      );
    });
  });

  describe('clicking on a day', () => {
    let onChange;

    beforeEach(() => {
      onChange = jest.fn();
    });
    describe("with selectionMode='day'", () => {
      it('should call onChange with the clicked day', () => {
        const driver = createDriver(
          <Calendar
            value={new Date(2018, 10, 5)}
            onChange={onChange}
            selectionMode={'day'}
          />,
        );

        expect(onChange.mock.calls).toHaveLength(0);

        driver.clickOnNthDay(0);

        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].getDate()).toEqual(1);
      });
    });

    describe("with selectionMode='range'", () => {
      it('should call onChange({from: $clickedDay}) when value is undefined', () => {
        const driver = createDriver(
          <Calendar onChange={onChange} selectionMode={'range'} />,
        );

        driver.clickOnNthDay(0);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it('should call onChange({from: $clickedDay}) when value is a Range', () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 5), to: new Date(2018, 10, 10) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it('should call onChange({from: $clickedDay}) when value is a single Date', () => {
        const driver = createDriver(
          <Calendar
            value={new Date(2018, 10, 5)}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
      });

      it(`should call onChange({from: $from, to: $clickedDay}) when value has only 'from'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 1) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(2);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(3);
      });

      it(`should call onChange({from: $clickedDay, to: $to}) when a day is clicked, given only 'to'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ to: new Date(2018, 10, 3) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(0);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(1);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(3);
      });

      it(`should call onChange({from: $clickedDay, to: $from}) when a day is clicked, given only 'from'`, () => {
        const driver = createDriver(
          <Calendar
            value={{ from: new Date(2018, 10, 10) }}
            onChange={onChange}
            selectionMode={'range'}
          />,
        );

        driver.clickOnNthDay(2);
        expect(onChange.mock.calls).toHaveLength(1);
        expect(onChange.mock.calls[0][0].from.getDate()).toEqual(3);
        expect(onChange.mock.calls[0][0].to.getDate()).toEqual(10);
      });
    });
  });
});
