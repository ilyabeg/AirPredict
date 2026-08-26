// Original file: src/gRPC/proto/collision.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CollisionRequest as _collisionGRPC_CollisionRequest, CollisionRequest__Output as _collisionGRPC_CollisionRequest__Output } from '../collisionGRPC/CollisionRequest';
import type { CollisionResponce as _collisionGRPC_CollisionResponce, CollisionResponce__Output as _collisionGRPC_CollisionResponce__Output } from '../collisionGRPC/CollisionResponce';

export interface CollisionServiceClient extends grpc.Client {
  PrintCollision(argument: _collisionGRPC_CollisionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  PrintCollision(argument: _collisionGRPC_CollisionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  PrintCollision(argument: _collisionGRPC_CollisionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  PrintCollision(argument: _collisionGRPC_CollisionRequest, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  printCollision(argument: _collisionGRPC_CollisionRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  printCollision(argument: _collisionGRPC_CollisionRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  printCollision(argument: _collisionGRPC_CollisionRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  printCollision(argument: _collisionGRPC_CollisionRequest, callback: grpc.requestCallback<_collisionGRPC_CollisionResponce__Output>): grpc.ClientUnaryCall;
  
}

export interface CollisionServiceHandlers extends grpc.UntypedServiceImplementation {
  PrintCollision: grpc.handleUnaryCall<_collisionGRPC_CollisionRequest__Output, _collisionGRPC_CollisionResponce>;
  
}

export interface CollisionServiceDefinition extends grpc.ServiceDefinition {
  PrintCollision: MethodDefinition<_collisionGRPC_CollisionRequest, _collisionGRPC_CollisionResponce, _collisionGRPC_CollisionRequest__Output, _collisionGRPC_CollisionResponce__Output>
}
