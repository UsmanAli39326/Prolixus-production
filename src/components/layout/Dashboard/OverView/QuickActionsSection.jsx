import { FaArrowRight, FaHandshake, FaIdBadge, FaHeadset } from "react-icons/fa";
import ActionCard from "./ActionCard";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

export default function QuickActionsSection({ stats, loading, localization: propLocalization }) {
    const { formatPrice } = useCurrency();
    const { loc: contextLoc } = useLanguage();
    const localization = { ...propLocalization, ...contextLoc };

    return (
        <section>
            <h2 className="text-xl font-accent text-primary mb-4">
                {localization?.dashboard_quick_actions || "Quick Actions"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                <ActionCard
                    icon={<FaIdBadge />}
                    title={localization?.dashboard_menu_profile || "Profile Settings"}
                    description={localization?.dashboard_manage_details || "Manage your personal details"}
                    actionLabel={localization?.dashboard_edit_profile || "Edit Profile"}
                    href="/dashboard/profile"
                />

                <ActionCard
                    icon={<FaHeadset />}
                    title={localization?.dashboard_contact_support || "Contact Support"}
                    description={localization?.dashboard_get_help || "Get help with your orders"}
                    actionLabel={localization?.dashboard_get_support || "Get Support"}
                    href="/contact"
                />

                <ActionCard
                    icon={<FaHandshake />}
                    title={localization?.dashboard_menu_partner || "Partner Program"}
                    description={localization?.dashboard_affiliate_summary || "Affiliate Summary"}
                    value={loading ? "..." : formatPrice(stats.walletBalance || 0)}
                    actionLabel={localization?.dashboard_partner_dashboard || "Partner Dashboard"}
                    href="/dashboard/partner"
                />

            </div>
        </section>
    );
}
