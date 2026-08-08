"use client";

import { useState } from "react";
import { getImageUrl } from "@/lib/ImageService";

export default function TeamMemberAvatar({ member, apiBase = "" }) {
  const [imageError, setImageError] = useState(false);

  const rawSrc =
    member?.imageUrl ||
    member?.fileUrl ||
    member?.file?.fileUrl ||
    (member?.fileId ? `${apiBase}/File/GetFile/${member.fileId}` : null);

  const imgSrc = rawSrc
    ? rawSrc.startsWith("http://") || rawSrc.startsWith("https://")
      ? rawSrc
      : getImageUrl(rawSrc)
    : null;

  if (!imgSrc || imageError) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
        <span className="text-4xl">👤</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={member?.name || "Team Member"}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setImageError(true)}
    />
  );
}
