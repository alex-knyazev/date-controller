const { DateTime } = require('luxon');

class DateController {
  constructor(date, leftBorders, rightBorders) {
    this.date = date;
    this.leftBorders = leftBorders;
    this.rightBorders = rightBorders;
    this.setCurrentBorders();
  }

  setCurrentBorders() {
    const { leftBorders, rightBorders } = this;
    const maxLeftBorder = DateTime.fromMillis(Math.max(...leftBorders));
    const minRightBorder = DateTime.fromMillis(Math.min(...rightBorders));
    this.currentLeftBorder = maxLeftBorder;
    this.currentRightBorder = minRightBorder;
  }

  changeDate(possibleNewValue) {
    let newValue = possibleNewValue;
    const { currentLeftBorder, currentRightBorder } = this;
    if (newValue < currentLeftBorder) {
      newValue = currentLeftBorder;
    }
    if (newValue > currentRightBorder) {
      newValue = currentRightBorder;
    }
    this.date = newValue;
  }
}

const date1 = DateTime.local();

const date2 = date1.plus({ hours: 2 });

const date1LeftBorders = [date1];

const todayPlusYear = DateTime.local().plus({ years: 1 });
const date1RightBorders = [date2, todayPlusYear];

const controller = new DateController(
  date1,
  date1LeftBorders,
  date1RightBorders
);

controller.changeDate('2018-12-10');
