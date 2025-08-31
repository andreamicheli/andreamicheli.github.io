"use client";

import Head from "next/head";
import One from "../windows/One";
import Zero from "../windows/Zero";
import Arrow from "../components/Arrow";
import fs from "fs";
import Two from "../windows/Two";
import Three from "../windows/Three";
import { useEffect } from "react";
import Lenis from "lenis";
import Loading from "../components/Loading";
import Four from "../windows/Four";
import Five from "../windows/Five";
import Navbar from "../components/Navbar";
import Mobile from "../components/Mobile";

export async function getStaticProps() {
  const files = fs.readdirSync("public/beauty/array");
  console.log("FILES:", files);

  // Pass data to the page via props
  return { props: { files } };
}

export default function Home({ files }) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Loading>
      <style jsx global>{`
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }

        *::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      `}</style>
      <Mobile />
      <div className="bg-transparent fixed top-10 right-10 z-[60]">
        <Navbar />
      </div>
      <div className="bg-transparent fixed bottom-5 right-10">
        <Arrow />
      </div>
      <Head>
        <title>Andrea Micheli&#39;s portfolio</title>
        <meta name="description" content="Andrea Micheli's portfolio" />
        <link rel="icon" href="/website_icon.ico" />
      </Head>

      <div className="bg-transparent">
        {/* pagina 0 */}
        <div className="bg-cream_extralight">
          <Zero />

          {/* pagina 1 */}
          <One files={files} />

          {/* pagina 2 */}
          <Two />
        </div>
        <div className="bg-peri_dark">
          {/* pagina 3 */}
          <Three />
          {/* pagina 4 */}
          <Four />
          {/* pagina 5 */}
        </div>
        <Five />
      </div>
    </Loading>
  );
}
