import data from '../mock/reviews.json'

export interface Review {
    id: number,
    userName: string,
    content: string,
    rating: number,
    dateTime: string
}

export function getReviewCount() {
    return data.length
}

export function getRandomReview(count: number) {
    const reviews: Review[] = [];
    while (reviews.length < count) {
        const randomReview = data[(Math.floor(Math.random() * getReviewCount()))]
        if (!reviews.includes(randomReview)) {
            reviews.push(randomReview)
        }
    }
    return reviews
}