// /pages/api/protected-api.js

import { Amplify, withSSRContext } from "aws-amplify";
import config from "@/aws-exports.js";

Amplify.configure({ ...config, ssr: true });

export default async function protectedRoute(req:any, res:any) {
    const { Auth } = withSSRContext({ req });

    let user;
    try {
        user = await Auth.currentAuthenticatedUser();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    //
    // insert your business logic here...
    //

    return res.status(200).json({ user: user.username });
}