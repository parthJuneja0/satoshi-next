import WebApp from "@twa-dev/sdk";

export default function useUserData() {

    // let username;
    // let userId;
    let userData;

    if (typeof window !== "undefined") {
        if (WebApp.initDataUnsafe.user) {
            userData = WebApp.initDataUnsafe.user;
            // username = WebApp.initDataUnsafe.user.username;
            // userId = WebApp.initDataUnsafe.user.id;
        }
        else {
            userData = {
                id: 0,
                username: "Guest",
            };
        }
    }

    return { userData };
}