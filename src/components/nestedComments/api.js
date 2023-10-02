const timestamp = Date.now();
const date = new Date(timestamp);
const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

console.log(formattedDate);

export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Jack",
      userId: "1",
      parentId: null,
      createdAt: formattedDate,
    },
    {
      id: "2",
      body: "Second comment",
      username: "John",
      userId: "2",
      parentId: null,
      createdAt: formattedDate,
    },
    {
      id: "3",
      body: "First comment first child",
      username: "John",
      userId: "2",
      parentId: "1",
      createdAt: formattedDate,
    },
    {
      id: "4",
      body: "Second comment second child",
      username: "John",
      userId: "2",
      parentId: "2",
      createdAt: formattedDate,
    },
  ];
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "John",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
