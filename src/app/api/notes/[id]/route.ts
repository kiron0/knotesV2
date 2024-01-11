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
                    return SendResponse(res, {
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Invalid note id",
                    }, httpStatus.BAD_REQUEST);
          }

          const note = await Note.findById(id);

          if (!note) {
                    return SendResponse(res, {
                              statusCode: httpStatus.NOT_FOUND,
                              success: false,
                              message: "Note not found",
                    }, httpStatus.NOT_FOUND);
          }

          return SendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "Note fetched successfully",
                    data: {
                              note,
                    },
          }, httpStatus.OK);
}

export async function PATCH(req: NextRequest, res: NextResponse) {
          await connect();

          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          const { title, description } = await req.json();

          if (!title || !description) {
                    return SendResponse(res, {
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Title and description are required",
                    }, httpStatus.BAD_REQUEST);
          }

          const wordsCount = description.split(" ").length;
          const charactersCount = description.length;

          const existingNote = await Note.findById(id);

          if (!existingNote) {
                    return SendResponse(res, {
                              statusCode: httpStatus.NOT_FOUND,
                              success: false,
                              message: "Note not found",
                    }, httpStatus.NOT_FOUND);
          }

          await Note.updateOne({ _id: existingNote._id, }, {
                    title,
                    description,
                    wordsCount,
                    charactersCount,
          });

          try {
                    return SendResponse(res, {
                              statusCode: httpStatus.OK,
                              success: true,
                              message: "Note updated successfully",
                    }, httpStatus.OK);
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
                    return SendResponse(res, {
                              statusCode: httpStatus.NOT_FOUND,
                              success: false,
                              message: "Note not found",
                    }, httpStatus.NOT_FOUND);
          }

          await Note.deleteOne({ _id: existingNote._id });

          return SendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "Note deleted successfully",
          }, httpStatus.OK);
}