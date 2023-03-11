const axios = require("axios");

const url = "http://localhost:3000/api/v1";

const auth = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImxyaHJpdHI3YjFhIiwidXNlcm5hbWUiOiJDeXBoZXIiLCJpYXQiOjE2Nzg1NzI5OTcsImV4cCI6MTY3ODU3NjU5N30.OahReodUyIlTZJyvgRXnd2bqzwF3YPzSCbR8XjTar1k`, // generate a token by creating an account and logging in
  },
};

describe("GET /notes", () => {
  it("Should return all the notes in the array", async () => {
    const res = await axios.get(`${url}/notes`, auth);
    expect(res.status).toEqual(200);
  });
});

describe("GET /notes/:id", () => {
  it("Should return all the notes in the array", async () => {
    const res = await axios.get(`${url}/notes/qy3sabi51qm`, auth);
    expect(res.status).toEqual(200);
  });
});

describe("POST /notes", () => {
  it("Should create a new note", async () => {
    const note = {
      title: "This is a note",
      content: "This is a test",
    };
    const res = await axios.post(`${url}/notes`, note, auth);
    expect(res.status).toEqual(201);
    expect(res.data.data.title).toEqual(note.title);
    expect(res.data.data.content).toEqual(note.content);
  });
});

describe("PUT /notes/:id", () => {
  it("Should update an existing note", async () => {
    const note = {
      title: "This note is updated",
      content: "This test is updated",
    };
    const res = await axios.put(`${url}/notes/qy3sabi51qm`, note, auth);
    expect(res.status).toEqual(201); // enter an actual id from the json file
  });
});

describe("DELETE /notes/:id", () => {
  it("Should delete an existing note", async () => {
    const res = await axios.delete(`${url}/notes/re42ju7g6eg`, auth);
    expect(res.status).toEqual(200); // enter an actual id from the json file
  });
});
