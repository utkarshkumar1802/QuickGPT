// Text based AI Chat message Controller

import axios from "axios";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import imagekit from "../configs/imageKit.js";
import openai from "../configs/openai.js"

export const textMessageController = async (req, res) => {
  try {
    const userId = req.user._id;

    // check credits
    if (req.user.create < 2) {
      return res.json({
        success: false,
        message: "You don't have enough cradits to use this feature",
      });
    }
    
    const { chatId, prompt } = req.body;

    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const specialPrompts = [
  "who are you",
  "tum kaun ho",
  "apne baare me batao",
  "who created you",
  "who made you",
  "aacha tum apne bare me btao",
  "tell me about yourself",
  "what is your purpose",
  "what can you do"
];


    const isSpecialQuestion = specialPrompts.some(special =>
      prompt.toLowerCase().includes(special)
    );

    if (isSpecialQuestion) {
      const reply = {
        role: "assistant",
        content: "I am Quick GPT, a large language model powered by Grok AI. Created by Utkarsh kumar, a MERN Stack Developer, I'm designed to assist you with information, coding help, learning, and much more — all in a quick and efficient way.",
        timestamp: Date.now(),
        isImage: false
      };

      res.json({ success: true, reply });

      chat.messages.push(reply);
      await chat.save();

      await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });

      return;  // Exit the controller → special reply sent
    }

    // Prepare full history (no limit)
    const historyMessages = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // const { choices } = await openai.chat.completions.create({
    //   model: "gemini-2.0-flash",
    //   messages: [
    //     {
    //       role: "user",
    //       content: prompt,
    //     },
    //   ],
    // });

    const { choices } = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [...historyMessages, { role: "user", content: prompt }],
    });

    const reply = {
      ...choices[0].message,
      timestamp: Date.now(),
      isImage: false,
    };
    res.json({ success: true, reply });

    chat.messages.push(reply);
    await chat.save();

    await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });
  } catch (error) {
    if (error.status === 429) {
      return res.json({ 
        success: false, 
        message: "API rate limit exceeded. Please wait a moment and try again.",
        code: 429
      });
    }
    res.json({ success: false, message: error.message });
  }
};

// Image Generation message controller

export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    // check credits
    if (req.user.create < 2) {
      return res.json({
        success: false,
        message: "You don't have enough cradits to use this feature",
      });
    }
    const { prompt, chatId, isPublished } = req.body;
    // find chat
    const chat = await Chat.findOne({ userId, _id: chatId });
    // Push user Message
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    // Encode the prompt
    const encodedPrompt = encodeURIComponent(prompt);

    // construct Imagekit AI generation URL
    const generatedImageUrl = `${
      process.env.IMAGEKIT_URL_ENDPOINT
    }/ik-genimg-prompt-${encodedPrompt}/quickgpt/${Date.now()}.png?tr=w-800,h-800`;

    // Trigger generation by fetching from ImageKit
    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    // convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary"
    ).toString("base64")}`;

    // upload to Imagekit Media Library
    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "quickgpt",
    });

    const reply = {
      role:"assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      isPublished
    };
    res.json({ success: true, reply });

    chat.messages.push(reply)
    await chat.save()
    await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });

  } catch (error) {
    res.json({success:false, message:error.message})
  }
};
