import clientPromise from "../../../lib/mongodb";

async function userhandler(req:any, res:any) {
    const client = await clientPromise;

    const db = client.db("users");

    if( req.method==="POST") {
        const {name, email, username, password} = req.body;

        const newUser = {
            name,
            email,
            username,
            password
        };

        const res2 = await db.collection("users").insertOne(newUser)

        return res.status(201).json({message: "new user created", user: newUser})
    }

}
export default userhandler;