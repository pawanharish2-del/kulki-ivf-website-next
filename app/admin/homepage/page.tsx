import React from 'react';
import { getHomepageSettings, updateHomepageSettings } from '@/lib/actions/homepage';

export default async function HomepageSettingsPage() {
  const settings = await getHomepageSettings();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Homepage Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage the hero text and statistics displayed on the public homepage.
        </p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <form action={updateHomepageSettings} className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="sm:col-span-4">
              <label htmlFor="heroTitle" className="block text-sm font-medium leading-6 text-gray-900">
                Hero Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="heroTitle"
                  id="heroTitle"
                  defaultValue={settings?.heroTitle || ''}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                  placeholder="e.g. Bringing Joy to Your Journey"
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="heroSubtitle" className="block text-sm font-medium leading-6 text-gray-900">
                Hero Subtitle
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="heroSubtitle"
                  id="heroSubtitle"
                  defaultValue={settings?.heroSubtitle || ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  defaultValue={settings?.description || ''}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            {/* Statistics Section */}
            <div className="col-span-full mt-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900 border-b pb-2">Statistics Counters</h3>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="yearsExperience" className="block text-sm font-medium leading-6 text-gray-900">
                Years Experience
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="yearsExperience"
                  id="yearsExperience"
                  defaultValue={settings?.yearsExperience || 0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="successRate" className="block text-sm font-medium leading-6 text-gray-900">
                Success Rate (%)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="successRate"
                  id="successRate"
                  defaultValue={settings?.successRate || 0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="happyFamilies" className="block text-sm font-medium leading-6 text-gray-900">
                Happy Families
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="happyFamilies"
                  id="happyFamilies"
                  defaultValue={settings?.happyFamilies || 0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="ivfSpecialists" className="block text-sm font-medium leading-6 text-gray-900">
                IVF Specialists
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="ivfSpecialists"
                  id="ivfSpecialists"
                  defaultValue={settings?.ivfSpecialists || 0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 px-3"
                />
              </div>
            </div>

          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 mt-8 px-4 py-4 sm:px-8">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
