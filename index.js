const venom = require("venom-bot");
const data = require("./data.json");
const getuser = require("./userinfo.js");

venom
  .create({
    session: "vk",
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

let user = [{ number: '', count: 1 }];

function start(client) {
  setInterval(() => {
    let name = data[number].name;
    let about = data[number].quote;
    let image = data[number].profile;
    client.setProfilePic(image);
    client.setProfileName(name);
    client.setProfileStatus(about);
    user = [];
    // Change 'number = []' to 'number = 0' or remove this line
  }, 86400000);

  client.onMessage((message) => {
    if (message.isGroupMsg === false) {
      let senderPhoneNumber = message.from;

      if (!user.some((u) => u.number === senderPhoneNumber)) {
        getuser.getNumberDetails(senderPhoneNumber).then((data) => {
          client.startTyping(message.from);
          client
            .reply(
              message.from,
              `*☆ Hello ${
                data.name == undefined ? "" : data.name
              }☆*\n\n*☆ Please leave your message, and you will receive a reply as soon as possible. ☆*\n\n*☆ Thank You ☆*`,
              message.id.toString()
            )
            .then((result) => {
              console.log("Result: ", result);
            })
            .catch((erro) => {
              console.error("Error when sending: ", erro);
            });
        });
        user.push({ number: senderPhoneNumber, count: 1 }); // Fix the push syntax
      } else if (user.some((u) => u.number === senderPhoneNumber && u.count === 1)) {
        client.startTyping(message.from);
        client
          .reply(
            message.from,
            `*☆ Please Do Not Spam ☆*`,
            message.id.toString()
          )
          .then((result) => {
            console.log("Result: ", result);
          })
          .catch((erro) => {
            console.error("Error when sending: ", erro);
          });
          
        const userToUpdate = user.find((u) => u.number === senderPhoneNumber);
        userToUpdate.count = 0;
      }
    }
  });
}
