'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function updateHomepageSettings(formData: FormData) {
  try {
    const heroTitle = formData.get('heroTitle') as string;
    const heroSubtitle = formData.get('heroSubtitle') as string;
    const description = formData.get('description') as string;
    const yearsExperience = parseInt(formData.get('yearsExperience') as string) || 0;
    const successRate = parseInt(formData.get('successRate') as string) || 0;
    const happyFamilies = parseInt(formData.get('happyFamilies') as string) || 0;
    const ivfSpecialists = parseInt(formData.get('ivfSpecialists') as string) || 0;

    // Get the first record, or create it if it doesn't exist
    const existing = await prisma.homepageSettings.findFirst();

    if (existing) {
      await prisma.homepageSettings.update({
        where: { id: existing.id },
        data: {
          heroTitle,
          heroSubtitle,
          description,
          yearsExperience,
          successRate,
          happyFamilies,
          ivfSpecialists,
        },
      });
    } else {
      await prisma.homepageSettings.create({
        data: {
          heroTitle,
          heroSubtitle,
          description,
          yearsExperience,
          successRate,
          happyFamilies,
          ivfSpecialists,
        },
      });
    }

    revalidatePath('/');
    revalidatePath('/admin/homepage');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update homepage settings:', error);
    return { success: false, error: 'Failed to save settings' };
  }
}

export async function getHomepageSettings() {
  try {
    const settings = await prisma.homepageSettings.findFirst();
    return settings;
  } catch (error) {
    console.error('Failed to get homepage settings:', error);
    return null;
  }
}
