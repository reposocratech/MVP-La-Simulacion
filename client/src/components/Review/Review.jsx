import { Rating } from "react-simple-star-rating";

export const Review = () => {

  return (
    <article>
      <Rating
        ratingValue
        size={24}
        readonly
        fillColor="var(--color-primary-violet)"
        emptyColor="#CCC"
        transition
      />
      <p></p>
    </article>
  )
}
