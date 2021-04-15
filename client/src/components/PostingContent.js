import React from "react";

const PostingContent = () => {
  return (
    <div>
      <form className="mt-1 container w-25">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="postResturantName"
            placeholder="Resturant"
          />
        </div>
        <div class="custom-file mb-3">
          <input type="file" class="custom-file-input" id="customFile" />
          <label class="custom-file-label" for="customFile">
            Choose file
          </label>
        </div>
        <div class="form-group">
          <textarea
            class="form-control"
            id="postBody"
            rows="3"
            placeholder="Content"
          ></textarea>
        </div>
        <div class="form-group">
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-1"
          />
        </div>
      </form>
    </div>
  );
};

export default PostingContent;
