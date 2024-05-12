import { useQuery, useMutation } from "@tanstack/react-query"

const serverURL = "http://localhost:8083/post"

export const useQueryPost = (enabled) => {
    return useQuery({
        //キャッシュを取得する時のキー
        queryKey: "useQueryPost",
        //フェッチする関数
        queryFn: async () => {
            const res = await fetch(serverURL, {
                method: "GET",
                credentials: "include",
            });
            return res.json();
        },
        //キャッシュを保持する時間
        cacheTime: 10000,
        //データが最新であるとみなす時間
        staleTime: 0,
        enabled: enabled,
    })
}


export const useMutationPost = (values) => {
    return useMutation({
        mutationKey: "useMutationPost",
        //フェッチする関数
        mutationFn: async (values) => {
            const res = await fetch(serverURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(values),
            });
            return res.json();
        },
    })
}