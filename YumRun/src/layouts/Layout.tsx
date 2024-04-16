import React, { Children } from 'react'
import PropTypes from 'prop-types'
import Header from '@/components/Header'

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto flex-1 py-10">{children}</div>
    </div>

  )
}

type Props = {
  children: React.ReactNode
}

export default Layout