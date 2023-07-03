import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

async function testUpdateOperation() {
  try {
    const postId = "64818b8ab474eccd410d5471";
    const content = "amir";

    const client = await clientPromise;
    const db = client.db("BlogStandard");

    await db.collection("posts").updateOne(
      {
        _id: new ObjectId(postId),
      },
      {
        $set: {
          content,
        },
      }
    );

    console.log("Content updated successfully.");
  } catch (error) {
    console.error("Error updating content:", error);
  } finally {
    // Close the database connection
    await client.close();
  }
}

// Call the test function
testUpdateOperation();
