
export const global_steps = [
    {
        target: '#soundboard',
        content: 'Click any of these buttons to play a corresponding sound effect.',
    },
    {
        target: '#toolbar_presenter_button',
        content: 'Click this to open up another window that can be used by the Game Master during the game.',
        disableBeacon: true,
    },
]

export const home_steps = [
    {
        target: '#home_play_button',
        content: 'Click this to start a new game.',
        disableBeacon: true,
    },
    {
        target: '#home_editor_button',
        content: 'Click this to open up an editor which edits your rounds.',
    },
    {
        target: '#home_save_button',
        content: 'Save your progress to a file in your local filesystem.',
    },
    {
        target: '#home_load_button',
        content: 'Load a save file from your local filesystem to continue where you left off.',
    },
    ...global_steps
];

export const round_scoreboard_steps = [
    {
        target: '#round_scoreboard',
        content: 'The scores for each team are displayed here.',
        disableBeacon: true,
    },
    {
        target: '#scoreboard_a_minus_add',
        content: 'Click the minus/add buttons to change the score.',
    },
    {
        target: '.scoreboard-a-score',
        content: 'Click the score to enter a manual value.',
    },
];

export const round_navigator_steps = [
    {
        target: '#round_navigator',
        content: 'Use these buttons to navigate between rounds or return to home.',
        disableBeacon: true,
    }
];

export const normal_round_steps = [
    {
        target: '#normal_round_main',
        content: 'This round poses a question whereby players must guess the correct answer.',
        disableBeacon: true,
    },
    {
        target: '#normal_round_unassigned_points',
        content: 'Unassigned points should be assigned at the end of each round.',
    },
    {
        target: '.normal-round-unassigned-points-winner-button',
        content: 'Click this decide the winner of the round.',
    },
    {
        target: '#normal_round_unassigned_points_reset_button',
        content: 'Click this to reset the unassigned points.',
    },
    ...round_scoreboard_steps,
    {
        target: '#normal_round_show_question_button',
        content: 'Click this to show the question.',
    },
    {
        target: '#normal_round_hide_question_button',
        content: 'Click this to hide the question and reveal a list of hidden answers that players can choose from.',
    },
    {
        target: '#round_strike_button',
        content: 'Click this to strike.',
    },
    ...round_navigator_steps,
    ...global_steps
];

export const lightning_round_steps = [
    {
        target: '#lightning_round_main',
        content: 'This round requires players to guess correct answers for multiple questions. Click each question to reveal its content.',
        disableBeacon: true,
    },
    {
        target: '#round_timer',
        content: 'Use this timer to time the game.',
    },
    ...round_scoreboard_steps,
    ...round_navigator_steps,
    ...global_steps
];

export const editor_steps = [
    {
        target: '#editor_main',
        content: 'Use the editor to edit the rounds.',
        disableBeacon: true,
    },
    {
        target: '#editor_rounds_list',
        content: 'The list of rounds are displayed here. Click and drag them to reorder the list.',
    },
    {
        target: '#editor_add_round_buttons',
        content: 'Click these buttons to add a round to the list.',
    },
    {
        target: '#editor_save_button',
        content: 'Click this to save any changes made.',
    },
    {
        target: '.editor-undo-button',
        content: 'Click this to undo all changes made.',
    },
    {
        target: '.editor-example-button',
        content: 'Click this to replace with a sample template.',
    },
    {
        target: '#editor_delete_all_button',
        content: 'Click this to delete all rounds.',
    },
];