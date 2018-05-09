export function initialize(/* container, application */) {
  // Support older and newer style initializer calls
  const application = arguments[1] || arguments[0];
  [
    'component',
    'controller',
    'model',
    'route',
    'helper',
    'view',
  ].forEach(type => {
    application.inject(type, 'i18n', 'service:i18n');
  });
}

export default {
  name: 'i18n',
  initialize: initialize
};
