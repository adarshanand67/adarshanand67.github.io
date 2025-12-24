/**
 * @fileoverview Base path constant re-export.
 * Provides centralized access to the application base path configuration.
 */
import { basePath as configBasePath } from "@/lib/config";

/** Application base path for asset URLs and routing. */
export const basePath = configBasePath;
