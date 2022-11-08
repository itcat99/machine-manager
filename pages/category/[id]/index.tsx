import { api } from "@/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function () {
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {}, []);

  return <section id="defaultLayoutContent"></section>;
}
