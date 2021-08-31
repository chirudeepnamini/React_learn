const Post = require("../../Models/post");
const checkauth = require("../../util/checkauth");
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { PostId }) {
      try {
        const post = await Post.findById(PostId);
        if (!post) {
          throw new Error("no post found");
        }
        return post;
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const result = checkauth(context);
      const post = new Post({
        body,
        username: result.username,
        createdAt: new Date().toISOString(),
        user: result.id,
      });
      try {
        const inserted_doc = await post.save();
        return inserted_doc;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
