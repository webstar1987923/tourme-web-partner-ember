export function initialize(application) {
  application.inject('route', 'appConstants', 'service:appConstants');
  application.inject('controller', 'appConstants', 'service:appConstants');
  application.inject('component', 'appConstants', 'service:appConstants');
}
export default {
  name: 'appConstants',
  initialize: initialize
};

