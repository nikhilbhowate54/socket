const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = 5000;
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});
let user = [];

io.on("connection", (socket) => {
  console.log("user is connect");
  socket.on("setUsername", (data) => {
    if (user.indexOf(data) > -1) {
      socket.emit(
        "userExists",
        `${data} username is taken ! try something other name `
      );
    } else {
      user.push(data);
      // emit is used to trigger an event
      socket.emit("userSet", { username: data });
    }
  });
  socket.on("msg", (data) => {
    io.sockets.emit('newmsg', data);
  });
});

http.listen(PORT, () => console.log("listing to port 5000"));
