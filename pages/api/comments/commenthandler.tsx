import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";


async function commentHandler(req: any, res: any) {
  const session = await getServerSession(req, res, authOptions)

  const client = await clientPromise;

  const db = client.db("comment");

  if (req.method === "GET") {
    const query = { _id: new ObjectID(req.query.blogId) };
    const comment = await db.collection("comment").find({blogId:query._id}).toArray()

    if (!comment) {
      return res.status(500).json({ message: "internal Server Error" });
    }
    return res.status(200).json({ message: comment });
  } else if (req.method === "POST") {
    const { authorName, content } = req.body;
    const query = { _id: new ObjectID(req.query.blogId) };

    const newComment = {

      authorName,
      blogId:query._id,
      content,
      date: new Date(),
    };

    const res2 = await db.collection("comment").insertOne(newComment);

    return res
      .status(201)
      .json({ message: "new comment created", user: newComment });
//   } else if (req.method === "DELETE") {
//     const query = { _id: new ObjectID(req.query.blogId) };

//     const comment = await db.collection("comment").deleteOne(query);

//     if (comment.deletedCount === 1) {
//       console.log("Successfully deleted one document.");
//     } else {
//       console.log("No documents matched the query. Deleted 0 documents.");
//     }

//     return res.status(200).json({});
//   } else if (req.method === "PUT") {
//     const { title, content } = req.body;
//     const query = { _id: new ObjectID(req.query.blogId) };

//     const newComment = {
//       title,
//       content,
//       date: new Date(),
//     };

//     const comment = await db
//       .collection("comment")
//       .replaceOne(query, newComment);

//     if (comment.modifiedCount) {
//       console.log("Modified the document");
//     } else {
//       console.log("Not modified");
//     }

//     return res.status(200).json({ newComment });
  }
}

export default commentHandler;
