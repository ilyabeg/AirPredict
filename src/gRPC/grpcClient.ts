import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { CollisionRequest } from '../generated/CollisionRequest';
import { ProtoGrpcType } from '../generated/collision';

const PORT_NUM = 50051;
const PROTO_FILE = './proto/collision.proto';

// loads all the protobuf configurations (from 'collision.proto') into this definitions object
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));

// feed the definitions into the grpc engine to build the actual network services (printCollision for example) in memory
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType;
// note: (... as unknown) as ProtoGrpcType = double casting to promise TypeScript that this obj will match the ProtoGrpcType

// initiate the client on port 50051 with an insecure connection (because we don't encrypt the actual data)
const client = new grpcObj.collisionGRPC.CollisionService(
    `localhost:${PORT_NUM}`,
    grpc.credentials.createInsecure()
);

// temp collision for testing
const request: CollisionRequest = {
    planeA: "flight A",
    planeB: "flight B",
    timeOfCollision: 0, //sec
    timeDifference: 0,  //sec
    lat: 5, lon: 5
};

client.printCollision(request, (error, response) => {
    if (error) {
        console.error("Error:", error.message);
        return;
    }

    if (!response)
        return;

    console.info(`gRPC was a ${(response.success) ? 'success:' : 'failiure:'} ${response.msg}.`);
});
