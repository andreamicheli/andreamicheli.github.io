import Image from "next/image";
import { motion, useTransform } from "framer-motion";

const Slide = (props) => {
  const direction = props.direction == "left" ? -1 : 1;

  const translateX = useTransform(
    props.progress,
    [0, 1],
    [150 * direction, -150 * direction]
  );

  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={props.src} text={props.text} uni={props.uni} />
      <Phrase src={props.src} text={props.text} uni={props.uni} />
      <Phrase src={props.src} text={props.text} uni={props.uni} />
    </motion.div>
  );
};

const Phrase = ({ src, text, uni }) => {
  return (
    <div className={"px-5 flex gap-5 items-center"}>
      <p className="text-[7.5vw]">
        {text} <span className="font-thin"> - {uni}</span>
      </p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{ objectFit: "scale-down" }} src={src} alt="image" fill />
      </span>
      <p className="text-[7.5vw]">
        {text}
        <span className="font-thin"> - {uni}</span>
      </p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{ objectFit: "scale-down" }} src={src} alt="image" fill />
      </span>
    </div>
  );
};

export default Slide;
