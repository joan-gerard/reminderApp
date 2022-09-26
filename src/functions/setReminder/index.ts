import { APIGatewayProxyEvent } from "aws-lambda";
import { v4 as uuid } from "uuid";

import { formatJSONResponse } from "@libs/apiGateway";
import { dynamo } from "@libs/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const tableName = process.env.reminderTable;

    const { email, phoneNumber, reminderMessage, reminderDate } = body;

    const validationErrors = validateInputs({
      email,
      phoneNumber,
      reminderMessage,
      reminderDate,
    });

    if (validationErrors) {
      return validationErrors;
    }

    const userId = email || phoneNumber;

    const data = {
      ...body,
      id: uuid(),
      TTL: reminderDate / 1000,
      pk: userId,
      sk: reminderDate.toString(),
    };

    await dynamo.write(data, tableName);

    return formatJSONResponse({
      data: {
        message: `reminder is set for ${new Date(reminderDate).toDateString()}`,
        id: data.id,
        reminderMessage,
      },
    });
  } catch (error) {
    console.log("error", error);
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};

const validateInputs = ({
  email,
  phoneNumber,
  reminderMessage,
  reminderDate,
}: {
  email?: string;
  phoneNumber?: string;
  reminderMessage: string;
  reminderDate: number;
}) => {
  if (!email && !phoneNumber) {
    return formatJSONResponse({
      statusCode: 400,
      data: {
        message: "email or phone number required to create a reminder",
      },
    });
  }
  if (!reminderMessage) {
    return formatJSONResponse({
      statusCode: 400,
      data: {
        message: "reminder message required to create a reminder",
      },
    });
  }
  if (!reminderDate) {
    return formatJSONResponse({
      statusCode: 400,
      data: {
        message: "reminder date required to create a reminder",
      },
    });
  }

  return;
};
