import * as fs from "fs";

export function getUserData() {
  const rawData = fs.readFileSync("data/user.json", "utf-8");
  const userData = JSON.parse(rawData);

  return {
    // username: Buffer.from(userData.Username, "base64").toString("utf-8"),
    // password: Buffer.from(userData.Password, "base64").toString("utf-8"),
    username: userData.sauceDemo.validUser.username,
    password: userData.sauceDemo.validUser.password,

  };
}

