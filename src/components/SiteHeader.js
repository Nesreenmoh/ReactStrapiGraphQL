import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'


const CATEGORIES = gql`
  query getCategories {
      categories{
          id,
          name
      }
  }

`
export default function SiteHeader() {

    const { loading, error, data } = useQuery(CATEGORIES)

    if (loading) return <p> Data is Loading...</p>
    if (error) return <p> Error ...</p>

    return (
        <div className="site-header">
            <Link to="/"><h1> My Reviews </h1></Link>
            <nav className="categories">
                <span>
                    Filter Reviews By Category: {data.categories.map(category =>(
                         <Link key={category.id} to={`/category/${category.id}`}>
                             {category.name}</Link>
                    ))} 
                </span>
            </nav>
        </div>
    );
}