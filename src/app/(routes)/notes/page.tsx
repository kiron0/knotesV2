import { description, shortTitle } from "@/constant";
import type { Metadata } from "next";
import { Fragment } from "react";
import Notes from "./notes";

export const metadata: Metadata = {
  title: `Add New Note - ${shortTitle}`,
  description: description,
};

export default function Page() {
  return (
    <Fragment>
      <Notes />
    </Fragment>
  );
}
