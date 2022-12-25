import React from "react";
import Rating from "react-star-ratings";

export const showAverageRating = (data) => {
    if (data && data?.ratings) {
        let ratingsArray = data && data?.ratings;
        let totalRating = [];
        let length = ratingsArray.length;
        // console.log("len ", length);
        ratingsArray.map((rat) => totalRating.push(rat.star));
        let totalReduced = totalRating.reduce((p, n) => p + n, 0);
        let heighest = length * 5;
        let result = (totalReduced * 5) / heighest;

        return (
            <div className="text-center d-flex">
                <span>
                    <Rating
                        starDimension="20px"
                        starSpacing="2px"
                        starRatedColor="#ffd700"
                        editing={false}
                        rating={result}
                    />
                </span>
                <span>
                    &nbsp;({data?.ratings?.length})
                </span>
            </div>
        );
    }
};
