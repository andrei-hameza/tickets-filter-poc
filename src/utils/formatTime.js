import moment from 'moment';

export default (time) => moment(time, 'hh:mm').format('HH:mm');
