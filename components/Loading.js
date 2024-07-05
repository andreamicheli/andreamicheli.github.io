import React, { useState, useEffect } from "react";
import { motion, useIsPresent } from "framer-motion";

const Loading = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  // const isPresent = useIsPresent();

  useEffect(() => {
    const images = document.getElementsByTagName("img");
    const totalImages = images.length;
    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages++;
      if (loadedImages.length === totalImages.length) {
        resolveImagesLoaded();
      }
    };

    let resolveImagesLoaded;
    const imagesLoadedPromise = new Promise((resolve) => {
      resolveImagesLoaded = resolve;

      for (let i = 0; i < totalImages; i++) {
        if (images[i].complete) {
          handleImageLoad();
        } else {
          images[i].addEventListener("load", handleImageLoad);
          images[i].addEventListener("error", handleImageLoad); // Handle image load errors
        }
      }

      if (totalImages === 0) {
        resolve();
      }
    });

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(resolve, 3000); // 3 seconds
      let startTime = Date.now();
      const updatePercentage = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const percentage = Math.floor((elapsedTime / 3000) * 100);
        if (percentage < 100) setPercentage(percentage);
        if (percentage >= 95) setPercentage(100);
        if (elapsedTime < 3000) {
          setTimeout(updatePercentage, 100);
        }
        // if (elapsedTime >= 3000) {resolve}
      };
      updatePercentage();
    });

    Promise.all([imagesLoadedPromise, timeoutPromise]).then(() => {
      setLoading(false);
    });

    return () => {
      for (let i = 0; i < totalImages; i++) {
        images[i].removeEventListener("load", handleImageLoad);
        images[i].removeEventListener("error", handleImageLoad);
      }
    };
  }, []);

  useEffect(() => {
    // Function to prevent default behavior for scroll events
    const preventScroll = (e) => {
      e.preventDefault();
    };

    if (loading) {
      // Block scrolling by adding event listeners
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      // Allow scrolling by removing event listeners
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      // Cleanup function to ensure scrolling is allowed when the component unmounts
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [loading]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen bg-white z-50 flex justify-end items-end lg:px-10 py-4 sm:px-4"
        style={{ clipPath: "circle(150% at 80% 85%)" }}
        animate={{
          clipPath: loading
            ? "circle(150% at 80% 85%)"
            : "circle(0% at 80% 85%)",
        }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="text-peri_dark lg:text-[15rem] text-9xl font-bold p-0 m-0"
          style={{ opacity: percentage >= 20 ? percentage + "%" : "20%" }}
        >
          {percentage}%
        </p>
      </motion.div>
      {children}
    </>
  );
};

export default Loading;
