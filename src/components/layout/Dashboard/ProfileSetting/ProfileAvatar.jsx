"use client";
import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";

export default function ProfileAvatar({ image, onChange, onRemove }) {
    const fileInputRef = useRef(null);

    const handleFileClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <section className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-divider shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-secondary shadow-md flex items-center justify-center bg-gray-100">
                        {image ? (
                            <Image
                                src={image}
                                alt="Profile"
                                width={112}
                                height={112}
                                unoptimized={true}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FaUser className="text-6xl text-primary" />
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleFileClick}
                        className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                        <FaCamera className="text-sm" />
                    </button>

                    <Input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex flex-col gap-4 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-accent font-bold text-primary">
                            Your Photo
                        </h3>
                        <p className="text-sm text-text/60">
                            Upload a new photo or remove the current one.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <Button size="sm" variant="primary" onClick={handleFileClick}>
                            Change Photo
                        </Button>

                        <Button
                            size="sm"
                            variant="outline"
                            className="text-error border-error/20 hover:bg-error/5 hover:border-error"
                            onClick={onRemove}
                            type="button"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}