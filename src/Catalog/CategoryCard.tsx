import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from './CatalogStore'
import './CategoryCard.css'

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <Link to={`/list/${category.id}`} className="category-link">
    <Card className="category-card" elevation={5}>
      <CardMedia image={`images/catalog/${category.id}.jpg`}
                 title={category.title}
                 className="category-image"
      />
      <CardContent className="category-content">
        <Typography component="div">{category.title}</Typography>
      </CardContent>
    </Card>
  </Link>
)

export default CategoryCard
