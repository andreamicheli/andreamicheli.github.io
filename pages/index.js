"use client";

import Head from "next/head";
import One from "../windows/One";
import Zero from "../windows/Zero";
import Arrow from "../components/Arrow";
import fs from "fs";
import Two from "../windows/Two";

export async function getStaticProps() {
  const files = fs.readdirSync("public/beauty/array");
  console.log("FILES:", files);

  // Pass data to the page via props
  return { props: { files } };
}

export default function Home({ files }) {
  return (
    <>
      <div className="bg-transparent fixed bottom-5 right-10">
        <Arrow />
      </div>
      <Head>
        <title>Andrea Micheli&#39;s portfolio</title>
        <meta name="description" content="Andrea Micheli's portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-cream_extralight">
        {/* pagina 0 */}
        <Zero />

        {/* pagina 1 */}
        <One files={files} />

        {/* pagina 2 */}
        <Two />

        {/* pagina 3 */}

        {/* pagina 4 */}

        {/* pagina 5 */}
      </div>
    </>
  );
}
