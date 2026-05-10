import FaderInAnimation from "@/Hooks/FaderInAnimation";
import Link from "next/link";

const videoUrls = [
    "https://www.youtube.com/embed/3UeF0W_I8KY?si=gc80rrY73uxHK8ev",
    "https://www.youtube.com/embed/GLdSWMsJNOw?si=qocD4NdQbNKRsd-B",
    "https://www.youtube.com/embed/1r8qIrBDsXw?si=HW6CJdGwQ-b9vhKH",
];

/**
 * Extract the video ID from a YouTube embed URL.
 */
function extractVideoId(embedUrl) {
    const match = embedUrl.match(/\/embed\/([^?/]+)/);
    return match ? match[1] : null;
}

/**
 * Fetch the actual video title from YouTube using the free oEmbed endpoint.
 * Falls back to a generic title if the request fails.
 */
async function fetchVideoTitle(videoId) {
    try {
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const res = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`,
            { next: { revalidate: 86400 } } // cache for 24 hours
        );
        if (!res.ok) return null;
        const data = await res.json();
        return data.title || null;
    } catch {
        return null;
    }
}

export default async function YouTubeGallery({ data = {} }) {
    // Fetch all titles in parallel
    const videos = await Promise.all(
        videoUrls.map(async (url, idx) => {
            const videoId = extractVideoId(url);
            const title = videoId
                ? await fetchVideoTitle(videoId)
                : null;
            return {
                id: String(idx + 1),
                url,
                title: title || `Video ${idx + 1}`,
            };
        })
    );

    return (
        <section className="youtube-gallery py-16 lg:py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <div className="text-center mb-12">
                    <FaderInAnimation direction="up">
                        <h3 className="text-small font-semibold tracking-[0.2em] text-(--primary-color) uppercase mb-3">
                            {data?.label}
                        </h3>
                    </FaderInAnimation>
                    <FaderInAnimation direction="up" delay={0.2}>
                        <h2 className="font-default text-section lg:text-page font-bold leading-tight text-(--primary-color)">
                            {data?.title_main}{" "}
                            <span className="text-(--accent-color) font-accent font-light italic">
                                {data?.title_accent}
                            </span>
                        </h2>
                    </FaderInAnimation>
                </div>

                {/* Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, index) => (
                        <FaderInAnimation key={video.id} direction="up" delay={0.1 * (index + 3)}>
                            <div className="video-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group">
                                <div className="aspect-video relative overflow-hidden bg-black">
                                    <iframe
                                        className="w-full h-full"
                                        src={video.url}
                                        title={video.title}
                                        autoPlay={true}
                                        allowFullScreen
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-important font-bold text-(--primary-color) group-hover:text-(--accent-color) transition-colors duration-300">
                                        {video.title}
                                    </h4>
                                </div>
                            </div>
                        </FaderInAnimation>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-16 text-center">
                    <FaderInAnimation direction="up" delay={0.8}>
                        <Link
                            href="https://www.youtube.com/@prolixus.official" // Replace with actual channel URL
                            target="_blank"
                            className="inline-flex items-center gap-3 bg-(--primary-color) text-white px-8 py-4 rounded-full font-bold hover:bg-(--accent-color) hover:text-(--primary-color) transition-all duration-300 transform hover:scale-105 shadow-lg group"
                        >
                            <span>{data?.button_text}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="group-hover:translate-x-1 transition-transform duration-300"
                            >
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </Link>
                    </FaderInAnimation>
                </div>
            </div>
        </section>
    );
}
