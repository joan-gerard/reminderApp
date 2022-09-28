import { DynamoDBStreamEvent } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";
import {
  SNSClient,
  PublishCommand,
  PublishCommandInput,
} from "@aws-sdk/client-sns";

const sesClient = new SESClient({});
const snsClient = new SNSClient({});

export const handler = async (event: DynamoDBStreamEvent) => {
  try {
    const reminderPromises = event.Records.map(async (record) => {
      const data = unmarshall(
        record.dynamodb.OldImage as Record<string, AttributeValue>
      );
      const { email, phoneNumber, reminderMessage } = data;

      if (phoneNumber) {
        await sendSMS({ phoneNumber, reminderMessage });
      }
      if (email) {
        await sendEmail({ email, reminderMessage });
      }
    });
    await Promise.all(reminderPromises);
  } catch (error) {
    console.log("error", error);
  }
};

const sendEmail = async ({
  email,
  reminderMessage,
}: {
  email: string;
  reminderMessage: string;
}) => {
  const params: SendEmailCommandInput = {
    Source: "joan.gerard@outlook.com",
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: reminderMessage,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Your Reminder!",
      },
    },
  };

  const command = new SendEmailCommand(params);

  const response = await sesClient.send(command);

  return response.MessageId;
};

// ----------------------------------------
const sendSMS = async ({
  phoneNumber,
  reminderMessage,
}: {
  phoneNumber: string;
  reminderMessage: string;
}) => {
  const params: PublishCommandInput = {
    Message: reminderMessage,
    PhoneNumber: phoneNumber,
  };

  const command = new PublishCommand(params);

  const response = await snsClient.send(command);

  return response.MessageId;
};
