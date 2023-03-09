import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";

async function blogHandler(req: any, res: any) {
  const client = await clientPromise;

  const db = client.db("articles");
  const id = req.query.id!;

  if (req.method === "GET") {
    const articles = await db.collection("articles").find().toArray();

    if (!articles) {
      return res.status(500).json({ message: "internal Server Error" });
    }
    return res.status(200).json({ message: articles });
  } else if (req.method === "POST") {
    const { tittle, content } = req.body;

    const newArticles = {
      tittle,
      content,
      date: new Date(),
    };

    const res2 = await db.collection("articles").insertOne(newArticles);

    return res
      .status(201)
      .json({ message: "new articles created", user: newArticles });
  }else if(req.method === 'DELETE'){
    const articlesId = req.query._id
    const articles = await (await db.collection("articles").deleteOne(articlesId))
  }

  else if(req.method === 'PUT'){

    const { tittle, content } = req.body;


    const newArticles = {
        tittle,
        content,
        date: new Date(),

      };
    const articles = await db.collection("articles").replaceOne({_id:new ObjectID}, newArticles)
  }
}
export default blogHandler;
