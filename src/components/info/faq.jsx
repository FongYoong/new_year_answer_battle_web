import { Text, Link } from "@chakra-ui/react"

export const faq = [
    {
        question: "Can I add my own custom questions / answers?",
        answer: "YES! This is a great way to really make this a hit! Add in questions about the bride / groom or this specific wedding. To do so, go to the Editor and then enter your own questions and answers."
    },
    {
        question: "Why aren’t the sound effects working?",
        answer: "Check if the browser's sound is muted."
    },
    {
        question: "Is there a tutorial I can watch to edit / play this game?",
        answer:
            <Text>
                <span>Yes. To see it in action, or learn how to make edits, watch this video:</span>
                <Link href="https://youtu.be/uB1D9wWxd2w" color='#c00' isExternal>
                    &nbsp;(Put link to video guide here)
                </Link>
            </Text>
    },
    {
        question: "What does a typical round looks like?",
        answer: "Put description of normal round here."
    },
    {
        question: "How do I play a lightning round?",
        answer:
            <Text>
                <span><b><u>How to set up the board:</u></b></span>
                <br />
                Come up with 10 short questions with very short, definitive answers, and type those questions in the board. You will need to put the same questions in both Fast Money slides (player 1 & player 2). You will not input the answers anywhere.
                <br />
                <span><b><u>To work the board:</u></b></span>
                <br />
                Start the timer and then click on each question to have it appear. Click on the green + if they get it right, or the red x if they get it wrong. Then manually add them up at the end. Note: The correct answer will never be revealed. The host, or the game operator needs to have the answers in front of them so that they can click + or x.
                <br />
                <span><b><u>Select 2 people to play the round.</u></b></span>
                <br />
                They can either be 2 people from the winning team working together to get a certain number right (like the tv show) or they can be 1 from each team going head to head seeing who gets the most right. In either case, send player 2 out of the room, so they cannot hear the questions or the answers given when player 1 is answering. After player 1 has given their answers, record their score somewhere (if you’re keeping score), move to the next slide, and bring in player 2 for their turn.
                <br />
                <span><b><u>If you’re keeping score:</u></b></span>
                <br />
                Figure out how many point each correct Fast Money answer is worth. Depending on how many rounds you play, the team’s point totals might be several hundred points off so for these Fast Money questions to possibly change the outcome, they need to be worth more than 1 point each. Perhaps you could have each correct answer worth 25 points. 
            </Text>
    },
]