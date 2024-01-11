import { NextResponse } from "next/server";

export const SendResponse = (res: NextResponse, data: any, status: number) => {
          return res.json();
}