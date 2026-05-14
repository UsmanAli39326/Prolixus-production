import { getLocalization } from "@/lib/getLocalization";
import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/layout/ContactUS/ContactForm'
import React from 'react'

export async function generateMetadata() {
    const data = await getLocalization();
    return {
        title: data?.contact_meta_title,
        description: data?.contact_meta_description,
    };
}

async function page() {
    const data = await getLocalization();

    return (
        <>
            <PageHeader
                title={data?.contact_header_title}
                subtitle={data?.contact_header_subtitle}
                pageKey="contact"
                breadcrumbs={[
                    { label: data?.product_breadcrumb_home, href: "/" },
                    { label: data?.contact_breadcrumb_contact, href: null }
                ]}
            />
            <ContactForm localization={data} />
        </>
    )
}

export default page