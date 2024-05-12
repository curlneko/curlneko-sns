import { useQuery, useMutation } from "@tanstack/react-query"

const serverURL = "http://localhost:8083/like"

export const useMutationLike = (values) => {
    return useMutation({
        mutationKey: "useMutationLike",
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