const ENQUIRY_OPTIONS = [
  { value: "project", label: "Project Collaboration" },
  { value: "hiring", label: "Hiring Opportunity" },
  { value: "consultation", label: "Consultation" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

const initialForm = {
  name: "",
  email: "",
  enquiryType: ENQUIRY_OPTIONS[0].value,
  message: "",
};

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export { ENQUIRY_OPTIONS, initialForm, validateEmail };
