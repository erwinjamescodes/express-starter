import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.create({
      content,
      author: req.user.id,
      post: req.params.postId,
    });
    res.status(201).send({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.status(200).send({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Find and update only if the comment belongs to the current user
    const comment = await Comment.findOneAndUpdate(
      { _id: id, author: req.user.id }, // Only author can update
      { content },
      { new: true }
    ).populate("author", "name email");

    if (!comment) {
      return res
        .status(404)
        .send({ success: false, message: "Comment not found or unauthorized" });
    }

    res.status(200).send({
      success: true,
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOneAndDelete({
      _id: id,
      author: req.user.id,
    });

    if (!comment) {
      return res
        .status(404)
        .send({ success: false, message: "Comment not found or unauthorized" });
    }

    res
      .status(200)
      .send({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};
