// Video.js
import React from "react";
import PropTypes from "prop-types";

/**
 * Video Component
 *
 * Renders a video with standardized accessibility features.
 *
 * Props:
 * - src: The source URL of the video.
 * - title: The title of the video.
 * - controls: Boolean indicating whether to show video controls.
 * - className: Additional CSS classes for customization.
 * - ...rest: Any other props to pass to the <video> tag.
 */

const Video = ({ src, title, controls = true, className = "", ...rest }) => {
  return (
    <video
      src={src}
      title={title}
      controls={controls}
      className={`w-full ${className}`}
      aria-label={title}
      {...rest}
    >
      Your browser does not support the video tag.
    </video>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  controls: PropTypes.bool,
  className: PropTypes.string,
};

export default Video;
