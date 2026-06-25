"use client";

import { useState, useEffect } from "react";

export default function DemoVideoModalClient({ demoVideoUrl, triggerTimeInSeconds, isRenderVideoDisable }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Helper to extract video ID and convert to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(demoVideoUrl);

  useEffect(() => {
    // If backend disabled it or no URL provided, do nothing
    if (isRenderVideoDisable || !embedUrl) return;

    // Check user preference in localStorage
    const hideVideo = localStorage.getItem("hideDemoVideo");
    if (hideVideo === "true") return;

    // Set timeout to show video
    const timeInMs = triggerTimeInSeconds ? triggerTimeInSeconds * 1000 : 20000;
    
    const timer = setTimeout(() => {
      setShowVideoModal(true);
    }, timeInMs);

    return () => clearTimeout(timer);
  }, [demoVideoUrl, triggerTimeInSeconds, isRenderVideoDisable, embedUrl]);

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmDecision = (hideNextTime) => {
    if (hideNextTime) {
      localStorage.setItem("hideDemoVideo", "true");
    }
    setShowConfirmModal(false);
  };

  if (!showVideoModal && !showConfirmModal) return null;

  return (
    <>
      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity px-4">
          <div className="relative w-full max-w-4xl p-2 sm:p-6 lg:p-8">
            <button
              onClick={handleCloseVideo}
              className="absolute -top-10 right-0 sm:-top-8 sm:-right-8 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200 transition-colors z-10"
              aria-label="Close video"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl bg-black">
              <iframe
                src={embedUrl}
                title="Demo Video"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity px-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 transform transition-all text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 font-jakarta">
              Do you want to see this video next time?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleConfirmDecision(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-white font-bold tracking-wide hover:bg-accent transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirmDecision(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gray-200 text-gray-800 font-bold tracking-wide hover:bg-gray-300 transition-colors"
              >
                No, don't show again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
