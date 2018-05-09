export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');
  const application = arguments[1] || arguments[0];
  [
    'component',
    'controller',
    'route',
    'view',
    'adapter',
  ].forEach(type => {
    application.inject(type, 'toast', 'service:toast');
  });
}

export default {
  name: 'toast',
  initialize
};
