export const getBotInfoController = (req, res) => {
  res.json({
    success: true,
    message: "I am Quick GPT, a large language model trained by OpenAI.\n" +
             "Created by Utkarsh Kumar https://github.com/utkarshkumar1802, a MERN Stack Developer, I’m designed to assist you with information, coding help, learning, and much more — all in a quick and efficient way."
  });
};
