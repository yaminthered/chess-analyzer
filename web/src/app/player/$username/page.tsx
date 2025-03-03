import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { getProfile } from "@/api/chesscom";
import SearchPlayer from "@/components/search-player";

export const Route = createFileRoute("/player/$username/")({
  loader: ({ params: { username } }) => getProfile(username),
  component: Player,
});

function Player() {
  const { status, response: player } = Route.useLoaderData();
  console.log({ player });

  if (status === axios.HttpStatusCode.NotFound) {
    return (
      <div>
        <h3>No player</h3>;
        <SearchPlayer />
      </div>
    );
  }

  return <div>Hello {player?.name}</div>;
}
