import { useQuery, useMutation } from "@tanstack/react-query"

const serverURL = "http://localhost:8083/profile"

export const useMutationUploadPicture = (values) => {
    return useMutation({
        mutationKey: "useMutationUploadPicture",
        //フェッチする関数
        mutationFn: async (values) => {
            const res = await fetch(serverURL, {
                method: "PUT",
                headers: {
                    // "Content-Type": "multipart/form-data",
                },
                credentials: "include",
                body: values,
            });
            return res.json();
        },
    })
}

export const useMutationProfile = (values) => {
    return useMutation({
        mutationKey: "useMutationProfile",
        //フェッチする関数
        mutationFn: async (values) => {
            const res = await fetch(serverURL + '/profile', {
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