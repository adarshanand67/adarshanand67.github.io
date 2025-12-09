import { EntertainmentType, WatchStatus } from "@/types";

/**
 * Type guard to check if a string is a valid EntertainmentType
 */
export function isValidEntertainmentType(type: string): type is EntertainmentType {
    return Object.values(EntertainmentType).includes(type as EntertainmentType);
}

/**
 * Type guard to check if a string is a valid WatchStatus
 */
export function isValidWatchStatus(status: string): status is WatchStatus {
    return Object.values(WatchStatus).includes(status as WatchStatus);
}

/**
 * Safely parse entertainment type with fallback
 */
export function parseEntertainmentType(type: string): EntertainmentType {
    // Handle legacy "Web_Series" format
    if (type === "Web_Series" || type === "Web Series") {
        return EntertainmentType.WebSeries;
    }

    return isValidEntertainmentType(type) ? type : EntertainmentType.Anime;
}

/**
 * Safely parse watch status with fallback
 */
export function parseWatchStatus(status: string): WatchStatus {
    return isValidWatchStatus(status) ? status : WatchStatus.Planning;
}
