import axios from "axios";

export async function getList() {
  let data = [];

  await axios.post("/api/list", { type: "" }).then((result) => {
    data = [...result.data.data];
  });

  return data;
}
