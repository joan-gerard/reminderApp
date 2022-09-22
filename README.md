# Reminder App

DESC HERE

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

### The Endpoints

```
https://
```

```
https://
```

### Project structure
```
.
├── serverless                  # Folder holding extra serverless configuration
│   ├── dynamoResources         # DynamoDB table configuration 
│   └── functions               # config pointing to handlers path and http method 
├── src
│   ├── functions               # Folder containing lambda fn 
│   │   ├── getUrl
│   │   │   └── index.ts        # lambda reading from dynamodb table
│   │   └── setUrl
│   │       └── index.ts        # lambda adding to dynamodb table
│   │
│   └── libs                    
│       ├── dynamo.ts           # DynamoDB 'write' and 'get' functions
│       └── apiGateway.ts       # API Gateway specific helpers
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```