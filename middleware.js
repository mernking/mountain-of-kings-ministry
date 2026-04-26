import { NextResponse } from "next/server";

export function middleware(request) {
  const origin = request.headers.get("origin") || "";

  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
  ];

  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, { status: 204 });
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    } else if (process.env.NODE_ENV === "development") {
      // In dev, if no origin header (like some local tools), allow anyway or fallback
      response.headers.set("Access-Control-Allow-Origin", "*");
    }
    
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    response.headers.set("Access-Control-Max-Age", "86400");
    
    return response;
  }

  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  } else if (process.env.NODE_ENV === "development") {
    response.headers.set("Access-Control-Allow-Origin", "*");
  }
  
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  return response;
}

// Only run middleware for API routes
export const config = {
  matcher: "/api/:path*",
};
