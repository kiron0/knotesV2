export type TNote = {
  _id?: string;
  type: "text" | "json";
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};
