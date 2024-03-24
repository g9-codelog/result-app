import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/:path*"],
};

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, password] = atob(authValue).split(":");

    if (
      user === process.env.NEXT_PUBLIC_BASIC_ID &&
      password === process.env.NEXT_PUBLIC_BASIC_PASS
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized.", {
    status: 401,
    headers: {
      "WWW-authenticate": 'Basic realm="Secure Area"',
    },
  });
}
