import { useMutation } from "@tanstack/vue-query"
import { DATABASES } from "~/libs/appwrite"

const toast = useToast()

export const useDeleteQuery = (refetch: Function) => {
  const {isPending, mutate} = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id: string) => DATABASES.deleteDocument("jira-db", "deals", id),
    onSuccess: () => {
      refetch()
      toast.add({
        title: "Success",
        description: "Document deleted successfully",
        color: "success",
      })
    },
    onError: (error) => {
      console.error("Error deleting document:", error)
    },
  })

  return {
    isPending,
    deleteDeal: mutate,
  }
}
