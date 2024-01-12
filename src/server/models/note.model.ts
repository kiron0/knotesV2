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
          titleWordsCount: {
                    type: Schema.Types.Number,
          },
          titleCharactersCount: {
                    type: Schema.Types.Number,
          },
          desWordsCount: {
                    type: Schema.Types.Number,
          },
          desCharactersCount: {
                    type: Schema.Types.Number,
          },
},
          {
                    timestamps: true,
                    versionKey: false,
          }
);

export const Note = models?.Note || mongoose.model('Note', noteSchema);