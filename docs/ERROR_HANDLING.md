# Error Handling Implementation Guide

## Overview

This document outlines the comprehensive error handling system implemented across the codebase.

## Core Components

### 1. Error Utilities (`lib/utils/errorHandling.ts`)

#### AppError Class

Custom error class for application-specific errors with error codes and status codes.

```typescript
throw new AppError("User not found", "USER_NOT_FOUND", 404);
```

#### Safe Async Execution

Go-style error handling for async operations:

```typescript
const [data, error] = await safeAsync(fetchData());
if (error) {
    // Handle error
    return;
}
// Use data safely
```

#### Safe Sync Execution

Error handling for synchronous operations:

```typescript
const [result, error] = safeSync(() => JSON.parse(jsonString));
if (error) {
    return defaultValue;
}
```

#### Validation Helpers

- `assertNotNull(value, fieldName)` - Throws if value is null/undefined
- `safeAccess(accessor, fallback)` - Safely access nested properties
- `getErrorMessage(error, fallback)` - Extract user-friendly error messages

#### Retry Logic

Exponential backoff retry mechanism:

```typescript
const result = await retryWithBackoff(fetchData, 3, 1000);
```

### 2. Error Components

#### ErrorFallback (`components/error/ErrorFallback.tsx`)

Reusable error UI component with Apple-style design:

- User-friendly error messages
- Retry functionality
- Development-only error details
- Consistent styling across the app

#### GlobalErrorBoundary (`components/error/GlobalErrorBoundary.tsx`)

React error boundary for catching unhandled errors:

- Wraps entire application
- Logs errors for debugging
- Shows ErrorFallback UI
- Provides reset functionality

#### MusicPlayerErrorBoundary

Specialized error boundary for music player component.

## Implementation Examples

### API Functions (`lib/api/content.ts`)

All API functions now include:

- Null/undefined checks
- Array validation
- Try-catch blocks
- Error logging
- Graceful fallbacks

```typescript
export const getExperiences = async () => {
    try {
        if (!experiencesData || !Array.isArray(experiencesData)) {
            throw new AppError("Experience data not found or invalid", "EXPERIENCE_NOT_FOUND");
        }
        return experiencesData;
    } catch (error) {
        logError(error as Error, { function: "getExperiences" });
        throw error;
    }
};
```

### Component Validation (`components/layout/experience/Experience.tsx`)

Components now validate:

- Props existence and type
- Array items before mapping
- Nested properties before rendering
- Provide fallback UI for missing data

```typescript
// Validate items prop
if (!items || !Array.isArray(items) || items.length === 0) {
    return <EmptyState />;
}

// Validate individual items
{items.map((item, index) => {
    if (!item || typeof item !== "object") {
        console.error(`Invalid item at index ${index}`);
        return null;
    }
    // Render item
})}
```

## Best Practices

### 1. Always Validate Props

```typescript
if (!data || !Array.isArray(data)) {
    return <ErrorState />;
}
```

### 2. Use Fallback Values

```typescript
<h3>{exp.company || "Unknown Company"}</h3>
```

### 3. Wrap API Calls

```typescript
try {
    const data = await fetchData();
    return data;
} catch (error) {
    logError(error as Error, { context });
    throw error;
}
```

### 4. Validate Before Mapping

```typescript
{items && Array.isArray(items) && items.length > 0 && (
    items.map((item) => ...)
)}
```

### 5. Check Nested Properties

```typescript
{exp.highlights && Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
    <ul>...</ul>
)}
```

## Error Logging

In development:

- Full error stack traces in console
- Context information logged
- Error details visible in UI

In production:

- User-friendly messages only
- Errors logged to console (can be extended to external services)
- Sensitive information hidden

## Future Enhancements

1. **Error Tracking Service Integration**
    - Sentry, LogRocket, or similar
    - Automatic error reporting
    - User session replay

2. **Error Analytics**
    - Track error frequency
    - Identify problematic areas
    - Monitor error trends

3. **User Feedback**
    - Allow users to report errors
    - Collect additional context
    - Improve error messages based on feedback

4. **Offline Support**
    - Handle network errors gracefully
    - Queue failed requests
    - Retry when connection restored

## Testing Error Handling

### Manual Testing

1. Remove required data from data files
2. Pass invalid props to components
3. Simulate network failures
4. Test with malformed data

### Automated Testing

```typescript
describe('Experience Component', () => {
    it('should handle null items gracefully', () => {
        render(<Experience items={null} />);
        expect(screen.getByText('No experience data available')).toBeInTheDocument();
    });
});
```

## Checklist for New Components

- [ ] Validate all props
- [ ] Check arrays before mapping
- [ ] Provide fallback values
- [ ] Wrap async operations in try-catch
- [ ] Log errors with context
- [ ] Show user-friendly error messages
- [ ] Test with invalid data
- [ ] Add error boundary if needed

## Summary

The error handling system provides:

- ✅ Comprehensive validation throughout the codebase
- ✅ User-friendly error messages
- ✅ Graceful degradation
- ✅ Detailed logging for debugging
- ✅ Consistent error UI
- ✅ Recovery mechanisms
- ✅ Type-safe error handling utilities

This ensures the application remains stable and provides a good user experience even when errors occur.
