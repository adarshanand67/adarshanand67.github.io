import { getProjects } from "@/lib/api";
import UniversalShelf from "@/components/shelves/UniversalShelf";
import { shelfConfigs } from "@/config/shelves";

export default async function ProjectShelf() {
    const projects = await getProjects();
    return <UniversalShelf config={shelfConfigs.projects!} items={projects} />;
}
