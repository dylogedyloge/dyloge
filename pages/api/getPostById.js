import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("BlogStandard");

    const { postId } = req.body;

    const post = await db.collection("posts").findOne({
      _id: new ObjectId(postId),
    });

    if (!post) {
      res.status(404).json({ success: false, message: "Post not found" });
      return;
    }

    const { postContent } = post;

    res.status(200).json({ success: true, content: postContent });
  } catch (e) {
    console.log("ERROR TRYING TO GET POST BY ID: ", e);
    res.status(500).json({ success: false });
  }
});
