import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db("BlogStandard");
    const userProfile = await db.collection("users").findOne({
      auth0Id: sub,
    });

    const { postId } = req.query;

    // Retrieve the post based on postId and userId
    const post = await db.collection("posts").findOne({
      _id: postId,
      userId: userProfile._id,
    });

    if (!post) {
      // Handle case when the post doesn't exist or doesn't belong to the user
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({ post });
    return;
  } catch (e) {
    console.log(e, "Error");
    res.status(500).json({ error: "Internal server error" });
  }
});
