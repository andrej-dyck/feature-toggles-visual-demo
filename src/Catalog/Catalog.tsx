import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import GridLayout from '../Layouts/GridLayout'
import GridSkeleton from '../Layouts/GridSkeleton'
import './Catalog.css'
import { CatalogStore, Category } from './CatalogStore'
import { useCategories } from './useCategories'

const Catalog: React.FC<{ store: CatalogStore }> = ({ store }) => {
  const { status, data: categories } = useCategories(store)

  if (status === 'loading') return (
    <GridSkeleton n={4} width={600} height={244} />
  )

  if (status === 'success' && (categories?.length ?? 0) > 0) return (
    <GridLayout>
      {categories?.map(c => (<CategoryCard category={c} key={c.id} />))}
    </GridLayout>
  )

  return (
    <Typography variant="h6" color="textSecondary">
      Sorry, we have no products at the moment.
    </Typography>
  )
}

const CategoryCard: React.FC<{ category: Category }> = ({ category }) =>
  <Link to={`/list/${category.id}`} className="category-link">
    <Card className="category-card" elevation={5}>
      <CardMedia image={categoryImgSrc(category)}
                 title={category.title}
                 className="category-image"
      />
      <CardContent className="category-content">
        <Typography component="div">{category.title}</Typography>
      </CardContent>
    </Card>
  </Link>

const categoryImgSrc = (category: Category) => `images/catalog/${category.id}.jpg`

export default Catalog
