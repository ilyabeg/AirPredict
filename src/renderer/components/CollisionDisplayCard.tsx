import React, { useEffect, useRef } from 'react';
import { CollisionData } from 'shared/Types/CollisionData';
import '../Styles/CollisionCard.css'; 
import { useCesium } from 'resium';
import * as Cesium from 'cesium';
import CollisionCardHTML from '../components/CollisonCardHTML';

// React wraps objects in a Prop object
interface CollisionDataProp {
  collision: CollisionData;
}

export default function collisionDisplayCardHandler({collision}: CollisionDataProp) {

  const { viewer } = useCesium();
  const cardRef = useRef<HTMLDivElement>(null); 
  // HTMLDivElement is an interface of a <div> tag, this allows us to use div properties
  // like .style, .id, .className

  useEffect(() => {
    if (!viewer) return;

    const position3D = Cesium.Cartesian3.fromDegrees(
      collision.coordinates.lon,
      collision.coordinates.lat
    );

    // function to change the card's position on screen even if we move the globe
    // to make it seem like it stays over the collision point forever
    const updateHtmlPosition = () => {

      // take the 3d scene coordinates and transform them to 2d pixels on the window
      const coords2D = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, position3D);

      // move the html card to the pixel positions where the coliision was calculated
      if (coords2D && cardRef.current) {
        cardRef.current.style.left = `${coords2D.x}px`;
        cardRef.current.style.top = `${coords2D.y}px`;
        cardRef.current.style.display = 'block'; // display: block forces all child elements start in a new line
      }
    };

    // we run this function every time Cesium's 3D globe model runs preRender (which is 60 fps) -
    // meaning we change the CSS left and top points 60 times per second, 
    // instead of re-rendering the whole component 60 times per second.
    viewer.scene.preRender.addEventListener(updateHtmlPosition);
    return () => {
      viewer.scene.preRender.removeEventListener(updateHtmlPosition);
    };
  }, [viewer, collision.coordinates.lat, collision.coordinates.lon]);

  return (
    <div
      ref={cardRef} // <- attach the HTMLDivElement
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)', // shift the window to centralize the anchor point to the bottm 
        pointerEvents: 'none', // make clickable throught the window
        zIndex: 9999,
        display: 'none' // start hidden until the first preRender frame calculates the coordinates
      }}
    >
    
    <CollisionCardHTML collision={collision} />

    </div>
  );
}
