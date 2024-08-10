import ProblemDetails from "../models/ProblemDetails.js";

const problemDetailsData = [
  {
    id: 1,
    title: "Two Sum",
    difficult: "Easy",
    category: "Array",
    order: 1,
    description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "Because nums[0] + nums[1] = 2 + 7 = 9.",
      },
    ],
    constraints: [
      "Each input would have exactly one solution, and you may not use the same element twice.",
      "You can return the answer in any order."
    ],
    testcases: [
      { input: "2 7 11 15\n9", output: "0 1" },
      { input: "3 2 4\n6", output: "1 2" },
    ],
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    difficult: "Medium",
    category: "String",
    order: 2,
    description: "Given a string, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: "abcabcbb",
        output: "3",
        explanation: "The answer is 'abc', with the length of 3.",
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    testcases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
    ],
  },
  {
    id: 3,
    title: "Median of Two Sorted Arrays",
    difficult: "Hard",
    category: "Array",
    order: 3,
    description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    examples: [
      {
        input: "nums1 = [1, 3], nums2 = [2]",
        output: "2.00000",
      },
    ],
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m, n <= 1000",
      "0 <= nums1[i], nums2[i] <= 10^6"
    ],
    testcases: [
      { input: "1 3\n2", output: "2.00000" },
      { input: "1 2\n3 4", output: "2.50000" },
    ],
  },
  // Add more problem details as needed
];




ProblemDetails.insertMany(problemDetailsData)
  .then(() => {
    console.log("Problem details data inserted successfully");
  })
  .catch((err) => {
    console.error("Error inserting problem details data:", err);
  });








export const problemDetails = async (req, res) => {
  try {
    const problemId = req.params.id;

    const details = await ProblemDetails.findOne({ id: problemId }).lean();
    if (details) {
      res.status(200).json(details);
    } else {
      res.status(404).json({ message: "Problem not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "Fetching Failed", error: error.message });
  }
};
