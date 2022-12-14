import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import { appRoutes, images } from '../AppRoutes'
import GridLayout from '../Layouts/GridLayout'
import GridSkeleton from '../Layouts/GridSkeleton'
import './Catalog.css'
import { CatalogStore, Category, useCategories } from './CatalogStore'

const Catalog: React.FC<{ store: CatalogStore }> = ({ store }) => {
  const { data: categories, status } = useCategories(store)

  if (status === 'success' && (categories?.length ?? 0) > 0) return (
    <GridLayout>
      {categories?.map(c => (<CategoryCard category={c} key={c.categoryId} />))}
    </GridLayout>
  )

  if (status === 'loading') return (
    <GridSkeleton n={4} width={600} height={244} />
  )

  return (
    <Typography variant="h6" color="text.secondary">
      Sorry, we have no products at the moment.
    </Typography>
  )
}

const CategoryCard: React.FC<{ category: Category }> = ({ category }) =>
  <Link to={appRoutes.category(category.categoryId)}>
    <Card className="category-card" elevation={1}>
      <CardMedia
        image={categoryImgSrc(category)}
        title={category.title}
        className="category-image"
      />
      <CardContent className="category-content">
        <Typography component="div">{category.title}</Typography>
      </CardContent>
    </Card>
  </Link>

const categoryImgSrc = (category: Category) => images(`catalog/${category.categoryId}.jpg`)

export default Catalog
