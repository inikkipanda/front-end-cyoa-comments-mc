const commentsResponse = {
    comments: [
        {
          "id": 100,
          "name": "Nikki",
          "message": "Try This",
          "created": "2023-09-21 22:37:52"
        },
        {
          "id": 101,
          "name": "Donald Duck",
          "message": "Try this out",
          "created": "2023-09-21 22:38:05"
        },
        {
          "id": 102,
          "name": "Donald Duck",
          "message": "Try this out",
          "created": "2023-09-21 22:38:05"
        },
        {
          "id": 103,
          "name": "Donald Duck",
          "message": "Try this out",
          "created": "2023-09-21 22:38:08"
        },
        {
          "id": 104,
          "name": "Nikki",
          "message": "sdfsdf",
          "created": "2023-09-21 23:11:23"
        },
        {
          "id": 105,
          "name": "Donald Duck",
          "message": "Try this out",
          "created": "2023-09-21 23:12:49"
        },
        {
          "id": 106,
          "name": "Nikki",
          "message": "This is a test to see how far this leads and just a lorem ispom sorta test on the chat window.",
          "created": "2023-09-21 23:13:29"
        },
        {
          "id": 107,
          "name": "Donald Duck",
          "message": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "created": "2023-09-21 23:14:11"
        }
      ]
};

const createCommentResponse = {
    message: {
        "id": 107
    }
};

export default async function mockFetch(url) {
    switch (url) {
        case "http://localhost:3001/getComments": {
            return {
                ok: true,
                status: 200,
                json: async () => commentsResponse,
            };
        }
        case "http://localhost:3001/createComment": {
            return {
                ok: true,
                status: 200,
                json: async () => createCommentResponse,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}