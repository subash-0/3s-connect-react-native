import { postApi, useApiClient } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usePosts = (username?: string) => {
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data: postData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: username ? ["userPosts", username] : ["posts"],
    queryFn: () =>
      username ? postApi.getUserPost(api, username) : postApi.getPosts(api),
    select: (response) => username?response.data?.posts:response.data,
  });

  const likePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.likePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: (postId: string) => postApi.deletePost(api, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (username) {
        queryClient.invalidateQueries({ queryKey: ["userPosts", username] });
      }
    },
  });

  const checkIsLiked = (postLike: string[], currentUser: any) => {
    const isLiked = currentUser && postLike.includes(currentUser._id);
    return isLiked;
  };

  return {
    posts: postData || [],
    isLoading,
    error,
    refetch,
    toggleLike: (postId: string) => likePostMutation.mutate(postId),
    deletePost: (postId: string) => deletePostMutation.mutate(postId),
    checkIsLiked,
    isRefetching,
  };
};
