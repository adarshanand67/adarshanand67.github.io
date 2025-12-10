import { BASE_PATH } from "@/lib/constants";
export function getAssetPath(path: string): string {
    if (path.startsWith(BASE_PATH)) {
        return path;
    }
    return `${BASE_PATH}${path}`;
}
