const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shivaji:Shivaji@007@cluster0.narig.mongodb.net/helphand?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
