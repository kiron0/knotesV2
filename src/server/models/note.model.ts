import mongoose, { Schema, models } from "mongoose";
import { TNote } from "../interfaces/note.interface";

const noteSchema = new Schema<TNote>({
          title: {
                    required: [true, 'Title is required'],
                    type: Schema.Types.String,
          },
          description: {
                    required: [true, 'Description is required'],
                    type: Schema.Types.String,
          },
          wordsCount: {
                    type: Schema.Types.Number,
          },
          charactersCount: {
                    type: Schema.Types.Number,
          },
},
          {
                    timestamps: true,
                    versionKey: false,
          }
);

export const Note = models?.Note || mongoose.model('Note', noteSchema);