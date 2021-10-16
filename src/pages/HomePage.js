import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'


const REVIEWS = gql`
 query getReviews {
     reviews{
         id,
         body,
         title,
         rating,
         categories{
             id,
             name
         }
     }
 }
`
export default function HomePage() {
    const {data, loading, error} = useQuery(REVIEWS)
    if (loading) return <p> Data is Loading...</p>
    if (error) return <p> Error ...</p>
    console.log(data)
    return (
        <div>
            {
                data.reviews.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="rating">{review.rating}</div>
                        <h2>{review.title}</h2>

                        {review.categories.map(category => (
                            <small key={category.id}>{category.name}</small>
                        ))}
                        <p>{review.body.substring(0, 200)}...</p>
                        <Link to={`/details/${review.id}`}> Read More...</Link>
                    </div>
                ))}
        </div>
    )
}
