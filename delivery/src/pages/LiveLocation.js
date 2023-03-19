import React, { useEffect, useState } from 'react';

const LiveLocation = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = (pos) => {
      const crd = pos.coords;
      console.log("===called",crd);
      setLatitude(crd.latitude);
      setLongitude(crd.longitude);
      setError(null);
    };

    const failure = (err) => {
      setError(err.message);
    };

    navigator.geolocation.watchPosition(success, failure, options);
  }, []);

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default LiveLocation;