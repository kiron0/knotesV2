import mongoose, { Schema, models } from "mongoose";
import { TUser } from "../interfaces/user.interface";

const userSchema = new Schema<TUser>({
          name: {
                    firstName: {
                              required: [true, 'First name is required'],
                              type: Schema.Types.String,
                    },
                    middleName: {
                              type: Schema.Types.String,
                    },
                    lastName: {
                              required: [true, 'Last name is required'],
                              type: Schema.Types.String,
                    },
          },
          username: {
                    required: [true, 'Username is required'],
                    unique: true,
                    type: Schema.Types.String,
          },
          email: {
                    required: [true, 'Email is required'],
                    unique: true,
                    type: Schema.Types.String,
          },
          password: {
                    required: [true, 'Password is required'],
                    type: Schema.Types.String,
          },
          profileImage: {
                    type: Schema.Types.String,
          },
          role: {
                    type: Schema.Types.String,
                    enum: ['admin', 'user'],
                    default: 'user',
          },
          status: {
                    type: Schema.Types.String,
                    enum: ['active', 'inactive'],
                    default: 'active',
          },
},
          {
                    timestamps: true,
                    versionKey: false,
          }
);

export const User = models?.User || mongoose.model('User', userSchema);