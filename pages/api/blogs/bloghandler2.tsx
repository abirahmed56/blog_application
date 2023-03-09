import React from "react";
import { ObjectID } from "bson";
import clientPromise from "../../../lib/mongodb";

export const editBlog = async (id: String | ObjectID, article: any) => {
  id = typeof id === "string" ? new ObjectID(id) : id;

  const mongoClient = clientPromise;

  return (await mongoClient)
    .db()
    .collection("articles")
    .replaceOne({ _id: id }, article);
};
export default async (req: any, res: any) => {


  if (req.method === "PUT") {
    const { tittle, content, _id} = req.body;

    const newArticles = {
      tittle,
      content,
      date: new Date(),
    };
    const data = await editBlog(_id, {
        tittle: req.body.tittle,
        content: req.body.content,
        date: new Date(),
    })

    res.status(200).json(data);
  } else if (req.method === "DELETE") {
  }
  return <div></div>;
};
