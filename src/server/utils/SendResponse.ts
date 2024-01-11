import { NextResponse } from "next/server";

interface Response {
          statusCode?: number;
          success?: boolean;
          message: string;
          data?: any;
}

export const SendResponse: Response = (res: NextResponse, data: any, status: number) => {
          return res.json({
                    statusCode: status,
                    success: data.success,
                    message: data.message,
                    data: data.data,
          }, {
                    status,
          });
}