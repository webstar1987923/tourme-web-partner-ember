export function initialize(/* container, application */) {
  // Support older and newer style initializer calls
  const application = arguments[1] || arguments[0];
  [
    'controller',
    'route',
  ].forEach(type => {
    application.inject(type, 'remote', 'service:remote');
  });
}

export default {
  name: 'remote',
  initialize: initialize
};
