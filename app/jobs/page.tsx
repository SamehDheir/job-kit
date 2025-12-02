import React from "react";
import JobDetailsPage from "./[id]/page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // تعديل بسيط فقط
  return <JobDetailsPage params={{ id }} />;
}
