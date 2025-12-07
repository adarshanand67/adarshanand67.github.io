import { shelfConfigs } from "@/config/shelves";
import UniversalShelf from "@/components/shelves/UniversalShelf";
import { getProjects } from "@/lib/api";

export default async function Projectshelf() {
    const projects = await getProjects();
    return <UniversalShelf config={shelfConfigs.projects} items={projects} />;
}
