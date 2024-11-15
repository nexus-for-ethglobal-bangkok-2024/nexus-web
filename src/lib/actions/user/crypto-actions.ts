"use server";
import { db } from "@/db";

export async function getUserAssets(userId:string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/assets`, {
      cache: 'no-store',  // Disable caching to always get fresh data
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch assets');
    }

    const assets = await response.json();
    return assets;
  } catch (error) {
    console.error('Error in getUserAssets:', error);
    throw error;
  }
}

//Swapping


