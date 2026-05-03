import ContactSection from '@/components/layout/ContactUS/ContactSection'

export const metadata = {
    title: "Contact Us",
    description: "Get in touch with us for any inquiries about our products or services.",
};
import PageHeader from '@/components/layout/PageHeader'
import ContactForm from '@/components/layout/ContactUS/ContactForm'
import React from 'react'

async function page() {
    return (
        <>
            <PageHeader title="Contact" subtitle="us" mobileBgImage="/images/new/contact us mobile view copy.webp" />
            <ContactForm />

            {/* <ContactSection /> */}
        </>
    )
}

export default page