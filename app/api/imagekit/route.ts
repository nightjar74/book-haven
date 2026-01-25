import ImageKit from "imagekit";
import config from "@/lib/config";
import { serverConfig } from "@/lib/serverConfig";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const {
  env: {
    imagekit: { privateKey },
  },
} = serverConfig;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(imagekit.getAuthenticationParameters());
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate auth parameters" },
      { status: 500 },
    );
  }
}
