/**
 * @fileoverview Test page for error handling demonstration.
 * Shows how the error boundary and error fallback components work.
 */

"use client";

import { useState } from "react";
import { ErrorFallback } from "@/components/error";
import { safeAsync, AppError, assertNotNull } from "@/lib/utils";

export default function ErrorTestPage() {
    const [showError, setShowError] = useState(false);
    const [errorType, setErrorType] = useState<"boundary" | "fallback" | "none">("none");

    const triggerError = () => {
        setShowError(true);
        throw new Error("This is a test error!");
    };

    const testAsyncError = async () => {
        const [data, error] = await safeAsync(
            Promise.reject(new AppError("Async operation failed", "ASYNC_ERROR"))
        );

        if (error) {
            setErrorType("fallback");
            return;
        }
    };

    const testNullCheck = () => {
        try {
            const value = null;
            assertNotNull(value, "testValue");
        } catch (error) {
            setErrorType("fallback");
        }
    };

    if (showError) {
        throw new Error("Component error triggered!");
    }

    if (errorType === "fallback") {
        return (
            <ErrorFallback
                error={new Error("Test error for demonstration")}
                resetErrorBoundary={() => setErrorType("none")}
                title="Test Error"
                message="This is a demonstration of the error fallback component."
            />
        );
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">
                    Error Handling Test Page
                </h1>

                <div className="space-y-4">
                    <div className="glass-apple dark:bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Error Boundary Test
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This will trigger a React error boundary and show the global error UI.
                        </p>
                        <button
                            onClick={triggerError}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors"
                        >
                            Trigger Error Boundary
                        </button>
                    </div>

                    <div className="glass-apple dark:bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Async Error Test
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This will demonstrate safe async error handling with the safeAsync
                            utility.
                        </p>
                        <button
                            onClick={testAsyncError}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold transition-colors"
                        >
                            Test Async Error
                        </button>
                    </div>

                    <div className="glass-apple dark:bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Null Check Test
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            This will demonstrate null validation with the assertNotNull utility.
                        </p>
                        <button
                            onClick={testNullCheck}
                            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-bold transition-colors"
                        >
                            Test Null Check
                        </button>
                    </div>

                    <div className="glass-apple dark:bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Documentation
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            See{" "}
                            <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                                docs/ERROR_HANDLING.md
                            </code>{" "}
                            for complete error handling documentation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
