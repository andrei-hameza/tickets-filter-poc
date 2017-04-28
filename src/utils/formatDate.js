import moment from 'moment';

moment.locale('ru');

moment.updateLocale('ru', {
  weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  monthsShort: ['янв', 'февр', 'март', 'апр', 'мая', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек']
});

export default (date) => moment(date, 'DD:MM:YY').format('D MMM YYYY, ddd');
