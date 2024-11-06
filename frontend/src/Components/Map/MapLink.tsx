import React from 'react';

interface MapLinkProps {
  latitude: number;
  longitude: number;
}

export const MapLink: React.FC<MapLinkProps> = ({ latitude, longitude }) => {
  // Construct the Google Maps URL with the latitude and longitude
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const openMap = () => {
    // Open Google Maps with the coordinates
    window.open(mapUrl, '_blank');
  };

  return (
    <div onClick={openMap} style={{ padding: '10px', fontSize: '16px' }}>
      Open Location in Google Maps
    </div>
  );
};

