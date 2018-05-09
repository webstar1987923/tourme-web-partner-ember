import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('bookingHistory', 'booking-histories');
inflector.irregular('creditCard', 'credit-cards');

export default {};