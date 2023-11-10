import HttpException from "./http.exception";

class PostNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `post not found for id ${id}`);
  }
}

export default PostNotFoundException;
