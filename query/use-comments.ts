import { useQuery } from "@tanstack/vue-query"
import { Query } from "appwrite"
import { DATABASES } from "~/libs/appwrite"
import type { IDeal } from "~/types"

export const useCommentsQuery = () => {
  const CurrentDealStore = useCurrentDealStore()
  const dealId = computed(() => CurrentDealStore.currentDeal?.$id)

  return useQuery({
    queryKey: ["comments", dealId],
    // enabled: computed(() => !!dealId.value),
    queryFn: () => DATABASES.listDocuments("jira-db", "comments", [
      Query.equal("deal", dealId.value!),
    ]),
    
    select: (data) => {
      return data.documents || []
    },
  });
}