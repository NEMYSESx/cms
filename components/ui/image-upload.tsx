"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMount) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              height={50}
              width={50}
              className="object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onSuccess={onUpload} uploadPreset="svn9a6k6">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              onClick={onClick}
              type="button"
              variant="secondary"
              disabled={disabled}
            >
              <ImagePlus />
              Uload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
