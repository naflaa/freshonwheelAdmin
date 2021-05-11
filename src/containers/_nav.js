import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Purchase Module']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Vendors',
    route: '/vendors',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add new Vendor',
        to: '/vendors/add-new-vendor',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Vendors',
        to: '/vendors/all-vendors',
      }, 
    ],
    

  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Purchases',
    route: '/purchases',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add new Purchase',
        to: '/purchases/add-new-purchase',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Purchases',
        to: '/purchases/all-purchases',
      }, 
    ],
    

  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Sales Module']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Categories',
    route: '/categories',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add new Category',
        to: '/categories/add-new-category',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Categories',
        to: '/categories/all-categories',
      }, 
    ],
    

  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Products',
    route: '/products',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add new Product',
        to: '/products/add-new-product',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Products',
        to: '/products/all-products',
      }, 
    ],
    
  },




  {
    _tag: 'CSidebarNavDropdown',
    name: 'Orders',
    route: '/orders',
    icon: 'cil-puzzle',
    
    _children: [
      
      {
        //decide later if needed here or not.
        _tag: 'CSidebarNavItem',
        name: 'Update Order Status',
        to: '/orders/update-order-status',
        
        
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Orders',
        to: '/orders/all-orders',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Change min cart value',
        to: '/orders/change-min-value',
      },
      
    ],  
  },
  














  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Products',
    route: '/products',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add new Product',
        to: '/products/add-new-product',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Products',
        to: '/products/all-products',
      },
     
    ],
    
    
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Categories',
    route: '/categories',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add new Category',
        to: '/categories/add-new-category',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'View/Update Categories',
        to: '/categories/all-categories',
      }, 
    ],
    

  },
  
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Login',
  //       to: '/login',
  //     },
   
  //   ],
  // },
  
]

export default _nav
