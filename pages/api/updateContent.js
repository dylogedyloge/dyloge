// api/updateContent.js

import { connectToDatabase } from "../../lib/mongodb";

export default async function updateContent(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { postId, updatedContent } = req.body;

  try {
    const { db } = await connectToDatabase();
    const postsCollection = db.collection("posts");

    // Update the post with the given postId
    const result = await postsCollection.updateOne(
      { _id: postId },
      { $set: { postContent: updatedContent } }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to update post" });
    }
  } catch (error) {
    console.error("Error updating post content:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
