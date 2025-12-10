import { EntertainmentType, WatchStatus } from "@/types";
export function isValidEntertainmentType(type: string): type is EntertainmentType {
    return Object.values(EntertainmentType).includes(type as EntertainmentType);
}
export function isValidWatchStatus(status: string): status is WatchStatus {
    return Object.values(WatchStatus).includes(status as WatchStatus);
}
export function parseEntertainmentType(type: string): EntertainmentType {
    if (type === "Web_Series" || type === "Web Series") {
        return EntertainmentType.WebSeries;
    }
    return isValidEntertainmentType(type) ? type : EntertainmentType.Anime;
}
export function parseWatchStatus(status: string): WatchStatus {
    return isValidWatchStatus(status) ? status : WatchStatus.Planning;
}
