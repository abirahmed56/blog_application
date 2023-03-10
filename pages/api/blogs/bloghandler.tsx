import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";

async function blogHandler(req: any, res: any) {
  const client = await clientPromise;

  const db = client.db("articles");

  if (req.method === "GET") {
    const articles = await db.collection("articles").find().toArray();

    if (!articles) {
      return res.status(500).json({ message: "internal Server Error" });
    }
    return res.status(200).json({ message: articles });
  } else if (req.method === "POST") {
    const { title, content } = req.body;

    const newArticles = {
      title,
      content,
      date: new Date(),
    };

    const res2 = await db.collection("articles").insertOne(newArticles);

    return res
      .status(201)
      .json({ message: "new articles created", user: newArticles });
  } else if (req.method === "DELETE") {
    const query = { _id: new ObjectID(req.query.blogId) };

    const articles = await db.collection("articles").deleteOne(query);

    if (articles.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }

    return res.status(200).json({});
  } else if (req.method === "PUT") {
    const { title, content } = req.body;
    const query = { _id: new ObjectID(req.query.blogId) };

    const newArticles = {
      title,
      content,
      date: new Date(),
    };

    const articles = await db
      .collection("articles")
      .replaceOne(query, newArticles);

    if (articles.modifiedCount) {
      console.log("Modified the document");
    } else {
      console.log("Not modified");
    }

    return res.status(200).json({ newArticles });
  }
}

export default blogHandler;
