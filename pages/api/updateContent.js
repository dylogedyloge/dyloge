import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";

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

    const { postId, updatedContent } = req.body;

    await db.collection("posts").updateOne(
      {
        _id: postId,
        userId: userProfile._id,
      },
      {
        $set: { content: updatedContent },
      }
    );

    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error("Error updating post content:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update post content" });
  }
});
