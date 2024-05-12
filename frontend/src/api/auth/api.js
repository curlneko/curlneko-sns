import { useQuery, useMutation } from "@tanstack/react-query"

const serverURL = "http://localhost:8083/auth"

export const useQueryVerify = (enabled) => {
    return useQuery({
        //キャッシュを取得する時のキー
        queryKey: "useQueryVerify",
        //フェッチする関数
        queryFn: async () => {
            const res = await fetch(serverURL + '/verify', {
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


export const useMutationLogin = (values) => {
    return useMutation({
        mutationKey: "useMutationLogin",
        //フェッチする関数
        mutationFn: async (values) => {
            const res = await fetch(serverURL + '/login', {
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

export const useMutationLogout = () => {
    return useMutation({
        mutationKey: "useMutationLogout",
        //フェッチする関数
        mutationFn: async () => {
            const res = await fetch(serverURL + '/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            return res.json();
        },
    })
}

export const useMutationRegister = (values) => {
    return useMutation({
        mutationKey: "useMutationRegister",
        //フェッチする関数
        mutationFn: async (values) => {
            const res = await fetch(serverURL + '/register', {
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