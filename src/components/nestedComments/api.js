const timestamp = Date.now();
const date = new Date(timestamp);
const formattedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} on ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

console.log(formattedDate);

export const getComments = async () => {
  return [
    {
      id: "1",
      body: "Not sure about this room, seems too empty, but love the brown",
      username: "Sam McGinnes",
      userId: "1",
      parentId: null,
      createdAt: '2023-09-16T23:00:33.010+02:00',
    },
    {
      id: "2",
      body: "I think its so nice!",
      username: "Franki Callard",
      userId: "2",
      parentId: null,
      createdAt: '2023-10-01T23:00:33.010+02:31',
    },
    {
      id: "3",
      body: "First comment first child",
      username: "Franki Callard",
      userId: "2",
      parentId: "1",
      createdAt: '2023-10-01T23:00:33.010+02:31',
    },
    {
      id: "4",
      body: "Me too I think this room is beautiful - it's so light!",
      username: "Sam McGinnes",
      userId: "1",
      parentId: "2",
      createdAt: '2023-10-01T23:00:33.010+02:31',
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
