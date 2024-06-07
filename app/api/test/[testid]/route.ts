import { NextRequest, NextResponse } from "next/server";
import test from "node:test";

export const GET = (
  request: NextRequest,
  { params }: { params: { testid: string } }
) => {
  return NextResponse.json({ hello: "world", testid: params.testid });
};
