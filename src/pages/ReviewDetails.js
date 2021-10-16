import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const REVIEW = gql`
  query getReview($id: ID!){
       review(id: $id){
         body,
         title,
         rating,
         id,
         categories{
             id,
             name
         }
     }
  }
`
export default function ReviewDetails() {
    const { id } = useParams()
    const {loading, error, data} = useQuery(REVIEW, {
        variables: {id: id}
    })
    
    if (loading) return <p> Data is Loading...</p>
    if (error) return <p> Error ...</p>
    console.log(data)
    return (
        <div className="review-card">
            <div className="rating">{data.review.rating}</div>
            <h2>{data.review.title}</h2>

            {data.review.categories.map(category => (
                            <small key={category.id}>{category.name}</small>
                        ))}
            <p>{data.review.body}...</p>
        </div>
    )
}
