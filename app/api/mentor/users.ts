import { jsonServer } from "@/data/end-points";

export async function GET(req: Request) {
  try {
    // Fetch users from the JSON Server
    const response = await fetch(`${jsonServer.baseUrl}/${jsonServer.users}`);
    if (!response.ok) {
      throw new Error('Failed to fetch users from JSON Server');
    }

    const users = await response.json();

    // Return the fetched users
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
