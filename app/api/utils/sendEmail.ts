import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

// Lazy initialization of SES client
let client: SESv2Client | null = null;

const getSESClient = () => {
  if (!client) {
    const { AWS_REGION, AWS_AK, AWS_SECRET_ACCESS_KEY } = process.env;

    // Validate required environment variables at runtime
    if (!AWS_REGION) {
      throw new Error("AWS_REGION environment variable is required");
    }
    if (!AWS_AK) {
      throw new Error("AWS_AK environment variable is required");
    }
    if (!AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS_SECRET_ACCESS_KEY environment variable is required");
    }

    client = new SESv2Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_AK,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return client;
};

const sendEmail = async (replyTo: string, subject: string, html: string) => {
  try {
    const { SENDER_EMAIL, ADMIN_DESTINATION_EMAIL } = process.env;

    // Validate SENDER_EMAIL at runtime
    if (!SENDER_EMAIL) {
      throw new Error("SENDER_EMAIL environment variable is required");
    }
    if (!ADMIN_DESTINATION_EMAIL) {
      throw new Error(
        "ADMIN_DESTINATION_EMAIL environment variable is required",
      );
    }

    const command = new SendEmailCommand({
      FromEmailAddress: SENDER_EMAIL,
      Destination: {
        ToAddresses: [ADMIN_DESTINATION_EMAIL],
      },
      ReplyToAddresses: [replyTo],
      FeedbackForwardingEmailAddress: ADMIN_DESTINATION_EMAIL,
      Content: {
        Simple: {
          Subject: {
            Data: subject,
          },
          Body: {
            Html: {
              Data: html,
            },
          },
        },
      },
    });
    const res = await getSESClient().send(command);
    return res;
  } catch (error: unknown) {
    console.log("Error sending email:", (error as Error).message);
  }
};

export { sendEmail };
