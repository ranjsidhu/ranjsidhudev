import { ContactDetails } from "@/types";

export const formatEmail = (details: ContactDetails, subject: string) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #fff; font-family: Arial, sans-serif; color: #111;">
            <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #fff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e5e5;">
              <!-- Header -->
              <tr>
                <td style="background-color: #111; padding: 30px 40px; text-align: center;">
                  <h1 style="color: #fff; margin: 0; font-size: 24px; font-weight: 400; letter-spacing: 2px;">New Contact Form Submission</h1>
                  <p style="color: #fff; margin: 10px 0 0 0; font-size: 16px; font-weight: 300;">
                    Received on ${new Date().toLocaleString("en-UK", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </td>
              </tr>
    
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <!-- Contact Information -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="color: #111; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5; font-weight: 400;">Contact Information</h2>
                    <p style="margin: 0 0 10px 0; font-size: 16px;">
                      <strong style="color: #555;">Name:</strong> 
                      <span style="color: #111;">${details.name}</span>
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 16px;">
                      <strong style="color: #555;">Email:</strong> 
                      <span style="color: #111;">${details.email}</span>
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 16px;">
                      <strong style="color: #555;">Enquiry Type:</strong> 
                      <span style="color: #111;">${details.enquiryType}</span>
                    </p>
                  </div>
    
                  <!-- Subject -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="color: #111; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5; font-weight: 400;">Subject</h2>
                    <p style="margin: 0 0 10px 0; font-size: 16px; color: #111;">${subject}</p>
                  </div>
    
                  <!-- Message -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="color: #111; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 1px solid #e5e5e5; font-weight: 400;">Message</h2>
                    <div style="margin: 0; font-size: 16px; color: #111; line-height: 1.6; background-color: #fafafa; padding: 20px; border-left: 4px solid #111; border-radius: 4px;">
                      ${details.message.replace(/\n/g, "<br>")}
                    </div>
                  </div>
                </td>
              </tr>
    
              <!-- Footer -->
              <tr>
                <td style="background-color: #fafafa; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                  <p style="margin: 0; color: #555; font-size: 14px;">
                    This is an automated message from your website&apos;s contact form.
                  </p>
                  <p style="margin: 10px 0 0 0; color: #555; font-size: 14px;">
                    Please respond to this inquiry at your earliest convenience by replying to this email.
                  </p>
                  <div style="margin-top: 20px;">
                    <span style="display: inline-block; width: 30px; height: 4px; background-color: #111; border-radius: 2px; margin: 0 3px;"></span>
                    <span style="display: inline-block; width: 30px; height: 4px; background-color: #e5e5e5; border-radius: 2px; margin: 0 3px;"></span>
                    <span style="display: inline-block; width: 30px; height: 4px; background-color: #111; border-radius: 2px; margin: 0 3px;"></span>
                  </div>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `;
};
