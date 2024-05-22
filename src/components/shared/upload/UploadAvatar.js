import PropTypes from "prop-types";

const RootStyle = {
  width: 144,
  height: 144,
  margin: "auto",
  borderRadius: "50%",
  padding: 4,
  border: `1px dashed gray`,
};

const DropZoneStyle = {
  zIndex: 0,
  width: "100%",
  height: "100%",
  outline: "none",
  display: "flex",
  overflow: "hidden",
  borderRadius: "50%",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  "& > *": { width: "100%", height: "100%" },
  "&:hover": {
    // cursor: "pointer",
    "& .placeholder": {
      zIndex: 9,
    },
  },
};

const PlaceholderStyle = {
  display: "flex",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: "primary",
  backgroundColor: "red",
  //   backgroundColor: theme.palette.background.neutral,
  //   transition: theme.transitions.create("opacity", {
  //     easing: theme.transitions.easing.easeInOut,
  //     duration: theme.transitions.duration.shorter,
  //   }),
  "&:hover": { opacity: 0.72 },
};

// ----------------------------------------------------------------------

UploadAvatar.propTypes = {
  error: PropTypes.bool,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperText: PropTypes.node,
};

export default function UploadAvatar({ error, file, helperText, ...other }) {
  return (
    <>
      <div
        style={{
          ...RootStyle,
          ...(error && {
            borderColor: "red",
          }),
        }}
      >
        <div style={DropZoneStyle}>
          <input {...other} />

          {file && (
            <img
              alt="avatar"
              src={typeof file === "string" ? file : file.preview}
              style={{ zIndex: 8 }}
            />
          )}

          <div
            className="placeholder"
            style={{
              ...PlaceholderStyle,
              ...(file && {
                opacity: 0,
                color: "white",
                backgroundColor: "gray",
                "&:hover": { opacity: 0.72 },
              }),
              ...(error && {
                backgroundColor: "red",
              }),
            }}
          >
            <i className="bx bx-camera"></i>
            <p>{file ? "Update photo" : "Upload photo"}</p>
          </div>
        </div>
      </div>
      {helperText && helperText}
    </>
  );
}
