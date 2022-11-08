import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    console.log("about");
  }, []);
  return <section>About</section>;
}
