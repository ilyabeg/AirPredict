import { CollisionData } from "shared/Types/CollisionData"

export default interface CustomWindowEvents {
    'remove-collision-card': string,
    'display-collision-card': CollisionData
}