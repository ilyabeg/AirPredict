import { CollisionData } from "shared/Types/CollisionData"
import { FlightPath } from "shared/Types/FlightPath"

export default interface CustomWindowEvents {
    'display-collision-card': CollisionData,
    'remove-collision-card': string,
    'display-flight': FlightPath,
    'remove-flight': FlightPath
}
