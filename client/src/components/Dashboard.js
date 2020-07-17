import React from 'react'
import Header from './Header'
import Stats from './Stats'
import RecentSales from './RecentSales'


const Dashboard = ()=>{
    return (
        <div>
            <Header/>
            <Stats/>
            <RecentSales/>
        </div>
    )
}

export default Dashboard