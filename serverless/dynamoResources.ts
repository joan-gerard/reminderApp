import type { AWS } from "@serverless/typescript";

const dynamoResources: AWS["resources"]["Resources"] = {
  reminderTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: "${self:custom.reminderTable}",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
        {
          AttributeName: "pk",
          AttributeType: "S",
        },
        {
          AttributeName: "sk",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      BillingMode: "PAY_PER_REQUEST",
      TimeToLiveSpecification: {
        AttributeName: "TTL",
        Enabled: true,
      },
      StreamSpecification: {
        StreamViewType: "OLD_IMAGE",
      },
      GlobalSecondaryIndexes: [
        {
          IndexName: "index1",
          Projection: {
            ProjectionType: "ALL",
          },
          KeySchema: [
            {
              AttributeName: "pk",
              KeyType: "HASH",
            },
            {
              AttributeName: "sk",
              KeyType: "RANGE",
            },
          ],
        },
      ],
    },
  },
};

export default dynamoResources;
