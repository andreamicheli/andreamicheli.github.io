import React, { useState, useEffect } from "react";

const Loading = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

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
        setPercentage(percentage);
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

  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-white z-50 flex justify-center items-center"
        style={{ display: loading ? "block" : "none" }}
      >
        <p>Loading... {percentage}%</p>
      </div>
      {children}
    </>
  );
};

export default Loading;
