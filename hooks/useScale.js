import { useTransform } from "framer-motion";

function useScale(scrollYProgress, scaleTimestamps, scaleFactor) {
  const scale = useTransform(scrollYProgress, scaleTimestamps, [
    1,
    scaleFactor,
    scaleFactor,
    1,
  ]);
  return { scale };
}

export default useScale;
