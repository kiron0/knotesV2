import { connect } from "@/server/configs/config.db";
import { Note } from "@/server/models/note.model";
import { SendResponse } from "@/server/utils/SendResponse";
import { AUTH_KEY } from "@/utils/config";
import httpStatus from "http-status";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
          const params = new URL(req.url);
          const key = params.searchParams.get('authKey') || "";

          if (!key) {
                    return SendResponse({
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: "Key is required",
                    });
          }

          if (key !== AUTH_KEY) {
                    return SendResponse({
                              statusCode: httpStatus.UNAUTHORIZED,
                              success: false,
                              message: "Invalid key",
                    });
          }

          const page = Number(params.searchParams.get('page')) || 1;
          const limit = Number(params.searchParams.get('limit')) || 10;
          const skip = (page - 1) * limit;

          const notes = await Note.find({}).skip(skip).limit(limit);

          return SendResponse({
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
          });
}

export async function POST(req: NextRequest) {
          const { title, description } = await req.json();

          try {
                    if (!title || !description) {
                              throw new Error("Title and description are required");
                    }

                    const existingNote = await Note.findOne({ title, description });

                    if (existingNote) {
                              return SendResponse({
                                        statusCode: httpStatus.OK,
                                        success: true,
                                        message: "Note updated successfully",
                                        data: {
                                                  id: existingNote._id,
                                        },
                              });
                    } else {
                              const note = await Note.create({
                                        title,
                                        description
                              });

                              return SendResponse({
                                        statusCode: httpStatus.CREATED,
                                        success: true,
                                        message: "Note created successfully",
                                        data: {
                                                  id: note._id,
                                        },
                              });
                    }
          } catch (error) {
                    return NextResponse.json(error);
          }
}