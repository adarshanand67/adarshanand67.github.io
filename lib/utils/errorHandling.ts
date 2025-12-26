/**
 * @fileoverview Error handling utilities and helpers.
 * Provides consistent error handling patterns across the application.
 */

/**
 * Custom error class for application-specific errors.
 */
export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number
    ) {
        super(message);
        this.name = "AppError";
    }
}

/**
 * Safely executes an async function with error handling.
 * Returns [data, error] tuple similar to Go's error handling pattern.
 *
 * @template T - The return type of the async function
 * @param {Promise<T>} promise - The promise to execute
 * @returns {Promise<[T | null, Error | null]>} Tuple of [data, error]
 *
 * @example
 * ```ts
 * const [data, error] = await safeAsync(fetchData());
 * if (error) {
 *   console.error(error);
 *   return;
 * }
 * // Use data safely
 * ```
 */
export async function safeAsync<T>(promise: Promise<T>): Promise<[T | null, Error | null]> {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

/**
 * Safely executes a synchronous function with error handling.
 * Returns [data, error] tuple.
 *
 * @template T - The return type of the function
 * @param {() => T} fn - The function to execute
 * @returns {[T | null, Error | null]} Tuple of [data, error]
 *
 * @example
 * ```ts
 * const [result, error] = safeSync(() => JSON.parse(jsonString));
 * if (error) {
 *   console.error('Parse error:', error);
 *   return defaultValue;
 * }
 * return result;
 * ```
 */
export function safeSync<T>(fn: () => T): [T | null, Error | null] {
    try {
        const data = fn();
        return [data, null];
    } catch (error) {
        return [null, error instanceof Error ? error : new Error(String(error))];
    }
}

/**
 * Validates that a value is not null or undefined.
 * Throws an error if validation fails.
 *
 * @template T
 * @param {T | null | undefined} value - Value to validate
 * @param {string} fieldName - Name of the field for error message
 * @returns {T} The validated value
 * @throws {AppError} If value is null or undefined
 *
 * @example
 * ```ts
 * const user = assertNotNull(maybeUser, 'user');
 * // user is guaranteed to be non-null here
 * ```
 */
export function assertNotNull<T>(value: T | null | undefined, fieldName: string): T {
    if (value === null || value === undefined) {
        throw new AppError(`${fieldName} is required but was ${value}`, "NULL_VALUE");
    }
    return value;
}

/**
 * Safely accesses a nested property with a fallback value.
 *
 * @template T
 * @param {() => T} accessor - Function that accesses the property
 * @param {T} fallback - Fallback value if access fails
 * @returns {T} The accessed value or fallback
 *
 * @example
 * ```ts
 * const name = safeAccess(() => user.profile.name, 'Unknown');
 * ```
 */
export function safeAccess<T>(accessor: () => T, fallback: T): T {
    try {
        return accessor() ?? fallback;
    } catch {
        return fallback;
    }
}

/**
 * Logs an error with context information.
 * In production, this could send to an error tracking service.
 *
 * @param {Error} error - The error to log
 * @param {Record<string, any>} context - Additional context
 */
export function logError(error: Error, context?: Record<string, any>): void {
    if (process.env.NODE_ENV === "development") {
        console.error("Error:", error);
        if (context) {
            console.error("Context:", context);
        }
    } else {
        // In production, send to error tracking service (e.g., Sentry)
        // Example: Sentry.captureException(error, { extra: context });
        console.error(error.message);
    }
}

/**
 * Creates a user-friendly error message from an error object.
 *
 * @param {unknown} error - The error object
 * @param {string} fallback - Fallback message
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error: unknown, fallback = "An error occurred"): string {
    if (error instanceof AppError) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    return fallback;
}

/**
 * Retry a function with exponential backoff.
 *
 * @template T
 * @param {() => Promise<T>} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delayMs - Initial delay in milliseconds
 * @returns {Promise<T>} Result of the function
 */
export async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 3,
    delayMs = 1000
): Promise<T> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
        const [result, error] = await safeAsync(fn());

        if (!error) {
            return result as T;
        }

        lastError = error;

        if (i < maxRetries - 1) {
            await new Promise((resolve) => setTimeout(resolve, delayMs * Math.pow(2, i)));
        }
    }

    throw lastError || new Error("Max retries exceeded");
}
