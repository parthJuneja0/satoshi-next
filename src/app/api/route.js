// import { dbref } from "@/config/firebase";
// import { doc, setDoc } from "firebase/firestore";

// export async function POST(request) {
//     const data = await request.json();
//     console.log(data);

//     await setDoc(doc(dbref, "users", data.userId), {
//         username: data.username,
//         coins: 0,
//         pointsToAdd: 1,
//         totalEnergy: 1500,
//         currentEnergy: 1500,
//         yieldPerHour: 0,
//         completedTasks: {
//             youtube: false,
//             telegram: false,
//             twitter: false,
//         },
//     });

//     return new Response("Hello world", { status: 200 });
// }