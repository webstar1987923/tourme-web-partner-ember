import Ember from 'ember';

export function getTourDuration(params/*, hash*/) {
  let tour = params[0];
  let dataUtils = params[1];
  return tour ? dataUtils.transform.minToHours(tour.duration) : null;
}

export default Ember.Helper.helper(getTourDuration);
