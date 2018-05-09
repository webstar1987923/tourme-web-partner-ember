import Service from '@ember/service';

export default Service.extend({
  user   :['pic'], //también se puede angregar nested ej: 'guideInfo.country','guideInfo.vehicle.make'
  message:['pic', 'cDate'],
  interview:['guide','user']  
});
