import { createFileRoute } from "@tanstack/react-router";
import SearchPlayer from "@/components/search-player";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="pt-12">
      <SearchPlayer />
    </div>
  );
}
