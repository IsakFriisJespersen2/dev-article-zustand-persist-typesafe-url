"use client";

import qs from "querystring";
import { PersistStorage, StorageValue } from "zustand/middleware";
import { SpaceStore } from "../space-store";
import { QueryParamConfigMap, EncodedValueMap } from "serialize-query-params";
import { updateInLocation } from "serialize-query-params";
import { decodeQueryParams, encodeQueryParams } from "serialize-query-params";
import { spaceStoreConfigMap } from "../space-store";

const decodeSearchParams = <
  QPCMap extends QueryParamConfigMap,
  T extends object,
>(
  searchParams: Partial<EncodedValueMap<QPCMap>>,
  DEFAULT_VALUES: T,
) => {
  const params = decodeQueryParams(spaceStoreConfigMap, searchParams);

  return { ...DEFAULT_VALUES, ...params };
};

const pushStateToURL = <T extends Partial<T>>(searchParams: T) => {
  if (typeof location === "undefined") return;

  const newLocation = updateInLocation(
    encodeQueryParams(spaceStoreConfigMap, searchParams),
    location,
  );

  window.history.pushState(
    null,
    "",
    newLocation.search || window.location.pathname,
  );
};


export const persistentStorage: PersistStorage<SpaceStore> = {
  getItem: (key: string) => {
    console.log(key);
    const searchParams = qs.parse(
      new URLSearchParams(location.search).toString(),
    );

    // If no searchParams return default state
    if (Object.keys(searchParams).length === 0) {
      return null;
    }

    const storeState = decodeSearchParams(searchParams, {});

    return { state: { ...storeState }, version: 0 };
  },
  setItem: (key: string, newValue: StorageValue<SpaceStore>) => {
    const { state } = newValue;

    pushStateToURL(JSON.parse(JSON.stringify(state)));
  }
};
