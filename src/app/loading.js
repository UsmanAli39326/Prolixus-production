import React from "react";
import Image from "next/image";

export default function Loading() {

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-(--primary-color)">
      <div className="relative h-[140px] w-[140px]">

        {/* Rotating Border */}
        {/* <div className="absolute inset-0 rounded-full border-4 border-transparent border-r-(--white-color) border-l-(--white-color) animate-spin" /> */}

        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/new/logo-2.gif"
            alt="Loading..."
            width={500}
            height={500}
            className=" w-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}