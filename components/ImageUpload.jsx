"use client"

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState, useEffect } from "react"

export default function ImageUpload({ disabled, onChange, onRemove, value }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])
  

  const onUpload = (res) => {
    onChange(res.info.secure_url);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="flex gap-3">
        {value.map((image) => {
          return (
            <div key={image.url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden mb-2">
              <div className="absolute z-10 top-2 right-2">
                <button className="bg-red-600 text-white rounded-md p-2 w-fit h-fit" type="button" onClick={() => onRemove(image.url)}>
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              <Image fill src={image.url} alt="Image" className="object-cover" />
            </div>
          )
        })}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="yjxcapql">
        {({ open }) => {
          const onClick = () => {
            open();
          }
          return (
            <button disabled={disabled} type="button" onClick={onClick}
            className={"justify-center items-center gap-1 text-[17px] px-1.5 py-1.5 bg-pink-600 text-white border-2 border-pink-200 transition flex hover:bg-pink-500 w-fit"}>
              <ImagePlus className="h-5 w-5" />
              Upload de Imagem
            </button>
          )
        }}
      </CldUploadWidget>
    </>
  )
}