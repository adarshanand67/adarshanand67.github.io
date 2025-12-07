import { getUses } from "@/lib/api";
import UsesShelf from "@/components/shelves/UsesShelf";

export default async function UsesPage() {
    const uses = await getUses();
    return <UsesShelf initialUses={uses} />;
}
