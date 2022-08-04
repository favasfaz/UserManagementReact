import React from 'react'
import AdminFeed from '../../AdminComponents/AdminFeed/AdminFeed'
import AdminHeader from '../../AdminComponents/AdminHeader/AdminHeader'

function AdminHome() {
  return (
    <div>
        <AdminHeader/>
        <AdminFeed/>
    </div>
  )
}

export default AdminHome