import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import drawCanvasPreview from "../hooks/drawCanvasPreview";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const ProfileImageModal = ({ onClose, isOpen, onFileSelect, existingFiles = [] }) => {
  if (!isOpen) return null;

  const MIN_WIDTH = 150;
  const MIN_HEIGHT = 150;
  const ASPECT_RATIO = 1 / 1;

  const ImgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [ImgSrc, setImgSrc] = useState(existingFiles[0] ? URL.createObjectURL(existingFiles[0]) : "");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImgSrc(reader.result?.toString() || "");
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;

    if (naturalWidth < MIN_WIDTH || naturalHeight < MIN_HEIGHT) {
      toast.error(`Image must be at least ${MIN_WIDTH}x${MIN_HEIGHT}px.`);
      setError("Please choose a larger image.");
      setImgSrc("");
      return;
    }

    const crop = makeAspectCrop({ unit: "%", width: 90 }, ASPECT_RATIO, naturalWidth, naturalHeight);
    const centeredCrop = centerCrop(crop, naturalWidth, naturalHeight);
    setCrop(centeredCrop);
  };

  const canvasToFile = (canvas, fileName = "profile.jpg") =>
    new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], fileName, { type: "image/jpeg" });
          resolve(file);
        }
      }, "image/jpeg");
    });

  const handleAddImage = async () => {
    if (!crop || !ImgRef.current || !previewCanvasRef.current) {
      toast.error("Please crop the image first!");
      return;
    }

    drawCanvasPreview(
      ImgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, ImgRef.current.width, ImgRef.current.height)
    );

    const croppedFile = await canvasToFile(previewCanvasRef.current);
    onFileSelect(croppedFile);
    toast.success("Image added successfully!");
  };

  return (
    <div className="inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center fixed font-rmlk-secondary text-[12px] text-white">
      <div className="bg-rmlk-dark-lighter rounded-md shadow-md w-[90%] max-w-[400px] max-h-[80%] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-2">
          <label className="text-white text-sm">Select Profile Picture</label>
          <button onClick={onClose} className="text-white hover:text-gray-300 duration-200">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-2 overflow-auto">
          <div className="p-2 flex flex-col items-center justify-center text-[12px]">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-white file:bg-rmlk-dark file:px-[8px] file:py-[4px] file:rounded-md file:shadow-md file:cursor-pointer file:hover:bg-rmlk-dark-light duration-200"
            />
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-7">
              {error && <div className="p-2 text-red-500 text-sm">{error}</div>}

              {ImgSrc ? (
                <div className="p-2 flex items-center justify-center overflow-auto">
                  <ReactCrop
                    crop={crop}
                    aspect={ASPECT_RATIO}
                    keepSelection
                    onChange={(c) => setCrop(c)}
                    className="max-h-[280px]"
                  >
                    <img
                      ref={ImgRef}
                      src={ImgSrc}
                      alt="Selected"
                      onLoad={onImageLoad}
                      className="h-full w-auto object-contain rounded-md shadow-md"
                    />
                  </ReactCrop>
                </div>
              ) : (
                <div className="p-[8px] w-full">
                  <div className="p-4 h-[120px] border-2 border-dashed border-rmlk-dark-light flex items-center justify-center rounded-md">
                    <FontAwesomeIcon icon={faImage} className="text-rmlk-dark-light text-3xl" />
                  </div>
                </div>
              )}

              {crop && (
                <div className="w-full p-[8px] flex items-center justify-center">
                  <button
                    onClick={() =>
                      drawCanvasPreview(
                        ImgRef.current,
                        previewCanvasRef.current,
                        convertToPixelCrop(crop, ImgRef.current.width, ImgRef.current.height)
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-500 px-[8px] py-[4px] rounded-md shadow-md cursor-pointer"
                  >
                    Crop
                  </button>
                </div>
              )}
            </div>

            <div className="col-span-5">
              {crop && <canvas ref={previewCanvasRef} className="w-full" />}
              {crop && (
                <button
                  onClick={handleAddImage}
                  className="w-full bg-blue-600 mt-2 px-[8px] py-[4px] rounded-md hover:bg-blue-500 duration-200 cursor-pointer"
                >
                  Add Image
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;
