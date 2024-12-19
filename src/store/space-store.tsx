import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { persistentStorage } from "./utils/persistent-storage";
import { StringParam, NumberParam, JsonParam } from "serialize-query-params";
import { CommaArrayParamString } from "./utils/serialization-utils";

export const spaceStoreConfigMap = {
  missionName: StringParam,
  crewCount: NumberParam,
  astronauts: CommaArrayParamString,
  spaceshipStatus: JsonParam
};

type Astronauts = "Neil Armstrong" | "Buzz Aldrin" | "Michael Collins";

type SpaceExplorerState = {
  missionName: string;
  crewCount: number;
  astronauts: Astronauts[];
  spaceshipStatus: {
    fuelLevel: number;
    isEngineOnline: boolean;
    destination: string;
  };
};

type SpaceExplorerAction = {
  updateSpaceStore: (mission: Partial<SpaceExplorerState>) => void;
};

export type SpaceStore = SpaceExplorerState & SpaceExplorerAction;

export const defaultInitState: SpaceExplorerState = {
  missionName: "Apollo 11",
  crewCount: 3,
  astronauts: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
  spaceshipStatus: {
    fuelLevel: 100, // Percentage
    isEngineOnline: true,
    destination: "Moon",
  },
};

export const createSpaceStore = (
  initState: SpaceExplorerState = defaultInitState,
) => {
  return createStore(
    persist<SpaceStore>(
      (set) => ({
        ...initState,
        updateSpaceStore: (mission) =>
          set((state) => ({ ...state, ...mission })),
      }),
      {
        name: 'spaceStore',
        storage: persistentStorage,
      },
    ),
  );
};
