import { Suspense } from "react";
import OrderDetailContent from "./OrderDetailContent";
import { getLocalization } from "@/lib/getLocalization";

export async function generateMetadata({ searchParams }) {
    const { orderId } = await searchParams;
    const data = await getLocalization();
    return {
        title: `${data?.order_detail_title} #${orderId || "N/A"}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function OrderDetailPage() {
    const data = await getLocalization();

    return (
        <Suspense
            fallback={
                <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                    <p className="text-xl text-text/80 font-medium animate-pulse">
                        {data?.order_detail_loading}
                    </p>
                </div>
            }
        >
            <OrderDetailContent localization={data} />
        </Suspense>
    );
}