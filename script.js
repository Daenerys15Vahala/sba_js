// SBA JAVASCRIPT FUNDAMENTALS

// INFO

const courseInfo = {
    id: 1,
    name: "Math"
};

const assignmentGroup = {
    id: 1,
    name: "Homework",
    course_id: 1,
    group_weight: 50,
    assignments: [
        {
            id: 101,
            name: "Homework 1",
            due_at: "2026-07-01",
            points_possible: 100
        }
    ]
};

const learnerSubmission = [
    {
        learner_id: 1,
        assignment_id: 101,
        submission: {
            submitted_at: "2026-06-30",
            score: 90
        }
    }
];

// functions

function getLearnerData(courseInfo, assignmentGroup, learnerSubmission) {

    try {

        if (assignmentGroup.course_id !== courseInfo.id) {
            throw new Error("Assignment group does not belong to this course");
        }
        const results = [];
        const today = new Date();

        const learnerIds = [...new Set(
            learnerSubmission.map(sub => sub.learner_id)
        )];

        for (const learnerId of learnerIds) {
            const learner = {
                id: learnerId
            };

            let totalScore = 0;
            let totalPoints = 0;

            const submissions = learnerSubmission.filter(
                sub => sub.learner_id === learnerId
            );

            for (const sub of submissions) {
                const assignment = assignmentGroup.assignments.find(
                    a => a.id === sub.assignment_id
                );

                if (!assignment)continue;
                if(new Date(assignment.due_at) > today) {
                    continue;
                }

                if (
                    typeof assignment.points_possible !-- "number" ||
                    
                    assignment.points_possible <= 0
                ) {
                    throw new Error ("Invalid points possible for assignment ${assignment.id}
                    );
                }

            let score = sub.submission.score;

            if (
                new Date(sub.submission.submitted_at) >
                new Date(assignment.due_at)
            ){
                score-= assignment.points_possible * 0.1;
            }
        }
        return results;

    } catch (error) {
        console.log(error.message);
        return [];
    }
}
console.log(getLearnerData(courseInfo, assignmentGroup, learnerSubmission));