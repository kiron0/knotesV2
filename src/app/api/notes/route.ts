import { connect } from "@/server/configs/config.db";
import { Note } from "@/server/models/note.model";
import { SendResponse } from "@/server/utils/SendResponse";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
          await connect();

          const params = new URL(req.url);
          const page = Number(params.searchParams.get('page')) || 1;
          const limit = Number(params.searchParams.get('limit')) || 10;
          const skip = (page - 1) * limit;

          const notes = await Note.find({}).skip(skip).limit(limit);

          return SendResponse(NextResponse, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: "Notes fetched successfully",
                    data: {
                              meta: {
                                        page,
                                        limit,
                                        total: notes.length,
                              },
                              notes,
                    },
          }, httpStatus.OK);
}

export async function POST(req: NextRequest) {
          await connect();

          const { title, description } = await req.json();

          if (!title || !description) {
                    return SendResponse(NextResponse, {
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Title and description are required",
                    }, httpStatus.BAD_REQUEST);
          }

          try {
                    const existingNote = await Note.findOne({ title, description });

                    if (existingNote) {
                              return SendResponse(NextResponse, {
                                        message: "Note updated successfully",
                                        data: {
                                                  id: existingNote._id,
                                        },
                              }, httpStatus.OK);
                    } else {
                              const wordsCount = description.split(" ").length;
                              const charactersCount = description.length;

                              const note = await Note.create({
                                        title,
                                        description,
                                        wordsCount,
                                        charactersCount,
                              });


                              return SendResponse(NextResponse, {
                                        message: "Note created successfully",
                                        data: {
                                                  id: note._id,
                                        },
                              }, httpStatus.CREATED);
                    }
          } catch (error) {
                    return NextResponse.json(error);
          }
}