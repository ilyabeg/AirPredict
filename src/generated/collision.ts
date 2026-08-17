import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CollisionServiceClient as _collisionGRPC_CollisionServiceClient, CollisionServiceDefinition as _collisionGRPC_CollisionServiceDefinition } from './CollisionService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  collisionGRPC: {
    CollisionRequest: MessageTypeDefinition
    CollisionResponce: MessageTypeDefinition
    CollisionService: SubtypeConstructor<typeof grpc.Client, _collisionGRPC_CollisionServiceClient> & { service: _collisionGRPC_CollisionServiceDefinition }
  }
}

