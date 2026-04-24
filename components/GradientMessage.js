import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  float wave(vec2 uv, float freq, float speed, float amp, float time) {
    return sin((uv.x + uv.y * 0.2) * freq + time * speed) * amp;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 1.6;
    vec2 flow = vec2(
      sin(time * 0.6 + uv.y * 3.0),
      cos(time * 0.5 + uv.x * 2.5)
    ) * 0.08;
    uv += flow;

    float w = wave(uv, 10.0, 1.3, 0.08, time) +
      wave(uv + vec2(0.3, -0.2), 16.0, -0.9, 0.05, time);
    float n = fbm(uv * 3.5 + time * 0.15);
    float mist = fbm(uv * 6.0 - time * 0.2);

    vec3 cream = vec3(0.98, 0.97, 0.93);
    vec3 creamWarm = vec3(0.91, 0.87, 0.72);
    vec3 deep = vec3(0.22, 0.23, 0.67);

    float grad = smoothstep(0.0, 1.0, uv.y + w * 0.5);
    vec3 base = mix(cream, creamWarm, grad);
    base = mix(base, deep, smoothstep(0.35, 0.85, n + mist * 0.25));

    float highlight = smoothstep(0.45, 0.8, 1.0 - abs(uv.y - 0.5) * 1.6);
    base += highlight * 0.12 * vec3(0.9, 0.85, 0.6);

    float vignette = smoothstep(0.9, 0.25, distance(vUv, vec2(0.5)));
    base *= (0.35 + 0.25 * vignette);

    gl_FragColor = vec4(base, 1.0);
  }
`;

const ShaderPlane = () => {
  const materialRef = useRef();
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 1.4;
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const GradientMessage = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const [offsetRange, setOffsetRange] = useState({ start: 0, end: 0 });
  const [overlayPadding, setOverlayPadding] = useState(0);
  const highlightPhrases = [
    "Google AI Studio",
    "Gemini team",
    "frog Innovation",
    "design-to-code pipelines",
    "AI-ready design systems",
    "AI revolution",
  ];
  const highlightRegex = new RegExp(
    `(${highlightPhrases
      .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})`,
    "g",
  );
  const message = `Dear Google AI Studio and Gemini team :D, this website was mostly built before the AI era, but I like to rework it from time to time while testing the newest tools. Right now, I'm adding these lines with Google AI Studio.
I'm currently employed at frog Innovation where we're working with international clients, trying to help them reshape their products with a new visual and strategic perspective.

My focus is currently on the design-to-code pipelines, and on building AI-ready design systems.
I'm greatly excited by the AI revolution and I'm trying to do my part, focusing on building the right interfaces to communicate with thinking machines`;
  const paragraphs = message.split("\n\n");

  useLayoutEffect(() => {
    if (!cardRef.current || !textRef.current) {
      return undefined;
    }

    const updateDistance = () => {
      if (!cardRef.current || !textRef.current) {
        return;
      }
      const cardHeight = cardRef.current.clientHeight;
      const textHeight = textRef.current.scrollHeight;
      const padding = cardHeight * 2.4;
      setOverlayPadding(cardHeight * 1.2);
      const startOffset = 0;
      if (textHeight <= cardHeight) {
        setOffsetRange({ start: startOffset, end: startOffset });
        return;
      }
      const scrollDistance = textHeight - cardHeight + padding;
      setOffsetRange({ start: startOffset, end: startOffset - scrollDistance });
    };

    updateDistance();
    const observer = new ResizeObserver(updateDistance);
    observer.observe(cardRef.current);
    observer.observe(textRef.current);
    window.addEventListener("resize", updateDistance);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDistance);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [offsetRange.start, offsetRange.end],
  );

  return (
    <div
      ref={sectionRef}
      className="gradientShell relative w-full h-[520vh] min-h-[520vh] bg-peri_dark"
    >
      <div className="sticky top-[30vh] flex items-center justify-center">
        <div
          ref={cardRef}
          className="shaderCard relative w-[40vw] h-[40vh] min-w-[240px] min-h-[200px] max-w-[560px] max-h-[460px] overflow-hidden"
        >
          <Canvas
            className="shaderCanvas absolute inset-0 z-0"
            orthographic
            dpr={[1, 2]}
            camera={{ position: [0, 0, 1], zoom: 1 }}
          >
            <ShaderPlane />
          </Canvas>
          <motion.div
            style={{ y: textOffset, paddingTop: overlayPadding, paddingBottom: overlayPadding }}
            className="textOverlay absolute inset-0 z-20 flex h-full w-full items-start justify-center px-10 text-left"
          >
            <div
              ref={textRef}
              className="shaderText max-w-[85%] text-sm sm:text-base md:text-lg font-semibold"
            >
              {paragraphs.map((paragraph, index) => (
                <p className="shaderParagraph" key={`${paragraph}-${index}`}>
                  {paragraph.split("\n").map((line, lineIndex, lines) => (
                    <React.Fragment key={`${line}-${lineIndex}`}>
                      {line.split(highlightRegex).map((chunk, chunkIndex) => {
                        if (highlightPhrases.includes(chunk)) {
                          return (
                            <span
                              className="shaderHighlight"
                              key={`${chunk}-${chunkIndex}`}
                            >
                              {chunk}
                            </span>
                          );
                        }
                        return (
                          <React.Fragment key={`${chunk}-${chunkIndex}`}>
                            {chunk}
                          </React.Fragment>
                        );
                      })}
                      {lineIndex < lines.length - 1 ? <br /> : null}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        .shaderCard {
          isolation: isolate;
          animation: cardFloat 8s ease-in-out infinite;
          box-shadow: 0 40px 90px rgba(4, 10, 30, 0.65),
            0 10px 30px rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .shaderCanvas {
          animation: surfaceDrift 12s ease-in-out infinite;
        }

        .shaderText {
          color: #f6b000;
          background: transparent;
          padding: 0;
          border: none;
          box-shadow: none;
          line-height: 1.6;
          text-shadow: 0 6px 18px rgba(10, 10, 30, 0.7);
          letter-spacing: 0.08em;
          font-variant-ligatures: none;
          position: relative;
          z-index: 5;
          display: inline-block;
          mix-blend-mode: normal;
          font-family: "Geist Pixel", "Geist Mono", "Geist", monospace;
        }

        .shaderParagraph + .shaderParagraph {
          margin-top: 1.6rem;
        }

        .shaderHighlight {
          color: #ffe04d;
          text-shadow: 0 6px 18px rgba(255, 208, 64, 0.6);
        }

        .textOverlay {
          pointer-events: none;
        }

        @keyframes cardFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes surfaceDrift {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default GradientMessage;
