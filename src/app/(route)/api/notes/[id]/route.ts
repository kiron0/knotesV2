import { connect } from "@/server/configs/config.db";
import { Note } from "@/server/models/note.model";
import { SendResponse } from "@/server/utils/SendResponse";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          try {
                    if (id && id.length !== 24) {
                              throw new Error("Invalid note id");
                    }

                    const note = await Note.findById(id);

                    if (!note) {
                              throw new Error("Note not found");
                    }

                    return SendResponse({
                              statusCode: httpStatus.OK,
                              success: true,
                              message: "Note fetched successfully",
                              data: note,
                    });
          } catch (error) {
                    return NextResponse.json(error);
          }
}

export async function PATCH(req: NextRequest) {
          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          try {
                    const { title, description } = await req.json();

                    if (!title || !description) {
                              throw new Error("Title and description are required");
                    }

                    const wordsCount = description.split(" ").length;
                    const charactersCount = description.length;

                    const existingNote = await Note.findById(id);

                    if (!existingNote) {
                              throw new Error("Note not found");
                    }

                    await Note.updateOne({ _id: existingNote._id, }, {
                              title,
                              description,
                              wordsCount,
                              charactersCount,
                    });

                    return SendResponse({
                              statusCode: httpStatus.OK,
                              success: true,
                              message: "Note updated successfully",
                    });
          } catch (error) {
                    return NextResponse.json(error);
          }
}

export async function DELETE(req: NextRequest) {
          const params = new URL(req.url);
          const id = params.pathname.split('/').pop();

          try {
                    if (id && id.length !== 24) {
                              throw new Error("Invalid note id");
                    }

                    const existingNote = await Note.findById(id);

                    if (!existingNote) {
                              throw new Error("Note not found");
                    }

                    await Note.deleteOne({ _id: existingNote._id });

                    return SendResponse({
                              statusCode: httpStatus.OK,
                              success: true,
                              message: "Note deleted successfully",
                    });
          } catch (error) {
                    return NextResponse.json(error);
          }
}