import React, { useEffect, useState } from 'react';
import { CollisionData } from 'shared/Types/CollisionData';
import CollisionDisplayCard from '../components/CollisionDisplayCard';

export default function CollisionControl() {

  const [activeCollisions, setActiveCollisions] = useState<CollisionData[]>([]);

  useEffect(() => {
    const handleNewCollision = (e: any) => {
      const newCollision: CollisionData = e.detail;
      
      // Add the new crash to the array, keeping all previous crashes too
      setActiveCollisions((prevCrashes) => [...prevCrashes, newCollision]);
    };

    // attach the listener to the window
    window.addEventListener('display-collision-card', handleNewCollision);

    // remove listener when component unmounts
    return () => {
        window.removeEventListener('display-collision-card', handleNewCollision);
    };
  }, []);

  return (
    <>
      {activeCollisions.map((collision, index) => (
        <CollisionDisplayCard 
          key={`collision-card-${index}`} 
          collision={collision} 
        />
      ))}
    </>
  );
}
