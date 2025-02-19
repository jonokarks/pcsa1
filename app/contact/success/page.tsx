"use client";

import { useRouter } from "next/navigation";

export default function ContactSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-teal-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for contacting us. We'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => router.push("/contact")}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
            >
              Back to Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
