const bcrypt = require("bcrypt");
const fs = require("fs");
const { generateToken } = require("./authController");

const usersFile = "users.json";
let users = [];

async function loadUsers() {
  try {
    users = await JSON.parse(fs.readFileSync(usersFile));
  } catch (err) {
    users = [];
  }
}

function saveUsers() {
  fs.writeFileSync(usersFile, JSON.stringify(users));
}

function addUser(username, password) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = {
    id: Math.random().toString(36).substring(2),
    username,
    password: hashedPassword,
  };
  users.push(user);
  saveUsers();
  return user;
}

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    await res.status(400).json({
      status: "error",
      message: "Username and password are required",
    });
  }

  const existingUser = users.find((user) => (user.username = username));

  if (existingUser) {
    await res.status(400).json({
      status: "error",
      message: "Username already exists",
    });
  } else {
    const user = addUser(username, password);
    const token = generateToken(user);

    await res.status(200).json({ user, token });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    await res.status(400).json({
      status: "error",
      message: "Username and password are required",
    });
  }

  const existingUser = users.find((user) => (user.username = username));

  if (!existingUser) {
    await res.status(404).json({
      status: "error",
      message: "Username not found",
    });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: "incorrect password",
        });
      } else {
        const user = {
          id: existingUser.id,
          username,
          password: hash,
        };
        const token = generateToken(user);
        return res.status(200).json({ token });
      }
    });
  }
};

exports.logout = async (req, res) => {
    await res.status(200).json({
        status: "success",
        message: "logged out successfully"
    })
}

loadUsers();
