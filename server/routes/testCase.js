import Testcase from "../models/TestCases.js";



export const Test = async (req, res) => {
  try {
    const tests = await Testcase.find().select(
      "id"
    );
    res.status(200).json({ data: tests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
