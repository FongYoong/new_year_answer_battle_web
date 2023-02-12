import { v4 as uuid } from 'uuid';

export function generateId() {
    return uuid();
}

export function createNewRound(roundType) {
    if (roundType == 'normal') {
        return {
            id: generateId(),
            type: 'normal',
            question: '',
            answers: []
        }
    }
    else if (roundType == 'lightning') {
        return {
            id: generateId(),
            type: 'lightning',
            time: 60, // seconds
            questions: []
        }
    }
}

export function populateRoundsWithIds(rounds) {
    return rounds.map((round) => {
        if (round.type == "normal") {
            return {
                ...round,
                id: generateId(),
                answers: round.answers.map((a) => {
                    return {
                        ...a,
                        id: generateId()
                    }
                })
            }
        }
        else if (round.type == "lightning") {
            return {
                ...round,
                id: generateId(),
                questions: round.questions.map((q) => {
                    return {
                        ...q,
                        id: generateId()
                    }
                })
            }
        }

    })
}

export const default_rounds = populateRoundsWithIds([
    {
        type: "normal",
        question: "Name a common New Year's Resolution",
        answers: [
            {
                answer: "Lose weight / Exercise",
                points: 100
            },
            {
                answer: "Save money",
                points: 90
            },
            {
                answer: "More time with friends/family",
                points: 80
            },
            {
                answer: "New job",
                points: 70
            },
            {
                answer: "Get organized",
                points: 60
            },
            {
                answer: "Break habits",
                points: 50
            },
            {
                answer: "Travel more",
                points: 40
            },
            {
                answer: "Read more",
                points: 30
            },
        ]
    },
    {
        type: "normal",
        question: "Name something people do right when New Year comes",
        answers: [
            {
                answer: "Kiss",
                points: 100
            },
            {
                answer: `Shout "Happy New Year!"`,
                points: 90
            },
            {
                answer: "Light fireworks",
                points: 80
            },
            {
                answer: "Make loud noises",
                points: 70
            },
            {
                answer: "Toast / Drink",
                points: 60
            },
        ]
    },
    {
        type: "lightning",
        time: 60, // seconds
        questions: [
            {
                question: "Capital of California",
                answer: "Sacramento",
            },
            {
                question: "Longest river in U.S",
                answer: "Missouri River",
            },
            {
                question: "Biggest state",
                answer: "Alaska",
            },
            {
                question: "50th state",
                answer: "Hawaii",
            },
            {
                question: "State farthest south",
                answer: "Hawaii",
            },
            {
                question: "State with Mt. Rushmore",
                answer: "South Dakota",
            },
            {
                question: "City of Brotherly Love",
                answer: "Philadelphia",
            },
            {
                question: "City called the Big Apple",
                answer: "New York",
            },
            {
                question: "U.S city not in a state",
                answer: "Washington D.C.",
            },
            {
                question: "Capital of Idaho",
                answer: "Boise",
            },
        ]
    },
]);