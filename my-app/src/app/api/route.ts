import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const backendResponse = await fetch(
    `https://backend.occubitsolution.com/api/seller/cmihcuz8c000gph01q3uwepj4/all-products${url.search}`,
    {
      method: "GET",
    }
  );

  const data = await backendResponse.text();

  return new NextResponse(data, {
    status: backendResponse.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
