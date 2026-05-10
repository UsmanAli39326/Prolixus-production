import { FaArrowRight, FaHandshake, FaIdBadge, FaHeadset } from "react-icons/fa";
import ActionCard from "./ActionCard";
import { useCurrency } from "@/context/CurrencyContext";

export default function QuickActionsSection({ stats, loading, localization }) {
    const { formatPrice } = useCurrency();
    return (
        <section>
            <h2 className="text-xl font-accent text-primary mb-4">
                {localization?.dashboard_quick_actions}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                <ActionCard
                    icon={<FaIdBadge />}
                    title={localization?.dashboard_menu_profile}
                    description={localization?.dashboard_manage_details}
                    actionLabel={localization?.dashboard_edit_profile}
                    href="/dashboard/profile"
                />

                <ActionCard
                    icon={<FaHeadset />}
                    title={localization?.dashboard_contact_support}
                    description={localization?.dashboard_get_help}
                    actionLabel={localization?.dashboard_get_support}
                    href="/contact"
                />

                <ActionCard
                    icon={<FaHandshake />}
                    title={localization?.dashboard_menu_partner}
                    description={localization?.dashboard_affiliate_summary}
                    value={loading ? "..." : formatPrice(stats.walletBalance || 0)}
                    actionLabel={localization?.dashboard_partner_dashboard}
                    href="/dashboard/partner"
                />

            </div>
        </section>
    );
}