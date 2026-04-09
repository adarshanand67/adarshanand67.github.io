import { Skeleton } from "@/components/ui";

export default function ArticleLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 mt-8 mb-20">
      <Skeleton variant="text" width={100} height={14} className="mb-10" />

      <Skeleton variant="text" width="80%" height={40} className="mb-2" />
      <Skeleton variant="text" width="60%" height={40} className="mb-6" />

      <div className="flex gap-4 mb-12">
        <Skeleton variant="text" width={90} height={14} />
        <Skeleton variant="text" width={70} height={14} />
      </div>

      <div className="space-y-4">
        {[100, 90, 95, 70, 85, 80, 92, 75, 88].map((w, i) => (
          <Skeleton key={i} variant="text" width={`${w}%`} height={16} />
        ))}
        <div className="my-8">
          <Skeleton variant="rect" height={120} className="rounded-xl" />
        </div>
        {[78, 92, 65, 87, 95, 72].map((w, i) => (
          <Skeleton key={`b${i}`} variant="text" width={`${w}%`} height={16} />
        ))}
      </div>
    </div>
  );
}
