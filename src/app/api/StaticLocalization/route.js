import { NextResponse } from 'next/server';
export async function GET() {
  try {
    // Merge all localization data for all pages
    const allData = {
      ...homepageData,
      ...dashboardData,
      ...ecommerceData,
      ...blogData,
      ...contactData,
      ...aboutData,
      ...errorData,
    };
    return NextResponse.json(allData);
  } catch (error) {
    console.error('Error fetching localization data:', error);
    return NextResponse.json({ error: 'Failed to fetch localization data' }, { status: 500 });
  }
}
