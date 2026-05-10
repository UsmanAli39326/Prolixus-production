import { getLocalization } from "@/lib/getLocalization";
import PaymentStatusClient from "./PaymentStatusClient";
import { Suspense } from "react";

export async function generateMetadata() {
    const data = await getLocalization();
    return {
        title: `${data?.status_verifying} | Ecomm Store`,
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function PaymentStatusPage() {
    const data = await getLocalization();

    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6"></div>
                <h1 className="text-2xl font-bold text-primary mb-2">{data?.status_loading_page}</h1>
            </div>
        }>
            <PaymentStatusClient localization={data} />
        </Suspense>
    );
}
