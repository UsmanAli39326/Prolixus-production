import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real scenario, you might fetch this from a database
    // For now, we return the data from the JSON file
    return NextResponse.json(homepageData);
  } catch (error) {
    console.error('Error fetching localization data:', error);
    return NextResponse.json({ error: 'Failed to fetch localization data' }, { status: 500 });
  }
}
