import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://storageApp:12345@127.0.0.1:27017/storageApp");

const db = client.db();
const command = "collMod";

const userResult = await db.command({
  [command]: "user",
  validator: {
    $jsonSchema: {
      required: ["_id", "name", "email", "password", "rootDirId"],
      properties: {
        _id: {
          bsonType: "objectId",
        },
        name: {
          bsonType: "string",
          minLength: 3,
          description: "Name should be atleast 3 character",
        },
        email: {
          bsonType: "string",
          pattern: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$",
        },
        password: {
          bsonType: "string",
          minLength: 4,
          description: "password should atleast 4 character",
        },
        rootDirId: {
          bsonType: "objectId",
        },
      },
      additionalProperties: false,
    },
  },
  validationAction: "error",
  validationLevel: "strict"
});

const fileResult = await db.command({
  [command]: "files",
  validator: {
  $jsonSchema: {
    required: [
      '_id',
      'name',
      'extension',
      'parentDirId'
    ],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      name: {
        bsonType: 'string',
        minLength: 1,
        description: 'Name should be atleast 1 character'
      },
      extension: {
        bsonType: 'string'
      },
      parentDirId: {
        bsonType: 'objectId',
      }
    },
    additionalProperties: false
  }
},
  validationAction: "error",
  validationLevel: "strict"
});

const dirResult = await db.command({
  [command]: "directory",
  validator: {
  $jsonSchema: {
    required: [
      '_id',
      'name',
      'parentDirId',
      'userId'
    ],
    properties: {
      _id: {
        bsonType: 'objectId'
      },
      name: {
        bsonType: 'string',
        minLength: 1,
        description: 'Name should be atleast 1 character'
      },
      parentDirId: {
        bsonType: [
          'objectId',
          'null'
        ]
      },
      userId: {
        bsonType: 'objectId',
      }
    },
    additionalProperties: false
  }
},
  validationAction: "error",
  validationLevel: "strict"
});

console.log({userResult,fileResult,dirResult})

await client.close();