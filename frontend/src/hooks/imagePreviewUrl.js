import { useState } from "react";
import { toast } from "react-hot-toast";

const usePreviewingImg = () => {
  let [imgUrl, setImgUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
      toast.success("Image Selected!");
    } else {
      toast("Invalid file type");
      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewingImg;
