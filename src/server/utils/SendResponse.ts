import { NextResponse } from "next/server";

type ResponseData = {
          statusCode: number;
          success: boolean;
          message: string;
          data?: any;
}

export const SendResponse = (data: ResponseData) => {
          return NextResponse.json({
                    statusCode: data.statusCode,
                    success: data.success,
                    message: data.message,
                    data: data.data,
          });
}