import Problems from "../models/ProblemsTable.js";

const problems = [
  { order: 1, title: "Two Sum", difficult: "Easy", category: "Array" },
  { order: 2, title: "Longest Substring Without Repeating Characters", difficult: "Medium", category: "String" },
  { order: 3, title: "Median of Two Sorted Arrays", difficult: "Hard", category: "Array" },
  { order: 4, title: "Valid Parentheses", difficult: "Easy", category: "Stack" },
  { order: 5, title: "Merge Intervals", difficult: "Medium", category: "Sorting" },
];

Problems.insertMany(problems)
  .then(() => {
    console.log("Data inserted");
  })
  .catch((err) => {
    console.error("Error inserting data", err);
  });

export const problemsTable = async (req, res) => {
  try {
    const problems = await Problems.find().select(
      "id title difficult category order"
    );
    res.status(200).json({ data: problems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
