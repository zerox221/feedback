const User = require("../models/user.model");
const Message = require("../models/message.model");
const messageSchema = require("../Schema/message.schema");
const { genrateFeedback } = require("../services/ai");
const { summeriseFeedback } = require("../services/ai.summerize");
const { success, json } = require("zod");

exports.shareFeedbackController = async (req, res) => {
  try {
    const { userName } = req.query;
    const { content } = req.body;

    const validation = messageSchema.safeParse({ content });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: validation.error.issues[0].message,
      });
    }

    if (!userName) {
      return res.status(401).json({
        success: false,
        message: "query is not define",
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    if (user.acceptingFeedback === false) {
      return res.status(401).json({
        success: false,
        message: "user is not accepting feedback currently",
      });
    }

    const saveMessage = await Message.create({
      content: content,
    });

    await User.findOneAndUpdate(
      { userName },
      { $push: { feedBack: saveMessage._id } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "feedback shared successfully",
    });
  } catch (error) {
    console.log(
      "internal server error while sharing feedback : ",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.genrateFeedbackController = async (req, res) => {
  try {
    const feedback = await genrateFeedback();

    if (!feedback) {
      return res.status(400).json({
        success: false,
        message: "not able to genrate feedbacks",
        feedbacks: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "genrated successfully",
      feedback: JSON.parse(feedback),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.summeriseFeedbacksController = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "session expire login again ",
      });
    }

    const user = await User.findById(id).populate("feedBack");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exists",
      });
    }

    if (user.feedBack.length < 3) {
      return res.status(402).json({
        success: false,
        message: "should have atleast 3 feedbacks to summerise",
      });
    }

    const feedbacks = user.feedBack.map((feedback) => feedback.content);

    const prompt = `summerise the following feedbacks in 3 points and in the form of an object with its titel and the array containing summerised feedback with each point should be of 20 words and also give a title to the summerised feedbacks summerisation means tell me what the feedback is about give only the object and dont give anything : ${feedbacks.join(" , ")}`;

    const summerisedFeedbacks = await summeriseFeedback(prompt);

    console.log("summerised feedback ", JSON.parse(summerisedFeedbacks));

    res.status(200).json({
      success: true,
      summerisedFeedbacks,
    });
  } catch (error) {
    console.log(
      "internal server error while summerising feedbacks : ",
      error.message,
    );
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.isUserNameAvailableController = async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      return res.status(400).json({
        success: false,
        message: "userName is required",
      });
    }
    const user = await User.findOne({ userName });

    if (user) {
      return res.status(200).json({
        success: false,
        message: "userName is not available",
        available: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "userName is available",
      available: true,
    });
  } catch (error) {
    console.log("error while checking username availability : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.changeIsAcceptingFeedback = async (req, res) => {
  try {
    const { id } = req.user;
    const { change } = req.body;

    console.log("change : ", change);

    if (change == undefined) {
      return res.status(400).json({
        success: false,
        message: "change value is not defined",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        acceptingFeedback: change,
      },
      {
        returnDocument: "after",
      },
    );

    res.status(200).json({
      success: true,
      message: "changed",
      value: user.acceptingFeedback,
    });
  } catch (error) {
    console.log("error while changing the switch : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.user;
    const feedBackId = req.params.id;

    console.log("user id  : ", id);
    console.log("message : id  ", feedBackId);

    if (!feedBackId) {
      return res.status(400).json({
        success: false,
        message: "give feedback to be deleted",
      });
    }

    const message = await Message.findByIdAndDelete(feedBackId);

    const user = await User.findByIdAndUpdate(id, {
      $pull: { feedBack: feedBackId },
    });

    res.status(200).json({
      success: false,
      message: "feddback deleted",
    });
  } catch (error) {
    console.log("error in deleting feedback : ", error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "invalid user",
      });
    }
    const user = await User.findById(id).populate("feedBack");
    
    res.status(200).json({
      success: true,
      feedbacks: user.feedBack,
    });

  } catch (error) {
    console.log("error : ",error.message);
    res.status(500).json({
      success: false,
      message: "error while fetching all feedbacks",
    });
  }
};
