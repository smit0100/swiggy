const getNearestDeliveryBoy = (deliveryBoys,targetLocation) => {
  const EARTH_RADIUS = 6371; // Earth's average radius in kilometers
  let nearestDeliveryBoy = null;
  let nearestDistance = Infinity;

  deliveryBoys.forEach((deliveryBoy) => {
    const { lattitute: dbLatitude, longitute: dbLongitude } = deliveryBoy;

    const lat1 = (Math.PI / 180) * targetLocation.latitude;
    const lon1 = (Math.PI / 180) * targetLocation.longitude;
    const lat2 = (Math.PI / 180) * dbLatitude;
    const lon2 = (Math.PI / 180) * dbLongitude;

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS * c;

    if (distance < nearestDistance) {
      nearestDeliveryBoy = deliveryBoy;
      nearestDistance = distance;
    }
  });

  return nearestDeliveryBoy;
};
module.exports = { getNearestDeliveryBoy };