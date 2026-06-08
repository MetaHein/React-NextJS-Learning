/* eslint-disable no-unused-vars */
import React from "react";
import { z } from "zod";
import axios from "axios";

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  userId: z.number(),
});

const FetchPost = async (postId) => {
  try {
    const respone = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
    );

    const result = PostSchema.safeParse(respone.data);

    if (result.success) {
      console.log("Valid data:", result.data);
      return result.data;
    }

    console.error("Validation errors:", result.error.errors);
    return null;
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
};

export default FetchPost;
