import { useQuery } from "@tanstack/vue-query";
import { Query } from "appwrite";
import { DATABASES } from "~/libs/appwrite";
import type { EnumStatus, IDeal } from "~/types";

export const useDealsQuery = (status: EnumStatus) => {
  const authStore = useAuthStore();
  const userId = computed(() => authStore.user?.id);

  return useQuery({
    queryKey: ["deals", status],
    enabled: computed(() => !!userId.value),

    queryFn: () =>
      DATABASES.listDocuments("jira-db", "deals", [
        Query.equal("userId", userId.value!),
        Query.equal("status", status),
      ]),
    select: (data) => {
      
      return data.documents as unknown as IDeal[];
    },
  });
}