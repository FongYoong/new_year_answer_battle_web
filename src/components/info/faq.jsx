// import { Text, Link } from "@chakra-ui/react"

export const faq = [
    {
        question: "What are the overall rules of the game?",
        answer:
            <ol>
                <li>
                    Two teams compete against each other to guess the most popular responses to survey questions.
                </li>
                <li>
                    A typical game consists of 10 rounds, with each round featuring a different question or topic.
                </li>
                <li>
                    The starting team alternates each round.
                </li>
                <li>
                    The team that starts the round continues to guess answers until they either complete the board or receive three strikes, at which point the other team gets a chance to steal the points by guessing any remaining answers. If the other team reveals one of the remaining answers on the board, they steal all the unassigned points for that round.
                </li>
                <li>
                    In the Fast Money round, one member of each team take turns answering 10 questions within a time limit. Ask player 2 to leave the room so they won't hear the questions or answers provided by player 1. Once player 1 has given their answers, record their score, move to the next page, and then bring in player 2 for their turn. The point value for each question is determined by the presenter before the round. Note that the correct answers won't be revealed but will be visible on the presenter screen.
                </li>
                <li>
                    The team with the most points at the end of Fast Money wins.
                </li>
            </ol>
    },
    {
        question: "Can I add my own custom questions / answers?",
        answer: "Absolutely! For example, incorporating questions about friends or family can make the activity even more engaging. To do this, access the Editor section and input your own set of questions and answers."
    },
    {
        question: "Why aren't the sound effects working?",
        answer: "Check if the browser's sound is muted."
    },
    {
        question: "Is there a tutorial I can reference to edit / play this game?",
        answer: "Yes, click the “info” button and then click “tour” to get an explanation of how the game works."
    },
]

// {
//     question: "Is there a tutorial I can watch to edit / play this game?",
//     answer:
//         <Text>
//             <span>Yes. To see it in action, or learn how to make edits, watch this video:</span>
//             <Link href="https://youtu.be/uB1D9wWxd2w" color='#c00' isExternal>
//                 &nbsp;(Put link to video guide here)
//             </Link>
//         </Text>
// },

// {
//     question: "How do I play a lightning round?",
//     answer:
//         <Text>
//             <span><b><u>How to set up the board:</u></b></span>
//             <br />
//             Come up with 10 short questions with very short, definitive answers, and type those questions in the board. You will need to put the same questions in both Fast Money slides (player 1 & player 2). You will not input the answers anywhere.
//             <br />
//             <span><b><u>To work the board:</u></b></span>
//             <br />
//             Start the timer and then click on each question to have it appear. Click on the green + if they get it right, or the red x if they get it wrong. Then manually add them up at the end. Note: The correct answer will never be revealed. The host, or the game operator needs to have the answers in front of them so that they can click + or x.
//             <br />
//             <span><b><u>Select 2 people to play the round.</u></b></span>
//             <br />
//             They can either be 2 people from the winning team working together to get a certain number right (like the tv show) or they can be 1 from each team going head to head seeing who gets the most right. In either case, send player 2 out of the room, so they cannot hear the questions or the answers given when player 1 is answering. After player 1 has given their answers, record their score somewhere (if you’re keeping score), move to the next slide, and bring in player 2 for their turn.
//             <br />
//             <span><b><u>If you’re keeping score:</u></b></span>
//             <br />
//             Figure out how many point each correct Fast Money answer is worth. Depending on how many rounds you play, the team’s point totals might be several hundred points off so for these Fast Money questions to possibly change the outcome, they need to be worth more than 1 point each. Perhaps you could have each correct answer worth 25 points. 
//         </Text>
// },