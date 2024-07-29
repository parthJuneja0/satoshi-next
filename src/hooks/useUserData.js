import WebApp from "@twa-dev/sdk";

export default function useUserData() {

    let userData;

    if (typeof window !== "undefined") {
        if (WebApp.initDataUnsafe.user) {
            userData = WebApp.initDataUnsafe.user;
        }
        else {
            userData = {
                id: 0,
                first_name: "Guest",
                last_name: "Account",
            };
        }
    }

    return { userData };
}
