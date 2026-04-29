const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' name='message'>");
    res.write("<button type='submit'>Send</button>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    // Реєстрація кінцевий слухач

    req.on("end", () => {
      // Парсимо в строку з буфера наші данні
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });

      // console.log(parsedBody);
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Enter Message</title></head>");
  res.write("<body><h1>Hello from my first NODE.js SERVER!</h1></body>");
  res.write("</html>");
  res.end();

  // end - викликається після того як ми встановили всі заголовки і записали всі данні в ітло відповіді.
  //  після ens нічого писати вже не можна!

  res.end();
};
module.exports = {
  handler: requestHandler,
};
