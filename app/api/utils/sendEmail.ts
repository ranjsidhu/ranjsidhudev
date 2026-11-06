import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import logger from "@/lib/logger";

// Lazy initialization of SES client
let client: SESv2Client | null = null;

const getSESClient = () => {
  if (!client) {
    const { AWS_REGION, AWS_AK, AWS_SECRET_ACCESS_KEY } = process.env;

    // Validate required environment variables at runtime
    if (!AWS_REGION) {
      throw new Error("AWS_REGION environment variable is required");
    }
    if (Boolean(AWS_AK) !== Boolean(AWS_SECRET_ACCESS_KEY)) {
      throw new Error(
        "AWS_AK and AWS_SECRET_ACCESS_KEY must be set together, or both left unset",
      );
    }

    // Static keys where no IAM role is available (e.g. Vercel). Otherwise the
    // SDK's default credential chain is used, such as the ECS task role.
    const useStaticKeys = Boolean(AWS_AK && AWS_SECRET_ACCESS_KEY);
    client = new SESv2Client(
      useStaticKeys
        ? {
            region: AWS_REGION,
            credentials: {
              accessKeyId: AWS_AK as string,
              secretAccessKey: AWS_SECRET_ACCESS_KEY as string,
            },
          }
        : { region: AWS_REGION },
    );
    logger.info(
      { credentials: useStaticKeys ? "static" : "default-chain" },
      "SES client initialized",
    );
  }
  return client;
};

/**
 * Sends an HTML email to the site owner. Throws on misconfiguration or SES
 * failure so the caller can report the failure; it never fails silently.
 */
const sendEmail = async (replyTo: string, subject: string, html: string) => {
  const { SENDER_EMAIL, ADMIN_DESTINATION_EMAIL } = process.env;

  if (!SENDER_EMAIL) {
    throw new Error("SENDER_EMAIL environment variable is required");
  }
  if (!ADMIN_DESTINATION_EMAIL) {
    throw new Error("ADMIN_DESTINATION_EMAIL environment variable is required");
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

  return getSESClient().send(command);
};

export { sendEmail };
