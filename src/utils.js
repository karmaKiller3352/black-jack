export const shuffle = (arr) => arr.sort(() =>  Math.random() - 0.5);

export const isEmpty = (arr) => !(arr && arr.length)