"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, Calendar } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-primary-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="bg-green-100 dark:bg-green-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Thank you for your purchase. Your payment has been processed successfully.
          </p>

          {sessionId && (
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 mb-8">
              <p className="text-sm text-gray-600 dark:text-gray-400">Order ID</p>
              <p className="font-mono text-sm break-all">{sessionId}</p>
            </div>
          )}

          {/* Next Steps */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg h-fit">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Confirmation Email</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You will receive a confirmation email with all the details shortly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-secondary-100 dark:bg-secondary-900 p-3 rounded-lg h-fit">
                  <Calendar className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Get Started</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Our team will contact you within 24 hours to get you started.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all inline-flex items-center justify-center gap-2"
            >
              Return Home
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/courses"
              className="bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-all inline-flex items-center justify-center gap-2"
            >
              Browse More Courses
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Have questions?{" "}
              <Link href="/contact" className="text-primary-600 hover:underline font-semibold">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
