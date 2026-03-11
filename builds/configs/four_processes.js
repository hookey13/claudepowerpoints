"use strict";

const { makeSessionResource } = require("../../themes/pdf_helpers");

const UNIT = {
  subject: "numeracy",
  yearLevel: "grade56",
  variant: 0,
  footerStem: "Four Processes Review | Year 5/6 Maths",
};

const LESSONS = {
  1: {
    sessionNumber: 1,
    outDir: "output/4Proc_Lesson1_Addition_Subtraction",
    pptxFileName: "4Proc_Lesson1_Addition_Subtraction.pptx",
    footer: `Session 1 of 4 | ${UNIT.footerStem}`,
    resources: {
      worksheet: makeSessionResource(1, "Worksheet", "6 problems (3 addition, 3 subtraction) with gridlines. One per student."),
      answerKey: makeSessionResource(1, "Answer Key", "Worked solutions for worksheet and exit ticket. Teacher reference only."),
      extension: makeSessionResource(1, "Extension", "Palindromic number investigation. For extending students."),
    },
  },
  2: {
    sessionNumber: 2,
    outDir: "output/4Proc_Lesson2_Multiplication_Methods",
    pptxFileName: "4Proc_Lesson2_Multiplication_Methods.pptx",
    footer: `Session 2 of 4 | ${UNIT.footerStem}`,
    resources: {
      worksheet: makeSessionResource(2, "Worksheet", "4 vertical + 3 lattice problems with grid format. One per student."),
      answerKey: makeSessionResource(2, "Answer Key", "Full worked answers for worksheet and exit ticket. Teacher reference only."),
      extension: makeSessionResource(2, "Extension", "Multiplying by 11 - discover the shortcut pattern. Extending resource."),
    },
  },
  3: {
    sessionNumber: 3,
    outDir: "output/4Proc_Lesson3_Short_Division",
    pptxFileName: "4Proc_Lesson3_Short_Division.pptx",
    footer: `Session 3 of 4 | ${UNIT.footerStem}`,
    resources: {
      worksheet: makeSessionResource(3, "Worksheet", "8 problems (4 clean, 4 with remainders) with bus stop gridlines. One per student."),
      answerKey: makeSessionResource(3, "Answer Key", "Answer key with all 3 remainder forms. Teacher reference only."),
      extension: makeSessionResource(3, "Extension", "Investigate which divisors create repeating decimals. Extending students."),
    },
  },
  4: {
    sessionNumber: 4,
    outDir: "output/4Proc_Lesson4_Worded_Problems",
    pptxFileName: "4Proc_Lesson4_Worded_Problems.pptx",
    footer: `Session 4 of 4 | ${UNIT.footerStem}`,
    resources: {
      worksheet: makeSessionResource(4, "Worksheet", "8 worded problems (2 each of +, -, x, /). One per student."),
      answerKey: makeSessionResource(4, "Answer Key", "Full answers with operation identification. Teacher reference only."),
      extension: makeSessionResource(4, "Extension", "Multi-step worded problems requiring 2-3 operations. Extending students."),
    },
  },
};

module.exports = {
  UNIT,
  LESSONS,
};
