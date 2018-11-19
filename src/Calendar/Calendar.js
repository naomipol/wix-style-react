import styles from './Calendar.scss';
import React from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker/DayPicker';
import addMonths from 'date-fns/add_months';
import startOfMonth from 'date-fns/start_of_month';
import classNames from 'classnames';
import parse from 'date-fns/parse';

import WixComponent from '../BaseComponents/WixComponent';
import localeUtilsFactory from '../LocaleUtils';
import DatePickerHead from './DatePickerHead';

export default class Calendar extends WixComponent {
  static displayName = 'Calendar';

  static defaultProps = {
    locale: 'en',
    className: '',
    filterDate: () => true,
    shouldCloseOnSelect: true,
    rtl: false,
    onClose: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      month: this._getMonth(props),
    };
  }

  static renderDay(day, modifiers) {
    const relevantModifiers = ['start', 'end', 'selected'];
    for (const modifier of relevantModifiers) {
      if (modifier in modifiers) {
        return <div className={styles.dayCircle}>{day.getDate()}</div>;
      }
    }

    return day.getDate();
  }

  _setMonth = month => {
    this.setState({ month });
  };

  _handleDayClick = (value, modifiers = {}) => {
    const propsValue = this.props.value || {};
    const { onChange, shouldCloseOnSelect } = this.props;

    if (this.props.selectionMode === 'range') {
      if (
        (!propsValue.from && !propsValue.to) ||
        (propsValue.from && propsValue.to)
      ) {
        onChange({ from: value }, modifiers);
      } else {
        const anchor = propsValue.from || propsValue.to;
        const newVal =
          anchor < value
            ? { from: anchor, to: value }
            : { from: value, to: anchor };

        onChange(newVal, modifiers);
        shouldCloseOnSelect && this.props.onClose();
      }
    } else {
      onChange(value, modifiers);
      shouldCloseOnSelect && this.props.onClose();
    }
  };

  _getMonth = props => {
    const { value } = props;

    const { from, to } = value || {};
    if (!from && !to && !(value instanceof Date)) {
      return new Date();
    } else {
      return parse(from || to || value);
    }
  };

  _getMonth = props => {
    const { value, selectedDays } = props;

    return (
      (selectedDays || {}).from ||
      (selectedDays || {}).to ||
      selectedDays ||
      value
    );
  };

  _createDayPickerProps = () => {
    const {
      locale,
      showMonthDropdown,
      showYearDropdown,
      filterDate,
      excludePastDates,
      value: propsValue,
      selectedDays,
      rtl,
      twoMonths,
    } = this.props;

    const month = this.state.month || this._getMonth(this.props) || new Date();
    const localeUtils = localeUtilsFactory(locale);
    const from = propsValue && propsValue.from && parse(propsValue.from);
    const to = propsValue && propsValue.to && parse(propsValue.to);
    const singleDay = !from && !to && propsValue;

    const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    let selectedDaysProp;
    if (from && !to) {
      const date = new Date(from);
      date.setDate(from.getDate() - 1);
      selectedDaysProp = { after: parse(date) };
    } else if (!from && to) {
      const date = new Date(to);
      date.setDate(to.getDate() + 1);
      selectedDaysProp = { before: parse(date) };
    } else if (from && to) {
      selectedDaysProp = { from: parse(from), to: parse(to) };
    } else {
      selectedDaysProp = parse(propsValue);
    }

    const captionElement = (
      <DatePickerHead
        {...{
          date: month,
          showYearDropdown,
          showMonthDropdown,
          localeUtils,
          rtl,
          onChange: this._setMonth,
          onLeftArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, -1))),
          onRightArrowClick: () =>
            this._setMonth(startOfMonth(addMonths(month, 1))),
        }}
      />
    );

    function renderDay(day, modifiers) {
      const relevantModifiers = ['start', 'end', 'selected'];
      for (const modifier of relevantModifiers) {
        if (modifier in modifiers) {
          return (
            <div className={`${modifier}Background`}>
              <div className={'circle'}>{day.getDate()}</div>
            </div>
          );
        }
      }

      return day.getDate();
    }

    return {
      disabledDays: excludePastDates
        ? { before: new Date() }
        : date => !filterDate(date),
      initialMonth: month,
      initialYear: month,
      selectedDays: selectedDaysProp,
      month,
      year: month,
      firstDayOfWeek: 1,
      locale: typeof locale === 'string' ? locale : '',
      fixedWeeks: true,
      onKeyDown: this._handleKeyDown,
      onDayClick: this._handleDayClick,
      localeUtils,
      navbarElement: () => null,
      captionElement,
      onDayKeyDown: this._handleDayKeyDown,
      numberOfMonths: twoMonths ? 2 : 1,
      className: twoMonths ? 'DayPicker--TwoMonths' : '',
      modifiers: { start: from, end: to, firstOfMonth, lastOfMonth, singleDay },
      renderDay: Calendar.renderDay,
    };
  };

  _handleKeyDown = event => {
    const keyHandler = this.keyHandlers[event.keyCode];

    keyHandler && keyHandler();
  };

  keyHandlers = {
    // escape
    27: this.props.onClose,

    // tab
    9: this.props.onClose,
  };

  _focusSelectedDay = dayPickerRef => {
    if (dayPickerRef) {
      this.dayPickerRef = dayPickerRef;
      const selectedDay = this.dayPickerRef.dayPicker.querySelector(
        '.DayPicker-Day--selected',
      );

      if (selectedDay) {
        selectedDay.classList.add('DayPicker-Day--unfocused');
        selectedDay.focus();
      }
    }
  };

  _handleDayKeyDown = () => {
    const unfocusedDay = this.dayPickerRef.dayPicker.querySelector(
      '.DayPicker-Day--unfocused',
    );

    if (unfocusedDay) {
      unfocusedDay.classList.remove('DayPicker-Day--unfocused');
    }
  };

  render() {
    return (
      <div className={classNames(styles.calendar, this.props.className)}>
        <DayPicker
          ref={this._focusSelectedDay}
          {...this._createDayPickerProps()}
        />
      </div>
    );
  }
}

Calendar.propTypes = {
  /** Use 2 months layout */
  /* TODO WIP, uncomment after feature done
  twoMonths: PropTypes.bool,
  */

  className: PropTypes.string,

  /** Callback function called with a Date or a Range whenever the user selects a day in the calendar */
  onChange: PropTypes.func.isRequired,

  /** Callback function called whenever user press escape or click outside of the element */
  onClose: PropTypes.func,

  /** Past dates are unselectable */
  excludePastDates: PropTypes.bool,

  /** Only the truthy dates are selectable */
  filterDate: PropTypes.func,

  /** RTL mode */
  rtl: PropTypes.bool,

  /** The selected date */
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),

  /** Whether the user should be able to select a date range, or just a single day */
  selectionMode: PropTypes.oneOf(['day', 'range']),

  /** Display a selectable yearDropdown */
  showYearDropdown: PropTypes.bool,

  /** Display a selectable monthDropdown */
  showMonthDropdown: PropTypes.bool,

  /** should the calendar close on day selection */
  shouldCloseOnSelect: PropTypes.bool,

  /** DatePicker instance locale */
  locale: PropTypes.oneOfType([
    PropTypes.oneOf([
      'en',
      'es',
      'pt',
      'fr',
      'de',
      'pl',
      'it',
      'ru',
      'ja',
      'ko',
      'tr',
      'sv',
      'no',
      'nl',
      'da',
    ]),
    PropTypes.shape({
      distanceInWords: PropTypes.object,
      format: PropTypes.object,
    }),
  ]),
};
