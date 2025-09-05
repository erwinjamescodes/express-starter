import Post from "../models/posts.model.js";
import Comment from "../models/comment.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, author: req.user.id });
    res
      .status(201)
      .send({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.status(400).send({ success: false, errors: error.errors });
    }
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { user: currentUser } = req.query;

    let query = {};

    if (currentUser === "true") {
      query.author = req.user.id;
    }

    const posts = await Post.find(query).populate("author", "name email");
    res.status(200).send({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", "name email");

    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: "Post not found" });
    }

    const comments = await Comment.find({ post: id })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, post, comments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: id, author: req.user.id }, // Only author can update
      { title, content },
      { new: true }
    ).populate("author", "name email");

    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: "Post not found or unauthorized" });
    }

    res.status(200).send({ success: true, post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOneAndDelete({
      _id: id,
      author: req.user.id,
    });

    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: "Post not found or unauthorized" });
    }

    res
      .status(200)
      .send({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
