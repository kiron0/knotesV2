import { connect } from '@/server/configs/config.db';
import { User } from '@/server/models/user.model';
import { SendResponse } from '@/server/utils/SendResponse';
import { generateUserId } from '@/server/utils/createUsername';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
          await connect();

          const {
                    firstName,
                    middleName,
                    lastName,
                    email,
                    password,
          } = await req.json();

          if (!firstName || !lastName || !email || !password) {
                    return SendResponse(NextResponse, {
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: 'First name, last name, email and password are required',
                    }, 400);
          };

          const existingUser = await User.findOne({ email });

          if (existingUser) {
                    return SendResponse(NextResponse, {
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: 'User already exists',
                    }, httpStatus.BAD_REQUEST);
          };

          const username = await generateUserId();

          const hashedPassword = await bcrypt.hash(password, 12);

          const newUser = await User.create({
                    name: {
                              firstName,
                              middleName,
                              lastName,
                    },
                    username,
                    email,
                    password: hashedPassword,
          });

          try {
                    return SendResponse(NextResponse, {
                              message: 'User created successfully',
                              data: {
                                        id: newUser.email,
                              },
                    }, httpStatus.CREATED);
          } catch (error) {
                    return SendResponse(NextResponse, {
                              statusCode: httpStatus.BAD_REQUEST,
                              success: false,
                              message: 'Something went wrong',
                    }, httpStatus.BAD_REQUEST);
          }
}

export async function GET(req: Request) {
          await connect();

          const params = new URL(req.url);
          const page = Number(params.searchParams.get('page')) || 1;
          const limit = Number(params.searchParams.get('limit')) || 10;
          const skip = (page - 1) * limit;

          const users = await User.find()
                    .skip(skip)
                    .limit(limit)
                    .select('-password')
                    .lean();

          try {
                    return SendResponse(NextResponse, {
                              message: 'Users fetched successfully',
                              data: {
                                        meta: {
                                                  page,
                                                  limit,
                                                  total: users.length,
                                        },
                                        users,
                              },
                    }, httpStatus.OK);
          } catch (error) {
                    return NextResponse.json(
                              { message: 'Something went wrong' },
                    );
          }
}