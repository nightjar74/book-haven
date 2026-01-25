import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import { serverConfig } from "@/lib/serverConfig";

export const getWorkflowClient = () =>
  new WorkflowClient({
    token: serverConfig.upstash.qstashToken,
  });

//console.log("QSTASH TOKEN:", config.env.upstash.qstashToken);
console.log("QSTASH_TOKEN from process.env:", process.env.QSTASH_TOKEN);

const getQstashClient = () =>
  new QStashClient({
    token: process.env.QSTASH_TOKEN!,
  });

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  const qstashClient = getQstashClient();
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: serverConfig.resendToken }),
    },
    body: {
      from: "<contact@BookHaven.com>",
      to: [email],
      subject,
      html: message,
    },
  });
};
