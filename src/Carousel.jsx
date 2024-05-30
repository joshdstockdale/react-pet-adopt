import { useState } from "react";

const Carousel = ({ images }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="align-center mt-2 flex h-96 justify-around">
      <img
        className=" max-h-96 max-w-[50%]"
        src={images[active]}
        alt="animal hero"
      />
      <div className="w-1/2">
        {images.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            onClick={() => {
              setActive(index);
            }}
            src={photo}
            className={`m-4 inline-block h-24 w-24 rounded-full border-2 border-gray-700 hover:cursor-pointer
              ${index === active ? "active" : ""}`}
            alt="animal thumbnail"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
