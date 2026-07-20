import supabase from "./db.js";

const createAuthors = async (authorsData) => {
  const { data, error } = await supabase
    .from("authors")
    .insert(authorsData)
    .select("id");
  if (error) {
    console.log(error);
  }
  return data;
};

const getAllAuthors = async () => {
  const { data, error } = await supabase.from("authors").select();
  if (error) {
    console.log(error);
  }
  return data;
};

const updateAuthors = async (id, updateData) => {
  const { data, error } = await supabase
    .from("authors")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
  }
  return data;
};

const deleteAuthors = async (id) => {
  const { data, error } = await supabase
    .from("authors")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
  }
  return data;
};

///////////////////////////////////////////////////////////////

const createPost = async (postData) => {
  const { data, error } = await supabase
    .from("posts")
    .insert(postData)
    .select("id");

  if (error) {
    console.log(error);
  }
  return data;
};

const getAllPosts = async () => {
  const { data, error } = await supabase.from("posts").select();
  if (error) {
    console.log(error);
  }
  return data;
};

const updatePost = async (id, updateData) => {
  const { data, error } = await supabase
    .from("posts")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
  }
  return data;
};

const deletePost = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    console.log(error);
  }
  return data;
};

const getAllPostAndAuthor = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("title, author:author_id(*)");
  if (error) {
    console.log(error);
  }
  return data;
};

// createPost({
//   title: "la cigale est la fourmi",
//   content: "helloo",
//   author_id: 1,
// // });
// console.log(await getAllPostAndAuthor());
