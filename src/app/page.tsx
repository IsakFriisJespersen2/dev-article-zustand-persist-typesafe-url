"use client"

import { useSpaceStore } from "@/store";

export default function Home() {
  const spaceStore = useSpaceStore((state) => state)

  console.log(spaceStore)
  return (
    <button onClick={() => spaceStore.updateSpaceStore({missionName: 'Poop'}) }>Hej</button>

  );
}
