export const dynamic = "force-dynamic";
import { getLocalization } from "@/lib/getLocalization";
import { getConductCopy } from "@/constants/conductCopy";
import RewardsClient from "./RewardsClient";

export async function generateMetadata() {
    const loc = await getLocalization();
    const copy = getConductCopy(loc);
    return {
        title: copy.meta.title || "CONDUCT – Das Prolixus Empfehlungsprogramm",
        description: copy.meta.description || "Empfehle Prolixus weiter. 5 erfolgreiche Empfehlungen – deine nächste Monatsration geht auf uns.",
    };
}

export default async function RewardsPage() {
    const data = await getLocalization();

    return (
        <RewardsClient localization={data} />
    );
}

