import webMessageModel from '../models/webMessages.js';

//create message
export const createMessage = async (req, res) => {
  try {
    const { name, contact, message } = req.body;
    if (!name || !contact || !message) {
      returnres.status(402).send({
        success: false,
        message: 'Please provide all fields',
      });
    }
    const webmessage = new webMessageModel({ name, contact, message });
    webmessage.save();
    res.status(201).send({
      success: true,
      message: 'Your message sent successfully',
      webmessage,
    });
  } catch (error) {
    (console.log(error),
      res.status(500).send({
        success: false,
        message: 'Error in web message api',
        error,
      }));
  }
};
//getAll Messages
export const getAllMessages = async (req, res) => {
  try {
    const webMessage = await webMessageModel.find({});
    res.status(201).send({
      success: true,
      message: 'All web messages',
      totalCount: webMessage.length,
      webMessage,
    });
  } catch (error) {
    (console.log(error),
      res.status(500).send({
        success: false,
        message: 'Error in all web messages api',
        error,
      }));
  }
};
//DELETE Messages
export const deleteWebMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({
        success: false,
        message: 'please provide message id',
      });
    }
    //find message
    const webMessage = await webMessageModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: 'Message has been deleted',
    });
  } catch (error) {
    (console.log(error),
      res.status(500).send({
        success: false,
        message: 'Error in delete web message api',
        error,
      }));
  }
};
