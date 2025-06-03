export const reviewTemplate = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
  },
  {
    label: "Review Message",
    name: "reviewMessage",
    type: "text",
    as: "textarea",
    required: true,
    placeholder: "Leave a review",
  },

  {
    label: "Rating",
    name: "rating",
    type: "number",
    min: "1",
    max: "5",
  },
];
