import classNames from "classnames";
import React, { useState } from "react";

function ImageGallery({ title, images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
      <div className="h-[250px] md:h-[430px] border border-gray-200 p-4 flex rounded-md">
        <img src={images && images[activeIndex]} alt={title} className="object-contain max-h-[95%] m-auto rounded-md" />
      </div>
      <ul className="flex flex-wrap justify-center gap-2 mt-4">
        {images?.slice(0, images.length - 1).map((img, i) => (
          <li
            className={classNames(
              "rounded-md overflow-hidden object-cover border-2 h-[80px] md:h-[125px] aspect-square",
              {
                "border-indigo-700": i === activeIndex,
                "border-transparent": i !== activeIndex,
              }
            )}
            key={img}
          >
            <button type="button" className="block h-full" onClick={() => setActiveIndex(i)}>
              <img className="object-contain" src={img} alt={title} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageGallery;
