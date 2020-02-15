import React from "react";

import classNames from "../../utils/classNames";
import rotatedWidth from "../../utils/rotatedWidth";

const Preview = React.forwardRef(
  ({ settings, imageUrl, side, className }, ref) => {
    const xScale = side / rotatedWidth(side, settings.rotation);

    return (
      <div
        ref={ref}
        className={classNames({
          [className]: className
        })}
        style={{
          display: "inline-flex",
          width: `100%`,
          alignItems: "center",
          padding: `30px`,
          position: "relative"
        }}
      >
        <div
          style={{
            width: `100%`,
            maxHeight: "100vh",
            border: `${settings.borderWidth}px solid white`,
            borderRadius: `${settings.radius}px`,
            boxShadow: `0 0 ${settings.shadowSize}px black`,
            lineHeight: 0,
            overflow: "hidden",
            transform: `rotate(${settings.rotation}deg) scale(${xScale})`
          }}
        >
          {imageUrl && (
            <img
              alt="Sticker preview"
              style={{ width: "100%" }}
              src={imageUrl}
            />
          )}
        </div>
      </div>
    );
  }
);

export default Preview;
