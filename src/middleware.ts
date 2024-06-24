import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"],
};

const IP_WHITELIST = ["202.244.32.194"];

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const res = NextResponse.next();

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (
      user === process.env.NEXT_PUBLIC_BASIC_ID &&
      password === process.env.NEXT_PUBLIC_BASIC_PASS
    ) {
      return res;
    }
  }

  let ip: string = req.ip ?? req.headers.get("x-real-ip") ?? "";

  if (!ip) {
    const forwardedFor = req.headers.get("x-forwarded-for");
    ip = forwardedFor.split(",").at(0) ?? "Unknown";
  }

  if (!IP_WHITELIST.includes(ip)) {
    return NextResponse.redirect("https://google.jp");
  }

  return new NextResponse("Unauthorized.", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
}
