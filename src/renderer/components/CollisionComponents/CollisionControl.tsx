import { useEffect, useState } from 'react';
import { CollisionData } from 'shared/Types/CollisionData';
import CollisionDisplayCard from './CollisionDisplayCard';

export default function CollisionControl() {

  const [activeCollisions, setActiveCollisions] = useState<CollisionData[]>([]);

  useEffect(() => {
    const handleDisplayCollision = (event: any) => {
      const newCollision: CollisionData = event.detail;
      
      // add the new crash to the array, keeping all previous crashes
      setActiveCollisions(prevCrashes => [...prevCrashes, newCollision]);
      // React prvious state: updtaes the previous values with an updater function instead of passing by value
    };

    const handleRemoveCollision = (event: any) => {
      const flightID: string = event.detail;
      
      // remove old crash from the array if one of the flight paths got removed, meaning there is no crash anymore
      setActiveCollisions(prevCrashes => prevCrashes.filter(
        collision => collision.planeA.id !== flightID && collision.planeB.id !== flightID
      ));
    };

    // attach the custom event listeners to the window
    window.addEventListener('display-collision-card', handleDisplayCollision);
    window.addEventListener('remove-collision-card', handleRemoveCollision);

    // remove listeners when component unmounts/re-renders
    return () => {
        window.removeEventListener('display-collision-card', handleDisplayCollision);
        window.removeEventListener('remove-collision-card', handleRemoveCollision);
    };
  }, []);

  return (
    <>
      {activeCollisions.map((collision) => 
      (
        <CollisionDisplayCard collision={collision} />
      ))}
    </>
  );
}
