{ MongoError: E11000 duplicate key error collection: github.gituserdetails index: login_1 dup key: { login: "hydpradeep" }
    at Function.create (/home/ubuntu/Github_Connect_UserDetails_Basicsforlocal/node_modules/mongodb-core/lib/error.js:43:12)
    at toError (/home/ubuntu/Github_Connect_UserDetails_Basicsforlocal/node_modules/mongodb/lib/utils.js:149:22)
    at coll.s.topology.insert (/home/ubuntu/Github_Connect_UserDetails_Basicsforlocal/node_modules/mongodb/lib/operations/collection_ops.js:859:39)
    at handler (/home/ubuntu/Github_Connect_UserDetails_Basicsforlocal/node_modules/mongodb-core/lib/topologies/replset.js:1155:22)
    at /home/ubuntu/Github_Connect_UserDetails_Basicsforlocal/node_modules/mongodb-core/lib/connection/pool.js:397:18
    at _combinedTickCallback (internal/process/next_tick.js:131:7)
    at process._tickCallback (internal/process/next_tick.js:180:9)
  driver: true,
  name: 'MongoError',
  index: 0,
  code: 11000,
  keyPattern: { login: 1 },
  keyValue: { login: 'hydpradeep' },
  errmsg: 'E11000 duplicate key error collection: github.gituserdetails index: login_1 dup key: { login: "hydpradeep" }',
  [Symbol(mongoErrorContextSymbol)]: {} }