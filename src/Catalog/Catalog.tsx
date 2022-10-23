import { Grid, Skeleton, Typography } from '@mui/material'
import React from 'react'
import { CatalogStore } from './CatalogStore'
import CategoryCard from './CategoryCard'
import { useCategories } from './useCategories'

const Catalog: React.FC<{ store: CatalogStore }> = ({ store }) => {
  const { status, data: categories } = useCategories(store)

  if (status === 'loading') return (
    <GridLayout>
      <Skeleton variant="rounded" width={600} height={244} />
      <Skeleton variant="rounded" width={600} height={244} />
      <Skeleton variant="rounded" width={600} height={244} />
      <Skeleton variant="rounded" width={600} height={244} />
    </GridLayout>
  )

  if (status === 'success' && (categories?.length ?? 0) > 0) return (
    <GridLayout>
      {categories?.map(c => (<CategoryCard category={c} />))}
    </GridLayout>
  )

  return (<Typography variant="h5">Sorry, we have no products at the moment.</Typography>)
}

const GridLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const items = Array.isArray(children) ? [...children] : [children]
  return (
    <Grid container
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
    >
      {items.map((c) => (<Grid item>{c}</Grid>))}
    </Grid>
  )
}

export default Catalog
