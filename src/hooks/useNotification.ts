import {
  QueryFunction,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import useAuth from "hooks/useAuth";
import { useState } from "react";
import { get } from "lodash";

export interface INotification {
  id: string;
  message: string;
  link: string | null;
  fromUserId: string;
  toUserId: string;
  seen: boolean | null;
  sendAnEmail: boolean | null;
  emailSent: boolean | null;
  emailsToSend: string[];
  viewed: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

const queryKey = "notification";
export const notificationsQueryKey = `${queryKey}Notifications`;
export const unviewedNotificationsCountQueryKey = `${queryKey}UnviewedNotificationsCount`;

type IUseNotification = {
  size?: number;
};
export function useNotification({ size = 20 }: IUseNotification) {
  const { authApi } = useAuth();
  const [meta, setMeta] = useState({});
  const queryClient = useQueryClient();

  const {
    data: notifications,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [notificationsQueryKey],
    queryFn: getNofitications as QueryFunction<any, QueryKey>,
    getNextPageParam: (_page, lastPage) => {
      const lastPageItems = lastPage[lastPage.length - 1];
      const item = lastPageItems?.[lastPageItems.length - 1]?.id;
      return {
        size: size,
        cursor: item,
      };
    },
  });

  const { isSuccess: unViewedCountIsSucces, data: unviewedNotificationsCount } =
    useQuery(unviewedNotificationsCountQueryKey, getUnviewedNotificationsCount);

  const { mutateAsync: patchAllNotificationsToViewed } = useMutation(
    patchAllNotificationsToViewedMutation,
    {
      onSuccess: () => {
        queryClient.setQueryData(unviewedNotificationsCountQueryKey, () => {
          return 0;
        });
      },
    }
  );

  async function getNofitications(query: {
    pageParam: { size: number; cursor: string };
  }) {
    const pageSize = get(query, "pageParam.size", size);
    const cursor = get(query, "pageParam.cursor", undefined);
    const { data } = await authApi.get(
      `/notifications?size=${pageSize}${cursor ? "&cursor=" + cursor : ""}`
    );
    setMeta(data.meta);
    return data.result;
  }

  async function patchAllNotificationsToViewedMutation() {
    const { data } = await authApi.patch("/notifications/viewed");
    return data;
  }

  async function getUnviewedNotificationsCount() {
    const { data } = await authApi.get("/notifications/unviewed");
    return data;
  }

  return {
    notifications,
    status,
    fetchNextPage,
    meta,
    unViewedCountIsSucces,
    unviewedNotificationsCount,
    patchAllNotificationsToViewed,
  };
}
