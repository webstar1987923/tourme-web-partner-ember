import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('guide', {path: 'guide/:guide_id'});
  this.route('tours');
  this.route('tour', {path: 'tour/:id'});  
  this.route('bookings');
  this.route('booking', {path: 'booking/:id'});  
});

export default Router;
