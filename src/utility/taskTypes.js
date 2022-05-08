export const taskTypes = {
    quick: {
        name: "Quick",
        time: "< 10 min",
        val: 2
    },
    average: {
        name: "Average",
        time: "20 - 60 min",
        val: 4
    },
    large: {
        name: "Large",
        time: "1 - 2 hours",
        val: 18
    },
    major: {
        name: "Major",
        time: "2+ hours",
        val: 30
    }
}

export const taskTypeVals = {
    "2": "Quick",
    "4": "Average",
    "18": "Large",
    "30": "Major"
};

export const matrixTypes = {
    urgentimportant: {
        name: "Urgent & Important",
        label: "ui"
    },
    noturgentimportant: {
        name: "Not Urgent & Important",
        label: "nui"
    },
    urgentnotimportant: {
        name: "Urgent & Not Important",
        label: "uni"
    },
    noturgentnotimportant: {
        name: "Not Urgent & Not Important",
        label: "nuni"
    }
}

export const matrixTypeLabels = {
    "ui": "urgentimportant",
    "nui": "noturgentimportant",
    "uni": "urgentnotimportant",
    "nuni": "noturgentnotimportant"
}