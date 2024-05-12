import { useQuery, useMutation } from "@tanstack/react-query"

const serverURL = "http://localhost:8083"


export const useQueryUsers = () => {
    return useQuery({
        //キャッシュを取得する時のキー
        queryKey: "useQueryUsers",
        //フェッチする関数
        queryFn: async () => {
            const res = await fetch(serverURL + '/users', {
                method: "GET",
                credentials: "include",
            });
            return res.json();
        },
        //キャッシュを保持する時間
        cacheTime: 10000,
        //データが最新であるとみなす時間
        staleTime: 0,
    })
}
