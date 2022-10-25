import React from 'react'
import { useParams } from 'react-router-dom'
import ContentTitle from '../Layouts/ContentTitle'
import { CatalogStore, useCategoryById } from './CatalogStore'

const CategoryTitle: React.FC<{ store: CatalogStore }> = ({ store }) => {
  const { categoryId } = useParams()
  const { status, data: category } = useCategoryById(store, categoryId ?? '')

  return (
    <ContentTitle text={{ status, data: category?.title }} marginBottom={2} />
  )
}

export default CategoryTitle
