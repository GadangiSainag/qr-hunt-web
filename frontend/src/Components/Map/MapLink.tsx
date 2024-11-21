import React from 'react';
import { Button } from '../ui/button';

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
    <Button className = "p-3" onClick={openMap} variant="secondary">
     Track
    </Button>
  );
};

