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
  } else if (req.method === "DELETE") {
    console.log("in the delete file")
    // const {_id} = req.query.blogId
    console.log(req.query)
    const query = {_id:new ObjectID(req.query.blogId)};
    console.log(query);

    const articles = await db.collection("articles").deleteOne(query);
    if (articles.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }

    return res.status(200).json({});

    // const articles = await db.collection("articles").deleteOne(_id: new ObjectID({__id}))
  } else if (req.method === "PUT") {
    const { tittle, content } = req.body;

    const query = {_id:new ObjectID(req.query.blogId)};

    const newArticles = {
      tittle,
      content,
      date: new Date(),
    };
    const articles = await db
      .collection("articles")
      .replaceOne(query, newArticles);

      if(articles.modifiedCount){
        console.log("Modified the document");
      }else{
        console.log("Not modified");
      }
    return res.status(200).json({newArticles})
  }
}
export default blogHandler;
// MongoClient.connect(url, function(err, db) {
//   if(err!=null){
//       return console.log(err.message)
//   }
// db.collection("App").deleteOne({_id:ObjectID('59c3dfa6d11caa3360af91cc')}, function (err,data) {

//      if(err!=null){
//           return console.log(err)
//       }
//       console.log(data);

//   });

// });