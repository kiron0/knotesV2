import { connect } from "@/server/configs/config.db";
import { Note } from "@/server/models/note.model";
import { SendResponse } from "@/server/utils/SendResponse";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
          await connect();

          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          if (id && id.length !== 24) {
                    return SendResponse({
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Invalid note id",
                    });
          }

          const note = await Note.findById(id);

          if (!note) {
                    return SendResponse({
                              statusCode: httpStatus.NOT_FOUND,
                              success: false,
                              message: "Note not found",
                    });
          }

          return SendResponse({
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "Note fetched successfully",
                    data: note,
          });
}

export async function PATCH(req: NextRequest, res: NextResponse) {
          await connect();

          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          const { title, description } = await req.json();

          if (!title || !description) {
                    return SendResponse({
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Title and description are required",
                    });
          }

          const wordsCount = description.split(" ").length;
          const charactersCount = description.length;

          const existingNote = await Note.findById(id);

          if (!existingNote) {
                    return SendResponse({
                              statusCode: httpStatus.NOT_FOUND,
                              success: false,
                              message: "Note not found",
                    });
          }

          await Note.updateOne({ _id: existingNote._id, }, {
                    title,
                    description,
                    wordsCount,
                    charactersCount,
          });

          try {
                    return SendResponse({
                              statusCode: httpStatus.OK,
                              success: true,
                              message: "Note updated successfully",
                    });
          } catch (error) {
                    return NextResponse.json(error);
          }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
          await connect();

          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          const existingNote = await Note.findById(id);

          if (!existingNote) {
                    return SendResponse({
                              statusCode: httpStatus.NOT_FOUND,
                              success: false,
                              message: "Note not found",
                    });
          }

          await Note.deleteOne({ _id: existingNote._id });

          return SendResponse({
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "Note deleted successfully",
          });
}