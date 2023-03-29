const ContactUsModel = require("../module/ContactUsModel");
const sendEmail = require("../utils/sendEmail");


const fillForm = async (req, res) => {
    try {
        const { name, email, number, message } = req.body;

        const contanct =await new ContactUsModel({
            name, email, number, message
        }).save();

        res.status(200).json({ message: 'form saved' });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const getallform = async (req, res) => {
    try {
        const data = await ContactUsModel.find();
        res.status(200).json({ message: 'fetched all form', data });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}

const responseBack = async (req, res) => {
    try {
        const { email, message } = req.body;
        await sendEmail(email, "response", String(message));
        res.status(200).json({ message: 'response sended' });
    } catch (e) {
        res.status(500).json({ message: 'something went wrong' });
    }
}
const deleteInquiry = async (req, res, next) => {
    try {
      const { id } = req.query;
      console.log("====id",id);
      const data = await ContactUsModel.findByIdAndDelete(id);
  
      if (!data) return res.status(400).json({ message: "Inquiry not founded" });
  
      res.status(200).json({ message: "Inquiry deleted" });
    } catch (e) {
      res.status(500).json({ message: "something went wrong" });
    }
  };
module.exports = {
    fillForm,
    getallform,
    responseBack,
    deleteInquiry
}