// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, assignmentGroup, learnerSubmissions){
// assignment group to course
    try {
    if (assignmentGroup.course_id !== CourseInfo.id) {
        throw new Error("Assignment group does not belong to this course");
    }

    const results = [];

    // get id's
    const learnerIds = [...new Set(
        learnerSubmissions.map(sub => sub.learner_id)
    )];

    for (const learnerId of learnerIds){

        const learner = {
            id: learnerId
        };

        let totalScore = 0;
        let totalPoints = 0;

        const submissions = learnerSubmissions.filter(sub =>
            sub.learner_id === learnerId
        );

        for (const submission of submissions){

            const assignment = assignmentGroup.assignments.find(
                assignment => assignment.id === submission.assignment_id
            );
// invalid assignments
            if (!assignment){
                continue;
            }
            // skip / not due 
            if (new Date(assignment.due_at) > new Date()) {
                continue;
            }

            // points

            if ( 
                typeof assignment.points_possible !== "number" ||
                assignment.points_possible <= 0
            ){
                throw new Error("invalid points possible");
            }

            let score = submission.submission.score;

            // late

            if (
                new Date(submission.submission.submitted_at) >
                new Date(assignment.due_at)
            ){
                score -= assignment.points_possible * 0.1;
            }

            learner[assignment.id] =
            score / assignment.points_possible;
        }

        learner.avg =
        totalPoints > 0 ? totalScore / totalPoints: 0;

        results.push(learner);
    }
    
    return results;

    } catch (error) {
        console.log(error.message);
        return [];
    }
}

console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
);