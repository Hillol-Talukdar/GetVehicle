import React from "react";
import Rating from "react-star-ratings";

export const showAverageRating = (data, isHomeCardView) => {
    let starDimensionInPixels = "20px";
    let starSpacingInPixels = "2px";
    let textColor = "black";

    if (data && data?.ratings) {
        let ratingsArray = data && data?.ratings;
        let totalRating = [];
        let length = ratingsArray.length;
        ratingsArray.map((rat) => totalRating.push(rat.star));
        let totalReduced = totalRating.reduce((p, n) => p + n, 0);
        let heighest = length * 5;
        let result = (totalReduced * 5) / heighest;

        if(isHomeCardView) {
            starDimensionInPixels = "15px";
            starSpacingInPixels = "1px";
            textColor = "#666666";
        }

        return (
            <div className="text-center d-flex">
                <span>
                    <Rating
                        starDimension={starDimensionInPixels}
                        starSpacing={starSpacingInPixels}
                        starRatedColor="#ffd700"
                        editing={false}
                        rating={result}
                    />
                </span>
                <span style={{color: textColor}}>
                    &nbsp;({data?.ratings?.length})
                </span>
            </div>
        );
    }
};
