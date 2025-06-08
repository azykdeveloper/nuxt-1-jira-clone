import { useQuery } from "@tanstack/vue-query";
import { Query } from "appwrite";
import { statuses } from "~/constants";
import { DATABASES } from "~/libs/appwrite";
import type { IDeal, IStatuses } from "~/types";

export const useStatusQuery = () => {
  // const { user } = useAuthStore();
  const user = computed(() => useAuthStore().user);
  
  console.log(user);

  return useQuery({
    queryKey: ["deals"],
    queryFn: () =>
      DATABASES.listDocuments("jira-db", "deals", [
        Query.equal("userId", user?.id || ""),
      ]),
    select: (data) => {
      const newBoard: IStatuses[] = statuses.map((status) => ({
        ...status,
        items: [],
      }));

      const deals = data.documents as unknown as IDeal[];

      for (const deal of deals) {
        const column = newBoard.find((column) => column.id === deal.status);

        if (column) {
          column.items.push(deal);
        }
      }

      return newBoard;
    },
  });
};
