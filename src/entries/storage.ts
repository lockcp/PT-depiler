import { defineExtensionStorage } from "@webext-core/storage";
import type {
  IMetadataPiniaStorageSchema,
  IStoredUserInfo,
  TSearchSnapshotKey,
} from "@/shared/storages/types/metadata.ts";
import type { IConfigPiniaStorageSchema } from "@/shared/storages/types/config.ts";
import type { ISearchData } from "@/shared/storages/types/runtime.ts";
import type { TSiteID } from "@ptd/site";

// 代理转发所有导出
export * from "@/shared/storages/types/config.ts";
export * from "@/shared/storages/types/runtime.ts";
export * from "@/shared/storages/types/metadata.ts";

export type TUserInfoStorageSchema = Record<TSiteID, Record<string, IStoredUserInfo>>; // 用于存储用户信息
export type TSearchResultSnapshotStorageSchema = Record<TSearchSnapshotKey, ISearchData>; // 用于存储搜索结果快照

export interface IExtensionStorageSchema {
  // 既可以被 pinia 使用，也可以被其他地方使用
  config: IConfigPiniaStorageSchema;

  metadata: IMetadataPiniaStorageSchema;

  userInfo: TUserInfoStorageSchema; // 用于存储用户信息
  searchResultSnapshot: TSearchResultSnapshotStorageSchema; // 用于存储搜索结果快照
}

export type TExtensionStorageKey = keyof IExtensionStorageSchema;

/**
 * 注意 extStore 不能在 offscreen 中使用，如果在 offscreen 中有需要，请使用 sw 提供的 sendMessage('getExtStorage' | 'setExtStorage')
 */
export const extStorage = defineExtensionStorage<IExtensionStorageSchema>(chrome.storage.local);
