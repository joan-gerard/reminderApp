# Reminder App

This reminder app enables us to get notified of a reminder either via email or text message.

These are the steps I followed:

1. Creating an endpoint and lambda that will allow users to create and store reminders.

2. Adding an expiry date (Time-To-Live or TTL) to the records in the database.

3. Adding a stream to the database table and creating a lambda to make use of AWS SES and SNS

4. Ading Global Secondary Index to allow querying on the table based on a parameter

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

### The Endpoints

POST: Endpoint requires email (or phoneNumber), reminderMessage and reminderDate
```
https://9sop9quxpd.execute-api.eu-central-1.amazonaws.com/
```

GET: Requires email or phoneNumber as query paramater
```
https://9sop9quxpd.execute-api.eu-central-1.amazonaws.com/{userId}
```

### Project structure
```
.
├── serverless                  # Folder holding extra serverless configuration
│   ├── dynamoResources         # DynamoDB table configuration 
│   └── functions               # config pointing to handlers path and http method 
├── src
│   ├── functions               # Folder containing lambda fn 
│   │   ├── getReminders
│   │   │   └── index.ts        # lambda querying on a dynamodb table
│   │   ├── sendReminder
│   │   │   └── index.ts        # lambda making use of SES and SNS clients for notifications
│   │   └── setReminder
│   │       └── index.ts        # lambda adding to dynamodb table
│   │
│   └── libs                    
│       ├── dynamo.ts           # DynamoDB 'write', 'get' and 'query' functions
│       └── apiGateway.ts       # API Gateway specific helpers
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── webpack.config.js           # Webpack configuration
└── tsconfig.paths.json         # Typescript paths
```